import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
      console.error("[PDF-EXPORT] Error fetching applications:", error);
      return NextResponse.json(
        { error: "Failed to fetch applications" },
        { status: 500 }
      );
    }

    const apps = applications || [];

    // Create PDF
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Header
    doc.setFillColor(30, 58, 138); // Primary blue color
    doc.rect(0, 0, pageWidth, 40, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("WISEDELL ACADEMY", pageWidth / 2, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Student Applications Report", pageWidth / 2, 30, { align: "center" });

    // Generation date
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 15, 50);
    doc.text(`Total Applications: ${apps.length}`, 15, 56);

    // Table data
    const tableData = apps.map((app) => [
      app.application_number || "N/A",
      `${app.first_name} ${app.last_name}`,
      app.gender || "N/A",
      app.date_of_birth ? new Date(app.date_of_birth).toLocaleDateString() : "N/A",
      app.grade_applying || "N/A",
      app.status || "N/A",
      app.submitted_at ? new Date(app.submitted_at).toLocaleDateString() : "N/A",
      app.parent_phone || "N/A",
    ]);

    // Create table
    autoTable(doc, {
      startY: 65,
      head: [
        [
          "App #",
          "Applicant Name",
          "Gender",
          "DOB",
          "Grade",
          "Status",
          "Submitted",
          "Contact",
        ],
      ],
      body: tableData,
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [30, 58, 138],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        0: { cellWidth: 25 }, // App #
        1: { cellWidth: 35 }, // Name
        2: { cellWidth: 20 }, // Gender
        3: { cellWidth: 25 }, // DOB
        4: { cellWidth: 25 }, // Grade
        5: { cellWidth: 25 }, // Status
        6: { cellWidth: 30 }, // Submitted
        7: { cellWidth: 30 }, // Contact
      },
      didDrawPage: (data) => {
        // Footer with page numbers
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
      },
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFillColor(30, 58, 138);
      doc.rect(0, pageHeight - 15, pageWidth, 15, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.text(
        "WISEDELL ACADEMY - Excellence in Education",
        pageWidth / 2,
        pageHeight - 8,
        { align: "center" }
      );
    }

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="wisdell-applications-${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    console.error("[PDF-EXPORT] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
