"use client";

import { motion } from "framer-motion";
import { CheckCircle, FileText, User, Calendar } from "lucide-react";
import { getNextAcademicYear } from "@/lib/date-utils";

const requirements = [
  {
    icon: FileText,
    title: "Academic Records",
    description: "Copy of previous school report showing academic performance",
  },
  {
    icon: User,
    title: "Birth Certificate",
    description: "Certified copy of the student's birth certificate",
  },
  {
    icon: Calendar,
    title: "Age Requirement",
    description: "Students must meet the age requirements for their grade level",
  },
  {
    icon: CheckCircle,
    title: "Parent/Guardian Information",
    description: "Valid contact information and proof of guardianship",
  },
];

export default function AdmissionRequirements() {
  const nextAcademicYear = getNextAcademicYear();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            Admission Requirements
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to know about applying to WISEDELL ACADEMY for the {nextAcademicYear} academic year
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {requirements.map((req, index) => (
            <motion.div
              key={req.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <req.icon className="text-primary" size={32} />
              </div>
              <h3 className="font-heading text-lg font-bold text-primary mb-2">
                {req.title}
              </h3>
              <p className="text-gray-600 text-sm">{req.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 text-white"
        >
          <h2 className="font-heading text-2xl font-bold mb-4">How to Apply</h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-primary font-bold flex-shrink-0">1</span>
              <p>Complete the online application form below with all required information</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-primary font-bold flex-shrink-0">2</span>
              <p>Upload required documents (birth certificate, previous report, passport photo)</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-primary font-bold flex-shrink-0">3</span>
              <p>Submit your application and wait for confirmation email</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-primary font-bold flex-shrink-0">4</span>
              <p>Attend an interview and assessment session if shortlisted</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-primary font-bold flex-shrink-0">5</span>
              <p>Receive admission offer and complete enrollment process</p>
            </li>
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
