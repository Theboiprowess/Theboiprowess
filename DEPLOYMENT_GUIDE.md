# Wisedell Academy - Complete System Deployment Guide

## Overview
This guide provides step-by-step instructions for deploying the complete Wisedell Academy School Management System with all new features including real-time dashboard, CRUD interfaces, notifications, and activity logging.

## Prerequisites
- Supabase project access (https://supabase.com/dashboard/project/lcbnvkkdqjjhwhydxeyk)
- Vercel account access
- Git repository access

## Step 1: Apply Database Migrations

### Migration 1: Add Missing System Tables
Run this SQL in Supabase SQL Editor to add notifications, audit_logs, and update existing tables:

```sql
-- File: supabase/migrations/add_missing_system_tables.sql

-- NOTIFICATIONS TABLE (for admin dashboard)
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_entity ON notifications(entity_type, entity_id);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can create notifications" ON notifications FOR INSERT WITH CHECK (true);

-- GENERAL AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100) NOT NULL,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table ON audit_logs(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_logs_record ON audit_logs(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read audit logs" ON audit_logs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "System can create audit logs" ON audit_logs FOR INSERT WITH CHECK (true);

-- UPDATE TEACHERS TABLE
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS department VARCHAR(100);
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS subject_specialization VARCHAR(100);

-- UPDATE STUDENTS TABLE
ALTER TABLE students ADD COLUMN IF NOT EXISTS student_id VARCHAR(20) UNIQUE;
ALTER TABLE students ADD COLUMN IF NOT EXISTS class VARCHAR(50);
ALTER TABLE students ADD COLUMN IF NOT EXISTS photo_url VARCHAR(500);
ALTER TABLE students ADD COLUMN IF NOT EXISTS medical_info TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS dietary_requirements TEXT;

-- CREATE FUNCTION TO GENERATE STUDENT ID
CREATE OR REPLACE FUNCTION generate_student_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.student_id IS NULL THEN
    NEW.student_id := 'STU-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(nextval('student_id_seq')::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS student_id_seq START 1;

DROP TRIGGER IF EXISTS generate_student_id_trigger ON students;
CREATE TRIGGER generate_student_id_trigger
  BEFORE INSERT ON students
  FOR EACH ROW
  EXECUTE FUNCTION generate_student_id();
```

### Migration 2: Ensure SELECT Policy for Applications
If not already applied, run this to fix admin dashboard visibility:

```sql
DROP POLICY IF EXISTS "Admins can read applications" ON applications;
CREATE POLICY "Admins can read applications" ON applications FOR SELECT USING (auth.role() = 'authenticated');
```

## Step 2: Verify Environment Variables in Vercel

Go to https://vercel.com/thepiphuntersforexacademy-vercel/wisedellacademy/settings/environment-variables

Ensure these are set:

### Required for Database Connection
- `NEXT_PUBLIC_SUPABASE_URL` = `https://lcbnvkkdqjjhwhydxeyk.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjYm52a2tkcWpqaHdoeWR4ZXlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjk4OTM1OSwiZXhwIjoyMDk4NTY1MzU5fQ.4F-9RQQ2j8UDohSAsFJu1YyYySJVjmLGRgJich_FG08`

### Required for Authentication
- `NEXTAUTH_SECRET` = `efDp1BY0dB9hWFBWbpaq2DnghPZyaWO3uE4vfwgWdz0=`
- `NEXTAUTH_URL` = `https://wisedellacademy.vercel.app`

### Required for Email
- `RESEND_API_KEY` = (your existing Resend API key)

### Required for reCAPTCHA
- `RECAPTCHA_SECRET_KEY` = (your existing reCAPTCHA secret key)
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` = (your existing reCAPTCHA site key)

### Required for Site Configuration
- `NEXT_PUBLIC_SITE_URL` = `https://wisedellacademy.vercel.app`

## Step 3: Deploy to Vercel

1. Push all changes to your git repository
2. Vercel will automatically deploy
3. Or manually trigger deployment from Vercel dashboard

## Step 4: Testing Checklist

### Dashboard Testing
- [ ] Login to admin dashboard
- [ ] Verify real-time stats (Students, Teachers, Applications, etc.)
- [ ] Verify stats refresh every 30 seconds
- [ ] Check recent applications display
- [ ] Check recent activity timeline
- [ ] Verify admission rate calculation

### Teacher Management Testing
- [ ] Navigate to /admin/teachers
- [ ] Add a new teacher
- [ ] Edit existing teacher
- [ ] Activate/deactivate teacher
- [ ] Delete teacher
- [ ] Search teachers
- [ ] Verify teacher appears on public website

### Student Management Testing
- [ ] Navigate to /admin/students
- [ ] Add a new student
- [ ] Edit existing student
- [ ] Activate/deactivate student
- [ ] Delete student
- [ ] Search students
- [ ] Verify student ID auto-generation

### Application Flow Testing
- [ ] Submit new application via public form
- [ ] Verify application appears in admin dashboard
- [ ] Verify confirmation email sent to applicant
- [ ] Verify notification created in database
- [ ] Verify activity log created
- [ ] Check application detail page
- [ ] Approve application
- [ ] Reject application
- [ ] Verify status update emails sent

### Notifications Testing
- [ ] Check notifications table after application submission
- [ ] Verify notification is marked as unread
- [ ] Mark notification as read
- [ ] Verify notification count updates

## Step 5: Troubleshooting

### Dashboard Not Showing Real Data
- Verify RLS policies are applied
- Check service role key is correct
- Verify analytics API is returning data
- Check browser console for errors

### Applications Not Appearing
- Run the SELECT policy migration
- Verify application was inserted successfully
- Check Supabase logs for errors

### Email Not Sending
- Verify RESEND_API_KEY is set
- Check Resend dashboard for API usage
- Verify email addresses are valid
- Check server logs for email errors

### Teacher/Student CRUD Not Working
- Verify service role key has proper permissions
- Check RLS policies for teachers/students tables
- Verify table columns exist (run migration)
- Check browser console for errors

## Files Modified

### Database
- `supabase/migrations/add_missing_system_tables.sql` (NEW)
- `supabase/schema.sql` (updated)

### Frontend
- `src/components/admin/DashboardOverview.tsx` (real-time stats, recent apps, activity)
- `src/app/admin/teachers/page.tsx` (full CRUD interface)
- `src/app/admin/students/page.tsx` (NEW - full CRUD interface)
- `src/app/admin/applications/page.tsx` (real data display)

### API
- `src/app/api/analytics/route.ts` (comprehensive real-time data)
- `src/app/api/applications/route.ts` (notifications, activity logs)

## Next Steps

After successful deployment and testing:

1. **Enable Supabase Realtime** - Enable realtime for tables to get instant updates
2. **Add More CRUD Interfaces** - News, Events, Gallery management
3. **Implement File Upload** - Teacher photos, student photos, gallery images
4. **Add Export Features** - PDF/Excel export for applications
5. **Implement Search** - Global search across all entities
6. **Add Rate Limiting** - Protect API routes from abuse
7. **Add CSRF Protection** - Secure form submissions
8. **Implement Caching** - Improve dashboard performance

## Support

For issues or questions:
- Check Supabase logs: https://supabase.com/dashboard/project/lcbnvkkdqjjhwhydxeyk/logs
- Check Vercel logs: https://vercel.com/thepiphuntersforexacademy-vercel/wisedellacademy/logs
- Review browser console for client-side errors
