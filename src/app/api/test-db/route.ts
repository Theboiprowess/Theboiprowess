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

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Test 1: Simple connection test using rpc
    console.log("[TEST-DB] Testing database connection via rpc...");
    const { data: versionData, error: versionError } = await supabase.rpc('version');

    if (versionError) {
      console.error("[TEST-DB] RPC version check failed:", versionError);
      // Try alternative test
    } else {
      console.log("[TEST-DB] Database version:", versionData);
    }

    // Test 2: Try to query applications table directly
    console.log("[TEST-DB] Testing applications table query...");
    const { data: testData, error: testError } = await supabase
      .from("applications")
      .select("id")
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
