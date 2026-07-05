-- Migration: Fix Applications RLS Policies
-- This fixes the production bug where admin dashboard cannot read applications
-- Solution: Disable RLS for applications table since admin API uses service role key

-- Disable RLS on applications table (admin API uses service role key which should have full access)
ALTER TABLE applications DISABLE ROW LEVEL SECURITY;

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
