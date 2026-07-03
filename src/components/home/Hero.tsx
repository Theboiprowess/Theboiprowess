"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import SmokeBackground from "@/components/effects/SmokeBackground";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-primary-dark/90">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920')] bg-cover bg-center opacity-20" />
      </div>

      {/* Smoke Background Effect */}
      <SmokeBackground opacity={0.5} speed={15} density={4} className="z-0" />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-32 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6">
            Welcome to <span className="text-secondary">WISEDELL ACADEMY</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Empowering Future Leaders Through Academic Excellence
          </p>
          <p className="text-lg text-gray-300 italic mb-12">
            &quot;With God We Work Hard and Shine&quot;
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/admissions"
              className="bg-secondary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-secondary-light transition-all hover:scale-105 flex items-center gap-2 shadow-xl"
            >
              Apply Now
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all border border-white/30"
            >
              Contact Us
            </Link>
            <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all border border-white/30 flex items-center gap-2">
              <Play size={20} />
              Virtual Tour
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
