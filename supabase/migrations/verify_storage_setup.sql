-- Verify and ensure storage buckets exist
-- Run this in Supabase SQL Editor to check storage configuration

-- Check if buckets exist
SELECT id, name, public, created_at 
FROM storage.buckets 
WHERE id IN ('gallery', 'applications', 'application-documents');

-- Check storage policies
SELECT * 
FROM storage.policies 
WHERE bucket_id IN ('gallery', 'applications', 'application-documents')
ORDER BY bucket_id, name;

-- Check if gallery table exists
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'gallery' 
ORDER BY ordinal_position;

-- Check if applications table exists  
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'applications' 
ORDER BY ordinal_position;
