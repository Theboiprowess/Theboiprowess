import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getCurrentYear } from "@/lib/date-utils";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  console.log("[TEST-DB] Database test endpoint called");
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log("[TEST-DB] Environment check:", {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseServiceKey,
    urlPrefix: supabaseUrl?.substring(0, 20),
  });

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: "Missing Supabase credentials" },
      { status: 500 }
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log("[TEST-DB] Supabase client created successfully");

    // Test 1: Try to query applications table using the same pattern as analytics route
    console.log("[TEST-DB] Testing applications table query...");
    const { data: testData, error: testError } = await supabase
      .from("applications")
      .select("status, submitted_at")
      .limit(1);

    if (testError) {
      console.error("[TEST-DB] Applications table query failed:", testError);
      return NextResponse.json(
        { 
          error: "Database query failed", 
          details: testError,
          message: "The applications table may not exist or RLS policies may be blocking access"
        },
        { status: 500 }
      );
    }

    console.log("[TEST-DB] Database connection successful, table accessible");

    return NextResponse.json({
      success: true,
      message: "Database test passed",
      hasData: testData && testData.length > 0,
    });
  } catch (error) {
    console.error("[TEST-DB] Unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
