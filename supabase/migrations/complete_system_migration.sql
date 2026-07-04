-- Complete School Management System Migration
-- Run this in Supabase SQL Editor to apply all database changes
-- This migration adds activity logs, audit logs, notifications, admissions settings tables
-- along with indexes and RLS policies

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Activity Logs Table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  user_id UUID REFERENCES auth.users(id),
  details JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name VARCHAR(100) NOT NULL,
  record_id UUID,
  action VARCHAR(20) NOT NULL,
  old_value JSONB,
  new_value JSONB,
  user_id UUID REFERENCES auth.users(id),
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admissions Settings Table
CREATE TABLE IF NOT EXISTS admissions_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  academic_year VARCHAR(20) NOT NULL,
  is_open BOOLEAN DEFAULT TRUE,
  max_intake INTEGER DEFAULT 100,
  application_deadline DATE,
  requirements TEXT,
  programmes TEXT[],
  fees JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_record ON audit_logs(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- Enable Row Level Security on new tables
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions_settings ENABLE ROW LEVEL SECURITY;

-- Activity logs policies
DROP POLICY IF EXISTS "Admins can read activity logs" ON activity_logs;
CREATE POLICY "Admins can read activity logs" ON activity_logs FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can insert activity logs" ON activity_logs;
CREATE POLICY "Admins can insert activity logs" ON activity_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Audit logs policies
DROP POLICY IF EXISTS "Admins can read audit logs" ON audit_logs;
CREATE POLICY "Admins can read audit logs" ON audit_logs FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can insert audit logs" ON audit_logs;
CREATE POLICY "Admins can insert audit logs" ON audit_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Notifications policies
DROP POLICY IF EXISTS "Users can read own notifications" ON notifications;
CREATE POLICY "Users can read own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert notifications" ON notifications;
CREATE POLICY "Users can insert notifications" ON notifications FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Admissions settings policies
DROP POLICY IF EXISTS "Admins can read admissions settings" ON admissions_settings;
CREATE POLICY "Admins can read admissions settings" ON admissions_settings FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update admissions settings" ON admissions_settings;
CREATE POLICY "Admins can update admissions settings" ON admissions_settings FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can insert admissions settings" ON admissions_settings;
CREATE POLICY "Admins can insert admissions settings" ON admissions_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Ensure applications table has SELECT policy (critical fix)
DROP POLICY IF EXISTS "Admins can read applications" ON applications;
CREATE POLICY "Admins can read applications" ON applications FOR SELECT USING (auth.role() = 'authenticated');

-- Ensure gallery, news, events have full admin policies
DROP POLICY IF EXISTS "Admins can insert gallery" ON gallery;
CREATE POLICY "Admins can insert gallery" ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update gallery" ON gallery;
CREATE POLICY "Admins can update gallery" ON gallery FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete gallery" ON gallery;
CREATE POLICY "Admins can delete gallery" ON gallery FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can insert downloads" ON downloads;
CREATE POLICY "Admins can insert downloads" ON downloads FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update downloads" ON downloads;
CREATE POLICY "Admins can update downloads" ON downloads FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete downloads" ON downloads;
CREATE POLICY "Admins can delete downloads" ON downloads FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update messages" ON messages;
CREATE POLICY "Admins can update messages" ON messages FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete messages" ON messages;
CREATE POLICY "Admins can delete messages" ON messages FOR DELETE USING (auth.role() = 'authenticated');

-- Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at on admissions_settings
DROP TRIGGER IF EXISTS update_admissions_settings_updated_at ON admissions_settings;
CREATE TRIGGER update_admissions_settings_updated_at
  BEFORE UPDATE ON admissions_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default admissions settings if none exists
INSERT INTO admissions_settings (academic_year, is_open, max_intake)
SELECT '2025-2026', TRUE, 100
WHERE NOT EXISTS (SELECT 1 FROM admissions_settings);

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Migration completed successfully!';
  RAISE NOTICE 'New tables created: activity_logs, audit_logs, notifications, admissions_settings';
  RAISE NOTICE 'Indexes created for performance optimization';
  RAISE NOTICE 'RLS policies applied to all tables';
  RAISE NOTICE 'Default admissions settings inserted';
END $$;
