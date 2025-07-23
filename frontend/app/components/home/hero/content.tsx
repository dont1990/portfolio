"use client";

import { Button } from "@/app/components/ui/button";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { ParallaxHero } from "@/app/components/parallax-hero";
import Typewriter from "../../type-writer";

type HeroData = {
  name: string;
  initials: string;
  roles: string[];
  bio: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
};

interface HeroContentProps {
  hero: HeroData;
}

export function HeroContent({ hero }: HeroContentProps) {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 relative"
    >
      <ParallaxHero />
      <motion.div
        className="section-container text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-8" variants={itemVariants}>
          <motion.div
            className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {hero.initials}
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            variants={itemVariants}
          >
            Hi, I'm <span className="text-primary">{hero.name}</span>
          </motion.h1>
          <motion.div
            className="text-muted-foreground mb-8"
            variants={itemVariants}
          >
            <Typewriter
              words={hero.roles}
              typingSpeed={100}
              deletingSpeed={50}
              pauseTime={1000}
              postDeletePause={200}
              loop
              className="text-primary text-xl md:text-2xl font-medium"
            />
          </motion.div>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            variants={itemVariants}
          >
            {hero.bio}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="w-full sm:w-auto">
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-transparent"
            >
              View My Work
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-6 mb-12"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <a
              href={hero.socials.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </a>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <a
              href={hero.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <a href={hero.socials.email}>
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToAbout}
            className="animate-bounce"
          >
            <ArrowDown className="h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
