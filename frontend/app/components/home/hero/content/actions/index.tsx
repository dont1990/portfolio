"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Download, Mail } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/app/components/ui/popover";
import { DownloadResumeButton } from "./download-resume";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export function HeroActions() {
  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
      variants={itemVariants}
    >
      {/* Resume Popover */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <DownloadResumeButton />
      </motion.div>

      {/* Get in Touch */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => scrollTo("contact")}
          variant="outline"
          size="lg"
          className="w-full sm:w-auto bg-transparent"
        >
          <Mail className="mr-2 h-4 w-4" />
          Get In Touch
        </Button>
      </motion.div>
    </motion.div>
  );
}
