"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mrs. T. Moyo",
    role: "Parent",
    content: "WISEDELL ACADEMY has transformed my child's academic journey. The teachers are dedicated and the environment is nurturing.",
    rating: 5,
  },
  {
    name: "John K. Moyo",
    role: "Former Student",
    content: "The education I received at WISEDELL prepared me well for university. The values and skills I learned stay with me today.",
    rating: 5,
  },
  {
    name: "Dr. S. Chikwinya",
    role: "Parent",
    content: "Excellent school with a strong focus on both academics and character development. Highly recommended for any parent.",
    rating: 5,
  },
];

export default function Testimonials() {
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
            What People Say About Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hear from our parents, students, and community members
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative"
            >
              <Quote className="text-primary/20 absolute top-6 right-6" size={48} />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="fill-secondary text-secondary" size={20} />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">&quot;{testimonial.content}&quot;</p>
              <div>
                <h4 className="font-heading font-bold text-primary">{testimonial.name}</h4>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
