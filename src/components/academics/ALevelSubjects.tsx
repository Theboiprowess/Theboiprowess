"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const aLevelSubjects = [
  { 
    name: "Business Studies", 
    description: "Advanced business management, marketing, and entrepreneurship",
    careerPaths: ["Business Management", "Marketing", "Entrepreneurship", "Finance"]
  },
  { 
    name: "Mathematics", 
    description: "Calculus, statistics, and advanced mathematical applications",
    careerPaths: ["Engineering", "Data Science", "Finance", "Research"]
  },
  { 
    name: "Economics", 
    description: "Micro and macroeconomics, economic theory and analysis",
    careerPaths: ["Economics", "Finance", "Policy Analysis", "Banking"]
  },
];

export default function ALevelSubjects() {
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
            A Level Subjects
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Advanced studies preparing students for university and professional careers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {aLevelSubjects.map((subject, index) => (
            <motion.div
              key={subject.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <GraduationCap className="text-primary" size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-3">
                {subject.name}
              </h3>
              <p className="text-gray-600 mb-6">{subject.description}</p>
              <div>
                <h4 className="font-semibold text-primary mb-2">Career Paths:</h4>
                <ul className="space-y-1">
                  {subject.careerPaths.map((path) => (
                    <li key={path} className="text-gray-600 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      {path}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
