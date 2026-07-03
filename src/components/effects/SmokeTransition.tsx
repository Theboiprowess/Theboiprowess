"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface SmokeTransitionProps {
  isActive: boolean;
  duration?: number;
  opacity?: number;
  direction?: "up" | "down" | "left" | "right";
  children: React.ReactNode;
}

export default function SmokeTransition({
  isActive,
  duration = 1.2,
  opacity = 0.4,
  direction = "up",
  children,
}: SmokeTransitionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (prefersReducedMotion || !isClient) {
    return <>{children}</>;
  }

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: duration * 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      y: direction === "up" ? -50 : direction === "down" ? 50 : 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      transition: {
        duration: duration * 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const smokeVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: opacity,
      scale: 1.2,
      transition: {
        duration: duration * 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 1.5,
      transition: {
        duration: duration * 0.5,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            variants={smokeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 blur-2xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-96 h-96 rounded-full blur-3xl"
                style={{
                  background: `radial-gradient(circle, rgba(255,255,255,${opacity * 0.5}) 0%, rgba(50,50,50,${opacity * 0.3}) 50%, transparent 70%)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [opacity * 0.5, opacity, opacity * 0.5],
                }}
                transition={{
                  duration: duration,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </div>
  );
}
