"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save, Calendar, Users, FileText, ToggleLeft, ToggleRight, CheckCircle, XCircle
} from "lucide-react";

export const dynamic = 'force-dynamic';

interface AdmissionsSettings {
  id: string;
  academic_year: string;
  is_open: boolean;
  max_intake: number | null;
  application_deadline: string | null;
  admission_requirements: string | null;
  programmes: string[] | null;
  fees: any;
  created_at: string;
  updated_at: string;
}

export default function AdmissionsSettingsPage() {
  const [settings, setSettings] = useState<AdmissionsSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    academic_year: "",
    is_open: false,
    max_intake: "",
    application_deadline: "",
    admission_requirements: "",
    programmes: "",
  });

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admissions-settings");
      if (!response.ok) throw new Error("Failed to fetch settings");
      const data = await response.json();
      setSettings(data);
      if (data) {
        setFormData({
          academic_year: data.academic_year,
          is_open: data.is_open,
          max_intake: data.max_intake?.toString() || "",
          application_deadline: data.application_deadline ? data.application_deadline.split('T')[0] : "",
          admission_requirements: data.admission_requirements || "",
          programmes: data.programmes?.join(", ") || "",
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const settingsData = {
        academic_year: formData.academic_year,
        is_open: formData.is_open,
        max_intake: formData.max_intake ? parseInt(formData.max_intake) : null,
        application_deadline: formData.application_deadline ? new Date(formData.application_deadline).toISOString() : null,
        admission_requirements: formData.admission_requirements || null,
        programmes: formData.programmes ? formData.programmes.split(",").map(p => p.trim()) : null,
      };

      const response = await fetch("/api/admissions-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsData),
      });

      if (!response.ok) throw new Error("Failed to save settings");
      
      await fetchSettings();
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const toggleAdmissions = async () => {
    setSaving(true);
    try {
      const newStatus = !formData.is_open;
      const settingsData = {
        academic_year: formData.academic_year,
        is_open: newStatus,
        max_intake: formData.max_intake ? parseInt(formData.max_intake) : null,
        application_deadline: formData.application_deadline ? new Date(formData.application_deadline).toISOString() : null,
        admission_requirements: formData.admission_requirements || null,
        programmes: formData.programmes ? formData.programmes.split(",").map(p => p.trim()) : null,
      };

      const response = await fetch("/api/admissions-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsData),
      });

      if (!response.ok) throw new Error("Failed to update admissions status");
      
      await fetchSettings();
      alert(newStatus ? "Admissions opened successfully!" : "Admissions closed successfully!");
    } catch (error) {
      console.error("Error updating admissions:", error);
      alert("Failed to update admissions status");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold mb-2">Admissions Settings</h1>
          <p className="text-gray-200">Manage admission applications and academic year settings</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-heading text-xl font-bold text-primary mb-4">Current Status</h3>
              <div className="text-center py-8">
                {loading ? (
                  <p className="text-gray-500">Loading...</p>
                ) : (
                  <>
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
                      formData.is_open ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {formData.is_open ? (
                        <CheckCircle className="h-12 w-12 text-green-600" />
                      ) : (
                        <XCircle className="h-12 w-12 text-red-600" />
                      )}
                    </div>
                    <p className={`text-2xl font-bold mb-2 ${
                      formData.is_open ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formData.is_open ? 'Open' : 'Closed'}
                    </p>
                    <button
                      onClick={toggleAdmissions}
                      disabled={saving}
                      className={`mt-4 px-6 py-3 rounded-lg font-medium transition-colors ${
                        formData.is_open 
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : 'bg-green-600 text-white hover:bg-green-700'
                      } disabled:opacity-50`}
                    >
                      {saving ? 'Processing...' : formData.is_open ? 'Close Admissions' : 'Open Admissions'}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <h3 className="font-heading text-xl font-bold text-primary mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Academic Year</p>
                    <p className="font-medium">{formData.academic_year || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Max Intake</p>
                    <p className="font-medium">{formData.max_intake || "Unlimited"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="font-medium">
                      {formData.application_deadline 
                        ? new Date(formData.application_deadline).toLocaleDateString() 
                        : "Not set"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-heading text-xl font-bold text-primary mb-6">Configuration</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 2024-2025"
                      value={formData.academic_year}
                      onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Intake</label>
                    <input
                      type="number"
                      placeholder="Leave empty for unlimited"
                      value={formData.max_intake}
                      onChange={(e) => setFormData({ ...formData, max_intake: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={formData.application_deadline}
                    onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available Programmes</label>
                  <input
                    type="text"
                    placeholder="e.g., Form 1, Form 2, Lower Six, Upper Six (comma-separated)"
                    value={formData.programmes}
                    onChange={(e) => setFormData({ ...formData, programmes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple programmes with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admission Requirements</label>
                  <textarea
                    value={formData.admission_requirements}
                    onChange={(e) => setFormData({ ...formData, admission_requirements: e.target.value })}
                    rows={6}
                    placeholder="List the admission requirements..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_open"
                    checked={formData.is_open}
                    onChange={(e) => setFormData({ ...formData, is_open: e.target.checked })}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <label htmlFor="is_open" className="text-sm font-medium text-gray-700">
                    Admissions currently open
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
