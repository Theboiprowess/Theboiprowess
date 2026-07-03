"use client";

import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SmokeBackgroundProps {
  opacity?: number;
  speed?: number;
  density?: number;
  className?: string;
}

export default function SmokeBackground({
  opacity = 0.3,
  speed = 20,
  density = 3,
  className = "",
}: SmokeBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || prefersReducedMotion) return;

    controls.start({
      opacity: [opacity * 0.8, opacity, opacity * 0.8],
      scale: [1, 1.05, 1],
      transition: {
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls, isClient, prefersReducedMotion, opacity, speed]);

  if (prefersReducedMotion || !isClient) {
    return null;
  }

  const smokeLayers = Array.from({ length: density }).map((_, i) => ({
    id: i,
    size: 300 + i * 100,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: i * 2,
    duration: speed + i * 5,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {smokeLayers.map((layer) => (
        <motion.div
          key={layer.id}
          className="absolute rounded-full blur-3xl"
          style={{
            width: layer.size,
            height: layer.size,
            left: `${layer.x}%`,
            top: `${layer.y}%`,
            background: `radial-gradient(circle, rgba(255,255,255,${opacity * 0.3}) 0%, rgba(50,50,50,${opacity * 0.2}) 50%, transparent 70%)`,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            opacity: [opacity * 0.5, opacity, opacity * 0.5],
          }}
          transition={{
            duration: layer.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: layer.delay,
          }}
        />
      ))}
    </div>
  );
}
