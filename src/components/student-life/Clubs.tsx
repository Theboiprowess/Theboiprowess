"use client";

import { motion } from "framer-motion";

export default function Clubs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-8">
            Clubs & Societies
          </h1>
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-12 shadow-lg">
            <p className="text-gray-700 text-xl leading-relaxed">
              WISEDELL ACADEMY currently focuses on academic excellence and sporting activities.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
