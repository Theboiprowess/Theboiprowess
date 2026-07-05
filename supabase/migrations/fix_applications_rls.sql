-- Migration: Fix Applications RLS Policies
-- This fixes the production bug where admin dashboard cannot read applications

-- Enable RLS on applications table
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- DROP existing policies
DROP POLICY IF EXISTS "Anyone can create applications" ON applications;
DROP POLICY IF EXISTS "Admins can read applications" ON applications;
DROP POLICY IF EXISTS "Public read access to students" ON applications;
DROP POLICY IF EXISTS "Authenticated users can read applications" ON applications;
DROP POLICY IF EXISTS "Authenticated users can update applications" ON applications;
DROP POLICY IF EXISTS "Authenticated users can delete applications" ON applications;

-- Allow anyone (anonymous users) to INSERT applications
CREATE POLICY "Anyone can create applications" ON applications FOR INSERT WITH CHECK (true);

-- Allow public read access (for admin dashboard using service role key)
CREATE POLICY "Public read access to applications" ON applications FOR SELECT USING (true);

-- Allow authenticated users to UPDATE applications
CREATE POLICY "Authenticated users can update applications" ON applications FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to DELETE applications
CREATE POLICY "Authenticated users can delete applications" ON applications FOR DELETE USING (auth.role() = 'authenticated');

-- Ensure notifications table exists with proper RLS
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- DROP existing policies before creating new ones
DROP POLICY IF EXISTS "Authenticated users can read notifications" ON notifications;
DROP POLICY IF EXISTS "System can create notifications" ON notifications;

CREATE POLICY "Authenticated users can read notifications" ON notifications FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "System can create notifications" ON notifications FOR INSERT WITH CHECK (true);
