# Wisedell Academy - Complete School Management System Deployment Guide

## Overview
This guide provides step-by-step instructions to deploy the complete School Management System with full CRUD capabilities, real-time notifications, activity logging, and audit trails.

## Prerequisites
- Supabase project: https://supabase.com/dashboard/project/lcbnvkkdqjjhwhydxeyk
- Vercel project: https://vercel.com/thepiphuntersforexacademy-vercel/wisedellacademy
- Git repository with latest code

## Phase 1: Database Migration

### Step 1: Run Complete System Migration
1. Go to https://supabase.com/dashboard/project/lcbnvkkdqjjhwhydxeyk
2. Navigate to SQL Editor
3. Open file: `supabase/migrations/complete_system_migration.sql`
4. Copy and run the entire SQL script

**This creates:**
- `activity_logs` table - Tracks all system activities
- `audit_logs` table - Records all data changes with old/new values
- `notifications` table - Stores admin notifications
- `admissions_settings` table - Manages admissions configuration
- Performance indexes on all new tables
- RLS policies for security
- Default admissions settings

### Step 2: Create Storage Bucket
1. In Supabase SQL Editor
2. Open file: `supabase/migrations/create_storage_bucket.sql`
3. Copy and run the SQL script

**This creates:**
- `school-uploads` storage bucket for file uploads
- Public read access policy
- Authenticated upload/delete policies

## Phase 2: Environment Variables

### Update Vercel Environment Variables
Go to: https://vercel.com/thepiphuntersforexacademy-vercel/wisedellacademy/settings/environment-variables

**Required Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=https://lcbnvkkdqjjhwhydxeyk.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjYm52a2tkcWpqaHdoeWR4ZXlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjk4OTM1OSwiZXhwIjoyMDk4NTY1MzU5fQ.4F-9RQQ2j8UDohSAsFJu1YyYySJVjmLGRgJich_FG08
NEXTAUTH_SECRET=efDp1BY0dB9hWFBWbpaq2DnghPZyaWO3uE4vfwgWdz0=
NEXTAUTH_URL=https://wisedellacademy.vercel.app
NEXT_PUBLIC_SITE_URL=https://wisedellacademy.vercel.app
RESEND_API_KEY=your_resend_api_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

## Phase 3: Deploy to Vercel

### Option 1: Automatic Deployment
1. Push all changes to git repository
2. Vercel will automatically detect and deploy

### Option 2: Manual Deployment
1. Go to Vercel dashboard
2. Click "Deployments"
3. Click "Redeploy" next to latest deployment

## Phase 4: Testing Checklist

### Database Verification
- [ ] Check Supabase dashboard > Tables
- [ ] Verify `activity_logs` table exists
- [ ] Verify `audit_logs` table exists
- [ ] Verify `notifications` table exists
- [ ] Verify `admissions_settings` table exists
- [ ] Verify all indexes are created
- [ ] Verify RLS policies are applied

### Storage Verification
- [ ] Check Supabase dashboard > Storage
- [ ] Verify `school-uploads` bucket exists
- [ ] Verify bucket is public
- [ ] Verify policies are applied

### API Routes Testing
- [ ] Test GET /api/teachers
- [ ] Test POST /api/teachers
- [ ] Test PUT /api/teachers
- [ ] Test DELETE /api/teachers
- [ ] Test GET /api/students
- [ ] Test POST /api/students
- [ ] Test PUT /api/students
- [ ] Test DELETE /api/students
- [ ] Test GET /api/news
- [ ] Test POST /api/news
- [ ] Test PUT /api/news
- [ ] Test DELETE /api/news
- [ ] Test GET /api/gallery
- [ ] Test POST /api/gallery
- [ ] Test PUT /api/gallery
- [ ] Test DELETE /api/gallery
- [ ] Test GET /api/events
- [ ] Test POST /api/events
- [ ] Test PUT /api/events
- [ ] Test DELETE /api/events
- [ ] Test GET /api/admin/notifications
- [ ] Test POST /api/admin/notifications
- [ ] Test PUT /api/admin/notifications
- [ ] Test GET /api/admin/activity-logs
- [ ] Test GET /api/admin/audit-logs
- [ ] Test GET /api/admin/admissions-settings
- [ ] Test POST /api/admin/admissions-settings
- [ ] Test PUT /api/admin/admissions-settings
- [ ] Test POST /api/admin/upload
- [ ] Test GET /api/admin/search

