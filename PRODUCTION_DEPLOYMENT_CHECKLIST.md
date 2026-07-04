# Wisedell Academy - Production Deployment Checklist

## Overview
This checklist guides you through the final production deployment steps. Some steps require manual execution as they involve external services (Supabase, Vercel).

---

## Step 1: Apply Database Migration to Supabase

**Action Required:** Manual execution in Supabase SQL Editor

1. Go to https://supabase.com/dashboard/project/lcbnvkkdqjjhwhydxeyk/sql/new
2. Copy the contents of `supabase/migrations/add_missing_system_tables.sql`
3. Paste into the SQL Editor
4. Click "Run" to execute the migration
5. Verify success by checking:
   - `notifications` table exists
   - `audit_logs` table exists
   - `students` table has new columns (student_id, class, photo_url, etc.)
   - `teachers` table has new columns (department, subject_specialization)
   - Indexes are created
   - RLS policies are applied

**Migration File Location:** `supabase/migrations/add_missing_system_tables.sql`

---

## Step 2: Verify Vercel Environment Variables

**Action Required:** Manual verification in Vercel Dashboard

1. Go to https://vercel.com/thepiphuntersforexacademy-vercel/wisedellacademy/settings/environment-variables
2. Verify the following variables are set correctly:

### Required Variables
- ✅ `NEXT_PUBLIC_SUPABASE_URL` = `https://lcbnvkkdqjjhwhydxeyk.supabase.co`
- ✅ `SUPABASE_SERVICE_ROLE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjYm52a2tkcWpqaHdoeWR4ZXlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjk4OTM1OSwiZXhwIjoyMDk4NTY1MzU5fQ.4F-9RQQ2j8UDohSAsFJu1YyYySJVjmLGRgJich_FG08`
- ✅ `NEXTAUTH_SECRET` = `efDp1BY0dB9hWFBWbpaq2DnghPZyaWO3uE4vfwgWdz0=`
- ✅ `NEXTAUTH_URL` = `https://wisedellacademy.vercel.app`
- ✅ `RESEND_API_KEY` = (your existing Resend API key)
- ✅ `RECAPTCHA_SECRET_KEY` = (your existing reCAPTCHA secret key)
- ✅ `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` = (your existing reCAPTCHA site key)
- ✅ `NEXT_PUBLIC_SITE_URL` = `https://wisedellacademy.vercel.app`

3. If any variables are missing, add them
4. If any variables are incorrect, update them
5. Click "Save" after making changes

---

## Step 3: Deploy to Vercel

**Action Required:** Push code to trigger deployment

1. Commit all changes to git:
   ```bash
   git add .
   git commit -m "Complete school management system with PDF/Excel export"
   git push
   ```

2. Vercel will automatically deploy
3. Monitor deployment at: https://vercel.com/thepiphuntersforexacademy-vercel/wisedellacademy/deployments
4. Wait for deployment to complete successfully
5. Verify no build errors

---

## Step 4: Production Testing

### 4.1 Authentication Testing
- [ ] Navigate to https://wisedellacademy.vercel.app/admin
- [ ] Login with admin credentials
- [ ] Verify session persists
- [ ] Logout
- [ ] Login again to verify session management

### 4.2 Online Applications Testing
- [ ] Navigate to https://wisedellacademy.vercel.app/admissions
- [ ] Fill out application form completely
- [ ] Submit application
- [ ] Verify success message appears
- [ ] Check email inbox for confirmation email
- [ ] Navigate to admin dashboard
- [ ] Verify application appears in "Recent Applications"
- [ ] Verify "Pending Applications" counter increased
- [ ] Verify application appears in "Recent Activity"

### 4.3 Email Testing
- [ ] Verify confirmation email received with:
  - [ ] Academy branding
  - [ ] Applicant name
  - [ ] Application number
  - [ ] Date submitted
  - [ ] Status: Pending Review
  - [ ] Contact information
- [ ] Check Resend dashboard for delivery status
- [ ] Verify no email errors in Vercel logs

### 4.4 Dashboard Testing
- [ ] Navigate to admin dashboard
- [ ] Verify all statistics display real data:
  - [ ] Total Students (shows 0 if none)
  - [ ] Teachers (shows 0 if none)
  - [ ] Pending Applications
  - [ ] Approved Applications
  - [ ] Rejected Applications
  - [ ] News Articles
  - [ ] Upcoming Events
  - [ ] Gallery Images
- [ ] Verify no hardcoded values
- [ ] Wait 30 seconds and verify stats refresh
- [ ] Verify "Recent Applications" section updates
- [ ] Verify "Recent Activity" section updates

### 4.5 Teacher CRUD Testing
- [ ] Navigate to /admin/teachers
- [ ] Click "Add Teacher"
- [ ] Fill in all required fields
- [ ] Submit form
- [ ] Verify teacher appears in list
- [ ] Click "Edit" on teacher
- [ ] Modify information
- [ ] Save changes
- [ ] Verify changes reflected
- [ ] Click "Deactivate" button
- [ ] Verify status changes to inactive
- [ ] Click "Activate" button
- [ ] Verify status changes to active
- [ ] Click "Delete" button
- [ ] Confirm deletion
- [ ] Verify teacher removed from list
- [ ] Test search functionality

### 4.6 Student CRUD Testing
- [ ] Navigate to /admin/students
- [ ] Click "Add Student"
- [ ] Fill in all required fields
- [ ] Submit form
- [ ] Verify student appears in table
- [ ] Verify student ID auto-generated (STU-YYYY-XXXX format)
- [ ] Click "Edit" on student
- [ ] Modify information
- [ ] Save changes
- [ ] Verify changes reflected
- [ ] Click "Deactivate" button
- [ ] Verify status changes to inactive
- [ ] Click "Activate" button
- [ ] Verify status changes to active
- [ ] Click "Delete" button
- [ ] Confirm deletion
- [ ] Verify student removed from table
- [ ] Test search functionality

