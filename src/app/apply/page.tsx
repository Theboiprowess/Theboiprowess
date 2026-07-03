"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, MapPin, GraduationCap, FileText, Upload, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import GoogleReCAPTCHA from "react-google-recaptcha";
import { getNextAcademicYear } from "@/lib/date-utils";

const applicationSchema = z.object({
  // Personal Details
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  nationalId: z.string().min(5, "National ID/Birth Certificate number is required"),
  passportPhoto: z.any().optional(),

  // Parent/Guardian Details
  parentName: z.string().min(2, "Parent/Guardian name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  parentPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  parentAlternativePhone: z.string().optional(),
  parentEmail: z.string().email("Invalid email address"),
  physicalAddress: z.string().min(10, "Physical address is required"),

  // Academic Information
  previousSchool: z.string().min(2, "Previous school is required"),
  lastGradeCompleted: z.string().min(1, "Last grade completed is required"),
  resultsUpload: z.any().optional(),
  gradeApplying: z.string().min(1, "Grade applying for is required"),
  subjects: z.array(z.string()).optional(),

  // Additional Information
  additionalComments: z.string().optional(),
  declaration: z.boolean().refine((val) => val === true, "You must accept the declaration"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const gradeOptions = [
  "Form 1",
  "Form 2",
  "Form 3",
  "Form 4",
  "Form 5 Lower Six",
  "Form 6 Upper Six",
  "O-Level Rewrites",
  "A-Level Rewrites",
];

const subjectOptions = [
  "Mathematics",
  "English Language",
  "Biology",
  "Chemistry",
  "Physics",
  "History",
  "Geography",
  "Commerce",
  "Business Studies",
  "Economics",
  "Accounting",
  "Heritage Studies",
];

export default function ApplyPage() {
  const nextAcademicYear = getNextAcademicYear();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [passportPhotoFile, setPassportPhotoFile] = useState<File | null>(null);
  const [resultsFile, setResultsFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const selectedSubjects = watch("subjects") || [];

  const toggleSubject = (subject: string) => {
    const currentSubjects = watch("subjects") || [];
    const newSubjects = currentSubjects.includes(subject)
      ? currentSubjects.filter((s) => s !== subject)
      : [...currentSubjects, subject];
    
    // @ts-ignore - React Hook Form will handle this
    setValue("subjects", newSubjects);
  };

  const onSubmit = async (data: ApplicationFormData) => {
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA verification");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file uploads
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "subjects") {
          formData.append(key, JSON.stringify(data[key as keyof ApplicationFormData]));
        } else if (key !== "passportPhoto" && key !== "resultsUpload") {
          formData.append(key, String(data[key as keyof ApplicationFormData]));
        }
      });

      // Add dynamic academic year
      formData.append("academicYear", String(nextAcademicYear));

      if (passportPhotoFile) {
        formData.append("passportPhoto", passportPhotoFile);
      }
      if (resultsFile) {
        formData.append("resultsUpload", resultsFile);
      }

      formData.append("recaptchaToken", recaptchaToken);

      const response = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        const error = await response.json();
        alert(error.message || "Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="text-green-600" size={48} />
              </div>
              <h1 className="font-heading text-4xl font-bold text-primary mb-4">
                Application Submitted Successfully!
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                Your application has been submitted successfully. WISEDELL ACADEMY will review your application and contact you shortly.
              </p>
              <p className="text-gray-500 mb-8">
                A confirmation email has been sent to your provided email address.
              </p>
              <button
                onClick={() => (window.location.href = "/")}
                className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
              >
                Return to Home
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
              Online Application
            </h1>
            <p className="text-gray-600 text-lg">
              Apply to WISEDELL ACADEMY for the {nextAcademicYear} academic year - Complete the form below to begin your journey with us.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="text-primary" size={24} />
                </div>
                <h2 className="font-heading text-2xl font-bold text-primary">Personal Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    {...register("firstName")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    {...register("lastName")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    {...register("dateOfBirth")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    {...register("gender")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    National ID / Birth Certificate Number *
                  </label>
                  <input
                    type="text"
                    {...register("nationalId")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter National ID or Birth Certificate number"
                  />
                  {errors.nationalId && (
                    <p className="text-red-500 text-sm mt-1">{errors.nationalId.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passport Photo Upload
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPassportPhotoFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="passportPhoto"
                    />
                    <label
                      htmlFor="passportPhoto"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="text-gray-400 mb-2" size={32} />
                      <span className="text-gray-600">
                        {passportPhotoFile ? passportPhotoFile.name : "Click to upload passport photo"}
                      </span>
                      <span className="text-gray-400 text-sm mt-1">
                        JPG, PNG (Max 5MB)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Parent/Guardian Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="text-primary" size={24} />
                </div>
                <h2 className="font-heading text-2xl font-bold text-primary">Parent/Guardian Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    {...register("parentName")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter parent/guardian full name"
                  />
                  {errors.parentName && (
                    <p className="text-red-500 text-sm mt-1">{errors.parentName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship *
                  </label>
                  <select
                    {...register("relationship")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select relationship</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                  {errors.relationship && (
                    <p className="text-red-500 text-sm mt-1">{errors.relationship.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    {...register("parentPhone")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+263 XXX XXX XXX"
                  />
                  {errors.parentPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.parentPhone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternative Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register("parentAlternativePhone")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+263 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register("parentEmail")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="email@example.com"
                  />
                  {errors.parentEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.parentEmail.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Physical Address *
                  </label>
                  <textarea
                    {...register("physicalAddress")}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter full physical address"
                  />
                  {errors.physicalAddress && (
                    <p className="text-red-500 text-sm mt-1">{errors.physicalAddress.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="text-primary" size={24} />
                </div>
                <h2 className="font-heading text-2xl font-bold text-primary">Academic Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous School *
                  </label>
                  <input
                    type="text"
                    {...register("previousSchool")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Name of previous school"
                  />
                  {errors.previousSchool && (
                    <p className="text-red-500 text-sm mt-1">{errors.previousSchool.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Grade Completed *
                  </label>
                  <input
                    type="text"
                    {...register("lastGradeCompleted")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., Grade 7, Form 4"
                  />
                  {errors.lastGradeCompleted && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastGradeCompleted.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Results Upload (PDF or Image)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setResultsFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="resultsUpload"
                    />
                    <label
                      htmlFor="resultsUpload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="text-gray-400 mb-2" size={32} />
                      <span className="text-gray-600">
                        {resultsFile ? resultsFile.name : "Click to upload results"}
                      </span>
                      <span className="text-gray-400 text-sm mt-1">
                        PDF, JPG, PNG (Max 5MB)
                      </span>
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Applying For *
                  </label>
                  <select
                    {...register("gradeApplying")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select grade</option>
                    {gradeOptions.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                  {errors.gradeApplying && (
                    <p className="text-red-500 text-sm mt-1">{errors.gradeApplying.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subjects (Optional)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {subjectOptions.map((subject) => (
                      <button
                        key={subject}
                        type="button"
                        onClick={() => toggleSubject(subject)}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                          selectedSubjects.includes(subject)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-gray-300 hover:border-primary"
                        }`}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileText className="text-primary" size={24} />
                </div>
                <h2 className="font-heading text-2xl font-bold text-primary">Additional Information</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comments (Optional)
                </label>
                <textarea
                  {...register("additionalComments")}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Any additional information you would like to share"
                />
              </div>
            </div>

            {/* Declaration */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  {...register("declaration")}
                  className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <div>
                  <label className="text-sm text-gray-700">
                    I certify that the information provided in this application is true and accurate to the best of my knowledge. I understand that any false information may result in the rejection of this application. *
                  </label>
                  {errors.declaration && (
                    <p className="text-red-500 text-sm mt-1">{errors.declaration.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* reCAPTCHA */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <GoogleReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                onChange={setRecaptchaToken}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-12 py-4 rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
