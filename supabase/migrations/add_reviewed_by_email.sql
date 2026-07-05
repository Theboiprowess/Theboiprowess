-- Add reviewed_by_email column to applications table
ALTER TABLE applications ADD COLUMN IF NOT EXISTS reviewed_by_email VARCHAR(255);
