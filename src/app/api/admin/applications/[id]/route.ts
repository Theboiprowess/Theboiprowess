import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      console.error("[ADMIN] Error fetching application:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[ADMIN] Unhandled error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("[ADMIN] Missing Supabase configuration");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log("[ADMIN] Application update request:", { id: params.id, body });

    // Validate status values
    const validStatuses = ['pending', 'approved', 'rejected', 'more_info_requested', 'waiting_list'];
    if (body.status && !validStatuses.includes(body.status)) {
      console.error("[ADMIN] Invalid status value:", body.status);
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Remove reviewed_by if it's not a valid UUID (frontend may send email)
    const updateData: any = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    // Always remove reviewed_by to avoid UUID constraint issues
    // Store email in reviewed_by_email instead
    if (body.reviewed_by && typeof body.reviewed_by === 'string') {
      updateData.reviewed_by_email = body.reviewed_by;
    }
    
    // Never send reviewed_by to database to avoid UUID constraint
    delete updateData.reviewed_by;

    console.log("[ADMIN] Updating application with data:", updateData);

    const { data, error } = await supabase
      .from("applications")
      .update(updateData)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      console.error("[ADMIN] Supabase update error:", error);
      console.error("[ADMIN] Error details:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return NextResponse.json(
        { error: error.message, code: error.code, details: error.details },
        { status: 500 }
      );
    }

    if (!data) {
      console.error("[ADMIN] No data returned from update");
      return NextResponse.json(
        { error: "Application not found or update failed" },
        { status: 404 }
      );
    }

    console.log("[ADMIN] Application updated successfully:", data.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[ADMIN] Unhandled error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
