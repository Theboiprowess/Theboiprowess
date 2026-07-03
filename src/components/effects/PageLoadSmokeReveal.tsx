"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PageLoadSmokeRevealProps {
  duration?: number;
  opacity?: number;
  children: React.ReactNode;
}

export default function PageLoadSmokeReveal({
  duration = 1.5,
  opacity = 0.5,
  children,
}: PageLoadSmokeRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [duration, isClient, prefersReducedMotion]);

  if (prefersReducedMotion || !isClient) {
    return <>{children}</>;
  }

  const smokeVariants = {
    initial: {
      opacity: opacity,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 1.5,
      filter: "blur(100px)",
      transition: {
        duration: duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const contentVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: duration * 0.8,
        delay: duration * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center bg-black"
            variants={smokeVariants}
            initial="initial"
            exit="exit"
            aria-hidden="true"
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,${opacity * 0.3}) 0%, rgba(50,50,50,${opacity * 0.5}) 30%, rgba(0,0,0,${opacity}) 70%)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: duration,
                  ease: "easeInOut",
                }}
              />
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full blur-3xl"
                  style={{
                    width: 200 + i * 50,
                    height: 200 + i * 50,
                    left: `${20 + i * 15}%`,
                    top: `${20 + i * 10}%`,
                    background: `radial-gradient(circle, rgba(255,255,255,${opacity * 0.2}) 0%, transparent 70%)`,
                  }}
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -100, 0],
                    opacity: [opacity * 0.3, opacity * 0.6, opacity * 0.3],
                  }}
                  transition={{
                    duration: duration + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        {children}
      </motion.div>
    </div>
  );
}
