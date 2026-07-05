"use client";

import { motion } from "framer-motion";
import { User, Award, Mail } from "lucide-react";
import Image from "next/image";

const teachers = [
  {
    name: "Mr. Shoshore",
    position: "Founder & Director",
    subject: "Mathematics",
    biography: "With over 14 years of teaching experience, Mr. Shoshore founded WISEDELL ACADEMY with a vision to provide quality education.",
    yearsOfExperience: 14,
    image: "/mr-shoshore.jpg",
  },
  {
    name: "Mr. Chabaya",
    position: "Principal",
    subject: "Physics",
    biography: "Mr. Chabaya brings decades of educational leadership experience and a passion for science education.",
    yearsOfExperience: 14,
  },
  {
    name: "Mrs. Mandivenga",
    position: "Teacher",
    subject: "English Language",
    biography: "Mrs. Mandivenga specializes in English literature and language arts with a focus on developing strong communication skills.",
    yearsOfExperience: 12,
  },
  {
    name: "Mrs. Tapera",
    position: "Teacher",
    subject: "Biology",
    biography: "Mrs. Tapera is passionate about life sciences and makes biology engaging through practical experiments.",
    yearsOfExperience: 10,
  },
  {
    name: "Mrs. Charenga",
    position: "Teacher",
    subject: "Chemistry",
    biography: "Mrs. Charenga brings chemistry to life with hands-on experiments and real-world applications.",
    yearsOfExperience: 10,
  },
  {
    name: "Sir Shakey",
    position: "Teacher",
    subject: "Mathematics",
    biography: "Sir Shakey has a gift for making complex mathematical concepts accessible and enjoyable for students.",
    yearsOfExperience: 8,
  },
  {
    name: "Sir Professor",
    position: "Teacher",
    subject: "Commerce",
    biography: "Sir Professor combines academic knowledge with practical business experience to prepare students for the business world.",
    yearsOfExperience: 12,
  },
  {
    name: "Sir Layah",
    position: "Teacher",
    subject: "History",
    biography: "Sir Layah brings history to life through storytelling and interactive learning methods.",
    yearsOfExperience: 7,
  },
  {
    name: "Mr. Mateme",
    position: "Teacher",
    subject: "Geography",
    biography: "Mr. Mateme uses field trips and practical exercises to help students understand the world around them.",
    yearsOfExperience: 9,
  },
];

export default function TeachersGrid() {
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
            Our Dedicated Teachers
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Meet the passionate educators who inspire and guide our students every day
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                {teacher.image ? (
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-white/50" size={80} />
                )}
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-primary mb-1">
                  {teacher.name}
                </h3>
                <p className="text-secondary font-semibold text-sm mb-3">
                  {teacher.position}
                </p>
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                  <Mail size={16} />
                  <span>{teacher.yearsOfExperience} years experience</span>
                </div>
                {teacher.name === "Mr. Shoshore" && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {teacher.biography}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
