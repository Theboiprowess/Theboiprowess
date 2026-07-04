-- Migration: Add management tables for Quick Actions
-- Run this in Supabase SQL Editor

-- ============================================
-- ANNOUNCEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  target_audience VARCHAR(50), -- 'all', 'students', 'teachers', 'parents'
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for announcements
CREATE INDEX IF NOT EXISTS idx_announcements_published ON announcements(published);
CREATE INDEX IF NOT EXISTS idx_announcements_priority ON announcements(priority);
CREATE INDEX IF NOT EXISTS idx_announcements_created_at ON announcements(created_at DESC);

-- Enable RLS
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Policies for announcements
DROP POLICY IF EXISTS "Admins can read announcements" ON announcements;
DROP POLICY IF EXISTS "Admins can create announcements" ON announcements;
DROP POLICY IF EXISTS "Admins can update announcements" ON announcements;
DROP POLICY IF EXISTS "Admins can delete announcements" ON announcements;

CREATE POLICY "Admins can read announcements" ON announcements FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can create announcements" ON announcements FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update announcements" ON announcements FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete announcements" ON announcements FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- ADMISSIONS SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admissions_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  academic_year VARCHAR(20) NOT NULL,
  is_open BOOLEAN DEFAULT FALSE,
  max_intake INTEGER,
  application_deadline DATE,
  admission_requirements TEXT,
  programmes TEXT[], -- Array of available programmes
  fees JSONB, -- Fee structure for different grades/programmes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admissions_settings ENABLE ROW LEVEL SECURITY;

-- Policies for admissions_settings
DROP POLICY IF EXISTS "Admins can read admissions_settings" ON admissions_settings;
DROP POLICY IF EXISTS "Admins can update admissions_settings" ON admissions_settings;

CREATE POLICY "Admins can read admissions_settings" ON admissions_settings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can update admissions_settings" ON admissions_settings FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================
-- GALLERY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255),
  description TEXT,
  image_url VARCHAR(500) NOT NULL,
  category VARCHAR(50), -- 'events', 'sports', 'academics', 'facilities', 'general'
  album VARCHAR(100),
  featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for gallery
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_album ON gallery(album);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery(featured);
CREATE INDEX IF NOT EXISTS idx_gallery_order ON gallery(order_index);

-- Enable RLS
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Policies for gallery
DROP POLICY IF EXISTS "Public can read gallery" ON gallery;
DROP POLICY IF EXISTS "Admins can create gallery" ON gallery;
DROP POLICY IF EXISTS "Admins can update gallery" ON gallery;
DROP POLICY IF EXISTS "Admins can delete gallery" ON gallery;

CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Admins can create gallery" ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update gallery" ON gallery FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete gallery" ON gallery FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- STAFF TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  position VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  role VARCHAR(50), -- 'admin', 'support', 'maintenance', 'security', etc.
  hire_date DATE,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for staff
CREATE INDEX IF NOT EXISTS idx_staff_department ON staff(department);
CREATE INDEX IF NOT EXISTS idx_staff_role ON staff(role);
CREATE INDEX IF NOT EXISTS idx_staff_status ON staff(status);

-- Enable RLS
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

-- Policies for staff
DROP POLICY IF EXISTS "Admins can read staff" ON staff;
DROP POLICY IF EXISTS "Admins can create staff" ON staff;
DROP POLICY IF EXISTS "Admins can update staff" ON staff;
DROP POLICY IF EXISTS "Admins can delete staff" ON staff;

CREATE POLICY "Admins can read staff" ON staff FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can create staff" ON staff FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update staff" ON staff FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete staff" ON staff FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- NOTICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS notices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'general', -- 'general', 'exam', 'holiday', 'event', 'urgent'
  target_audience VARCHAR(50), -- 'all', 'students', 'teachers', 'parents'
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for notices
CREATE INDEX IF NOT EXISTS idx_notices_published ON notices(published);
CREATE INDEX IF NOT EXISTS idx_notices_type ON notices(type);
CREATE INDEX IF NOT EXISTS idx_notices_created_at ON notices(created_at DESC);

-- Enable RLS
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

-- Policies for notices
DROP POLICY IF EXISTS "Public can read notices" ON notices;
DROP POLICY IF EXISTS "Admins can create notices" ON notices;
DROP POLICY IF EXISTS "Admins can update notices" ON notices;
DROP POLICY IF EXISTS "Admins can delete notices" ON notices;

CREATE POLICY "Public can read notices" ON notices FOR SELECT USING (true);
CREATE POLICY "Admins can create notices" ON notices FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update notices" ON notices FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete notices" ON notices FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- HOMEPAGE CONTENT TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS homepage_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section VARCHAR(50) NOT NULL UNIQUE, -- 'hero', 'about', 'features', 'cta', etc.
  title VARCHAR(255),
  subtitle TEXT,
  content TEXT,
  image_url VARCHAR(500),
  button_text VARCHAR(100),
  button_link VARCHAR(500),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;

-- Policies for homepage_content
DROP POLICY IF EXISTS "Public can read homepage_content" ON homepage_content;
DROP POLICY IF EXISTS "Admins can update homepage_content" ON homepage_content;

CREATE POLICY "Public can read homepage_content" ON homepage_content FOR SELECT USING (true);
CREATE POLICY "Admins can update homepage_content" ON homepage_content FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================
-- CONTACT INFO TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) NOT NULL, -- 'phone', 'email', 'address', 'social'
  label VARCHAR(100),
  value TEXT NOT NULL,
  icon VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Policies for contact_info
