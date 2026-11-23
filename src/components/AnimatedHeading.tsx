"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function AnimatedHeading({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.h2>
  );
}
