"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const oLevelSubjects = [
  { name: "Mathematics", description: "Core mathematical concepts and problem-solving skills" },
  { name: "English Language", description: "Advanced reading, writing, and communication skills" },
  { name: "Integrated Science", description: "Combined physics, chemistry, and biology fundamentals" },
  { name: "Shona", description: "Native language studies and cultural appreciation" },
  { name: "Commerce", description: "Business studies and economic principles" },
  { name: "History", description: "World and Zimbabwean history" },
  { name: "Heritage Studies", description: "Cultural heritage and social studies" },
  { name: "Family and Religious Studies", description: "Moral education and religious studies" },
  { name: "Accounts", description: "Financial accounting and bookkeeping" },
  { name: "Biology", description: "Life sciences and biological systems" },
  { name: "Chemistry", description: "Chemical principles and laboratory work" },
  { name: "Physics", description: "Physical sciences and mechanics" },
  { name: "Geography", description: "Physical and human geography" },
];

export default function OLevelSubjects() {
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
            O Level Subjects
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive curriculum designed to build strong academic foundations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {oLevelSubjects.map((subject, index) => (
            <motion.div
              key={subject.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-background rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-primary" size={24} />
              </div>
              <h3 className="font-heading text-lg font-bold text-primary mb-2">
                {subject.name}
              </h3>
              <p className="text-gray-600 text-sm">{subject.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
