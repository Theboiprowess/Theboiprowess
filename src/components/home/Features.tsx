"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Shield, Lightbulb, Users } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Qualified Teachers",
    description: "Our dedicated team of experienced educators are committed to nurturing every student's potential.",
  },
  {
    icon: Award,
    title: "Excellent Results",
    description: "Consistently outstanding academic performance in O and A Level examinations.",
  },
  {
    icon: Shield,
    title: "Safe Learning Environment",
    description: "A secure and supportive atmosphere where students can thrive and grow confidently.",
  },
  {
    icon: Lightbulb,
    title: "Modern Teaching Methods",
    description: "Innovative approaches to education that prepare students for the challenges of tomorrow.",
  },
];

export default function Features() {
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
            Why Choose WISEDELL ACADEMY?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We provide a holistic education that develops academic excellence, character, and leadership skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <feature.icon className="text-primary" size={32} />
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