### 4.7 Applications Export Testing
- [ ] Navigate to /admin/applications
- [ ] Click "Export PDF" button
- [ ] Verify PDF downloads with:
  - [ ] Wisedell Academy header
  - [ ] Generation date
  - [ ] Statistics summary
  - [ ] Application table with all fields
  - [ ] Page numbers
  - [ ] Professional formatting
- [ ] Click "Export Excel" button
- [ ] Verify Excel file downloads with:
  - [ ] All application fields
  - [ ] Column headers
  - [ ] Proper formatting
- [ ] Test status filter (Pending, Approved, Rejected)
- [ ] Test search functionality
- [ ] Export filtered results to verify filters work

### 4.8 Notifications & Logs Testing
- [ ] Submit a new application
- [ ] Check `notifications` table in Supabase
- [ ] Verify notification created with:
  - [ ] type: "application_received"
  - [ ] title: "New Application Received"
  - [ ] message with applicant name
  - [ ] entity_type: "application"
  - [ ] entity_id: application ID
  - [ ] is_read: false
- [ ] Check `activity_logs` table in Supabase
- [ ] Verify activity log created with:
  - [ ] action: "application_submitted"
  - [ ] entity_type: "application"
  - [ ] entity_id: application ID
  - [ ] details with application info

---

## Step 5: Final Validation

### Code Quality
- [ ] No TypeScript errors in build
- [ ] No ESLint errors in build
- [ ] No hydration errors in browser console
- [ ] No runtime errors in browser console
- [ ] No network errors in browser console

### Database
- [ ] All migrations applied successfully
- [ ] All tables accessible
- [ ] RLS policies working
- [ ] No database errors in logs

### Functionality
- [ ] Dashboard displays only live data (no hardcoded values)
- [ ] Empty sections show appropriate empty states
- [ ] All CRUD operations work through Admin Dashboard
- [ ] Applications appear instantly after submission
- [ ] Confirmation emails delivered successfully
- [ ] PDF exports work correctly
- [ ] Excel exports work correctly
- [ ] Production build succeeds

---

## Step 6: Post-Deployment Monitoring

### Monitor for 24 Hours
- [ ] Check Vercel logs for errors
- [ ] Check Supabase logs for errors
- [ ] Monitor application submissions
- [ ] Verify email delivery rates
- [ ] Check dashboard performance

### Performance Checks
- [ ] Dashboard loads within 3 seconds
- [ ] API responses under 500ms
- [ ] No memory leaks
- [ ] No database connection issues

---

## Troubleshooting Guide

### Dashboard Shows No Data
**Cause:** Migration not applied or RLS policies blocking access  
**Solution:** Run migration in Supabase SQL Editor, verify RLS policies

### Applications Not Appearing
**Cause:** SELECT policy missing on applications table  
**Solution:** Run this SQL in Supabase:
```sql
DROP POLICY IF EXISTS "Admins can read applications" ON applications;
CREATE POLICY "Admins can read applications" ON applications FOR SELECT USING (auth.role() = 'authenticated');
```

### Export Buttons Not Working
**Cause:** jsPDF or xlsx libraries not installed  
**Solution:** Run `npm install jspdf jspdf-autotable xlsx` and redeploy

### Email Not Sending
**Cause:** RESEND_API_KEY missing or invalid  
**Solution:** Verify environment variable in Vercel, check Resend dashboard

### Build Errors
**Cause:** TypeScript errors or missing dependencies  
**Solution:** Run `npm run build` locally to identify errors, fix, then deploy

---

## Files Modified in This Deployment

### New Files Created
- `supabase/migrations/add_missing_system_tables.sql` - Database migration
- `src/app/admin/students/page.tsx` - Student CRUD interface
- `DEPLOYMENT_GUIDE.md` - Deployment instructions
- `FINAL_SYSTEM_REPORT.md` - Implementation report
- `PRODUCTION_DEPLOYMENT_CHECKLIST.md` - This file

### Modified Files
- `src/components/admin/DashboardOverview.tsx` - Real-time dashboard
- `src/app/admin/teachers/page.tsx` - Teacher CRUD interface
- `src/app/admin/applications/page.tsx` - Added PDF/Excel export
- `src/app/api/analytics/route.ts` - Comprehensive analytics
- `src/app/api/applications/route.ts` - Notifications and activity logs

### Dependencies Added
- `jspdf` - PDF generation
- `jspdf-autotable` - PDF table formatting
- `xlsx` - Excel export

---

## Contact & Support

- **Supabase Dashboard:** https://supabase.com/dashboard/project/lcbnvkkdqjjhwhydxeyk
- **Vercel Dashboard:** https://vercel.com/thepiphuntersforexacademy-vercel/wisedellacademy
- **Production URL:** https://wisedellacademy.vercel.app
- **Admin URL:** https://wisedellacademy.vercel.app/admin

---

## Next Steps After Successful Deployment

1. **Enable Supabase Realtime** for instant dashboard updates
2. **Create News Management** CRUD interface
3. **Create Events Management** CRUD interface  
4. **Create Gallery Management** with image upload
5. **Implement file upload** for teacher/student photos
6. **Add rate limiting** to API routes
7. **Add CSRF protection** for forms
8. **Implement global search** across all entities

---

**Checklist Status:** Ready for Execution  
**Last Updated:** July 4, 2026  
**Version:** 1.0
