-- MASTER SCHEMA FIX MIGRATION
-- This migration ensures ALL tables have consistent schema with required columns
-- Run this in Supabase SQL Editor

-- ============================================
-- CREATE FUNCTION TO ADD COLUMN IF MISSING
-- ============================================
CREATE OR REPLACE FUNCTION add_column_if_missing(p_table_name TEXT, p_column_name TEXT, p_column_type TEXT)
RETURNS VOID AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = p_table_name AND column_name = p_column_name
  ) THEN
    EXECUTE format('ALTER TABLE %I ADD COLUMN %I %s', p_table_name, p_column_name, p_column_type);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- GALLERY TABLE
-- ============================================
DO $$
BEGIN
  -- Ensure table exists
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

  -- Add missing columns
  PERFORM add_column_if_missing('gallery', 'title', 'VARCHAR(255)');
  PERFORM add_column_if_missing('gallery', 'description', 'TEXT');
  PERFORM add_column_if_missing('gallery', 'image_url', 'VARCHAR(500) NOT NULL');
  PERFORM add_column_if_missing('gallery', 'category', 'VARCHAR(50)');
  PERFORM add_column_if_missing('gallery', 'album', 'VARCHAR(100)');
  PERFORM add_column_if_missing('gallery', 'featured', 'BOOLEAN DEFAULT FALSE');
  PERFORM add_column_if_missing('gallery', 'order_index', 'INTEGER DEFAULT 0');
  PERFORM add_column_if_missing('gallery', 'created_at', 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
  PERFORM add_column_if_missing('gallery', 'updated_at', 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
END $$;

-- ============================================
-- NEWS TABLE
-- ============================================
DO $$
BEGIN
  CREATE TABLE IF NOT EXISTS news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image_url VARCHAR(500),
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  PERFORM add_column_if_missing('news', 'title', 'VARCHAR(255) NOT NULL');
  PERFORM add_column_if_missing('news', 'content', 'TEXT NOT NULL');
  PERFORM add_column_if_missing('news', 'excerpt', 'TEXT');
  PERFORM add_column_if_missing('news', 'featured_image_url', 'VARCHAR(500)');
  PERFORM add_column_if_missing('news', 'published', 'BOOLEAN DEFAULT FALSE');
  PERFORM add_column_if_missing('news', 'published_at', 'TIMESTAMP WITH TIME ZONE');
  PERFORM add_column_if_missing('news', 'created_at', 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
  PERFORM add_column_if_missing('news', 'updated_at', 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
END $$;

-- ============================================
-- EVENTS TABLE
-- ============================================
DO $$
BEGIN
  CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    location VARCHAR(255),
    featured_image_url VARCHAR(500),
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  PERFORM add_column_if_missing('events', 'title', 'VARCHAR(255) NOT NULL');
  PERFORM add_column_if_missing('events', 'description', 'TEXT');
  PERFORM add_column_if_missing('events', 'event_date', 'DATE NOT NULL');
  PERFORM add_column_if_missing('events', 'event_time', 'TIME');
  PERFORM add_column_if_missing('events', 'location', 'VARCHAR(255)');
  PERFORM add_column_if_missing('events', 'featured_image_url', 'VARCHAR(500)');
  PERFORM add_column_if_missing('events', 'published', 'BOOLEAN DEFAULT FALSE');
  PERFORM add_column_if_missing('events', 'created_at', 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
  PERFORM add_column_if_missing('events', 'updated_at', 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
END $$;

-- ============================================
-- TEACHERS TABLE
-- ============================================
DO $$
BEGIN
  CREATE TABLE IF NOT EXISTS teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    position VARCHAR(100),
    department VARCHAR(100),
    subject_specialization VARCHAR(100),
    biography TEXT,
    photo_url VARCHAR(500),
    hire_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  PERFORM add_column_if_missing('teachers', 'first_name', 'VARCHAR(100) NOT NULL');
  PERFORM add_column_if_missing('teachers', 'last_name', 'VARCHAR(100) NOT NULL');
  PERFORM add_column_if_missing('teachers', 'email', 'VARCHAR(255) UNIQUE');
  PERFORM add_column_if_missing('teachers', 'phone', 'VARCHAR(20)');
  PERFORM add_column_if_missing('teachers', 'position', 'VARCHAR(100)');
  PERFORM add_column_if_missing('teachers', 'department', 'VARCHAR(100)');
  PERFORM add_column_if_missing('teachers', 'subject_specialization', 'VARCHAR(100)');
  PERFORM add_column_if_missing('teachers', 'biography', 'TEXT');
  PERFORM add_column_if_missing('teachers', 'photo_url', 'VARCHAR(500)');
  PERFORM add_column_if_missing('teachers', 'hire_date', 'DATE');
  PERFORM add_column_if_missing('teachers', 'status', 'VARCHAR(20) DEFAULT active');
  PERFORM add_column_if_missing('teachers', 'created_at', 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
  PERFORM add_column_if_missing('teachers', 'updated_at', 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
END $$;

-- ============================================
-- APPLICATIONS TABLE
-- ============================================
DO $$
BEGIN
  Create TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_number VARCHAR(50) UNIQUE NOT NULL,
    student_first_name VARCHAR(100) NOT NULL,
    student_last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    national_id_birth_cert VARCHAR(50),
    passport_photo_url VARCHAR(500),
    parent_name VARCHAR(100) NOT NULL,
    parent_relationship VARCHAR(50) NOT NULL,
    parent_phone VARCHAR(20) NOT NULL,
    parent_alternative_phone VARCHAR(20),
    parent_email VARCHAR(255) NOT NULL,
    physical_address TEXT NOT NULL,
    previous_school VARCHAR(255),
    last_grade_completed VARCHAR(50),
    results_upload_url VARCHAR(500),
    grade_applying VARCHAR(50) NOT NULL,
    subjects TEXT[],
    additional_comments TEXT,
    declaration_accepted BOOLEAN NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  PERFORM add_column_if_missing('applications', 'application_number', 'VARCHAR(50) UNIQUE NOT NULL');
  PERFORM add_column_if_missing('applications', 'student_first_name', 'VARCHAR(100) NOT NULL');
  PERFORM add_column_if_missing('applications', 'student_last_name', 'VARCHAR(100) NOT NULL');
  PERFORM add_column_if_missing('applications', 'date_of_birth', 'DATE NOT NULL');
  PERFORM add_column_if_missing('applications', 'gender', 'VARCHAR(20) NOT NULL');
  PERFORM add_column_if_missing('applications', 'national_id_birth_cert', 'VARCHAR(50)');
  PERFORM add_column_if_missing('applications', 'passport_photo_url', 'VARCHAR(500)');
  PERFORM add_column_if_missing('applications', 'parent_name', 'VARCHAR(100) NOT NULL');
  PERFORM add_column_if_missing('applications', 'parent_relationship', 'VARCHAR(50) NOT NULL');
  PERFORM add_column_if_missing('applications', 'parent_phone', 'VARCHAR(20) NOT NULL');
  PERFORM add_column_if_missing('applications', 'parent_alternative_phone', 'VARCHAR(20)');
  PERFORM add_column_if_missing('applications', 'parent_email', 'VARCHAR(255) NOT NULL');
  PERFORM add_column_if_missing('applications', 'physical_address', 'TEXT NOT NULL');
  PERFORM add_column_if_missing('applications', 'previous_school', 'VARCHAR(255)');
  PERFORM add_column_if_missing('applications', 'last_grade_completed', 'VARCHAR(50)');
  PERFORM add_column_if_missing('applications', 'results_upload_url', 'VARCHAR(500)');
  PERFORM add_column_if_missing('applications', 'grade_applying', 'VARCHAR(50) NOT NULL');
  PERFORM add_column_if_missing('applications', 'subjects', 'TEXT[]');
  PERFORM add_column_if_missing('applications', 'additional_comments', 'TEXT');
  PERFORM add_column_if_missing('applications', 'declaration_accepted', 'BOOLEAN NOT NULL');
  PERFORM add_column_if_missing('applications', 'status', 'VARCHAR(20) DEFAULT pending');
  PERFORM add_column_if_missing('applications', 'submitted_at', 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
  PERFORM add_column_if_missing('applications', 'reviewed_at', 'TIMESTAMP WITH TIME ZONE');
  PERFORM add_column_if_missing('applications', 'reviewed_by', 'UUID');
  PERFORM add_column_if_missing('applications', 'created_at', 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
  PERFORM add_column_if_missing('applications', 'updated_at', 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
END $$;

-- ============================================
-- ACTIVITY LOGS TABLE
-- ============================================
DO $$
BEGIN
  CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    user_email VARCHAR(255),
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  PERFORM add_column_if_missing('activity_logs', 'action', 'VARCHAR(100) NOT NULL');
  PERFORM add_column_if_missing('activity_logs', 'entity_type', 'VARCHAR(50)');
  PERFORM add_column_if_missing('activity_logs', 'entity_id', 'UUID');
  PERFORM add_column_if_missing('activity_logs', 'user_email', 'VARCHAR(255)');
  PERFORM add_column_if_missing('activity_logs', 'details', 'JSONB');
  PERFORM add_column_if_missing('activity_logs', 'created_at', 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
END $$;

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_album ON gallery(album);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery(featured);
CREATE INDEX IF NOT EXISTS idx_gallery_order ON gallery(order_index);
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON gallery(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_news_published ON news(published);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_events_published ON events(published);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);

CREATE INDEX IF NOT EXISTS idx_teachers_status ON teachers(status);
CREATE INDEX IF NOT EXISTS idx_teachers_department ON teachers(department);

CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_number ON applications(application_number);
CREATE INDEX IF NOT EXISTS idx_applications_submitted_at ON applications(submitted_at DESC);

CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON activity_logs(action);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);

-- ============================================
-- CREATE AUTO-UPDATE TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- APPLY TRIGGERS TO TABLES WITH updated_at
-- ============================================
DROP TRIGGER IF EXISTS update_gallery_updated_at ON gallery;
CREATE TRIGGER update_gallery_updated_at
  BEFORE UPDATE ON gallery
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_news_updated_at ON news;
CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_teachers_updated_at ON teachers;
CREATE TRIGGER update_teachers_updated_at
  BEFORE UPDATE ON teachers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_applications_updated_at ON applications;
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DROP EXISTING POLICIES
-- ============================================
DO $$
BEGIN
  -- Gallery
  DROP POLICY IF EXISTS "Public can read gallery" ON gallery;
  DROP POLICY IF EXISTS "Admins can create gallery" ON gallery;
  DROP POLICY IF EXISTS "Admins can update gallery" ON gallery;
  DROP POLICY IF EXISTS "Admins can delete gallery" ON gallery;
  DROP POLICY IF EXISTS "Admins can manage gallery" ON gallery;

  -- News
  DROP POLICY IF EXISTS "Public can read news" ON news;
  DROP POLICY IF EXISTS "Admins can manage news" ON news;

  -- Events
  DROP POLICY IF EXISTS "Public can read events" ON events;
  DROP POLICY IF EXISTS "Admins can manage events" ON events;

  -- Teachers
  DROP POLICY IF EXISTS "Public can read teachers" ON teachers;
  DROP POLICY IF EXISTS "Admins can manage teachers" ON teachers;

  -- Applications
  DROP POLICY IF EXISTS "Anyone can create applications" ON applications;
  DROP POLICY IF EXISTS "Admins can read applications" ON applications;
  DROP POLICY IF EXISTS "Admins can update applications" ON applications;
  DROP POLICY IF EXISTS "Admins can delete applications" ON applications;

  -- Activity Logs
  DROP POLICY IF EXISTS "System can create activity_logs" ON activity_logs;
  DROP POLICY IF EXISTS "Admins can read activity_logs" ON activity_logs;
END $$;

-- ============================================
-- CREATE PROPER RLS POLICIES
-- ============================================
-- Gallery Policies
CREATE POLICY "Public can read gallery" ON gallery
  FOR SELECT USING (true);
CREATE POLICY "Admins can create gallery" ON gallery
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update gallery" ON gallery
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete gallery" ON gallery
  FOR DELETE USING (auth.role() = 'authenticated');

-- News Policies
CREATE POLICY "Public can read news" ON news
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage news" ON news
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Events Policies
CREATE POLICY "Public can read events" ON events
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage events" ON events
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Teachers Policies
CREATE POLICY "Public can read teachers" ON teachers
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage teachers" ON teachers
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Applications Policies
CREATE POLICY "Anyone can create applications" ON applications
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read applications" ON applications
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can update applications" ON applications
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete applications" ON applications
  FOR DELETE USING (auth.role() = 'authenticated');

-- Activity Logs Policies
CREATE POLICY "System can create activity_logs" ON activity_logs
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read activity_logs" ON activity_logs
  FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================
-- VERIFY SCHEMA
-- ============================================
DO $$
DECLARE
  v_table_name TEXT;
  column_count INTEGER;
BEGIN
  FOR v_table_name IN SELECT unnest(ARRAY['gallery', 'news', 'events', 'teachers', 'applications', 'activity_logs'])
  LOOP
    SELECT COUNT(*) INTO column_count
    FROM information_schema.columns
    WHERE table_name = v_table_name;
    
    RAISE NOTICE 'Table % has % columns', v_table_name, column_count;
    
    -- Check for updated_at specifically
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = v_table_name AND column_name = 'updated_at'
    ) THEN
      RAISE NOTICE '  ✓ updated_at column exists';
    ELSE
      RAISE NOTICE '  ✗ updated_at column MISSING';
    END IF;
  END LOOP;
END $$;
