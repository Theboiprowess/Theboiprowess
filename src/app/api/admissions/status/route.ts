import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { status, deadline } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Update admissions status
    const { error: statusError } = await supabase
      .from("system_settings")
      .update({ setting_value: status })
      .eq("setting_key", "admissions_status");

    if (statusError) {
      return NextResponse.json({ error: statusError.message }, { status: 500 });
    }

    // Update deadline if provided
    if (deadline) {
      const { error: deadlineError } = await supabase
        .from("system_settings")
        .update({ setting_value: deadline })
        .eq("setting_key", "admission_deadline");

      if (deadlineError) {
        return NextResponse.json({ error: deadlineError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, status, deadline });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
