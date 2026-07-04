-- Comprehensive RLS Policy Fix for All Tables
-- This migration ensures proper security for all tables while allowing admin access

-- Enable RLS on all tables
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_broadcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can create applications" ON applications;
DROP POLICY IF EXISTS "Admins can read applications" ON applications;
DROP POLICY IF EXISTS "Admins can update applications" ON applications;
DROP POLICY IF EXISTS "Admins can delete applications" ON applications;

DROP POLICY IF EXISTS "Public can read gallery" ON gallery;
DROP POLICY IF EXISTS "Admins can manage gallery" ON gallery;

DROP POLICY IF EXISTS "Public can read announcements" ON announcements;
DROP POLICY IF EXISTS "Admins can manage announcements" ON announcements;

DROP POLICY IF EXISTS "Public can read blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can manage blog_posts" ON blog_posts;

DROP POLICY IF EXISTS "Public can read calendar_events" ON calendar_events;
DROP POLICY IF EXISTS "Admins can manage calendar_events" ON calendar_events;

DROP POLICY IF EXISTS "Public can read courses" ON courses;
DROP POLICY IF EXISTS "Admins can manage courses" ON courses;

DROP POLICY IF EXISTS "Public can read downloads" ON downloads;
DROP POLICY IF EXISTS "Admins can manage downloads" ON downloads;

DROP POLICY IF EXISTS "Public can read news" ON news;
DROP POLICY IF EXISTS "Admins can manage news" ON news;

DROP POLICY IF EXISTS "Public can read notices" ON notices;
DROP POLICY IF EXISTS "Admins can manage notices" ON notices;

DROP POLICY IF EXISTS "Public can read homepage_content" ON homepage_content;
DROP POLICY IF EXISTS "Admins can manage homepage_content" ON homepage_content;

DROP POLICY IF EXISTS "Public can read contact_info" ON contact_info;
DROP POLICY IF EXISTS "Admins can manage contact_info" ON contact_info;

DROP POLICY IF EXISTS "Public can read admissions_settings" ON admissions_settings;
DROP POLICY IF EXISTS "Admins can manage admissions_settings" ON admissions_settings;

DROP POLICY IF EXISTS "Public can read academic_calendar" ON academic_calendar;
DROP POLICY IF EXISTS "Admins can manage academic_calendar" ON academic_calendar;

DROP POLICY IF EXISTS "Public can read staff" ON staff;
DROP POLICY IF EXISTS "Admins can manage staff" ON staff;

DROP POLICY IF EXISTS "Public can read teachers" ON teachers;
DROP POLICY IF EXISTS "Admins can manage teachers" ON teachers;

DROP POLICY IF EXISTS "Public can read students" ON students;
DROP POLICY IF EXISTS "Admins can manage students" ON students;

DROP POLICY IF EXISTS "System can create notifications" ON notifications;
DROP POLICY IF EXISTS "Admins can read notifications" ON notifications;
DROP POLICY IF EXISTS "Admins can update notifications" ON notifications;
DROP POLICY IF EXISTS "Admins can delete notifications" ON notifications;

DROP POLICY IF EXISTS "System can create activity_logs" ON activity_logs;
DROP POLICY IF EXISTS "Admins can read activity_logs" ON activity_logs;

