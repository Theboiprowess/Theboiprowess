-- Create Supabase Storage Bucket for School Uploads
-- Run this in Supabase SQL Editor

-- Insert storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('school-uploads', 'school-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
-- Allow public read access
DROP POLICY IF EXISTS "Public read school-uploads" ON storage.objects;
CREATE POLICY "Public read school-uploads" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'school-uploads');

-- Allow authenticated users to upload
DROP POLICY IF EXISTS "Authenticated upload school-uploads" ON storage.objects;
CREATE POLICY "Authenticated upload school-uploads" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'school-uploads' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete
DROP POLICY IF EXISTS "Authenticated delete school-uploads" ON storage.objects;
CREATE POLICY "Authenticated delete school-uploads" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'school-uploads' AND auth.role() = 'authenticated');

DO $$
BEGIN
  RAISE NOTICE 'Storage bucket "school-uploads" created successfully!';
  RAISE NOTICE 'Public read access enabled';
  RAISE NOTICE 'Authenticated upload/delete access enabled';
END $$;
