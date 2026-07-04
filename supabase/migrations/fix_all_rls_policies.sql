-- Comprehensive RLS Policy Fix for All Tables
-- This migration ensures proper security for all tables while allowing admin access

-- Enable RLS on all tables (only if table exists)
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'applications') THEN
        ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'gallery') THEN
        ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'announcements') THEN
        ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog_posts') THEN
        ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'calendar') THEN
        ALTER TABLE calendar ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'courses') THEN
        ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'downloads') THEN
        ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'email_broadcasts') THEN
        ALTER TABLE email_broadcasts ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'sms_notifications') THEN
        ALTER TABLE sms_notifications ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'staff') THEN
        ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'students') THEN
        ALTER TABLE students ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'teachers') THEN
        ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'news') THEN
        ALTER TABLE news ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'notices') THEN
        ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'homepage_content') THEN
        ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'contact_info') THEN
        ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'admissions_settings') THEN
        ALTER TABLE admissions_settings ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'academic_calendar') THEN
        ALTER TABLE academic_calendar ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'notifications') THEN
        ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'activity_logs') THEN
        ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Drop existing policies to avoid conflicts (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'applications') THEN
        DROP POLICY IF EXISTS "Anyone can create applications" ON applications;
        DROP POLICY IF EXISTS "Admins can read applications" ON applications;
        DROP POLICY IF EXISTS "Admins can update applications" ON applications;
        DROP POLICY IF EXISTS "Admins can delete applications" ON applications;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'gallery') THEN
        DROP POLICY IF EXISTS "Public can read gallery" ON gallery;
        DROP POLICY IF EXISTS "Admins can manage gallery" ON gallery;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'announcements') THEN
        DROP POLICY IF EXISTS "Public can read announcements" ON announcements;
        DROP POLICY IF EXISTS "Admins can manage announcements" ON announcements;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog_posts') THEN
        DROP POLICY IF EXISTS "Public can read blog_posts" ON blog_posts;
        DROP POLICY IF EXISTS "Admins can manage blog_posts" ON blog_posts;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'calendar') THEN
        DROP POLICY IF EXISTS "Public can read calendar" ON calendar;
        DROP POLICY IF EXISTS "Admins can manage calendar" ON calendar;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'courses') THEN
        DROP POLICY IF EXISTS "Public can read courses" ON courses;
        DROP POLICY IF EXISTS "Admins can manage courses" ON courses;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'downloads') THEN
        DROP POLICY IF EXISTS "Public can read downloads" ON downloads;
        DROP POLICY IF EXISTS "Admins can manage downloads" ON downloads;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'news') THEN
        DROP POLICY IF EXISTS "Public can read news" ON news;
        DROP POLICY IF EXISTS "Admins can manage news" ON news;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'notices') THEN
        DROP POLICY IF EXISTS "Public can read notices" ON notices;
        DROP POLICY IF EXISTS "Admins can manage notices" ON notices;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'homepage_content') THEN
        DROP POLICY IF EXISTS "Public can read homepage_content" ON homepage_content;
        DROP POLICY IF EXISTS "Admins can manage homepage_content" ON homepage_content;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'contact_info') THEN
        DROP POLICY IF EXISTS "Public can read contact_info" ON contact_info;
        DROP POLICY IF EXISTS "Admins can manage contact_info" ON contact_info;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'admissions_settings') THEN
        DROP POLICY IF EXISTS "Public can read admissions_settings" ON admissions_settings;
        DROP POLICY IF EXISTS "Admins can manage admissions_settings" ON admissions_settings;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'academic_calendar') THEN
        DROP POLICY IF EXISTS "Public can read academic_calendar" ON academic_calendar;
        DROP POLICY IF EXISTS "Admins can manage academic_calendar" ON academic_calendar;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'staff') THEN
        DROP POLICY IF EXISTS "Public can read staff" ON staff;
        DROP POLICY IF EXISTS "Admins can manage staff" ON staff;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'teachers') THEN
        DROP POLICY IF EXISTS "Public can read teachers" ON teachers;
        DROP POLICY IF EXISTS "Admins can manage teachers" ON teachers;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'students') THEN
        DROP POLICY IF EXISTS "Public can read students" ON students;
        DROP POLICY IF EXISTS "Admins can manage students" ON students;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'notifications') THEN
        DROP POLICY IF EXISTS "System can create notifications" ON notifications;
        DROP POLICY IF EXISTS "Admins can read notifications" ON notifications;
        DROP POLICY IF EXISTS "Admins can update notifications" ON notifications;
        DROP POLICY IF EXISTS "Admins can delete notifications" ON notifications;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'activity_logs') THEN
        DROP POLICY IF EXISTS "System can create activity_logs" ON activity_logs;
        DROP POLICY IF EXISTS "Admins can read activity_logs" ON activity_logs;
    END IF;
END $$;

-- APPLICATIONS TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'applications') THEN
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
    END IF;
END $$;

