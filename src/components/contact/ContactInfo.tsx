"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function ContactInfo() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We&apos;d love to hear from you. Reach out for inquiries, admissions, or any questions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-background rounded-2xl p-6 text-center shadow-lg"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-primary" size={32} />
            </div>
            <h3 className="font-heading text-lg font-bold text-primary mb-2">Address</h3>
            <p className="text-gray-600 text-sm">
              3210 Jongwe Street<br />
              Pangolin, Masvingo<br />
              Zimbabwe
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-background rounded-2xl p-6 text-center shadow-lg"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-primary" size={32} />
            </div>
            <h3 className="font-heading text-lg font-bold text-primary mb-2">Phone</h3>
            <p className="text-gray-600 text-sm">
              +263 77 802 2980
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-background rounded-2xl p-6 text-center shadow-lg"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-primary" size={32} />
            </div>
            <h3 className="font-heading text-lg font-bold text-primary mb-2">Email</h3>
            <p className="text-gray-600 text-sm">
              wisedellacademy@gmail.com
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-background rounded-2xl p-6 text-center shadow-lg"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-primary" size={32} />
            </div>
            <h3 className="font-heading text-lg font-bold text-primary mb-2">Hours</h3>
            <p className="text-gray-600 text-sm">
              Mon - Fri: 7:00 AM - 4:00 PM<br />
              Sat: 8:00 AM - 12:00 PM
            </p>
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-background rounded-2xl overflow-hidden shadow-lg h-96 flex items-center justify-center"
        >
          <div className="text-center">
            <MapPin className="text-primary mx-auto mb-4" size={48} />
            <p className="text-gray-600">Interactive Map</p>
            <p className="text-gray-500 text-sm">Google Maps integration coming soon</p>
          </div>
        </motion.div>

        {/* WhatsApp Floating Button */}
        <motion.a
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          href="https://wa.me/263778022980"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-40"
        >
          <MessageCircle size={32} />
        </motion.a>
      </div>
    </section>
  );
}
