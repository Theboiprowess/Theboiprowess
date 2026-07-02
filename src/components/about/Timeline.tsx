"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "2021",
    title: "Foundation",
    description: "WISEDELL ACADEMY was founded with 50 students and 5 teachers.",
  },
  {
    year: "2022",
    title: "First O-Level Results",
    description: "Our first cohort achieved a 90% pass rate in O-Level examinations.",
  },
  {
    year: "2023",
    title: "Expansion",
    description: "Expanded facilities with new classrooms.",
  },
  {
    year: "2024",
    title: "A-Level Introduction",
    description: "Introduced A-Level programs in Business Studies, Mathematics, and Economics.",
  },
  {
    year: "2025",
    title: "Excellence Recognition",
    description: "Recognized as one of the top performing schools in Masvingo province.",
  },
  {
    year: "2026",
    title: "Continued Growth",
    description: "Now serving over 500 students with 35 qualified teachers.",
  },
];

export default function Timeline() {
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
            Our Journey
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Key milestones in WISEDELL ACADEMY&apos;s history
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-secondary rounded-full border-4 border-white shadow-lg" />

                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <div className="bg-background rounded-xl p-6 shadow-lg">
                    <span className="text-secondary font-bold text-2xl">{milestone.year}</span>
                    <h3 className="font-heading text-xl font-bold text-primary mt-2 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="w-2/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
