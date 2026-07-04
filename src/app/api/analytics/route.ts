import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Count students (active only)
    const { count: studentCount, error: studentError } = await supabase
      .from("students")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    // Count teachers (active only)
    const { count: teacherCount, error: teacherError } = await supabase
      .from("teachers")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    // Count applications by status
    const { data: applications, error: appsError } = await supabase
      .from("applications")
      .select("status, submitted_at");

    const applicationCount = applications?.length || 0;
    const pendingCount = applications?.filter(a => a.status === "pending").length || 0;
    const approvedCount = applications?.filter(a => a.status === "approved").length || 0;
    const rejectedCount = applications?.filter(a => a.status === "rejected").length || 0;

    // Applications today
    const today = new Date().toISOString().split('T')[0];
    const applicationsToday = applications?.filter(a => a.submitted_at.startsWith(today)).length || 0;

    // Applications this week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const applicationsWeek = applications?.filter(a => new Date(a.submitted_at) >= weekAgo).length || 0;

    // Applications this month
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const applicationsMonth = applications?.filter(a => new Date(a.submitted_at) >= monthAgo).length || 0;

    // Count news (published only)
    const { count: newsCount, error: newsError } = await supabase
      .from("news")
      .select("*", { count: "exact", head: true })
      .eq("published", true);

    // Count events (published and not completed)
    const { count: eventsCount, error: eventsError } = await supabase
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("published", true)
      .eq("is_completed", false);

    // Count gallery items
    const { count: galleryCount, error: galleryError } = await supabase
      .from("gallery")
      .select("*", { count: "exact", head: true });

    // Count unread notifications
    const { count: unreadNotifications, error: notifError } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);

    // Get recent activity logs
    const { data: recentActivities, error: activityError } = await supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    // Get recent applications
    const { data: recentApplications, error: recentAppsError } = await supabase
      .from("applications")
      .select("*")
      .order("submitted_at", { ascending: false })
      .limit(5);

    if (studentError || teacherError || appsError || newsError || eventsError || galleryError) {
      return NextResponse.json({ error: "Error fetching analytics data" }, { status: 500 });
    }

    // Calculate admission rate
    const admissionRate = applicationCount > 0 
      ? Math.round((approvedCount / applicationCount) * 100) 
      : 0;

    return NextResponse.json({
      studentCount: studentCount || 0,
      teacherCount: teacherCount || 0,
      applicationCount,
      pendingCount,
      approvedCount,
      rejectedCount,
      applicationsToday,
      applicationsWeek,
      applicationsMonth,
      newsCount: newsCount || 0,
      eventsCount: eventsCount || 0,
      galleryCount: galleryCount || 0,
      unreadNotifications: unreadNotifications || 0,
      admissionRate,
      recentActivities: recentActivities || [],
      recentApplications: recentApplications || [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
