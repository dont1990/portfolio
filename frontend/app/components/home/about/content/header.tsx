"use client";

import { motion } from "framer-motion";

interface AboutHeaderProps {
  description?: string[];
  isInView: boolean;
}

export function AboutHeader({ description, isInView }: AboutHeaderProps) {
  return (
    <motion.div
      className="text-center mb-16"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { delayChildren: 0.3, staggerChildren: 0.2 },
        },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-4"
        variants={{
          hidden: { y: 50, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        About Me
      </motion.h2>
      <motion.div
        className="text-lg text-muted-foreground max-w-2xl mx-auto space-y-4"
        variants={{
          hidden: { y: 50, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        {description?.slice(0, 1).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </motion.div>
    </motion.div>
  );
}