### Application Flow Testing
- [ ] Submit application form
- [ ] Verify application appears in database
- [ ] Verify status = "pending"
- [ ] Verify notification created
- [ ] Verify activity log created
- [ ] Verify confirmation email sent
- [ ] Check admin dashboard for new application
- [ ] Verify dashboard stats updated
- [ ] Test approve application
- [ ] Verify status changed to "approved"
- [ ] Verify approval email sent
- [ ] Test reject application
- [ ] Verify status changed to "rejected"
- [ ] Verify rejection email sent

### File Upload Testing
- [ ] Upload teacher photo
- [ ] Upload gallery image
- [ ] Upload news image
- [ ] Upload event poster
- [ ] Verify files appear in Supabase Storage
- [ ] Verify public URLs work

### Search Testing
- [ ] Test global search for students
- [ ] Test global search for teachers
- [ ] Test global search for applications
- [ ] Test global search for news
- [ ] Test global search for events
- [ ] Test global search for gallery

### Notification Testing
- [ ] Verify unread count displays
- [ ] Verify notifications appear
- [ ] Test mark as read
- [ ] Test mark all as read

### Activity Log Testing
- [ ] Verify activities are logged
- [ ] Verify activity timeline displays
- [ ] Test filtering by entity type
- [ ] Test filtering by action

### Audit Log Testing
- [ ] Verify data changes are logged
- [ ] Verify old/new values captured
- [ ] Test filtering by table name
- [ ] Test filtering by action

## Phase 5: Post-Deployment Configuration

### Re-enable reCAPTCHA
Currently disabled in `src/app/api/applications/route.ts` (lines 79-97)
1. Uncomment reCAPTCHA validation code
2. Update frontend to use actual reCAPTCHA token
3. Test reCAPTCHA integration

### Set Up Admin Authentication
Currently using basic NextAuth setup
1. Configure proper admin user roles
2. Set up admin user in Supabase Auth
3. Test admin login flow

### Configure Email Templates
Email templates are implemented but may need customization
1. Review confirmation email template
2. Review approval email template
3. Review rejection email template
4. Customize branding as needed

## Troubleshooting

### Issue: Database migration fails
**Solution:** Check for existing tables with same names, drop them if needed, then re-run migration

### Issue: Storage bucket creation fails
**Solution:** Ensure you have admin privileges in Supabase, check bucket name doesn't conflict

### Issue: API routes return 403/401 errors
**Solution:** Verify RLS policies are correctly applied, check service role key is correct

### Issue: File uploads fail
**Solution:** Verify storage bucket exists, check file size limits (5MB), verify allowed file types

### Issue: Notifications not appearing
**Solution:** Check notifications table has data, verify user_id is set correctly, check RLS policies

### Issue: Activity logs not recording
**Solution:** Check activity_logs table exists, verify API routes are calling insert, check for errors

## API Endpoints Reference

### Teachers
- GET /api/teachers - List all teachers
- POST /api/teachers - Create teacher
- PUT /api/teachers - Update teacher
- DELETE /api/teachers?id={id} - Delete teacher

### Students
- GET /api/students - List students (with filters)
- POST /api/students - Create student
- PUT /api/students - Update student
- DELETE /api/students?id={id} - Delete student

### News
- GET /api/news?published=true - List news
- POST /api/news - Create news
- PUT /api/news - Update news
- DELETE /api/news?id={id} - Delete news

