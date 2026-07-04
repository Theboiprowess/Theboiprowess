"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Upload, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface FormErrors {
  [key: string]: string;
}

export default function ApplicationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applicationNumber, setApplicationNumber] = useState<string | null>(null);
  const [emailWarning, setEmailWarning] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationalId: "",
    parentName: "",
    relationship: "parent",
    parentPhone: "",
    parentAlternativePhone: "",
    parentEmail: "",
    physicalAddress: "",
    previousSchool: "",
    lastGradeCompleted: "",
    gradeApplying: "",
    subjects: JSON.stringify([]),
    additionalComments: "",
    declaration: false,
  });

  const [files, setFiles] = useState({
    passportPhoto: null as File | null,
    resultsUpload: null as File | null,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const passportPhotoRef = useRef<HTMLInputElement>(null);
  const resultsUploadRef = useRef<HTMLInputElement>(null);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.nationalId.trim()) errors.nationalId = "National ID/Birth Certificate number is required";
    if (!formData.parentName.trim()) errors.parentName = "Parent/Guardian name is required";
    if (!formData.parentPhone.trim()) errors.parentPhone = "Phone number is required";
    if (!formData.parentEmail.trim()) errors.parentEmail = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
      errors.parentEmail = "Invalid email format";
    }
    if (!formData.physicalAddress.trim()) errors.physicalAddress = "Address is required";
    if (!formData.previousSchool.trim()) errors.previousSchool = "Previous school is required";
    if (!formData.lastGradeCompleted.trim()) errors.lastGradeCompleted = "Last grade completed is required";
    if (!formData.gradeApplying) errors.gradeApplying = "Grade applying for is required";
    if (!formData.declaration) errors.declaration = "You must accept the declaration";
    if (!files.passportPhoto) errors.passportPhoto = "Passport photo is required";
    if (!files.resultsUpload) errors.resultsUpload = "Previous results are required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFileChange = (field: "passportPhoto" | "resultsUpload", file: File | null) => {
    if (file) {
      const maxSize = field === "passportPhoto" ? 2 * 1024 * 1024 : 5 * 1024 * 1024; // 2MB for photo, 5MB for results
      const allowedTypes = field === "passportPhoto" 
        ? ["image/jpeg", "image/png", "image/jpg"]
        : ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

      if (!allowedTypes.includes(file.type)) {
        setFormErrors(prev => ({
          ...prev,
          [field]: field === "passportPhoto" 
            ? "Only JPG and PNG files allowed" 
            : "Only PDF, JPG, and PNG files allowed"
        }));
        return;
      }

      if (file.size > maxSize) {
        setFormErrors(prev => ({
          ...prev,
          [field]: field === "passportPhoto"
            ? "File size must be less than 2MB"
            : "File size must be less than 5MB"
        }));
        return;
      }

      setFormErrors(prev => ({ ...prev, [field]: "" }));
      setFiles(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      setError("Please fix the errors above before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const submitFormData = new FormData();
      
      // Add form fields (convert boolean to string)
      Object.entries(formData).forEach(([key, value]) => {
        submitFormData.append(key, typeof value === 'boolean' ? String(value) : value);
      });

      // Add files
      if (files.passportPhoto) {
        submitFormData.append("passportPhoto", files.passportPhoto);
      }
      if (files.resultsUpload) {
        submitFormData.append("resultsUpload", files.resultsUpload);
      }

      // Add reCAPTCHA token (placeholder - needs actual implementation)
      submitFormData.append("recaptchaToken", "placeholder");

      const response = await fetch("/api/applications", {
        method: "POST",
        body: submitFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      setApplicationNumber(data.applicationNumber);
      
      // Check if email was sent successfully
      if (!data.emailSent && data.emailError) {
        setEmailWarning(`Your application has been received (Application #${data.applicationNumber}), but we could not send the confirmation email. Please contact us at wisedellacademy@gmail.com for confirmation.`);
      }
      
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">
              Application Submitted!
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              Thank you for your interest in WISEDELL ACADEMY. We have received your application and will contact you within 3-5 business days.
            </p>
            {emailWarning && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-yellow-800 text-sm text-left">{emailWarning}</p>
                </div>
              </div>
            )}
            {applicationNumber && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-1">Your Application Number:</p>
                <p className="font-heading text-2xl font-bold text-primary">{applicationNumber}</p>
              </div>
            )}
            <button
              onClick={() => {
                setIsSubmitted(false);
                setApplicationNumber(null);
                setEmailWarning(null);
                setFormData({
                  firstName: "",
                  lastName: "",
                  dateOfBirth: "",
                  gender: "",
                  nationalId: "",
                  parentName: "",
                  relationship: "parent",
                  parentPhone: "",
                  parentAlternativePhone: "",
                  parentEmail: "",
                  physicalAddress: "",
                  previousSchool: "",
                  lastGradeCompleted: "",
                  gradeApplying: "",
                  subjects: JSON.stringify([]),
                  additionalComments: "",
                  declaration: false,
                });
                setFiles({ passportPhoto: null, resultsUpload: null });
                setFormErrors({});
                setError(null);
              }}
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
            >
              Submit Another Application
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            Online Application
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Fill out the form below to start your application process
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="text-red-600" size={20} />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-background rounded-2xl p-8 shadow-lg">
            <h3 className="font-heading text-2xl font-bold text-primary mb-6">Student Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">First Name *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary transition-colors`}
                  placeholder="Enter first name"
                />
                {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Last Name *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary transition-colors`}
                  placeholder="Enter last name"
                />
                {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary transition-colors`}
                />
                {formErrors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{formErrors.dateOfBirth}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Gender *</label>
                <select
                  required
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.gender ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary transition-colors`}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {formErrors.gender && <p className="text-red-500 text-sm mt-1">{formErrors.gender}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">National ID / Birth Certificate Number *</label>
                <input
                  type="text"
                  required
                  value={formData.nationalId}
                  onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.nationalId ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary transition-colors`}
                  placeholder="Enter ID number"
                />
                {formErrors.nationalId && <p className="text-red-500 text-sm mt-1">{formErrors.nationalId}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Grade Applying For *</label>
                <select
                  required
                  value={formData.gradeApplying}
                  onChange={(e) => setFormData({ ...formData, gradeApplying: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.gradeApplying ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary transition-colors`}
                >
                  <option value="">Select grade</option>
                  <option value="Form 1">Form 1</option>
                  <option value="Form 2">Form 2</option>
                  <option value="Form 3">Form 3</option>
                  <option value="Form 4">Form 4</option>
                  <option value="Lower Sixth">Lower Sixth</option>
                  <option value="Upper Sixth">Upper Sixth</option>
                  <option value="O-Level Rewrites">O-Level Rewrites</option>
                  <option value="A-Level Rewrites">A-Level Rewrites</option>
                </select>
                {formErrors.gradeApplying && <p className="text-red-500 text-sm mt-1">{formErrors.gradeApplying}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Previous School *</label>
                <input
                  type="text"
                  required
                  value={formData.previousSchool}
                  onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.previousSchool ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary transition-colors`}
                  placeholder="Enter previous school name"
                />
                {formErrors.previousSchool && <p className="text-red-500 text-sm mt-1">{formErrors.previousSchool}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Last Grade Completed *</label>
                <input
                  type="text"
                  required
                  value={formData.lastGradeCompleted}
                  onChange={(e) => setFormData({ ...formData, lastGradeCompleted: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.lastGradeCompleted ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary transition-colors`}
                  placeholder="e.g., Grade 7, Form 4, etc."
                />
                {formErrors.lastGradeCompleted && <p className="text-red-500 text-sm mt-1">{formErrors.lastGradeCompleted}</p>}
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-primary mb-6">Parent/Guardian Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Parent/Guardian Name *</label>
                <input
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.parentName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary transition-colors`}
                  placeholder="Enter full name"
                />
                {formErrors.parentName && <p className="text-red-500 text-sm mt-1">{formErrors.parentName}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Relationship *</label>
                <select
                  required
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="parent">Parent</option>
                  <option value="guardian">Guardian</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.parentPhone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary transition-colors`}
                  placeholder="+263 XXX XXX XXX"
                />
                {formErrors.parentPhone && <p className="text-red-500 text-sm mt-1">{formErrors.parentPhone}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Alternative Phone</label>
                <input
                  type="tel"
                  value={formData.parentAlternativePhone}
                  onChange={(e) => setFormData({ ...formData, parentAlternativePhone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                  placeholder="+263 XXX XXX XXX"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.parentEmail ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary transition-colors`}
                  placeholder="email@example.com"
                />
                {formErrors.parentEmail && <p className="text-red-500 text-sm mt-1">{formErrors.parentEmail}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Home Address *</label>
                <input
                  type="text"
                  required
                  value={formData.physicalAddress}
                  onChange={(e) => setFormData({ ...formData, physicalAddress: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.physicalAddress ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary transition-colors`}
                  placeholder="Enter home address"
                />
                {formErrors.physicalAddress && <p className="text-red-500 text-sm mt-1">{formErrors.physicalAddress}</p>}
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-primary mb-6">Document Uploads</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Passport Photo *</label>
                <input
                  ref={passportPhotoRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={(e) => handleFileChange("passportPhoto", e.target.files?.[0] || null)}
                  className="hidden"
                />
                <div
                  onClick={() => passportPhotoRef.current?.click()}
                  className={`border-2 border-dashed ${formErrors.passportPhoto ? 'border-red-500' : 'border-gray-300'} rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer`}
                >
                  {files.passportPhoto ? (
                    <div>
                      <CheckCircle className="mx-auto text-green-600 mb-2" size={32} />
                      <p className="text-sm text-gray-600">{files.passportPhoto.name}</p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-sm text-gray-600">Click to upload</p>
                      <p className="text-xs text-gray-400">JPG, PNG (Max 2MB)</p>
                    </div>
                  )}
                </div>
                {formErrors.passportPhoto && <p className="text-red-500 text-sm mt-1">{formErrors.passportPhoto}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Previous Results *</label>
                <input
                  ref={resultsUploadRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,application/pdf"
                  onChange={(e) => handleFileChange("resultsUpload", e.target.files?.[0] || null)}
                  className="hidden"
                />
                <div
                  onClick={() => resultsUploadRef.current?.click()}
                  className={`border-2 border-dashed ${formErrors.resultsUpload ? 'border-red-500' : 'border-gray-300'} rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer`}
                >
                  {files.resultsUpload ? (
                    <div>
                      <CheckCircle className="mx-auto text-green-600 mb-2" size={32} />
                      <p className="text-sm text-gray-600">{files.resultsUpload.name}</p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-sm text-gray-600">Click to upload</p>
                      <p className="text-xs text-gray-400">PDF, JPG, PNG (Max 5MB)</p>
                    </div>
                  )}
                </div>
                {formErrors.resultsUpload && <p className="text-red-500 text-sm mt-1">{formErrors.resultsUpload}</p>}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-2">Additional Comments</label>
              <textarea
                value={formData.additionalComments}
                onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                rows={4}
                placeholder="Any additional information you'd like to share"
              />
            </div>

            <div className="mb-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.declaration}
                  onChange={(e) => setFormData({ ...formData, declaration: e.target.checked })}
                  className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="text-gray-700">
                  I declare that the information provided in this application is true and correct to the best of my knowledge. I understand that any false information may result in the rejection of this application. *
                </span>
              </label>
              {formErrors.declaration && <p className="text-red-500 text-sm mt-1">{formErrors.declaration}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Submit Application
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
