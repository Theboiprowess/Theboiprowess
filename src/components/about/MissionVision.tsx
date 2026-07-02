"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

export default function MissionVision() {
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
            Our Mission & Vision
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Target className="text-primary" size={32} />
            </div>
            <h3 className="font-heading text-2xl font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To provide a transformative educational experience that develops academic excellence, critical thinking, and moral character. We are committed to nurturing each student&apos;s unique potential while fostering a love for learning that extends beyond the classroom.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Eye className="text-primary" size={32} />
            </div>
            <h3 className="font-heading text-2xl font-bold text-primary mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be the leading institution of learning in Zimbabwe, recognized for producing exceptional leaders who make meaningful contributions to their communities and the world. We envision a future where every WISEDELL graduate is equipped to excel in an ever-changing global landscape.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
