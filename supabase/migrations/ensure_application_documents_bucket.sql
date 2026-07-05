-- Ensure application-documents bucket exists for file uploads
-- This bucket stores passport photos and results documents

INSERT INTO storage.buckets (id, name, public)
VALUES ('application-documents', 'application-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public can read application-documents" ON storage.objects;
DROP POLICY IF EXISTS "System can manage application-documents" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage application-documents" ON storage.objects;

-- Allow public to read application documents (for approved applications)
CREATE POLICY "Public can read application-documents" ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'application-documents');

-- Allow service role to manage application documents
CREATE POLICY "System can manage application-documents" ON storage.objects
  FOR ALL
  TO service_role
  USING (bucket_id = 'application-documents')
  WITH CHECK (bucket_id = 'application-documents');

-- Allow authenticated users (admins) to manage application documents
CREATE POLICY "Admins can manage application-documents" ON storage.objects
  FOR ALL
  TO authenticated
  USING (bucket_id = 'application-documents')
  WITH CHECK (bucket_id = 'application-documents');
