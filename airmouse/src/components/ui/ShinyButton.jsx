"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Replace or remove if you're not using this

const animationProps = {
  initial: { "--x": "100%", scale: 0.98 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

const ShinyButton = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <motion.a
      ref={ref}
      className={cn(
        "w-full px-5 py-3 rounded-xl text-white inter-medium shadow-md hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 bg-gradient-to-r from-[#5ddcff] to-[#3c67e3] relative overflow-hidden",
        className
      )}
      {...animationProps}
      {...props}
    >
      <span
        className="relative z-20 flex items-center justify-center gap-2 text-nowrap"
        style={{
          maskImage:
            "linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>

      <span
        className="absolute inset-0 z-10 rounded-[inherit] p-px"
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          WebkitMask:
            "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          backgroundImage:
            "linear-gradient(-75deg,var(--primary)/10% calc(var(--x)+20%),var(--primary)/50% calc(var(--x)+25%),var(--primary)/10% calc(var(--x)+100%))",
        }}
      />
    </motion.a>
  );
});

export default ShinyButton;
