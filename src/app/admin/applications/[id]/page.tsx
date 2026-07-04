"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  Printer,
  Mail,
  User,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const dynamic = 'force-dynamic';

interface Application {
  id: string;
  application_number: string;
  student_first_name: string;
  student_last_name: string;
  date_of_birth: string;
  gender: string;
  national_id_birth_cert: string;
  passport_photo_url: string | null;
  parent_name: string;
  parent_relationship: string;
  parent_phone: string;
  parent_alternative_phone: string | null;
  parent_email: string;
  physical_address: string;
  previous_school: string;
  last_grade_completed: string;
  results_upload_url: string | null;
  grade_applying: string;
  subjects: string[];
  additional_comments: string | null;
  status: string;
  submitted_at: string;
  reviewed_at: string | null;
  director_notes: string | null;
}

export default function ApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [notes, setNotes] = useState("");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  const resend = new Resend(process.env.RESEND_API_KEY || "");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session && params.id) {
      fetchApplication();
    }
  }, [session, params.id]);

  const fetchApplication = async () => {
    try {
      const response = await fetch(`/api/admin/applications/${params.id}`);
      if (!response.ok) throw new Error("Failed to fetch application");
      const data = await response.json();

      setApplication(data);
      setNotes(data.director_notes || "");
    } catch (error) {
      console.error("Error fetching application:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus: string) => {
    if (!application) return;

    setUpdating(true);

    try {
      // Update application status via API
      const response = await fetch(`/api/admin/applications/${application.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          director_notes: notes,
          reviewed_at: new Date().toISOString(),
          reviewed_by: session?.user?.email,
        }),
      });

      if (!response.ok) throw new Error("Failed to update application");

      // Add audit log entry
      await fetch("/api/notifications", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: "application_status_changed",
          title: `Application ${newStatus}`,
          message: `Application ${application.application_number} status changed to ${newStatus}`,
          related_id: application.id,
        }),
      });

      // Send email notification based on status
      let emailSubject = "";
      let emailBody = "";

      if (newStatus === "approved") {
        emailSubject = "Application Approved - WISEDELL ACADEMY";
        emailBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1e40af;">Congratulations!</h1>
            <p>Dear ${application.parent_name},</p>
            <p>Your application to WISEDELL ACADEMY on behalf of ${application.student_first_name} ${application.student_last_name} has been <strong>approved</strong>.</p>
            <p><strong>Application Number:</strong> ${application.application_number}</p>
            <p><strong>Grade:</strong> ${application.grade_applying}</p>
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
      } else if (newStatus === "rejected") {
        emailSubject = "Application Update - WISEDELL ACADEMY";
        emailBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1e40af;">Application Update</h1>
            <p>Dear ${application.parent_name},</p>
            <p>Thank you for applying to WISEDELL ACADEMY on behalf of ${application.student_first_name} ${application.student_last_name}.</p>
            <p>Unfortunately, your application was not successful at this time.</p>
            <p><strong>Application Number:</strong> ${application.application_number}</p>
            <p>We appreciate your interest in our school and wish you the best in your educational journey.</p>
            <p>If you have any questions, please contact us at wisedellacademy@gmail.com or call +263 77 802 2980.</p>
            <p>Best regards,<br>WISEDELL ACADEMY Administration</p>
          </div>
        `;
      } else if (newStatus === "more_info_requested") {
        emailSubject = "Additional Information Required - WISEDELL ACADEMY";
        emailBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1e40af;">Additional Information Required</h1>
            <p>Dear ${application.parent_name},</p>
            <p>Your application to WISEDELL ACADEMY on behalf of ${application.student_first_name} ${application.student_last_name} requires additional information.</p>
            <p><strong>Application Number:</strong> ${application.application_number}</p>
            <p><strong>Notes:</strong> ${notes || "Please contact the school for more details."}</p>
            <p>Please provide the requested information at your earliest convenience.</p>
            <p>If you have any questions, please contact us at wisedellacademy@gmail.com or call +263 77 802 2980.</p>
            <p>Best regards,<br>WISEDELL ACADEMY Administration</p>
          </div>
        `;
      }

      if (emailSubject && emailBody) {
        const emailResult = await resend.emails.send({
          from: "WISEDELL ACADEMY <noreply@wisedellacademy.co.zw>",
          to: application.parent_email,
          subject: emailSubject,
          html: emailBody,
        });

        if (emailResult.error) {
          console.error("Email send error:", emailResult.error);
        }
      }

      // Log activity
      try {
        await fetch("/api/activity-logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: `application_${newStatus}`,
            entity_type: "application",
            entity_id: application.id,
            user_email: session?.user?.email,
            details: {
              application_number: application.application_number,
              old_status: application.status,
              new_status: newStatus,
              notes: notes,
            },
          }),
        });
      } catch (logError) {
        console.error("Error logging activity:", logError);
      }

      // Refresh application data
      await fetchApplication();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const saveNotes = async () => {
    if (!application) return;

    try {
      const { error } = await supabase
        .from("applications")
        .update({ director_notes: notes })
        .eq("id", application.id);

      if (error) throw error;

      alert("Notes saved successfully");
    } catch (error) {
      console.error("Error saving notes:", error);
      alert("Failed to save notes. Please try again.");
    }
  };

  const printApplication = () => {
    if (!application) return;

    const doc = new jsPDF();
    let currentY = 0;
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(30, 64, 175);
    doc.text("WISEDELL ACADEMY", 105, 20, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Application Form", 105, 30, { align: "center" });
    
    doc.setFontSize(10);
    doc.text(`Application Number: ${application.application_number}`, 105, 40, { align: "center" });
    
    // Student Details
    doc.setFontSize(12);
    doc.setTextColor(30, 64, 175);
    doc.text("Student Details", 14, 55);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const studentData = [
      ["Name:", `${application.student_first_name} ${application.student_last_name}`],
      ["Date of Birth:", application.date_of_birth],
      ["Gender:", application.gender],
      ["National ID/Birth Cert:", application.national_id_birth_cert],
    ];
    
    autoTable(doc, {
      startY: 60,
      head: [],
      body: studentData,
      theme: "plain",
      didDrawPage: (data) => {
        currentY = data.cursor?.y || 60;
      },
    });
    
    // Parent Details
    doc.setFontSize(12);
    doc.setTextColor(30, 64, 175);
    doc.text("Parent/Guardian Details", 14, currentY + 15);
    
    const parentData = [
      ["Name:", application.parent_name],
      ["Relationship:", application.parent_relationship],
      ["Phone:", application.parent_phone],
      ["Alternative Phone:", application.parent_alternative_phone || "N/A"],
      ["Email:", application.parent_email],
      ["Address:", application.physical_address],
    ];
    
    autoTable(doc, {
      startY: currentY + 20,
      head: [],
      body: parentData,
      theme: "plain",
      didDrawPage: (data) => {
        currentY = data.cursor?.y || currentY + 20;
      },
    });
    
    // Academic Details
    doc.setFontSize(12);
    doc.setTextColor(30, 64, 175);
    doc.text("Academic Information", 14, currentY + 15);
    
    const academicData = [
      ["Previous School:", application.previous_school],
      ["Last Grade Completed:", application.last_grade_completed],
      ["Grade Applying For:", application.grade_applying],
      ["Subjects:", application.subjects?.join(", ") || "N/A"],
    ];
    
    autoTable(doc, {
      startY: currentY + 20,
      head: [],
      body: academicData,
      theme: "plain",
      didDrawPage: (data) => {
        currentY = data.cursor?.y || currentY + 20;
      },
    });
    
    // Additional Comments
    if (application.additional_comments) {
      doc.setFontSize(12);
      doc.setTextColor(30, 64, 175);
      doc.text("Additional Comments", 14, currentY + 15);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(application.additional_comments, 14, currentY + 25, { maxWidth: 180 });
      currentY += 35;
    }
    
    // Status
    doc.setFontSize(12);
    doc.setTextColor(30, 64, 175);
    doc.text("Application Status", 14, currentY + 15);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Status: ${application.status.toUpperCase()}`, 14, currentY + 25);
    doc.text(`Submitted: ${new Date(application.submitted_at).toLocaleDateString()}`, 14, currentY + 32);
    
    doc.save(`${application.application_number}.pdf`);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Application not found</p>
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="mt-4 text-primary hover:text-primary-dark"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="font-heading text-2xl font-bold text-primary">
                  Application Details
                </h1>
                <p className="text-sm text-gray-600">
                  {application.application_number}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={printApplication}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Printer size={20} />
                <span className="hidden md:inline">Print</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Student Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="text-primary" size={20} />
                </div>
                <h2 className="font-heading text-xl font-bold text-primary">
                  Student Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium">
                    {application.student_first_name} {application.student_last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-medium">{application.date_of_birth}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-medium">{application.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">National ID / Birth Cert</p>
                  <p className="font-medium">{application.national_id_birth_cert}</p>
                </div>
              </div>

              {application.passport_photo_url && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Passport Photo</p>
                  <img
                    src={application.passport_photo_url}
                    alt="Passport Photo"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </motion.div>

            {/* Parent Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="text-primary" size={20} />
                </div>
                <h2 className="font-heading text-xl font-bold text-primary">
                  Parent/Guardian Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{application.parent_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Relationship</p>
                  <p className="font-medium">{application.parent_relationship}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{application.parent_phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Alternative Phone</p>
                  <p className="font-medium">
                    {application.parent_alternative_phone || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{application.parent_email}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Physical Address</p>
                  <p className="font-medium">{application.physical_address}</p>
                </div>
              </div>
            </motion.div>

            {/* Academic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="text-primary" size={20} />
                </div>
                <h2 className="font-heading text-xl font-bold text-primary">
                  Academic Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Previous School</p>
                  <p className="font-medium">{application.previous_school}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Grade Completed</p>
                  <p className="font-medium">{application.last_grade_completed}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Grade Applying For</p>
                  <p className="font-medium">{application.grade_applying}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Subjects</p>
                  <p className="font-medium">
                    {application.subjects?.join(", ") || "N/A"}
                  </p>
                </div>
              </div>

              {application.results_upload_url && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Results Document</p>
                  <a
                    href={application.results_upload_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-dark"
                  >
                    <Download size={16} />
                    View Results
                  </a>
                </div>
              )}
            </motion.div>

            {/* Additional Comments */}
            {application.additional_comments && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileText className="text-primary" size={20} />
                  </div>
                  <h2 className="font-heading text-xl font-bold text-primary">
                    Additional Comments
                  </h2>
                </div>

                <p className="text-gray-700">{application.additional_comments}</p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="font-heading text-lg font-bold text-primary mb-4">
                Application Status
              </h3>

              <div className="mb-6">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    application.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : application.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : application.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {application.status.replace(/_/g, " ").toUpperCase()}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => updateStatus("approved")}
                  disabled={updating || application.status === "approved"}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle size={20} />
                  Approve
                </button>
                <button
                  onClick={() => updateStatus("rejected")}
                  disabled={updating || application.status === "rejected"}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <XCircle size={20} />
                  Reject
                </button>
                <button
                  onClick={() => updateStatus("more_info_requested")}
                  disabled={updating}
                  className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Mail size={20} />
                  Request More Info
                </button>
              </div>
            </motion.div>

            {/* Director Notes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="font-heading text-lg font-bold text-primary mb-4">
                Director Notes
              </h3>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Add notes about this application..."
              />

              <button
                onClick={saveNotes}
                className="mt-4 w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Save Notes
              </button>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="font-heading text-lg font-bold text-primary mb-4">
                Timeline

</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="text-primary mt-1" size={16} />
                  <div>
                    <p className="text-sm font-medium">Submitted</p>
                    <p className="text-xs text-gray-600">
                      {new Date(application.submitted_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                {application.reviewed_at && (
                  <div className="flex items-start gap-3">
                    <Calendar className="text-primary mt-1" size={16} />
                    <div>
                      <p className="text-sm font-medium">Reviewed</p>
                      <p className="text-xs text-gray-600">
                        {new Date(application.reviewed_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
