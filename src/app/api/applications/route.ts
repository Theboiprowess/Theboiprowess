import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // Validate required environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: "Server configuration error: Supabase credentials missing" },
      { status: 500 }
    );
  }

  if (!recaptchaSecretKey) {
    return NextResponse.json(
      { error: "Server configuration error: reCAPTCHA secret missing" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const resend = resendApiKey ? new Resend(resendApiKey) : null;

  try {
    const formData = await request.formData();

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

    // Validate reCAPTCHA
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaToken}`,
      { method: "POST" }
    );
    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // Generate application number (WDA-2026-XXXX format)
    const currentYear = new Date().getFullYear();
    const { data: lastApplication } = await supabase
      .from("applications")
      .select("application_number")
      .order("submitted_at", { ascending: false })
      .limit(1)
      .like("application_number", `WDA-${currentYear}-%`);

    let nextNumber = 1;
    if (lastApplication && lastApplication.length > 0) {
      const lastNumber = parseInt(lastApplication[0].application_number.split("-")[2]);
      nextNumber = lastNumber + 1;
    }

    const applicationNumber = `WDA-${currentYear}-${String(nextNumber).padStart(4, "0")}`;

    // Handle file uploads
    let passportPhotoUrl = null;
    let resultsUploadUrl = null;

    const passportPhoto = formData.get("passportPhoto") as File;
    const resultsUpload = formData.get("resultsUpload") as File;

    if (passportPhoto && passportPhoto.size > 0) {
      const passportPhotoExt = passportPhoto.name.split(".").pop();
      const passportPhotoName = `${applicationNumber}-passport.${passportPhotoExt}`;
      const { data: passportUploadData, error: passportError } = await supabase.storage
        .from("application-documents")
        .upload(passportPhotoName, passportPhoto);

      if (!passportError) {
        const { data: passportPublicUrl } = supabase.storage
          .from("application-documents")
          .getPublicUrl(passportPhotoName);
        passportPhotoUrl = passportPublicUrl.publicUrl;
      }
    }

    if (resultsUpload && resultsUpload.size > 0) {
      const resultsUploadExt = resultsUpload.name.split(".").pop();
      const resultsUploadName = `${applicationNumber}-results.${resultsUploadExt}`;
      const { data: resultsUploadData, error: resultsError } = await supabase.storage
        .from("application-documents")
        .upload(resultsUploadName, resultsUpload);

      if (!resultsError) {
        const { data: resultsPublicUrl } = supabase.storage
          .from("application-documents")
          .getPublicUrl(resultsUploadName);
        resultsUploadUrl = resultsPublicUrl.publicUrl;
      }
    }

    // Parse subjects array
    const subjectsArray = subjects ? JSON.parse(subjects) : [];

    // Insert application into database
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
      console.error("Error inserting application:", insertError);
      return NextResponse.json(
        { error: "Failed to submit application" },
        { status: 500 }
      );
    }

    // Send confirmation email to applicant
    if (resend) {
      try {
        await resend.emails.send({
          from: "WISEDELL ACADEMY <noreply@wisedellcollege.run.place>",
          to: parentEmail,
          subject: "Application Received - WISEDELL ACADEMY",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #1e40af;">Application Received</h1>
              <p>Dear ${parentName},</p>
              <p>Thank you for submitting an application to WISEDELL ACADEMY on behalf of ${firstName} ${lastName}.</p>
              <p><strong>Application Number:</strong> ${applicationNumber}</p>
              <p><strong>Grade Applied For:</strong> ${gradeApplying}</p>
              <p>Your application has been received and is currently being reviewed. We will contact you shortly regarding the next steps.</p>
              <p>If you have any questions, please contact us at wisedellacademy@gmail.com or call +263 77 802 2980.</p>
              <p>Best regards,<br>WISEDELL ACADEMY Administration</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
        // Don't fail the application if email fails
      }
    }

    // Send notification email to Director
    if (resend) {
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
      } catch (emailError) {
        console.error("Error sending director notification email:", emailError);
        // Don't fail the application if email fails
      }
    }

    return NextResponse.json({
      success: true,
      applicationNumber,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
