import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const programme = searchParams.get("programme");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    let query = supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }
    if (programme && programme !== "all") {
      query = query.eq("grade_applying", programme);
    }
    if (startDate) {
      query = query.gte("created_at", startDate);
    }
    if (endDate) {
      query = query.lte("created_at", endDate);
    }

    const { data: applications, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(0, 51, 102);
    doc.text("WISEDELL ACADEMY", pageWidth / 2, 20, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text("Applications Report", pageWidth / 2, 30, { align: "center" });

    // Generation info
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    const generatedDate = new Date().toLocaleString();
    doc.text(`Generated: ${generatedDate}`, pageWidth / 2, 40, { align: "center" });
    doc.text(`Total Applications: ${applications.length}`, pageWidth / 2, 46, { align: "center" });

    // Table data
    const tableData = applications.map((app: any) => [
      app.application_number,
      `${app.first_name} ${app.last_name}`,
      app.gender,
      new Date(app.date_of_birth).toLocaleDateString(),
      app.grade_applying,
      app.status.charAt(0).toUpperCase() + app.status.slice(1),
      new Date(app.created_at).toLocaleDateString(),
      app.email,
      app.phone,
    ]);

    // Table
    autoTable(doc, {
      startY: 55,
      head: [
        [
          "App #",
          "Name",
          "Gender",
          "DOB",
          "Programme",
          "Status",
          "Submitted",
          "Email",
          "Phone",
        ],
      ],
      body: tableData,
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [0, 51, 102],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 35 },
        2: { cellWidth: 20 },
        3: { cellWidth: 25 },
        4: { cellWidth: 30 },
        5: { cellWidth: 25 },
        6: { cellWidth: 25 },
        7: { cellWidth: 40 },
        8: { cellWidth: 30 },
      },
    });

    // Footer with page numbers
    const totalPages = doc.internal.pages.length - 1; // pages array includes dummy page at index 0
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );
    }

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="wisdell-applications-${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF export error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
