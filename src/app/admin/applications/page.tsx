"use client";

import { useState, useEffect } from "react";
import { Download, FileText, Table, Filter, Search } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const dynamic = 'force-dynamic';

interface Application {
  id: string;
  application_number: string;
  student_first_name: string;
  student_last_name: string;
  date_of_birth: string;
  gender: string;
  national_id_birth_cert: string;
  parent_name: string;
  parent_relationship: string;
  parent_phone: string;
  parent_alternative_phone: string | null;
  parent_email: string;
  physical_address: string;
  previous_school: string;
  last_grade_completed: string;
  grade_applying: string;
  subjects: string[];
  additional_comments: string | null;
  status: string;
  submitted_at: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/admin/applications");
      if (!response.ok) throw new Error("Failed to fetch applications");
      const data = await response.json();
      setApplications(data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    const matchesSearch = 
      `${app.student_first_name} ${app.student_last_name} ${app.application_number} ${app.parent_email}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(30, 64, 175);
    doc.text("WISEDELL ACADEMY", pageWidth / 2, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Applications Report", pageWidth / 2, 30, { align: "center" });
    
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 38, { align: "center" });
    
    // Stats
    const pendingCount = filteredApplications.filter(a => a.status === 'pending').length;
    const approvedCount = filteredApplications.filter(a => a.status === 'approved').length;
    const rejectedCount = filteredApplications.filter(a => a.status === 'rejected').length;
    
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(`Total: ${filteredApplications.length} | Pending: ${pendingCount} | Approved: ${approvedCount} | Rejected: ${rejectedCount}`, 14, 50);

    // Table
    const tableData = filteredApplications.map(app => [
      app.application_number,
      `${app.student_first_name} ${app.student_last_name}`,
      app.gender,
      new Date(app.date_of_birth).toLocaleDateString(),
      app.grade_applying,
      app.status.charAt(0).toUpperCase() + app.status.slice(1),
      new Date(app.submitted_at).toLocaleDateString(),
      app.parent_email,
      app.parent_phone
    ]);

    autoTable(doc, {
      startY: 55,
      head: [["App #", "Name", "Gender", "DOB", "Grade", "Status", "Submitted", "Email", "Phone"]],
      body: tableData,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [30, 64, 175], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    // Footer
    const pageCount = doc.internal.pages.length - 1; // pages array includes dummy page at index 0
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: "center" });
    }

    doc.save(`wisedell-applications-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const exportToExcel = () => {
    const exportData = filteredApplications.map(app => ({
      "Application Number": app.application_number,
      "Student Name": `${app.student_first_name} ${app.student_last_name}`,
      "Date of Birth": new Date(app.date_of_birth).toLocaleDateString(),
      "Gender": app.gender,
      "National ID": app.national_id_birth_cert,
      "Parent Name": app.parent_name,
      "Parent Relationship": app.parent_relationship,
      "Parent Phone": app.parent_phone,
      "Parent Email": app.parent_email,
      "Physical Address": app.physical_address,
      "Previous School": app.previous_school,
      "Last Grade Completed": app.last_grade_completed,
      "Grade Applying": app.grade_applying,
      "Subjects": app.subjects.join(", "),
      "Additional Comments": app.additional_comments || "",
      "Status": app.status.charAt(0).toUpperCase() + app.status.slice(1),
      "Submitted Date": new Date(app.submitted_at).toLocaleString()
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Applications");
    XLSX.writeFile(wb, `wisedell-applications-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const pendingCount = applications.filter(app => app.status === 'pending').length;
  const approvedCount = applications.filter(app => app.status === 'approved').length;
  const rejectedCount = applications.filter(app => app.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold mb-2">Manage Applications</h1>
          <p className="text-gray-200">Review and process student applications</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Applications</h3>
            <p className="text-3xl font-bold text-gray-900">{applications.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-1">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-1">Approved</h3>
            <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-1">Rejected</h3>
            <p className="text-3xl font-bold text-red-600">{rejectedCount}</p>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="font-heading text-xl font-bold text-primary">All Applications</h2>
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={exportToPDF}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FileText size={18} />
                Export PDF
              </button>
              <button
                onClick={exportToExcel}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Table size={18} />
                Export Excel
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">No applications found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-primary">{application.application_number}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {application.student_first_name} {application.student_last_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.grade_applying}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.parent_email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          application.status === 'approved' ? 'bg-green-100 text-green-800' :
                          application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(application.submitted_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a
                          href={`/admin/applications/${application.id}`}
                          className="text-primary hover:text-primary-dark"
                        >
                          View Details
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
