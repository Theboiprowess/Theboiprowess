-- Fix applications table to allow reviewed_by to be nullable and remove strict foreign key constraint
-- This allows updates without requiring a valid auth.users UUID

-- Drop foreign key constraint to allow null values and email-based tracking
ALTER TABLE applications DROP CONSTRAINT IF EXISTS applications_reviewed_by_fkey;

-- Add reviewed_by_email column to store email as string
ALTER TABLE applications ADD COLUMN IF NOT EXISTS reviewed_by_email VARCHAR(255);

-- Add back foreign key constraint but make it nullable
ALTER TABLE applications 
  ADD CONSTRAINT applications_reviewed_by_fkey 
  FOREIGN KEY (reviewed_by) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Update existing records that might have email in reviewed_by
UPDATE applications 
SET reviewed_by_email = reviewed_by::text 
WHERE reviewed_by IS NOT NULL AND reviewed_by_email IS NULL;

-- Set reviewed_by to null where it's not a valid UUID
UPDATE applications 
SET reviewed_by = NULL 
WHERE reviewed_by IS NOT NULL AND reviewed_by::text !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';
