"use client";

import { motion } from "framer-motion";
import { DollarSign, Download } from "lucide-react";

const feeStructure = [
  {
    grade: "Form 1 - Form 2",
    term: "Per Term",
    amount: "USD 100",
    includes: ["Tuition", "Textbooks", "Sports Activities", "Library Access"],
  },
  {
    grade: "Form 3 - Form 4",
    term: "Per Term",
    amount: "USD 100",
    includes: ["Tuition", "Textbooks", "Science Lab Access", "Exam Preparation"],
  },
  {
    grade: "Lower Sixth",
    term: "Per Term",
    amount: "USD 100",
    includes: ["Tuition", "Advanced Textbooks", "Research Materials", "Career Guidance"],
  },
  {
    grade: "Upper Sixth",
    term: "Per Term",
    amount: "USD 100",
    includes: ["Tuition", "Advanced Textbooks", "Exam Registration Support", "University Preparation"],
  },
];

export default function SchoolFees() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            School Fees
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Affordable quality education with flexible payment options
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {feeStructure.map((fee, index) => (
            <motion.div
              key={fee.grade}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-center mb-6">
                <h3 className="font-heading text-xl font-bold text-primary mb-2">
                  {fee.grade}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{fee.term}</p>
                <div className="flex items-center justify-center gap-2">
                  <DollarSign className="text-secondary" size={24} />
                  <span className="text-3xl font-bold text-primary">{fee.amount}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {fee.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-heading text-2xl font-bold text-primary mb-6 text-center">
              Payment Information
            </h3>
            <div className="space-y-4 text-gray-700">
              <p><strong>Payment Methods:</strong> Cash, Bank Transfer, EcoCash</p>
              <p><strong>Payment Schedule:</strong> Fees are payable at the beginning of each term</p>
              <p><strong>Late Payment:</strong> A 10% late fee applies after the first week of term</p>
              <p><strong>Sibling Discount:</strong> 10% discount for second child, 15% for third child</p>
            </div>
            <button className="mt-6 w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
              <Download size={20} />
              Download Fee Schedule
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
