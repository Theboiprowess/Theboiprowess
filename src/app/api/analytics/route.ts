import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "7d";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Calculate date range
    const now = new Date();
    const startDate = new Date();
    
    if (period === "7d") {
      startDate.setDate(now.getDate() - 7);
    } else if (period === "30d") {
      startDate.setDate(now.getDate() - 30);
    } else if (period === "90d") {
      startDate.setDate(now.getDate() - 90);
    } else if (period === "1y") {
      startDate.setFullYear(now.getFullYear() - 1);
    }

    const startDateStr = startDate.toISOString();

    // Fetch application stats
    const { data: applications, error: appsError } = await supabase
      .from("applications")
      .select("status, submitted_at")
      .gte("submitted_at", startDateStr);

    // Fetch activity logs
    const { data: activities, error: logsError } = await supabase
      .from("activity_logs")
      .select("*")
      .gte("created_at", startDateStr)
      .order("created_at", { ascending: false })
      .limit(50);

    // Count students
    const { count: studentCount, error: studentError } = await supabase
      .from("students")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    // Count teachers
    const { count: teacherCount, error: teacherError } = await supabase
      .from("teachers")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    // Count news
    const { count: newsCount, error: newsError } = await supabase
      .from("news")
      .select("*", { count: "exact", head: true })
      .eq("published", true);

    // Count events
    const { count: eventsCount, error: eventsError } = await supabase
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("published", true)
      .eq("is_completed", false);

    // Count gallery items
    const { count: galleryCount, error: galleryError } = await supabase
      .from("gallery")
      .select("*", { count: "exact", head: true });

    if (appsError || logsError || studentError || teacherError || newsError || eventsError || galleryError) {
      return NextResponse.json({ error: "Error fetching analytics data" }, { status: 500 });
    }

    // Process application stats
    const applicationStats = {
      total: applications?.length || 0,
      pending: applications?.filter(a => a.status === "pending").length || 0,
      approved: applications?.filter(a => a.status === "approved").length || 0,
      rejected: applications?.filter(a => a.status === "rejected").length || 0,
      waiting_list: applications?.filter(a => a.status === "waiting_list").length || 0,
    };

    return NextResponse.json({
      period,
      dateRange: {
        start: startDateStr,
        end: now.toISOString(),
      },
      applications: applicationStats,
      activities: activities || [],
      overview: {
        activeStudents: studentCount || 0,
        activeTeachers: teacherCount || 0,
        publishedNews: newsCount || 0,
        upcomingEvents: eventsCount || 0,
        galleryCount: galleryCount || 0,
      },
      studentCount: studentCount || 0,
      applicationCount: applicationStats.total,
      pendingCount: applicationStats.pending,
      galleryCount: galleryCount || 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
