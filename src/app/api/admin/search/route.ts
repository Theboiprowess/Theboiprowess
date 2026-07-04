import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const type = searchParams.get("type"); // students, teachers, applications, news, events, gallery

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const results: any = {};

    if (!type || type === "students") {
      const { data: students } = await supabase
        .from("students")
        .select("*")
        .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%`)
        .limit(10);
      results.students = students || [];
    }

    if (!type || type === "teachers") {
      const { data: teachers } = await supabase
        .from("teachers")
        .select("*")
        .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%`)
        .limit(10);
      results.teachers = teachers || [];
    }

    if (!type || type === "applications") {
      const { data: applications } = await supabase
        .from("applications")
        .select("*")
        .or(`student_first_name.ilike.%${query}%,student_last_name.ilike.%${query}%,parent_email.ilike.%${query}%,application_number.ilike.%${query}%`)
        .limit(10);
      results.applications = applications || [];
    }

    if (!type || type === "news") {
      const { data: news } = await supabase
        .from("news")
        .select("*")
        .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
        .limit(10);
      results.news = news || [];
    }

    if (!type || type === "events") {
      const { data: events } = await supabase
        .from("events")
        .select("*")
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(10);
      results.events = events || [];
    }

    if (!type || type === "gallery") {
      const { data: gallery } = await supabase
        .from("gallery")
        .select("*")
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(10);
      results.gallery = gallery || [];
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
