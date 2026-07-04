-- Migration: Add SELECT RLS policy for applications table
-- This fixes the issue where admin dashboard cannot read applications

-- Add SELECT policy for authenticated users (admins)
DROP POLICY IF EXISTS "Admins can read applications" ON applications;
CREATE POLICY "Admins can read applications" ON applications FOR SELECT USING (auth.role() = 'authenticated');
