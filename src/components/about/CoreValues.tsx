"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Lightbulb, Users, Award, BookOpen } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Integrity",
    description: "We uphold the highest standards of honesty and ethical behavior in all our actions.",
  },
  {
    icon: Shield,
    title: "Excellence",
    description: "We strive for excellence in academics, character development, and all endeavors.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace creative thinking and innovative approaches to education.",
  },
  {
    icon: Users,
    title: "Respect",
    description: "We foster an environment of mutual respect among students, staff, and parents.",
  },
  {
    icon: Award,
    title: "Discipline",
    description: "We maintain high standards of discipline to create a focused learning environment.",
  },
  {
    icon: BookOpen,
    title: "Lifelong Learning",
    description: "We instill a love for learning that extends beyond formal education.",
  },
];

export default function CoreValues() {
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
            Our Core Values
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The principles that guide everything we do at WISEDELL ACADEMY
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <value.icon className="text-primary" size={32} />
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
