"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function Leadership() {
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
            Our Leadership
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Meet the visionary leaders behind WISEDELL ACADEMY
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="h-64 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <User className="text-white/50" size={80} />
            </div>
            <div className="p-8">
              <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                Wiseman Shoshore
              </h3>
              <p className="text-secondary font-semibold mb-4">Founder & Director</p>
              <p className="text-gray-700 leading-relaxed">
                With a passion for education and a vision to transform lives, Wiseman Shoshore founded WISEDELL ACADEMY in 2015. His commitment to providing quality education has been the driving force behind the school&apos;s growth and success.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="h-64 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <User className="text-white/50" size={80} />
            </div>
            <div className="p-8">
              <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                Mr. Chabaya
              </h3>
              <p className="text-secondary font-semibold mb-4">Principal</p>
              <p className="text-gray-700 leading-relaxed">
                Mr. Chabaya brings decades of educational leadership experience to WISEDELL ACADEMY. His dedication to academic excellence and student welfare has created an environment where every student can thrive and reach their full potential.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
