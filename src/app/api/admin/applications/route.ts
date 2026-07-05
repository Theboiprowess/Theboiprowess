import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';

export async function GET() {
  console.log("[ADMIN] Fetching applications request received");
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log("[ADMIN] Environment check:", {
      hasSupabaseUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
    });

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("[ADMIN] Missing credentials");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log("[ADMIN] Supabase client created");

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) {
      console.error("[ADMIN] Error fetching applications:", error);
      console.error("[ADMIN] Error code:", error.code);
      console.error("[ADMIN] Error message:", error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log("[ADMIN] Successfully fetched applications:", {
      count: data?.length || 0,
      statuses: data?.map((app: any) => ({ id: app.id, status: app.status, number: app.application_number })) || [],
    });

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("[ADMIN] Unhandled error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
