import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

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

    // Send email notification based on status change
    if (body.status && data.parent_email) {
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey) {
        try {
          const resend = new Resend(resendApiKey);
          let emailSubject = "";
          let emailBody = "";

          if (body.status === "approved") {
            emailSubject = "Application Approved - WISEDELL ACADEMY";
            emailBody = `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #1e40af;">Congratulations!</h1>
                <p>Dear ${data.parent_name},</p>
                <p>Your application to WISEDELL ACADEMY on behalf of ${data.student_first_name} ${data.student_last_name} has been <strong>approved</strong>.</p>
                <p><strong>Application Number:</strong> ${data.application_number}</p>
                <p><strong>Grade:</strong> ${data.grade_applying}</p>
                <p>Please visit the school with the following documents to complete registration:</p>
                <ul>
                  <li>Birth Certificate</li>
                  <li>National ID (for parent)</li>
                  <li>Previous school reports</li>
                  <li>Passport-size photos</li>
                </ul>
                <p>If you have any questions, please contact us at wisedellacademy@gmail.com or call +263 77 802 2980.</p>
                <p>Best regards,<br>WISEDELL ACADEMY Administration</p>
              </div>
            `;
          } else if (body.status === "rejected") {
            emailSubject = "Application Update - WISEDELL ACADEMY";
            emailBody = `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #1e40af;">Application Update</h1>
                <p>Dear ${data.parent_name},</p>
                <p>Thank you for applying to WISEDELL ACADEMY on behalf of ${data.student_first_name} ${data.student_last_name}.</p>
                <p>Unfortunately, your application was not successful at this time.</p>
                <p><strong>Application Number:</strong> ${data.application_number}</p>
                <p>We appreciate your interest in our school and wish you the best in your educational journey.</p>
                <p>If you have any questions, please contact us at wisedellacademy@gmail.com or call +263 77 802 2980.</p>
                <p>Best regards,<br>WISEDELL ACADEMY Administration</p>
              </div>
            `;
          } else if (body.status === "more_info_requested") {
            emailSubject = "Additional Information Required - WISEDELL ACADEMY";
            emailBody = `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #1e40af;">Additional Information Required</h1>
                <p>Dear ${data.parent_name},</p>
                <p>Your application to WISEDELL ACADEMY on behalf of ${data.student_first_name} ${data.student_last_name} requires additional information.</p>
                <p><strong>Application Number:</strong> ${data.application_number}</p>
                <p><strong>Notes:</strong> ${body.director_notes || "Please contact the school for more details."}</p>
                <p>Please provide the requested information at your earliest convenience.</p>
                <p>If you have any questions, please contact us at wisedellacademy@gmail.com or call +263 77 802 2980.</p>
                <p>Best regards,<br>WISEDELL ACADEMY Administration</p>
              </div>
            `;
          }

          if (emailSubject && emailBody) {
            const emailResult = await resend.emails.send({
              from: "WISEDELL ACADEMY <noreply@wisedellacademy.co.zw>",
              to: data.parent_email,
              subject: emailSubject,
              html: emailBody,
            });

            if (emailResult.error) {
              console.error("[ADMIN] Email send error:", emailResult.error);
            } else {
              console.log("[ADMIN] Email sent successfully to:", data.parent_email);
            }
          }
        } catch (emailError) {
          console.error("[ADMIN] Email sending error:", emailError);
        }
      } else {
        console.error("[ADMIN] Resend API key not configured");
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[ADMIN] Unhandled error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