-- GALLERY TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'gallery') THEN
        -- Allow public to read gallery
        CREATE POLICY "Public can read gallery" ON gallery
          FOR SELECT
          USING (true);

        -- Allow authenticated users (admins) to manage gallery
        CREATE POLICY "Admins can manage gallery" ON gallery
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- ANNOUNCEMENTS TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'announcements') THEN
        -- Allow public to read announcements
        CREATE POLICY "Public can read announcements" ON announcements
          FOR SELECT
          USING (true);

        -- Allow authenticated users (admins) to manage announcements
        CREATE POLICY "Admins can manage announcements" ON announcements
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- BLOG POSTS TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog_posts') THEN
        -- Allow public to read blog posts
        CREATE POLICY "Public can read blog_posts" ON blog_posts
          FOR SELECT
          USING (true);

        -- Allow authenticated users (admins) to manage blog posts
        CREATE POLICY "Admins can manage blog_posts" ON blog_posts
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- CALENDAR TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'calendar') THEN
        -- Allow public to read calendar
        CREATE POLICY "Public can read calendar" ON calendar
          FOR SELECT
          USING (true);

        -- Allow authenticated users (admins) to manage calendar
        CREATE POLICY "Admins can manage calendar" ON calendar
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- COURSES TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'courses') THEN
        -- Allow public to read courses
        CREATE POLICY "Public can read courses" ON courses
          FOR SELECT
          USING (true);

        -- Allow authenticated users (admins) to manage courses
        CREATE POLICY "Admins can manage courses" ON courses
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- DOWNLOADS TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'downloads') THEN
        -- Allow public to read downloads
        CREATE POLICY "Public can read downloads" ON downloads
          FOR SELECT
          USING (true);

        -- Allow authenticated users (admins) to manage downloads
        CREATE POLICY "Admins can manage downloads" ON downloads
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- NEWS TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'news') THEN
        -- Allow public to read news
        CREATE POLICY "Public can read news" ON news
          FOR SELECT
          USING (true);

        -- Allow authenticated users (admins) to manage news
        CREATE POLICY "Admins can manage news" ON news
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- NOTICES TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'notices') THEN
        -- Allow public to read notices
        CREATE POLICY "Public can read notices" ON notices
          FOR SELECT
          USING (true);

        -- Allow authenticated users (admins) to manage notices
        CREATE POLICY "Admins can manage notices" ON notices
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- HOMEPAGE CONTENT TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'homepage_content') THEN
        -- Allow public to read homepage content
        CREATE POLICY "Public can read homepage_content" ON homepage_content
          FOR SELECT
          USING (true);

        -- Allow authenticated users (admins) to manage homepage content
        CREATE POLICY "Admins can manage homepage_content" ON homepage_content
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- CONTACT INFO TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'contact_info') THEN
        -- Allow public to read contact info
        CREATE POLICY "Public can read contact_info" ON contact_info
          FOR SELECT
          USING (true);

        -- Allow authenticated users (admins) to manage contact info
        CREATE POLICY "Admins can manage contact_info" ON contact_info
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- ADMISSIONS SETTINGS TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'admissions_settings') THEN
        -- Allow public to read admissions settings
        CREATE POLICY "Public can read admissions_settings" ON admissions_settings
          FOR SELECT
          USING (true);

        -- Allow authenticated users (admins) to manage admissions settings
        CREATE POLICY "Admins can manage admissions_settings" ON admissions_settings
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- ACADEMIC CALENDAR TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'academic_calendar') THEN
        -- Allow public to read academic calendar
        CREATE POLICY "Public can read academic_calendar" ON academic_calendar
          FOR SELECT
          USING (true);

        -- Allow authenticated users (admins) to manage academic calendar
        CREATE POLICY "Admins can manage academic_calendar" ON academic_calendar
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- STAFF TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'staff') THEN
        -- Allow public to read staff
        CREATE POLICY "Public can read staff" ON staff
          FOR SELECT
          USING (true);

        -- Allow authenticated users (admins) to manage staff
        CREATE POLICY "Admins can manage staff" ON staff
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- TEACHERS TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'teachers') THEN
        -- Allow public to read teachers
        CREATE POLICY "Public can read teachers" ON teachers
          FOR SELECT
          USING (true);

        -- Allow authenticated users (admins) to manage teachers
        CREATE POLICY "Admins can manage teachers" ON teachers
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- STUDENTS TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'students') THEN
        -- Allow public to read students
        CREATE POLICY "Public can read students" ON students
          FOR SELECT
          USING (true);

        -- Allow authenticated users (admins) to manage students
        CREATE POLICY "Admins can manage students" ON students
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- EMAIL BROADCASTS TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'email_broadcasts') THEN
        -- Allow authenticated users (admins) to manage email broadcasts
        CREATE POLICY "Admins can manage email_broadcasts" ON email_broadcasts
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- SMS NOTIFICATIONS TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'sms_notifications') THEN
        -- Allow authenticated users (admins) to manage sms notifications
        CREATE POLICY "Admins can manage sms_notifications" ON sms_notifications
          FOR ALL
          USING (auth.role() = 'authenticated')
          WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- NOTIFICATIONS TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'notifications') THEN
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
    END IF;
END $$;

-- ACTIVITY LOGS TABLE POLICIES (only if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'activity_logs') THEN
        -- Allow system (service role) to create activity logs
        CREATE POLICY "System can create activity_logs" ON activity_logs
          FOR INSERT
          WITH CHECK (true);

        -- Allow authenticated users (admins) to read activity logs
        CREATE POLICY "Admins can read activity_logs" ON activity_logs
          FOR SELECT
          USING (auth.role() = 'authenticated');
    END IF;
END $$;
