# Wisedell Academy - Production Deployment Checklist

## Phase 1: Database Migration (Manual Step)

### Step 1: Apply Complete System Migration
1. Go to Supabase Dashboard → SQL Editor
2. Open `supabase/migrations/complete_system_migration.sql`
3. Copy and paste the entire SQL script
4. Execute the script
5. Verify success message appears: "Migration completed successfully!"

### Step 2: Apply Storage Bucket Migration
1. Go to Supabase Dashboard → SQL Editor
2. Open `supabase/migrations/create_storage_bucket.sql`
3. Copy and paste the entire SQL script
4. Execute the script
5. Verify bucket "school-uploads" is created

### Step 3: Verify Migration Results
Run these queries in SQL Editor to verify:

```sql
-- Check new tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('activity_logs', 'audit_logs', 'notifications', 'admissions_settings');

-- Check indexes exist
SELECT indexname FROM pg_indexes 
WHERE tablename IN ('activity_logs', 'audit_logs', 'notifications', 'admissions_settings');

-- Check RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables 
WHERE tablename IN ('activity_logs', 'audit_logs', 'notifications', 'admissions_settings');

-- Check policies exist
SELECT schemaname, tablename, policyname FROM pg_policies 
WHERE tablename IN ('activity_logs', 'audit_logs', 'notifications', 'admissions_settings');

-- Check default admissions settings
SELECT * FROM admissions_settings;
```

Expected results:
- 4 new tables created
- 7 indexes created
- RLS enabled on all 4 tables
- Policies created for each table
- Default admissions_settings row exists (academic_year: 2025-2026)

## Phase 2: Environment Variables Audit

### Required Environment Variables

