import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Missing Supabase credentials" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let query = supabase
      .from("applications")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (startDate) {
      query = query.gte("submitted_at", startDate);
    }

    if (endDate) {
      query = query.lte("submitted_at", endDate);
    }

    const { data: applications, error } = await query;

    if (error) {
      console.error("[EXCEL-EXPORT] Error fetching applications:", error);
      return NextResponse.json(
        { error: "Failed to fetch applications" },
        { status: 500 }
      );
    }

    const apps = applications || [];

    // Transform data for Excel
    const excelData = apps.map((app) => ({
      "Application Number": app.application_number || "N/A",
      "First Name": app.first_name || "N/A",
      "Last Name": app.last_name || "N/A",
      "Gender": app.gender || "N/A",
      "Date of Birth": app.date_of_birth ? new Date(app.date_of_birth).toLocaleDateString() : "N/A",
      "Grade Applying": app.grade_applying || "N/A",
      "Status": app.status || "N/A",
      "Submitted Date": app.submitted_at ? new Date(app.submitted_at).toLocaleString() : "N/A",
      "Parent Name": app.parent_name || "N/A",
      "Parent Phone": app.parent_phone || "N/A",
      "Parent Email": app.parent_email || "N/A",
      "Address": app.address || "N/A",
      "Emergency Contact": app.emergency_contact_name || "N/A",
      "Emergency Phone": app.emergency_contact_phone || "N/A",
      "Previous School": app.previous_school || "N/A",
      "Medical Conditions": app.medical_conditions || "None",
      "Notes": app.notes || "None",
    }));

    // Create workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const colWidths = [
      { wch: 20 }, // Application Number
      { wch: 15 }, // First Name
      { wch: 15 }, // Last Name
      { wch: 10 }, // Gender
      { wch: 15 }, // Date of Birth
      { wch: 15 }, // Grade Applying
      { wch: 12 }, // Status
      { wch: 20 }, // Submitted Date
      { wch: 20 }, // Parent Name
      { wch: 15 }, // Parent Phone
      { wch: 25 }, // Parent Email
      { wch: 30 }, // Address
      { wch: 20 }, // Emergency Contact
      { wch: 15 }, // Emergency Phone
      { wch: 20 }, // Previous School
      { wch: 25 }, // Medical Conditions
      { wch: 30 }, // Notes
    ];
    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

    // Generate buffer
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="wisdell-applications-${Date.now()}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("[EXCEL-EXPORT] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate Excel file" },
      { status: 500 }
    );
  }
}
