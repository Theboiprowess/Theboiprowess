"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Admissions Now Open for 2025
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join our community of learners and leaders. Apply today to secure your place at WISEDELL ACADEMY.
          </p>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 bg-secondary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-secondary-light transition-all hover:scale-105 shadow-xl"
          >
            Apply Now
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
