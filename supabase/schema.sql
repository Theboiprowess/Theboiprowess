-- WISEDELL ACADEMY Database Schema
-- Run this in Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Students Table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  parent_name VARCHAR(200) NOT NULL,
  parent_phone VARCHAR(20) NOT NULL,
  parent_email VARCHAR(255),
  emergency_contact VARCHAR(200) NOT NULL,
  emergency_phone VARCHAR(20) NOT NULL,
  admission_date DATE NOT NULL,
  grade_level VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications Table (Expanded for Online Application System)
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_number VARCHAR(20) UNIQUE NOT NULL,
  
  -- Student Details
  student_first_name VARCHAR(100) NOT NULL,
  student_last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20) NOT NULL,
  national_id_birth_cert VARCHAR(100) NOT NULL,
  passport_photo_url VARCHAR(500),
  
  -- Parent/Guardian Details
  parent_name VARCHAR(200) NOT NULL,
  parent_relationship VARCHAR(50) NOT NULL,
  parent_phone VARCHAR(20) NOT NULL,
  parent_alternative_phone VARCHAR(20),
  parent_email VARCHAR(255) NOT NULL,
  physical_address TEXT NOT NULL,
  
  -- Academic Information
  previous_school VARCHAR(255),
  last_grade_completed VARCHAR(50),
  results_upload_url VARCHAR(500),
  grade_applying VARCHAR(50) NOT NULL, -- Form 1, Form 2, Form 3, Form 4, Form 5 Lower Six, Form 6 Upper Six, O-Level Rewrites, A-Level Rewrites
  subjects TEXT[], -- Array of subjects applicant wishes to study
  
  -- Additional Information
  additional_comments TEXT,
  declaration_accepted BOOLEAN NOT NULL DEFAULT false,
  
  -- Status and Review
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected, waiting_list, more_info_requested
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  director_notes TEXT,
  
  -- Audit
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit Log Table for Application Status Changes
CREATE TABLE IF NOT EXISTS application_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  old_status VARCHAR(20),
  new_status VARCHAR(20) NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for application_number
CREATE INDEX IF NOT EXISTS idx_applications_number ON applications(application_number);
CREATE INDEX IF NOT EXISTS idx_applications_grade ON applications(grade_applying);
CREATE INDEX IF NOT EXISTS idx_applications_submitted_at ON applications(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_application ON application_audit_log(application_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON application_audit_log(created_at DESC);

-- Teachers Table
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  subjects TEXT[] NOT NULL,
  qualifications TEXT NOT NULL,
  experience_years INTEGER,
  bio TEXT,
  profile_image_url VARCHAR(500),
  status VARCHAR(20) DEFAULT 'active',
  hire_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subjects Table
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  level VARCHAR(20) NOT NULL, -- 'O-Level' or 'A-Level'
  description TEXT,
  is_core BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News Table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category VARCHAR(50),
  image_url VARCHAR(500),
  author VARCHAR(100),
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  location VARCHAR(255),
  category VARCHAR(50),
  image_url VARCHAR(500),
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500) NOT NULL,
  category VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Downloads Table
CREATE TABLE IF NOT EXISTS downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_url VARCHAR(500) NOT NULL,
  file_type VARCHAR(50),
  file_size INTEGER,
  category VARCHAR(50),
  download_count INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  replied_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_status ON students(status);
CREATE INDEX IF NOT EXISTS idx_students_grade ON students(grade_level);
CREATE INDEX IF NOT EXISTS idx_teachers_status ON teachers(status);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust as needed for your security requirements)
-- For now, allow public read access for public content
DROP POLICY IF EXISTS "Public read access to students" ON students;
CREATE POLICY "Public read access to students" ON students FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access to teachers" ON teachers;
CREATE POLICY "Public read access to teachers" ON teachers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access to subjects" ON subjects;
CREATE POLICY "Public read access to subjects" ON subjects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access to published news" ON news;
CREATE POLICY "Public read access to published news" ON news FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Public read access to published events" ON events;
CREATE POLICY "Public read access to published events" ON events FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access to gallery" ON gallery;
CREATE POLICY "Public read access to gallery" ON gallery FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access to published downloads" ON downloads;
CREATE POLICY "Public read access to published downloads" ON downloads FOR SELECT USING (published = true);

