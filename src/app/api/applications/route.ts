import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { getCurrentYear, getNextAcademicYear } from "@/lib/date-utils";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  console.log("[ADMISSIONS] Application submission started at:", new Date().toISOString());
  
  // Validate required environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

  console.log("[ADMISSIONS] Environment variables check:", {
    hasSupabaseUrl: !!supabaseUrl,
    hasSupabaseKey: !!supabaseServiceKey,
    hasResendKey: !!resendApiKey,
    hasRecaptchaSecret: !!recaptchaSecretKey,
  });

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("[ADMISSIONS] Missing Supabase credentials");
    return NextResponse.json(
      { error: "Server configuration error: Database credentials missing" },
      { status: 500 }
    );
  }

  if (!recaptchaSecretKey) {
    console.error("[ADMISSIONS] Missing reCAPTCHA secret");
    return NextResponse.json(
      { error: "Server configuration error: reCAPTCHA secret missing" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const resend = resendApiKey ? new Resend(resendApiKey) : null;

  // Get dynamic years
  const currentYear = getCurrentYear();
  const nextAcademicYear = getNextAcademicYear();
  console.log("[ADMISSIONS] Academic year context:", { currentYear, nextAcademicYear });

  try {
    const formData = await request.formData();
    console.log("[ADMISSIONS] Form data received, fields:", Array.from(formData.keys()));

    // Extract form data
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const gender = formData.get("gender") as string;
    const nationalId = formData.get("nationalId") as string;
    const parentName = formData.get("parentName") as string;
    const relationship = formData.get("relationship") as string;
    const parentPhone = formData.get("parentPhone") as string;
    const parentAlternativePhone = formData.get("parentAlternativePhone") as string;
    const parentEmail = formData.get("parentEmail") as string;
    const physicalAddress = formData.get("physicalAddress") as string;
    const previousSchool = formData.get("previousSchool") as string;
    const lastGradeCompleted = formData.get("lastGradeCompleted") as string;
    const gradeApplying = formData.get("gradeApplying") as string;
    const subjects = formData.get("subjects") as string;
    const additionalComments = formData.get("additionalComments") as string;
    const declaration = formData.get("declaration") === "true";
    const recaptchaToken = formData.get("recaptchaToken") as string;

    console.log("[ADMISSIONS] Applicant info:", {
      firstName,
      lastName,
      parentEmail,
      gradeApplying,
    });

    // Validate reCAPTCHA (temporarily disabled for testing)
    console.log("[ADMISSIONS] reCAPTCHA validation temporarily disabled for testing");
    /*
    console.log("[ADMISSIONS] Validating reCAPTCHA...");
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaToken}`,
      { method: "POST" }
    );
    const recaptchaData = await recaptchaResponse.json();
    console.log("[ADMISSIONS] reCAPTCHA validation result:", recaptchaData.success);

    if (!recaptchaData.success) {
      console.error("[ADMISSIONS] reCAPTCHA verification failed:", recaptchaData);
      return NextResponse.json(
        { error: "Security verification failed. Please refresh the page and try again." },
        { status: 400 }
      );
    }
    */

    // Generate application number (WDA-YYYY-XXXX format)
    console.log("[ADMISSIONS] Generating application number...");
    const { data: lastApplication, error: lastAppError } = await supabase
      .from("applications")
      .select("application_number")
      .order("submitted_at", { ascending: false })
      .limit(1)
      .like("application_number", `WDA-${currentYear}-%`);

    if (lastAppError) {
      console.error("[ADMISSIONS] Error fetching last application number:", lastAppError);
    }

    let nextNumber = 1;
    if (lastApplication && lastApplication.length > 0) {
      const lastNumber = parseInt(lastApplication[0].application_number.split("-")[2]);
      nextNumber = lastNumber + 1;
    }

    const applicationNumber = `WDA-${currentYear}-${String(nextNumber).padStart(4, "0")}`;
    console.log("[ADMISSIONS] Generated application number:", applicationNumber);

    // Handle file uploads
    console.log("[ADMISSIONS] Processing file uploads...");
    let passportPhotoUrl = null;
    let resultsUploadUrl = null;

    const passportPhoto = formData.get("passportPhoto") as File;
    const resultsUpload = formData.get("resultsUpload") as File;

    console.log("[ADMISSIONS] Files to upload:", {
      hasPassportPhoto: !!passportPhoto && passportPhoto.size > 0,
      hasResultsUpload: !!resultsUpload && resultsUpload.size > 0,
    });

    if (passportPhoto && passportPhoto.size > 0) {
      console.log("[ADMISSIONS] Uploading passport photo...");
      const passportPhotoExt = passportPhoto.name.split(".").pop();
      const passportPhotoName = `${applicationNumber}-passport.${passportPhotoExt}`;
      
      const { data: passportUploadData, error: passportError } = await supabase.storage
        .from("application-documents")
        .upload(passportPhotoName, passportPhoto);

      if (passportError) {
        console.error("[ADMISSIONS] Passport photo upload error:", passportError);
        return NextResponse.json(
          { error: `Failed to upload passport photo: ${passportError.message}` },
          { status: 500 }
        );
      }

      const { data: passportPublicUrl } = supabase.storage
        .from("application-documents")
        .getPublicUrl(passportPhotoName);
      passportPhotoUrl = passportPublicUrl.publicUrl;
      console.log("[ADMISSIONS] Passport photo uploaded successfully");
    }

    if (resultsUpload && resultsUpload.size > 0) {
      console.log("[ADMISSIONS] Uploading results document...");
      const resultsUploadExt = resultsUpload.name.split(".").pop();
      const resultsUploadName = `${applicationNumber}-results.${resultsUploadExt}`;
      
      const { data: resultsUploadData, error: resultsError } = await supabase.storage
        .from("application-documents")
        .upload(resultsUploadName, resultsUpload);

      if (resultsError) {
        console.error("[ADMISSIONS] Results upload error:", resultsError);
        return NextResponse.json(
          { error: `Failed to upload results document: ${resultsError.message}` },
          { status: 500 }
        );
      }

      const { data: resultsPublicUrl } = supabase.storage
        .from("application-documents")
        .getPublicUrl(resultsUploadName);
      resultsUploadUrl = resultsPublicUrl.publicUrl;
      console.log("[ADMISSIONS] Results document uploaded successfully");
    }

    // Parse subjects array
    const subjectsArray = subjects ? JSON.parse(subjects) : [];

    // Insert application into database
    console.log("[ADMISSIONS] Inserting application into database...");
    const { data: application, error: insertError } = await supabase
      .from("applications")
      .insert({
        application_number: applicationNumber,
        student_first_name: firstName,
        student_last_name: lastName,
        date_of_birth: dateOfBirth,
        gender: gender,
        national_id_birth_cert: nationalId,
        passport_photo_url: passportPhotoUrl,
        parent_name: parentName,
        parent_relationship: relationship,
        parent_phone: parentPhone,
        parent_alternative_phone: parentAlternativePhone || null,
        parent_email: parentEmail,
        physical_address: physicalAddress,
        previous_school: previousSchool,
        last_grade_completed: lastGradeCompleted,
        results_upload_url: resultsUploadUrl,
        grade_applying: gradeApplying,
        subjects: subjectsArray,
        additional_comments: additionalComments || null,
        declaration_accepted: declaration,
        status: "pending",
      })
      .select()
      .single();

    if (insertError) {
      console.error("[ADMISSIONS] Database insert error:", insertError);
      console.error("[ADMISSIONS] Error code:", insertError.code);
      console.error("[ADMISSIONS] Error message:", insertError.message);
      console.error("[ADMISSIONS] Error details:", insertError.details);
      
      // Provide specific error messages based on error type
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "An application with similar information already exists. Please contact the school directly." },
          { status: 409 }
        );
      }
      
      if (insertError.code === "23502") {
        return NextResponse.json(
          { error: "Required field is missing. Please ensure all required fields are filled." },
          { status: 400 }
        );
      }
      
      if (insertError.message.includes("connection")) {
        return NextResponse.json(
          { error: "Database connection error. Please try again later." },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { error: `Database error: ${insertError.message}` },
        { status: 500 }
      );
    }

    console.log("[ADMISSIONS] Application inserted successfully:", {
      applicationNumber,
      applicationId: application.id,
      status: application.status
    });

    // Create notification for admin dashboard
    console.log("[ADMISSIONS] Creating notification for admin dashboard...");
    try {
      // Get admin users (for now, we'll notify all authenticated users)
      // In production, you'd have a specific admin role
      const { error: notificationError } = await supabase
        .from("notifications")
        .insert({
          type: "application_received",
          title: "New Application Received",
          message: `${firstName} ${lastName} has applied for ${gradeApplying}`,
          entity_type: "application",
          entity_id: application.id,
          is_read: false,
        });

      if (notificationError) {
        console.error("[ADMISSIONS] Error creating notification:", notificationError);
        // Don't fail the application if notification fails
      } else {
        console.log("[ADMISSIONS] Notification created successfully");
      }
    } catch (notifError) {
      console.error("[ADMISSIONS] Error creating notification:", notifError);
      // Don't fail the application if notification fails
    }

    // Create activity log
    console.log("[ADMISSIONS] Creating activity log...");
    try {
      const { error: activityError } = await supabase
        .from("activity_logs")
        .insert({
          action: "application_submitted",
          entity_type: "application",
          entity_id: application.id,
          details: {
            application_number: applicationNumber,
            student_name: `${firstName} ${lastName}`,
            grade_applying: gradeApplying,
            parent_email: parentEmail,
          },
        });

      if (activityError) {
        console.error("[ADMISSIONS] Error creating activity log:", activityError);
      } else {
        console.log("[ADMISSIONS] Activity log created successfully");
      }
    } catch (activityError) {
      console.error("[ADMISSIONS] Error creating activity log:", activityError);
    }

    // Send confirmation email to applicant
    let emailSent = false;
    let emailError = null;
    if (resend) {
      console.log("[ADMISSIONS] Sending confirmation email to applicant...");
      try {
        const emailResult = await resend.emails.send({
          from: "WISEDELL ACADEMY <noreply@wisedellcollege.run.place>",
          to: parentEmail,
          subject: "Application Received – Wisedell Academy",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Application Received – Wisedell Academy</title>
            </head>
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #1e40af; margin: 0;">WISEDELL ACADEMY</h1>
                  <p style="color: #666; margin: 5px 0 0;">Empowering Future Leaders Through Academic Excellence</p>
                </div>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                  <h2 style="color: #1e40af; margin: 0 0 15px;">Application Received</h2>
                  <p style="color: #333; line-height: 1.6; margin: 0;">Dear ${parentName},</p>
                  <p style="color: #333; line-height: 1.6; margin: 15px 0;">Thank you for applying to Wisedell Academy on behalf of ${firstName} ${lastName}.</p>
                  <p style="color: #333; line-height: 1.6; margin: 15px 0;">We have successfully received your application.</p>
                </div>

                <div style="margin-bottom: 30px;">
                  <h3 style="color: #1e40af; margin: 0 0 15px;">Application Details</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background-color: #f8f9fa;">
                      <td style="padding: 12px; font-weight: bold; color: #333;">Application Number:</td>
                      <td style="padding: 12px; color: #333;">${applicationNumber}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px; font-weight: bold; color: #333;">Student Name:</td>
                      <td style="padding: 12px; color: #333;">${firstName} ${lastName}</td>
                    </tr>
                    <tr style="background-color: #f8f9fa;">
                      <td style="padding: 12px; font-weight: bold; color: #333;">Grade Applied For:</td>
                      <td style="padding: 12px; color: #333;">${gradeApplying}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px; font-weight: bold; color: #333;">Academic Year:</td>
                      <td style="padding: 12px; color: #333;">${nextAcademicYear}</td>
                    </tr>
                  </table>
                </div>

                <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 30px;">
                  <h3 style="color: #856404; margin: 0 0 10px;">Application Status</h3>
                  <p style="color: #856404; margin: 0; font-weight: bold;">Pending Review</p>
                  <p style="color: #856404; margin: 10px 0 0; line-height: 1.6;">Our admissions team will review your application and contact you if additional information is required.</p>
                </div>

                <p style="color: #333; line-height: 1.6; margin: 15px 0;">You will receive another email once your application has been reviewed.</p>
                <p style="color: #333; line-height: 1.6; margin: 15px 0;">If you have any questions, please contact us.</p>

                <div style="background-color: #1e40af; color: white; padding: 20px; margin-top: 30px; border-radius: 8px;">
                  <h3 style="margin: 0 0 10px;">Contact Information</h3>
                  <p style="margin: 5px 0;">Email: wisedellacademy@gmail.com</p>
                  <p style="margin: 5px 0;">Phone: +263 77 802 2980</p>
                  <p style="margin: 5px 0;">Address: 3210 Jongwe Street, Pangolin, Masvingo, Zimbabwe</p>
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666; font-size: 12px;">
                  <p style="margin: 5px 0;">Thank you for choosing Wisedell Academy.</p>
                  <p style="margin: 5px 0;">Kind regards,</p>
                  <p style="margin: 5px 0; font-weight: bold;">Admissions Office</p>
                  <p style="margin: 5px 0;">Wisedell Academy</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });
        console.log("[ADMISSIONS] Confirmation email sent successfully:", emailResult);
        emailSent = true;
      } catch (emailError) {
        console.error("[ADMISSIONS] Error sending confirmation email:", emailError);
        emailError = emailError instanceof Error ? emailError.message : String(emailError);
        // Don't fail the application if email fails, but track it
      }
    } else {
      console.log("[ADMISSIONS] Resend not configured, skipping email");
      emailError = "Email service not configured";
    }

    // Send notification email to Director
    if (resend) {
      console.log("[ADMISSIONS] Sending notification email to director...");
      try {
        const adminDashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/applications`;
        
        await resend.emails.send({
          from: "WISEDELL ACADEMY <noreply@wisedellcollege.run.place>",
          to: "wisedellacademy@gmail.com",
          subject: `New Application Received - ${applicationNumber}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #1e40af;">New Application Received</h1>
              <p>A new application has been submitted to WISEDELL ACADEMY:</p>
              <ul>
                <li><strong>Application Number:</strong> ${applicationNumber}</li>
                <li><strong>Academic Year:</strong> ${nextAcademicYear}</li>
                <li><strong>Student Name:</strong> ${firstName} ${lastName}</li>
                <li><strong>Grade Applied For:</strong> ${gradeApplying}</li>
                <li><strong>Parent Name:</strong> ${parentName}</li>
                <li><strong>Parent Phone:</strong> ${parentPhone}</li>
                <li><strong>Parent Email:</strong> ${parentEmail}</li>
              </ul>
              <p><a href="${adminDashboardUrl}" style="background-color: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Application in Admin Dashboard</a></p>
              <p>Please review this application at your earliest convenience.</p>
            </div>
          `,
        });
        console.log("[ADMISSIONS] Director notification email sent successfully");
      } catch (emailError) {
        console.error("[ADMISSIONS] Error sending director notification email:", emailError);
        // Don't fail the application if email fails
      }
    }

    console.log("[ADMISSIONS] Application submission completed successfully:", applicationNumber);
    return NextResponse.json({
      success: true,
      applicationNumber,
      message: "Application submitted successfully",
      emailSent,
      emailError: emailError || undefined,
    });
  } catch (error) {
    console.error("[ADMISSIONS] Unhandled error in application submission:", error);
    
    // Provide specific error messages based on error type
    if (error instanceof Error) {
      if (error.message.includes("fetch")) {
        return NextResponse.json(
          { error: "Network error. Please check your connection and try again." },
          { status: 503 }
        );
      }
      
      if (error.message.includes("timeout")) {
        return NextResponse.json(
          { error: "Request timed out. Please try again." },
          { status: 504 }
        );
      }
      
      return NextResponse.json(
        { error: `Server error: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
