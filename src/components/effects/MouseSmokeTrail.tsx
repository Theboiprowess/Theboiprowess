"use client";

import { motion, useReducedMotion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface MouseSmokeTrailProps {
  opacity?: number;
  size?: number;
  delay?: number;
  className?: string;
}

interface SmokeParticle {
  id: number;
  x: number;
  y: number;
  createdAt: number;
}

export default function MouseSmokeTrail({
  opacity = 0.3,
  size = 40,
  delay = 50,
  className = "",
}: MouseSmokeTrailProps) {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState<SmokeParticle[]>([]);
  const particleIdRef = useRef(0);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isClient || prefersReducedMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only create particles when moving fast enough
      if (distance > 5) {
        const newParticle: SmokeParticle = {
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          createdAt: Date.now(),
        };

        setParticles((prev) => {
          const updated = [...prev, newParticle];
          // Keep only recent particles to prevent memory issues
          return updated.slice(-20);
        });

        lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      }

      // Clear old particles
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setParticles((prev) => {
          const now = Date.now();
          return prev.filter((p) => now - p.createdAt < 2000);
        });
      }, delay);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isClient, prefersReducedMotion, isMobile, mouseX, mouseY, delay]);

  if (prefersReducedMotion || !isClient || isMobile) {
    return null;
  }

  return (
    <div className={`fixed inset-0 pointer-events-none z-40 ${className}`} aria-hidden="true">
      {particles.map((particle) => {
        const age = Date.now() - particle.createdAt;
        const lifeProgress = Math.min(age / 2000, 1);
        const currentOpacity = opacity * (1 - lifeProgress);
        const currentSize = size * (1 + lifeProgress * 0.5);

        if (lifeProgress >= 1) return null;

        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full blur-xl"
            style={{
              width: currentSize,
              height: currentSize,
              left: particle.x - currentSize / 2,
              top: particle.y - currentSize / 2,
              background: `radial-gradient(circle, rgba(255,255,255,${currentOpacity * 0.5}) 0%, rgba(50,50,50,${currentOpacity * 0.3}) 50%, transparent 70%)`,
              opacity: currentOpacity,
            }}
            animate={{
              scale: [1, 1.5],
              opacity: [currentOpacity, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}
