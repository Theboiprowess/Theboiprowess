"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Upload, Send, CheckCircle } from "lucide-react";

export default function ApplicationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
            <p className="text-gray-600 text-lg mb-6">
              Thank you for your interest in WISEDELL ACADEMY. We have received your application and will contact you within 3-5 business days.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
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
          <form onSubmit={handleSubmit} className="bg-background rounded-2xl p-8 shadow-lg">
            <h3 className="font-heading text-2xl font-bold text-primary mb-6">Student Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">First Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Last Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Date of Birth *</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Gender *</label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Grade Applying For *</label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select grade</option>
                  <option value="form1">Form 1</option>
                  <option value="form2">Form 2</option>
                  <option value="form3">Form 3</option>
                  <option value="form4">Form 4</option>
                  <option value="lower6">Lower Sixth</option>
                  <option value="upper6">Upper Sixth</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Previous School *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter previous school name"
                />
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-primary mb-6">Parent/Guardian Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Parent/Guardian Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                  placeholder="+263 XXX XXX XXX"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Home Address *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter home address"
                />
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-primary mb-6">Document Uploads</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Birth Certificate *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-600">Click to upload</p>
                  <p className="text-xs text-gray-400">PDF, JPG, PNG (Max 5MB)</p>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Previous Report *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-600">Click to upload</p>
                  <p className="text-xs text-gray-400">PDF, JPG, PNG (Max 5MB)</p>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Passport Photo *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-600">Click to upload</p>
                  <p className="text-xs text-gray-400">JPG, PNG (Max 2MB)</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 text-lg"
            >
              <Send size={20} />
              Submit Application
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