-- Allow authenticated users to submit applications and messages
DROP POLICY IF EXISTS "Anyone can create applications" ON applications;
CREATE POLICY "Anyone can create applications" ON applications FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can create messages" ON messages;
CREATE POLICY "Anyone can create messages" ON messages FOR INSERT WITH CHECK (true);

-- Audit log policies
DROP POLICY IF EXISTS "Admins can read audit log" ON application_audit_log;
CREATE POLICY "Admins can read audit log" ON application_audit_log FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can create audit log" ON application_audit_log;
CREATE POLICY "Admins can create audit log" ON application_audit_log FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Admin policies (restrict to authenticated admin users)
-- These should be adjusted based on your auth setup
DROP POLICY IF EXISTS "Admins can insert students" ON students;
CREATE POLICY "Admins can insert students" ON students FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update students" ON students;
CREATE POLICY "Admins can update students" ON students FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete students" ON students;
CREATE POLICY "Admins can delete students" ON students FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update applications" ON applications;
CREATE POLICY "Admins can update applications" ON applications FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete applications" ON applications;
CREATE POLICY "Admins can delete applications" ON applications FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can insert teachers" ON teachers;
CREATE POLICY "Admins can insert teachers" ON teachers FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update teachers" ON teachers;
CREATE POLICY "Admins can update teachers" ON teachers FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete teachers" ON teachers;
CREATE POLICY "Admins can delete teachers" ON teachers FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can insert subjects" ON subjects;
CREATE POLICY "Admins can insert subjects" ON subjects FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update subjects" ON subjects;
CREATE POLICY "Admins can update subjects" ON subjects FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete subjects" ON subjects;
CREATE POLICY "Admins can delete subjects" ON subjects FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can insert news" ON news;
CREATE POLICY "Admins can insert news" ON news FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update news" ON news;
CREATE POLICY "Admins can update news" ON news FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete news" ON news;
CREATE POLICY "Admins can delete news" ON news FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can insert events" ON events;
CREATE POLICY "Admins can insert events" ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update events" ON events;
CREATE POLICY "Admins can update events" ON events FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete events" ON events;
CREATE POLICY "Admins can delete events" ON events FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can insert gallery" ON gallery;
CREATE POLICY "Admins can insert gallery" ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update gallery" ON gallery;
CREATE POLICY "Admins can update gallery" ON gallery FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete gallery" ON gallery;
CREATE POLICY "Admins can delete gallery" ON gallery FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can insert downloads" ON downloads;
CREATE POLICY "Admins can insert downloads" ON downloads FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update downloads" ON downloads;
CREATE POLICY "Admins can update downloads" ON downloads FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete downloads" ON downloads;
CREATE POLICY "Admins can delete downloads" ON downloads FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update messages" ON messages;
CREATE POLICY "Admins can update messages" ON messages FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete messages" ON messages;
CREATE POLICY "Admins can delete messages" ON messages FOR DELETE USING (auth.role() = 'authenticated');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_students_updated_at ON students;
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_teachers_updated_at ON teachers;
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_news_updated_at ON news;
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_applications_updated_at ON applications;
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample subjects (idempotent using ON CONFLICT)
INSERT INTO subjects (code, name, level, description, is_core) VALUES
('MATH', 'Mathematics', 'O-Level', 'Core mathematics curriculum', true),
('ENG', 'English Language', 'O-Level', 'English language and literature', true),
('SCI', 'Integrated Science', 'O-Level', 'Combined science curriculum', true),
('HIST', 'History', 'O-Level', 'Zimbabwe and world history', false),
('GEO', 'Geography', 'O-Level', 'Physical and human geography', false),
('BIO', 'Biology', 'A-Level', 'Advanced biology', false),
('CHEM', 'Chemistry', 'A-Level', 'Advanced chemistry', false),
('PHY', 'Physics', 'A-Level', 'Advanced physics', false),
('MATH-A', 'Mathematics', 'A-Level', 'Advanced mathematics', false),
('BS', 'Business Studies', 'A-Level', 'Business management and economics', false),
('ACC', 'Accounting', 'A-Level', 'Financial accounting principles', false),
('ECON', 'Economics', 'A-Level', 'Micro and macro economics', false)
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- PHASE 1: ADDITIONAL TABLES FOR SCHOOL MANAGEMENT
-- ============================================

