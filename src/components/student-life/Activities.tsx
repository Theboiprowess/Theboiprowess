"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Trophy } from "lucide-react";

const activities = [
  {
    title: "Annual Sports Day",
    description: "A day of athletic competition and school spirit with various track and field events.",
    date: "Term 1",
    icon: Calendar,
  },
  {
    title: "Cultural Festival",
    description: "Celebration of Zimbabwean culture through music, dance, food, and traditional performances.",
    date: "Term 2",
    icon: Users,
  },
  {
    title: "Science Fair",
    description: "Students showcase scientific projects and experiments to judges and parents.",
    date: "Term 2",
    icon: Calendar,
  },
  {
    title: "Career Day",
    description: "Professionals from various fields share insights and career guidance with students.",
    date: "Term 3",
    icon: MapPin,
  },
  {
    title: "Prize Giving Ceremony",
    description: "Recognition of academic excellence and achievements throughout the year.",
    date: "Term 3",
    icon: Trophy,
  },
  {
    title: "Educational Tours",
    description: "Field trips to museums, historical sites, and educational institutions.",
    date: "Throughout the year",
    icon: MapPin,
  },
];

export default function Activities() {
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
            Events & Activities
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Exciting events throughout the year that enrich the student experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-white"
            >
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <activity.icon className="text-white" size={28} />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">{activity.title}</h3>
              <p className="text-white/90 text-sm mb-4">{activity.description}</p>
              <div className="flex items-center gap-2 text-secondary text-sm font-semibold">
                <Calendar size={16} />
                <span>{activity.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