**Public (Client-side):**
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `NEXT_PUBLIC_SITE_URL` - Production URL (e.g., https://wisedellacademy.com)
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Google reCAPTCHA site key

**Private (Server-side):**
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `RESEND_API_KEY` - Resend API key for emails
- `RESEND_FROM_EMAIL` - Verified sender email (e.g., admissions@wisedellacademy.com)
- `NEXTAUTH_SECRET` - Random string for NextAuth session encryption
- `NEXTAUTH_URL` - Production URL for NextAuth

### Verification Steps

1. **Local Development (.env.local):**
   ```bash
   # Check all variables are present
   cat .env.local
   ```

2. **Vercel Environment Variables:**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Verify all variables above are set for Production
   - Verify all variables above are set for Preview (optional)
   - Click "Redeploy" after any changes

3. **Security Check:**
   - Ensure `SUPABASE_SERVICE_ROLE_KEY` is NOT in `NEXT_PUBLIC_*` variables
   - Ensure `RESEND_API_KEY` is NOT in `NEXT_PUBLIC_*` variables
   - Ensure `NEXTAUTH_SECRET` is a strong random string (32+ characters)

## Phase 3: Build Verification

### Local Build Test
```bash
npm run build
```

Check for:
- ✓ No TypeScript errors
- ✓ No ESLint errors
- ✓ No missing environment variables
- ✓ Build completes successfully

### Start Production Server Test
```bash
npm start
```

Verify:
- ✓ Server starts without errors
- ✓ Can access http://localhost:3000
- ✓ Static pages load
- ✓ No console errors

## Phase 4: Vercel Deployment

### Deploy to Vercel
1. Push code to Git repository
2. Go to Vercel Dashboard
3. Import repository (if not already)
4. Click "Deploy"
5. Monitor build logs

### Post-Deployment Verification
1. Visit production URL
2. Check browser console for errors
3. Check Network tab for failed API calls
4. Test critical paths:
   - Homepage loads
   - Admissions form accessible
   - Admin login accessible

## Phase 5: Production Testing Checklist

### Authentication
- [ ] Admin login works with correct credentials
- [ ] Invalid credentials show error
- [ ] Logout works
- [ ] Session persists across page refreshes
- [ ] Session expires after timeout

### Online Applications
- [ ] Can access admissions form
- [ ] reCAPTCHA loads
- [ ] Form validation works
- [ ] Submit creates application in Supabase
- [ ] Application status = "pending"
- [ ] Application appears in Admin Dashboard
- [ ] Pending counter updates
- [ ] Recent activity shows submission

### Email System
- [ ] Applicant receives confirmation email
- [ ] Email contains application number
- [ ] Email template renders correctly
- [ ] No Resend API errors in logs
- [ ] Admin notification created (if implemented)

### Dashboard Statistics
- [ ] Students count is real (from Supabase)
- [ ] Teachers count is real (from Supabase)
- [ ] Applications count is real (from Supabase)
- [ ] Pending count is real (from Supabase)
- [ ] Approved count is real (from Supabase)
- [ ] Rejected count is real (from Supabase)
- [ ] Events count is real (from Supabase)
- [ ] News count is real (from Supabase)
- [ ] Gallery count is real (from Supabase)

### CRUD Operations
**Teachers:**
- [ ] Can add new teacher
- [ ] Can edit teacher
- [ ] Can delete teacher
- [ ] Changes reflect immediately

**Students:**
- [ ] Can add new student
- [ ] Can edit student
- [ ] Can delete student
- [ ] Changes reflect immediately

**News:**
- [ ] Can add news article
- [ ] Can edit news article
- [ ] Can delete news article
- [ ] Changes reflect immediately

**Events:**
- [ ] Can add event
- [ ] Can edit event
- [ ] Can delete event
- [ ] Changes reflect immediately

**Gallery:**
- [ ] Can upload image
- [ ] Can edit image details
- [ ] Can delete image
- [ ] Changes reflect immediately

### File Uploads
- [ ] Teacher photo upload works
- [ ] Gallery image upload works
- [ ] News image upload works
- [ ] Event banner upload works
- [ ] Images stored in Supabase Storage
- [ ] Images accessible via public URL

### Notifications & Logs
- [ ] Notifications generated on actions
- [ ] Audit logs recorded
- [ ] Activity timeline updates
- [ ] Can mark notifications as read
- [ ] Can delete notifications

### Export Functions
- [ ] PDF export works
- [ ] PDF includes branding
- [ ] PDF includes all required fields
- [ ] Excel export works
- [ ] Excel includes all fields
- [ ] Filters work for exports

### Public Website
- [ ] News articles display correctly
- [ ] Events display correctly
- [ ] Gallery displays correctly
- [ ] Admin changes reflect on public site

## Phase 6: Final Validation

### No Hardcoded Data
- [ ] Dashboard statistics fetch from API
- [ ] No mock data in production
- [ ] Empty states show appropriate messages
- [ ] Loading states work correctly

### Error Handling
- [ ] No console errors
- [ ] No network errors
- [ ] Graceful error messages
- [ ] No unhandled promises

### Performance
- [ ] Page load time < 3 seconds
- [ ] API response time < 1 second
- [ ] Images optimized
- [ ] No memory leaks

### Security
- [ ] Environment variables not exposed
- [ ] API routes protected
- [ ] RLS policies working
- [ ] No SQL injection vulnerabilities

## Phase 7: Go-Live Decision

Before going live, ensure:
- ✓ All database migrations applied
- ✓ All environment variables verified
- ✓ Build succeeds without errors
- ✓ All critical tests pass
- ✓ No console errors in production
- ✓ Email system working
- ✓ File uploads working
- ✓ All CRUD operations working
- ✓ Export functions working

## Post-Launch Monitoring

### First 24 Hours
- Monitor error logs
- Check application submissions
- Verify email delivery
- Monitor database performance

### First Week
- Collect user feedback
- Monitor uptime
- Check backup systems
- Review security logs

## Emergency Rollback Plan

If critical issues arise:
1. Revert to previous Git commit
2. Redeploy to Vercel
3. Verify rollback successful
4. Investigate issue in staging
5. Fix and redeploy

## Contact Information

**Technical Support:**
- Supabase: https://supabase.com/support
- Vercel: https://vercel.com/support
- Resend: https://resend.com/support

**Documentation:**
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