-- User Roles Table
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL, -- 'super_admin', 'admin', 'admissions_officer', 'teacher', 'finance', 'content_manager'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Activity Logs Table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL, -- 'application', 'news', 'event', 'student', 'teacher', etc.
  entity_id UUID,
  details JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Homepage Content Table
CREATE TABLE IF NOT EXISTS homepage_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section VARCHAR(50) NOT NULL UNIQUE, -- 'hero', 'stats', 'about', 'testimonials', 'footer'
  content JSONB NOT NULL,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Academic Calendar Table
CREATE TABLE IF NOT EXISTS academic_calendar (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  academic_year INTEGER NOT NULL,
  term VARCHAR(50) NOT NULL, -- 'Term 1', 'Term 2', 'Term 3'
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN DEFAULT FALSE,
  holidays JSONB, -- Array of holiday dates and descriptions
  examination_dates JSONB, -- Array of exam dates
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Information Table
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR(20),
  alternative_phone VARCHAR(20),
  email VARCHAR(255),
  physical_address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  google_maps_url TEXT,
  facebook_url VARCHAR(500),
  instagram_url VARCHAR(500),
  youtube_url VARCHAR(500),
  twitter_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  office_hours TEXT,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Settings Table
CREATE TABLE IF NOT EXISTS system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  description TEXT,
  category VARCHAR(50), -- 'general', 'admissions', 'seo', 'smtp', 'security'
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notification Queue Table
CREATE TABLE IF NOT EXISTS notification_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) NOT NULL, -- 'email', 'sms'
  recipient VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'sent', 'failed'
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements Table (separate from news for important notices)
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  is_pinned BOOLEAN DEFAULT FALSE,
  publish_date DATE NOT NULL,
  expiry_date DATE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Albums Table
CREATE TABLE IF NOT EXISTS gallery_albums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cover_image_url VARCHAR(500),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update Gallery table to include album_id and video support
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS album_id UUID REFERENCES gallery_albums(id) ON DELETE SET NULL;
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS is_video BOOLEAN DEFAULT FALSE;
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS video_url VARCHAR(500);

-- Update News table for scheduling and rich content
ALTER TABLE news ADD COLUMN IF NOT EXISTS scheduled_publish_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE news ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE news ADD COLUMN IF NOT EXISTS featured_image_url VARCHAR(500);
ALTER TABLE news ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES auth.users(id);

-- Update Events table for registration and completion
ALTER TABLE events ADD COLUMN IF NOT EXISTS registration_deadline DATE;
ALTER TABLE events ADD COLUMN IF NOT EXISTS registration_required BOOLEAN DEFAULT FALSE;
ALTER TABLE events ADD COLUMN IF NOT EXISTS max_participants INTEGER;
ALTER TABLE events ADD COLUMN IF NOT EXISTS current_participants INTEGER DEFAULT 0;
ALTER TABLE events ADD COLUMN IF NOT EXISTS is_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE events ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);

