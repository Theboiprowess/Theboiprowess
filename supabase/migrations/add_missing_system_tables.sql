-- Migration: Add missing system tables for full school management
-- Run this in Supabase SQL Editor

-- ============================================
-- NOTIFICATIONS TABLE (for admin dashboard)
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'application_received', 'teacher_added', 'news_published', etc.
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  entity_type VARCHAR(50), -- 'application', 'student', 'teacher', 'news', 'event'
  entity_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_entity ON notifications(entity_type, entity_id);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
DROP POLICY IF EXISTS "System can create notifications" ON notifications;

-- Policies for notifications
CREATE POLICY "Users can read own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can create notifications" ON notifications FOR INSERT WITH CHECK (true);

-- ============================================
-- GENERAL AUDIT LOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  action VARCHAR(100) NOT NULL, -- 'create', 'update', 'delete', 'login', 'logout'
  table_name VARCHAR(100) NOT NULL,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for audit_logs
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table ON audit_logs(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_logs_record ON audit_logs(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- Enable RLS
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can read audit logs" ON audit_logs;
DROP POLICY IF EXISTS "System can create audit logs" ON audit_logs;

-- Policies for audit_logs
CREATE POLICY "Admins can read audit logs" ON audit_logs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "System can create audit logs" ON audit_logs FOR INSERT WITH CHECK (true);

-- ============================================
-- UPDATE TEACHERS TABLE (add department field)
-- ============================================
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS department VARCHAR(100);
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS subject_specialization VARCHAR(100);

-- ============================================
-- UPDATE STUDENTS TABLE (add more fields)
-- ============================================
ALTER TABLE students ADD COLUMN IF NOT EXISTS student_id VARCHAR(20) UNIQUE;
ALTER TABLE students ADD COLUMN IF NOT EXISTS class VARCHAR(50);
ALTER TABLE students ADD COLUMN IF NOT EXISTS photo_url VARCHAR(500);
ALTER TABLE students ADD COLUMN IF NOT EXISTS medical_info TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS dietary_requirements TEXT;

-- ============================================
-- CREATE FUNCTION TO GENERATE STUDENT ID
-- ============================================
CREATE OR REPLACE FUNCTION generate_student_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.student_id IS NULL THEN
    NEW.student_id := 'STU-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(nextval('student_id_seq')::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for student IDs
CREATE SEQUENCE IF NOT EXISTS student_id_seq START 1;

-- Add trigger for student ID generation
DROP TRIGGER IF EXISTS generate_student_id_trigger ON students;
CREATE TRIGGER generate_student_id_trigger
  BEFORE INSERT ON students
  FOR EACH ROW
  EXECUTE FUNCTION generate_student_id();

-- ============================================
-- CREATE TRIGGER TO LOG ACTIVITY AUTOMATICALLY
-- ============================================
CREATE OR REPLACE FUNCTION log_audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_logs (table_name, record_id, action, new_values, user_id)
    VALUES (TG_TABLE_NAME, NEW.id, 'create', to_jsonb(NEW), auth.uid());
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_logs (table_name, record_id, action, old_values, new_values, user_id)
    VALUES (TG_TABLE_NAME, NEW.id, 'update', to_jsonb(OLD), to_jsonb(NEW), auth.uid());
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_logs (table_name, record_id, action, old_values, user_id)
    VALUES (TG_TABLE_NAME, OLD.id, 'delete', to_jsonb(OLD), auth.uid());
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Add audit triggers to key tables (optional - can be enabled per table)
-- Uncomment for tables you want automatic audit logging:
-- CREATE TRIGGER audit_students_trigger AFTER INSERT OR UPDATE OR DELETE ON students
--   FOR EACH ROW EXECUTE FUNCTION log_audit_trigger();
-- CREATE TRIGGER audit_teachers_trigger AFTER INSERT OR UPDATE OR DELETE ON teachers
--   FOR EACH ROW EXECUTE FUNCTION log_audit_trigger();
-- CREATE TRIGGER audit_applications_trigger AFTER INSERT OR UPDATE OR DELETE ON applications
--   FOR EACH ROW EXECUTE FUNCTION log_audit_trigger();
