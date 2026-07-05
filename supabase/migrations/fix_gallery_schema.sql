-- Comprehensive Gallery Table Schema Fix
-- This migration ensures the gallery table has all required columns
-- Run this in Supabase SQL Editor

-- ============================================
-- ENSURE GALLERY TABLE EXISTS WITH ALL COLUMNS
-- ============================================

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255),
  description TEXT,
  image_url VARCHAR(500) NOT NULL,
  category VARCHAR(50),
  album VARCHAR(100),
  featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns if table already exists
DO $$
BEGIN
  -- Check and add title column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gallery' AND column_name = 'title') THEN
    ALTER TABLE gallery ADD COLUMN title VARCHAR(255);
  END IF;

  -- Check and add description column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gallery' AND column_name = 'description') THEN
    ALTER TABLE gallery ADD COLUMN description TEXT;
  END IF;

  -- Check and add image_url column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gallery' AND column_name = 'image_url') THEN
    ALTER TABLE gallery ADD COLUMN image_url VARCHAR(500) NOT NULL DEFAULT '';
  END IF;

  -- Check and add category column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gallery' AND column_name = 'category') THEN
    ALTER TABLE gallery ADD COLUMN category VARCHAR(50);
  END IF;

  -- Check and add album column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gallery' AND column_name = 'album') THEN
    ALTER TABLE gallery ADD COLUMN album VARCHAR(100);
  END IF;

  -- Check and add featured column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gallery' AND column_name = 'featured') THEN
    ALTER TABLE gallery ADD COLUMN featured BOOLEAN DEFAULT FALSE;
  END IF;

  -- Check and add order_index column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gallery' AND column_name = 'order_index') THEN
    ALTER TABLE gallery ADD COLUMN order_index INTEGER DEFAULT 0;
  END IF;

  -- Check and add created_at column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gallery' AND column_name = 'created_at') THEN
    ALTER TABLE gallery ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;

  -- Check and add updated_at column (THIS IS THE CRITICAL FIX)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gallery' AND column_name = 'updated_at') THEN
    ALTER TABLE gallery ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_album ON gallery(album);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery(featured);
CREATE INDEX IF NOT EXISTS idx_gallery_order ON gallery(order_index);
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON gallery(created_at DESC);

-- Enable RLS
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Public can read gallery" ON gallery;
DROP POLICY IF EXISTS "Admins can create gallery" ON gallery;
DROP POLICY IF EXISTS "Admins can update gallery" ON gallery;
DROP POLICY IF EXISTS "Admins can delete gallery" ON gallery;
DROP POLICY IF EXISTS "Admins can manage gallery" ON gallery;

-- Create proper policies
CREATE POLICY "Public can read gallery" ON gallery
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can create gallery" ON gallery
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update gallery" ON gallery
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete gallery" ON gallery
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_gallery_updated_at ON gallery;
CREATE TRIGGER update_gallery_updated_at
  BEFORE UPDATE ON gallery
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Verify the schema
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'gallery'
ORDER BY ordinal_position;
