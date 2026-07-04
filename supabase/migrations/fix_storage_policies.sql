-- Storage Bucket and Policy Setup
-- This migration ensures proper storage security for file uploads

-- Create gallery bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Create applications bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('applications', 'applications', false)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies to avoid conflicts
DROP POLICY IF EXISTS "Public can read gallery" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage gallery" ON storage.objects;
DROP POLICY IF EXISTS "System can manage applications" ON storage.objects;

-- GALLERY BUCKET POLICIES
-- Allow public to read gallery images
CREATE POLICY "Public can read gallery" ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'gallery');

-- Allow authenticated users (admins) to upload to gallery
CREATE POLICY "Admins can upload to gallery" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'gallery');

-- Allow authenticated users (admins) to delete from gallery
CREATE POLICY "Admins can delete from gallery" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'gallery');

-- Allow authenticated users (admins) to update gallery files
CREATE POLICY "Admins can update gallery" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'gallery')
  WITH CHECK (bucket_id = 'gallery');

-- APPLICATIONS BUCKET POLICIES
-- Allow service role to manage application files
CREATE POLICY "System can manage applications" ON storage.objects
  FOR ALL
  TO service_role
  USING (bucket_id = 'applications')
  WITH CHECK (bucket_id = 'applications');

-- Allow authenticated users (admins) to read application files
CREATE POLICY "Admins can read applications" ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'applications');
