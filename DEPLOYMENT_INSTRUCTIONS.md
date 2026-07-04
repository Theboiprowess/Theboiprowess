# Deployment Instructions - Wisedell Academy Admissions System Fix

## Critical Database Changes Required

### Step 1: Apply RLS Policy Migration

You MUST apply the RLS policy change to your Supabase database before the system will work.

1. Go to your Supabase project: https://supabase.com/dashboard/project/lcbnvkkdqjjhwhydxeyk
2. Navigate to SQL Editor
3. Run the following SQL:

```sql
-- Add SELECT RLS policy for applications table
DROP POLICY IF EXISTS "Admins can read applications" ON applications;
CREATE POLICY "Admins can read applications" ON applications FOR SELECT USING (auth.role() = 'authenticated');
```

Or run the migration file:
```sql
-- File: supabase/migrations/add_applications_select_policy.sql
DROP POLICY IF EXISTS "Admins can read applications" ON applications;
CREATE POLICY "Admins can read applications" ON applications FOR SELECT USING (auth.role() = 'authenticated');
```

### Step 2: Update Vercel Environment Variables

Go to https://vercel.com/thepiphuntersforexacademy-vercel/wisedellacademy/settings/environment-variables

Update the following variables:

1. **NEXT_PUBLIC_SUPABASE_URL** = `https://lcbnvkkdqjjhwhydxeyk.supabase.co`
2. **SUPABASE_SERVICE_ROLE_KEY** = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjYm52a2tkcWpqaHdoeWR4ZXlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjk4OTM1OSwiZXhwIjoyMDk4NTY1MzU5fQ.4F-9RQQ2j8UDohSAsFJu1YyYySJVjmLGRgJich_FG08`
3. **NEXTAUTH_SECRET** = `efDp1BY0dB9hWFBWbpaq2DnghPZyaWO3uE4vfwgWdz0=`
4. **NEXTAUTH_URL** = `https://wisedellacademy.vercel.app`

Ensure these variables are also set:
- **RESEND_API_KEY** (your existing Resend API key)
- **RECAPTCHA_SECRET_KEY** (your existing reCAPTCHA secret key)
- **NEXT_PUBLIC_SITE_URL** = `https://wisedellacademy.vercel.app`
- **NEXT_PUBLIC_RECAPTCHA_SITE_KEY** (your existing reCAPTCHA site key)

### Step 3: Deploy to Vercel

1. Push your changes to git
2. Vercel will automatically deploy
3. Or manually trigger a deployment from Vercel dashboard

## Testing Checklist

After deployment, test the following:

### 1. Application Submission
- [ ] Navigate to /admissions
- [ ] Fill out the complete application form
- [ ] Upload passport photo (JPG/PNG, max 2MB)
- [ ] Upload results document (PDF/JPG/PNG, max 5MB)
- [ ] Accept declaration
- [ ] Submit application
- [ ] Verify success message appears with application number

### 2. Database Verification
- [ ] Check Supabase dashboard > applications table
- [ ] Verify new application appears
- [ ] Verify status = "pending"
- [ ] Verify all fields are populated correctly
- [ ] Verify application_number format: WDA-YYYY-XXXX

### 3. Email Verification
- [ ] Check applicant's email inbox
- [ ] Verify confirmation email received
- [ ] Verify email subject: "Application Received – Wisedell Academy"
- [ ] Verify email contains application number
- [ ] Verify email contains student name
- [ ] Verify email contains grade applied for
- [ ] Verify email has professional HTML formatting

### 4. Admin Dashboard Verification
- [ ] Navigate to /admin/dashboard
- [ ] Verify stats update with real data
- [ ] Verify "Applications" count increases
- [ ] Verify "Pending" count increases
- [ ] Navigate to /admin/applications
- [ ] Verify new application appears in table
- [ ] Verify application number is displayed
- [ ] Verify student name is displayed
- [ ] Verify status shows "pending"

### 5. Application Detail Verification
- [ ] Click "View Details" on the new application
- [ ] Verify all application details load correctly
- [ ] Verify passport photo displays
- [ ] Verify results document displays/downloadable
- [ ] Test "Approve" button
- [ ] Verify status changes to "approved"
- [ ] Verify approval email is sent to applicant
- [ ] Test "Reject" button
- [ ] Verify status changes to "rejected"
- [ ] Verify rejection email is sent to applicant

## Troubleshooting

### Issue: Applications not appearing in admin dashboard
**Solution:** Ensure you applied the RLS policy migration in Supabase SQL Editor

### Issue: Email not sending
**Solution:** Verify RESEND_API_KEY is set correctly in Vercel environment variables

### Issue: Database connection error
**Solution:** Verify NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are correct

### Issue: File upload failing
**Solution:** Verify Supabase storage bucket "application-documents" exists and has public read policy

## Files Modified

1. **supabase/schema.sql** - Added SELECT RLS policy for applications table
2. **supabase/migrations/add_applications_select_policy.sql** - New migration file
3. **src/app/admin/applications/page.tsx** - Replaced placeholder with real data fetching
4. **src/app/api/applications/route.ts** - Improved email template to professional HTML
5. **src/app/api/analytics/route.ts** - Added gallery count and simplified response fields
6. **src/components/admin/DashboardOverview.tsx** - Updated to fetch real stats from API

## Root Causes Fixed

1. **Missing SELECT RLS Policy** - Admin dashboard couldn't read applications due to missing SELECT policy on applications table
2. **Placeholder Admin Page** - Admin applications page was showing "coming soon" instead of real data
3. **Basic Email Template** - Confirmation email was basic HTML, now professional with branding
4. **Hardcoded Dashboard Stats** - Dashboard showed fake numbers, now fetches real data from database

## Next Steps After Testing

Once all tests pass:
1. Re-enable reCAPTCHA validation in src/app/api/applications/route.ts (lines 79-97)
2. Update frontend to use actual reCAPTCHA token instead of placeholder
3. Set up proper authentication for admin dashboard
4. Add rate limiting to prevent abuse
5. Set up monitoring and alerting
