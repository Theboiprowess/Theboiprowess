import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Tables to backup
    const tables = [
      "students",
      "applications",
      "teachers",
      "news",
      "events",
      "gallery",
      "downloads",
      "messages",
      "academic_calendar",
      "contact_info",
      "system_settings",
      "announcements",
      "activity_logs",
      "homepage_content",
      "user_roles",
    ];

    const backup: any = {
      timestamp: new Date().toISOString(),
      tables: {},
    };

    for (const table of tables) {
      const { data, error } = await supabase.from(table).select("*");
      
      if (error) {
        console.error(`Error backing up ${table}:`, error);
        backup.tables[table] = { error: error.message };
      } else {
        backup.tables[table] = data;
      }
    }

    return NextResponse.json({
      success: true,
      backup,
      size: JSON.stringify(backup).length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
