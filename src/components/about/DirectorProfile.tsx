"use client";

import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { useState } from "react";

export default function DirectorProfile() {
  const [showFullMessage, setShowFullMessage] = useState(false);

  const welcomeMessage = `Welcome to WISEDELL ACADEMY. It is with great pride and joy that I invite you to explore our institution, where we are committed to nurturing the next generation of leaders through academic excellence and character development.

Since founding WISEDELL ACADEMY in 2021, my vision has been to create an educational environment where every student can thrive academically, socially, and spiritually. Our dedicated team of educators works tirelessly to ensure that each child receives personalized attention and guidance to reach their full potential.

We believe that education extends beyond the classroom. Our holistic approach combines rigorous academic programs with character building, sports, arts, and community service, preparing our students not just for examinations, but for life itself.

I invite you to visit our campus, meet our exceptional staff, and discover why WISEDELL ACADEMY is the right choice for your child's educational journey. Together, we can build a brighter future for our children and our nation.`;

  const shortMessage = welcomeMessage.substring(0, 350) + "...";

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Photo Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative bg-gradient-to-br from-primary/5 to-primary/10 p-8 lg:p-12 flex items-center justify-center"
              >
                <div className="relative">
                  {/* Gold Accent Border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-secondary-light rounded-2xl transform rotate-1 opacity-80" />
                  
                  {/* Photo Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-white rounded-2xl shadow-xl overflow-hidden"
                    style={{ aspectRatio: "4/5" }}
                  >
                    {/* Placeholder Silhouette */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center">
                      {/* Elegant Silhouette */}
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-b from-gray-300 to-gray-400 mb-4 flex items-center justify-center">
                          <div className="w-28 h-28 rounded-full bg-gradient-to-b from-gray-200 to-gray-300 flex items-center justify-center">
                            <div className="w-16 h-20 rounded-full bg-gradient-to-b from-gray-400 to-gray-500" />
                          </div>
                        </div>
                        <div className="w-40 h-48 rounded-t-3xl bg-gradient-to-b from-gray-400 to-gray-500 mx-auto" />
                      </div>
                      
                      {/* Label */}
                      <div className="absolute bottom-8 left-0 right-0 text-center">
                        <p className="text-gray-500 text-sm font-medium tracking-wider uppercase">
                          Director&apos;s Photo
                        </p>
                      </div>
                    </div>

                    {/* Overlay for easy replacement */}
                    <div className="absolute inset-0 border-4 border-secondary/20 rounded-2xl pointer-events-none" />
                  </motion.div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                </div>
              </motion.div>

              {/* Biography Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="p-8 lg:p-12 flex flex-col justify-center"
              >
                {/* Quote Icon */}
                <Quote className="text-secondary/30 mb-6" size={48} />

                {/* Name and Title */}
                <div className="mb-8">
                  <h2 className="font-heading text-4xl lg:text-5xl font-bold text-primary mb-3">
                    Wiseman Shoshore
                  </h2>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-px w-12 bg-secondary" />
                    <p className="text-secondary font-semibold text-lg">Founder & Director</p>
                  </div>
                  <p className="text-gray-600 font-medium text-lg">WISEDELL ACADEMY</p>
                </div>

                {/* Welcome Message */}
                <div className="mb-8">
                  <h3 className="font-heading text-xl font-bold text-primary mb-4">
                    Director&apos;s Welcome Message
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {showFullMessage ? welcomeMessage : shortMessage}
                  </p>
                </div>

                {/* Read More Button */}
                <motion.button
                  onClick={() => setShowFullMessage(!showFullMessage)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl self-start"
                >
                  {showFullMessage ? "Show Less" : "Read Full Message"}
                  <ArrowRight size={20} className={showFullMessage ? "rotate-180" : ""} />
                </motion.button>

                {/* Signature */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="font-heading text-2xl text-primary/80 italic">
                    Wiseman Shoshore
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Founder & Director</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