-- Create indexes for new tables
CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_academic_calendar_year ON academic_calendar(academic_year);
CREATE INDEX IF NOT EXISTS idx_academic_calendar_current ON academic_calendar(is_current);
CREATE INDEX IF NOT EXISTS idx_notification_queue_status ON notification_queue(status);
CREATE INDEX IF NOT EXISTS idx_notification_queue_scheduled ON notification_queue(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_announcements_publish ON announcements(publish_date);
CREATE INDEX IF NOT EXISTS idx_announcements_pinned ON announcements(is_pinned);
CREATE INDEX IF NOT EXISTS idx_gallery_album ON gallery(album_id);
CREATE INDEX IF NOT EXISTS idx_system_settings_category ON system_settings(category);

-- Enable RLS for new tables
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_albums ENABLE ROW LEVEL SECURITY;

-- Policies for new tables
-- User Roles
CREATE POLICY "Users can read own roles" ON user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON user_roles FOR ALL USING (auth.role() = 'authenticated');

-- Activity Logs
CREATE POLICY "Admins can read activity logs" ON activity_logs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "System can create activity logs" ON activity_logs FOR INSERT WITH CHECK (true);

-- Homepage Content
CREATE POLICY "Public can read homepage content" ON homepage_content FOR SELECT USING (true);
CREATE POLICY "Admins can update homepage content" ON homepage_content FOR ALL USING (auth.role() = 'authenticated');

-- Academic Calendar
CREATE POLICY "Public can read academic calendar" ON academic_calendar FOR SELECT USING (true);
CREATE POLICY "Admins can manage academic calendar" ON academic_calendar FOR ALL USING (auth.role() = 'authenticated');

-- Contact Info
CREATE POLICY "Public can read contact info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Admins can update contact info" ON contact_info FOR ALL USING (auth.role() = 'authenticated');

-- System Settings
CREATE POLICY "Public can read public settings" ON system_settings FOR SELECT USING (category IN ('general', 'seo'));
CREATE POLICY "Admins can manage system settings" ON system_settings FOR ALL USING (auth.role() = 'authenticated');

-- Notification Queue
CREATE POLICY "System can manage notifications" ON notification_queue FOR ALL USING (true);

-- Announcements
CREATE POLICY "Public can read active announcements" ON announcements FOR SELECT USING (
  publish_date <= CURRENT_DATE AND (expiry_date IS NULL OR expiry_date >= CURRENT_DATE)
);
CREATE POLICY "Admins can manage announcements" ON announcements FOR ALL USING (auth.role() = 'authenticated');

-- Gallery Albums
CREATE POLICY "Public can read gallery albums" ON gallery_albums FOR SELECT USING (true);
CREATE POLICY "Admins can manage gallery albums" ON gallery_albums FOR ALL USING (auth.role() = 'authenticated');

-- Add updated_at triggers for new tables
CREATE TRIGGER update_homepage_content_updated_at BEFORE UPDATE ON homepage_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_academic_calendar_updated_at BEFORE UPDATE ON academic_calendar
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_albums_updated_at BEFORE UPDATE ON gallery_albums
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, description, category) VALUES
('school_name', 'WISEDELL ACADEMY', 'School name displayed throughout the site', 'general'),
('admissions_status', 'open', 'Current admissions status: open or closed', 'admissions'),
('admission_deadline', '2026-12-31', 'Last date for admission applications', 'admissions'),
('current_academic_year', '2026', 'Current academic year', 'general'),
('meta_description', 'WISEDELL ACADEMY - Empowering Future Leaders Through Academic Excellence in Masvingo, Zimbabwe', 'Default meta description for SEO', 'seo'),
('meta_keywords', 'school, education, zimbabwe, masvingo, academy, secondary school, o-level, a-level', 'Default meta keywords for SEO', 'seo')
ON CONFLICT (setting_key) DO NOTHING;

-- Insert default contact information
INSERT INTO contact_info (phone, email, physical_address, city, country, office_hours) VALUES
('+263 77 802 2980', 'wisedellacademy@gmail.com', '3210 Jongwe Street, Pangolin', 'Masvingo', 'Zimbabwe', 'Monday - Friday: 7:30 AM - 4:30 PM')
ON CONFLICT DO NOTHING;

-- Insert default homepage content
INSERT INTO homepage_content (section, content) VALUES
('hero', '{"title": "Welcome to WISEDELL ACADEMY", "subtitle": "Empowering Future Leaders Through Academic Excellence", "motto": "With God We Work Hard and Shine", "cta_text": "Apply Now", "cta_link": "/admissions", "background_image": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920"}'),
('stats', '{"students": "200+", "subjects": "15+", "years": "10+"}'),
('about', '{"mission": "To provide quality education that nurtures academic excellence, character development, and spiritual growth.", "vision": "To be a leading educational institution in Zimbabwe, producing well-rounded individuals who contribute positively to society."}'),
('footer', '{"copyright_start_year": "2025"}')
ON CONFLICT (section) DO NOTHING;
