import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from("teachers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from("teachers")
      .insert({
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log activity
    await supabase.from("activity_logs").insert({
      action: "teacher_created",
      entity_type: "teacher",
      entity_id: data.id,
      details: { name: `${data.first_name} ${data.last_name}` },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get old data for audit log
    const { data: oldData } = await supabase
      .from("teachers")
      .select("*")
      .eq("id", id)
      .single();

    const { data, error } = await supabase
      .from("teachers")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log activity
    await supabase.from("activity_logs").insert({
      action: "teacher_updated",
      entity_type: "teacher",
      entity_id: data.id,
      details: { name: `${data.first_name} ${data.last_name}` },
    });

    // Log audit
    await supabase.from("audit_logs").insert({
      table_name: "teachers",
      record_id: data.id,
      action: "UPDATE",
      old_value: oldData,
      new_value: data,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get old data for audit log
    const { data: oldData } = await supabase
      .from("teachers")
      .select("*")
      .eq("id", id)
      .single();

    const { error } = await supabase
      .from("teachers")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log activity
    await supabase.from("activity_logs").insert({
      action: "teacher_deleted",
      entity_type: "teacher",
      entity_id: id,
      details: { name: oldData ? `${oldData.first_name} ${oldData.last_name}` : "Unknown" },
    });

    // Log audit
    await supabase.from("audit_logs").insert({
      table_name: "teachers",
      record_id: id,
      action: "DELETE",
      old_value: oldData,
      new_value: null,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