-- APPLICATIONS TABLE POLICIES
-- Allow anyone to create applications (for form submissions)
CREATE POLICY "Anyone can create applications" ON applications
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users (admins) to read applications
CREATE POLICY "Admins can read applications" ON applications
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow authenticated users (admins) to update applications
CREATE POLICY "Admins can update applications" ON applications
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users (admins) to delete applications
CREATE POLICY "Admins can delete applications" ON applications
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- GALLERY TABLE POLICIES
-- Allow public to read gallery
CREATE POLICY "Public can read gallery" ON gallery
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to manage gallery
CREATE POLICY "Admins can manage gallery" ON gallery
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ANNOUNCEMENTS TABLE POLICIES
-- Allow public to read announcements
CREATE POLICY "Public can read announcements" ON announcements
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to manage announcements
CREATE POLICY "Admins can manage announcements" ON announcements
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- BLOG POSTS TABLE POLICIES
-- Allow public to read blog posts
CREATE POLICY "Public can read blog_posts" ON blog_posts
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to manage blog posts
CREATE POLICY "Admins can manage blog_posts" ON blog_posts
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- CALENDAR EVENTS TABLE POLICIES
-- Allow public to read calendar events
CREATE POLICY "Public can read calendar_events" ON calendar_events
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to manage calendar events
CREATE POLICY "Admins can manage calendar_events" ON calendar_events
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- COURSES TABLE POLICIES
-- Allow public to read courses
CREATE POLICY "Public can read courses" ON courses
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to manage courses
CREATE POLICY "Admins can manage courses" ON courses
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- DOWNLOADS TABLE POLICIES
-- Allow public to read downloads
CREATE POLICY "Public can read downloads" ON downloads
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to manage downloads
CREATE POLICY "Admins can manage downloads" ON downloads
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- NEWS TABLE POLICIES
-- Allow public to read news
CREATE POLICY "Public can read news" ON news
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to manage news
CREATE POLICY "Admins can manage news" ON news
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- NOTICES TABLE POLICIES
-- Allow public to read notices
CREATE POLICY "Public can read notices" ON notices
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to manage notices
CREATE POLICY "Admins can manage notices" ON notices
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- HOMEPAGE CONTENT TABLE POLICIES
-- Allow public to read homepage content
CREATE POLICY "Public can read homepage_content" ON homepage_content
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to manage homepage content
CREATE POLICY "Admins can manage homepage_content" ON homepage_content
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- CONTACT INFO TABLE POLICIES
-- Allow public to read contact info
CREATE POLICY "Public can read contact_info" ON contact_info
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to manage contact info
CREATE POLICY "Admins can manage contact_info" ON contact_info
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ADMISSIONS SETTINGS TABLE POLICIES
-- Allow public to read admissions settings
CREATE POLICY "Public can read admissions_settings" ON admissions_settings
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to manage admissions settings
CREATE POLICY "Admins can manage admissions_settings" ON admissions_settings
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ACADEMIC CALENDAR TABLE POLICIES
-- Allow public to read academic calendar
CREATE POLICY "Public can read academic_calendar" ON academic_calendar
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to manage academic calendar
CREATE POLICY "Admins can manage academic_calendar" ON academic_calendar
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- STAFF TABLE POLICIES
-- Allow public to read staff
CREATE POLICY "Public can read staff" ON staff
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to manage staff
CREATE POLICY "Admins can manage staff" ON staff
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- TEACHERS TABLE POLICIES
-- Allow public to read teachers
CREATE POLICY "Public can read teachers" ON teachers
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to manage teachers
CREATE POLICY "Admins can manage teachers" ON teachers
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- STUDENTS TABLE POLICIES
-- Allow public to read students
CREATE POLICY "Public can read students" ON students
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to manage students
CREATE POLICY "Admins can manage students" ON students
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- EMAIL BROADCASTS TABLE POLICIES
-- Allow authenticated users (admins) to manage email broadcasts
CREATE POLICY "Admins can manage email_broadcasts" ON email_broadcasts
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- SMS NOTIFICATIONS TABLE POLICIES
-- Allow authenticated users (admins) to manage sms notifications
CREATE POLICY "Admins can manage sms_notifications" ON sms_notifications
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- NOTIFICATIONS TABLE POLICIES
-- Allow system (service role) to create notifications
CREATE POLICY "System can create notifications" ON notifications
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users (admins) to read notifications
CREATE POLICY "Admins can read notifications" ON notifications
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow authenticated users (admins) to update notifications
CREATE POLICY "Admins can update notifications" ON notifications
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users (admins) to delete notifications
CREATE POLICY "Admins can delete notifications" ON notifications
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ACTIVITY LOGS TABLE POLICIES
-- Allow system (service role) to create activity logs
CREATE POLICY "System can create activity_logs" ON activity_logs
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users (admins) to read activity logs
CREATE POLICY "Admins can read activity_logs" ON activity_logs
  FOR SELECT
  USING (auth.role() = 'authenticated');
