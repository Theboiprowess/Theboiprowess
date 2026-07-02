"use client";

import { motion } from "framer-motion";
import { Trophy, Circle, Activity, PersonStanding } from "lucide-react";

const sports = [
  {
    icon: Circle,
    name: "Football",
    description: "Competitive football teams for boys and girls with regular matches and tournaments.",
    achievements: "Regional Champions 2023",
  },
  {
    icon: Circle,
    name: "Basketball",
    description: "Develop basketball skills and compete in inter-school leagues.",
    achievements: "League Finalists 2023",
  },
  {
    icon: Circle,
    name: "Volleyball",
    description: "Team building and competitive volleyball for all skill levels.",
    achievements: "District Winners 2022",
  },
  {
    icon: Activity,
    name: "Athletics",
    description: "Track and field events including sprints, long jump, and relays.",
    achievements: "National Medalists",
  },
  {
    icon: Trophy,
    name: "Chess",
    description: "Strategic thinking and competitive chess tournaments.",
    achievements: "Regional Champions",
  },
];

export default function Sports() {
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
            Sports & Athletics
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay active and competitive with our diverse sports programs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sports.map((sport, index) => (
            <motion.div
              key={sport.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-32 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <sport.icon className="text-white/80" size={64} />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-primary mb-2">
                  {sport.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{sport.description}</p>
                <div className="flex items-center gap-2 text-secondary text-sm font-semibold">
                  <Trophy size={16} />
                  <span>{sport.achievements}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
