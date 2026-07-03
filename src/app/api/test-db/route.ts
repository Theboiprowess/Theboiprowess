import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getCurrentYear } from "@/lib/date-utils";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  console.log("[TEST-DB] Database test endpoint called");
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: "Missing Supabase credentials" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Test 1: Check if we can connect to the database
    console.log("[TEST-DB] Testing database connection...");
    const { data: testData, error: testError } = await supabase
      .from("applications")
      .select("count")
      .limit(1);

    if (testError) {
      console.error("[TEST-DB] Database connection failed:", testError);
      return NextResponse.json(
        { error: "Database connection failed", details: testError },
        { status: 500 }
      );
    }

    console.log("[TEST-DB] Database connection successful");

    // Test 2: Try to insert a test application
    console.log("[TEST-DB] Testing application insert...");
    const currentYear = getCurrentYear();
    const testApplicationNumber = `TEST-${currentYear}-0001`;
    
    const { data: insertData, error: insertError } = await supabase
      .from("applications")
      .insert({
        application_number: testApplicationNumber,
        student_first_name: "Test",
        student_last_name: "Student",
        date_of_birth: "2000-01-01",
        gender: "male",
        national_id_birth_cert: "TEST123456",
        passport_photo_url: null,
        parent_name: "Test Parent",
        parent_relationship: "parent",
        parent_phone: "+263123456789",
        parent_alternative_phone: null,
        parent_email: "test@example.com",
        physical_address: "Test Address",
        previous_school: "Test School",
        last_grade_completed: "Grade 7",
        results_upload_url: null,
        grade_applying: "Form 1",
        subjects: [],
        additional_comments: "Test application",
        declaration_accepted: true,
        status: "pending",
      })
      .select()
      .single();

    if (insertError) {
      console.error("[TEST-DB] Insert failed:", insertError);
      return NextResponse.json(
        { error: "Database insert failed", details: insertError },
        { status: 500 }
      );
    }

    console.log("[TEST-DB] Test application inserted successfully:", testApplicationNumber);

    // Clean up the test application
    const { error: deleteError } = await supabase
      .from("applications")
      .delete()
      .eq("application_number", testApplicationNumber);

    if (deleteError) {
      console.error("[TEST-DB] Cleanup failed:", deleteError);
    }

    return NextResponse.json({
      success: true,
      message: "Database test passed",
      testApplicationNumber,
    });
  } catch (error) {
    console.error("[TEST-DB] Unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