### Gallery
- GET /api/gallery - List gallery items
- POST /api/gallery - Upload image
- PUT /api/gallery - Update image
- DELETE /api/gallery?id={id} - Delete image

### Events
- GET /api/events?published=true - List events
- POST /api/events - Create event
- PUT /api/events - Update event
- DELETE /api/events?id={id} - Delete event

### Notifications
- GET /api/admin/notifications?user_id={id} - Get notifications
- GET /api/admin/notifications?unread_only=true - Get unread
- POST /api/admin/notifications - Create notification
- PUT /api/admin/notifications - Update notification
- PATCH /api/admin/notifications - Mark all read

### Activity Logs
- GET /api/admin/activity-logs - Get activity logs
- GET /api/admin/activity-logs?entity_type={type} - Filter by type
- GET /api/admin/activity-logs?action={action} - Filter by action

### Audit Logs
- GET /api/admin/audit-logs - Get audit logs
- GET /api/admin/audit-logs?table_name={table} - Filter by table
- GET /api/admin/audit-logs?action={action} - Filter by action

### Admissions Settings
- GET /api/admin/admissions-settings - Get settings
- POST /api/admin/admissions-settings - Create settings
- PUT /api/admin/admissions-settings - Update settings

### File Upload
- POST /api/admin/upload - Upload file (multipart/form-data)
  - file: File to upload
  - folder: Folder name (optional, default: uploads)

### Search
- GET /api/admin/search?q={query} - Global search
- GET /api/admin/search?q={query}&type={type} - Search specific type

## Security Considerations

### RLS Policies
All tables have RLS enabled with appropriate policies:
- Public read access for public content (teachers, news, events, gallery)
- Authenticated access for admin operations
- User-specific access for notifications

### Service Role Key
The service role key is used for server-side operations only:
- Never expose in client-side code
- Use only in API routes
- Rotate regularly

### File Upload Security
- File size limit: 5MB
- Allowed types: images (JPEG, PNG, GIF, WebP) and PDF
- Unique filenames to prevent conflicts
- Folder organization for different content types

## Performance Optimization

### Database Indexes
Indexes created on:
- activity_logs: created_at, entity_type+entity_id
- audit_logs: created_at, table_name+record_id
- notifications: user_id, is_read, created_at
- applications: application_number, grade_applying, submitted_at
- students: status, grade_level
- teachers: status
- news: published, published_at
- events: event_date
- gallery: category
- messages: status

### Caching Strategy
- API routes use server-side rendering
- Static content cached via Next.js
- Database queries optimized with indexes
- Consider implementing Redis for session caching

## Monitoring and Maintenance

### Regular Tasks
- Review audit logs weekly
- Check notification queue
- Monitor storage usage
- Review failed email deliveries
- Check for slow queries
- Review error logs

### Backup Strategy
- Supabase automatic daily backups
- Point-in-time recovery enabled
- Consider additional off-site backups
- Test restoration process monthly

## Next Steps

After successful deployment and testing:

1. **UI Implementation** - Build admin management interfaces
2. **Real-time Updates** - Implement Supabase Realtime
3. **Advanced Features** - Add export to PDF/Excel
4. **Authentication** - Implement proper admin roles
5. **Monitoring** - Set up error tracking (Sentry)
6. **Testing** - Add automated tests
7. **Documentation** - Create user manuals

## Support

For issues or questions:
- Check Supabase dashboard for database issues
- Check Vercel logs for deployment issues
- Review browser console for client errors
- Check API route logs for server errors

## Success Criteria

The system is successfully deployed when:
- ✅ All database tables created with indexes
- ✅ All RLS policies applied
- ✅ Storage bucket created and accessible
- ✅ All API routes functional
- ✅ Application submission works end-to-end
- ✅ Notifications appear in dashboard
- ✅ Activity logs recording correctly
- ✅ Audit logs capturing changes
- ✅ File uploads working
- ✅ Search functionality working
- ✅ Dashboard showing real data
- ✅ No console errors
- ✅ No network errors