DROP POLICY IF EXISTS "Public can read contact_info" ON contact_info;
DROP POLICY IF EXISTS "Admins can update contact_info" ON contact_info;

CREATE POLICY "Public can read contact_info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Admins can update contact_info" ON contact_info FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================
-- BLOG POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author VARCHAR(100),
  featured_image_url VARCHAR(500),
  category VARCHAR(50),
  tags TEXT[],
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for blog_posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies for blog_posts
DROP POLICY IF EXISTS "Public can read blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can create blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can update blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can delete blog_posts" ON blog_posts;

CREATE POLICY "Public can read blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Admins can create blog_posts" ON blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update blog_posts" ON blog_posts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete blog_posts" ON blog_posts FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- COURSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  level VARCHAR(20) NOT NULL, -- 'O-Level', 'A-Level'
  duration VARCHAR(50),
  prerequisites TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes forourses
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_courses_active ON courses(is_active);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Policies for courses
DROP POLICY IF EXISTS "Public can read courses" ON courses;
DROP POLICY IF EXISTS "Admins can create courses" ON courses;
DROP POLICY IF EXISTS "Admins can update courses" ON courses;
DROP POLICY IF EXISTS "Admins can delete courses" ON courses;

CREATE POLICY "Public can read courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Admins can create courses" ON courses FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update courses" ON courses FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete courses" ON courses FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- ACADEMIC CALENDAR TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS academic_calendar (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type VARCHAR(50) NOT NULL, -- 'term_start', 'term_end', 'exam', 'holiday', 'event'
  start_date DATE NOT NULL,
  end_date DATE,
  academic_year VARCHAR(20) NOT NULL,
  term VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for academic_calendar
CREATE INDEX IF NOT EXISTS idx_calendar_year ON academic_calendar(academic_year);
CREATE INDEX IF NOT EXISTS idx_calendar_type ON academic_calendar(event_type);
CREATE INDEX IF NOT EXISTS idx_calendar_start_date ON academic_calendar(start_date);

-- Enable RLS
ALTER TABLE academic_calendar ENABLE ROW LEVEL SECURITY;

-- Policies for academic_calendar
DROP POLICY IF EXISTS "Public can read academic_calendar" ON academic_calendar;
DROP POLICY IF EXISTS "Admins can create academic_calendar" ON academic_calendar;
DROP POLICY IF EXISTS "Admins can update academic_calendar" ON academic_calendar;
DROP POLICY IF EXISTS "Admins can delete academic_calendar" ON academic_calendar;

CREATE POLICY "Public can read academic_calendar" ON academic_calendar FOR SELECT USING (true);
CREATE POLICY "Admins can create academic_calendar" ON academic_calendar FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update academic_calendar" ON academic_calendar FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete academic_calendar" ON academic_calendar FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- DOWNLOADS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_url VARCHAR(500) NOT NULL,
  file_type VARCHAR(50), -- 'pdf', 'doc', 'docx', 'zip', etc.
  file_size INTEGER, -- in bytes
  category VARCHAR(50), -- 'forms', 'handbooks', 'policies', 'exam_papers', etc.
  download_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for downloads
CREATE INDEX IF NOT EXISTS idx_downloads_category ON downloads(category);
CREATE INDEX IF NOT EXISTS idx_downloads_active ON downloads(is_active);

-- Enable RLS
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

-- Policies for downloads
DROP POLICY IF EXISTS "Public can read downloads" ON downloads;
DROP POLICY IF EXISTS "Admins can create downloads" ON downloads;
DROP POLICY IF EXISTS "Admins can update downloads" ON downloads;
DROP POLICY IF EXISTS "Admins can delete downloads" ON downloads;

CREATE POLICY "Public can read downloads" ON downloads FOR SELECT USING (true);
CREATE POLICY "Admins can create downloads" ON downloads FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update downloads" ON downloads FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete downloads" ON downloads FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- EMAIL BROADCASTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS email_broadcasts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  target_audience VARCHAR(50), -- 'all', 'students', 'teachers', 'parents'
  recipient_count INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'scheduled', 'sent', 'failed'
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for email_broadcasts
CREATE INDEX IF NOT EXISTS idx_email_broadcasts_status ON email_broadcasts(status);
CREATE INDEX IF NOT EXISTS idx_email_broadcasts_created_at ON email_broadcasts(created_at DESC);

-- Enable RLS
ALTER TABLE email_broadcasts ENABLE ROW LEVEL SECURITY;

-- Policies for email_broadcasts
DROP POLICY IF EXISTS "Admins can read email_broadcasts" ON email_broadcasts;
DROP POLICY IF EXISTS "Admins can create email_broadcasts" ON email_broadcasts;
DROP POLICY IF EXISTS "Admins can update email_broadcasts" ON email_broadcasts;
DROP POLICY IF EXISTS "Admins can delete email_broadcasts" ON email_broadcasts;

CREATE POLICY "Admins can read email_broadcasts" ON email_broadcasts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can create email_broadcasts" ON email_broadcasts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update email_broadcasts" ON email_broadcasts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete email_broadcasts" ON email_broadcasts FOR DELETE USING (auth.role() = 'authenticated');
