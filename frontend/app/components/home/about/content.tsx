"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Code, Palette, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ParallaxContainer } from "@/app/components/section-parallax";

type Feature = {
  icon: "Code" | "Palette" | "Zap";
  title: string;
  description: string;
};

interface AboutProps {
  description: string[];
  skills: string[];
  features: Feature[];
}

const iconMap = {
  Code,
  Palette,
  Zap,
};

export function AboutContent({ description, skills, features }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about" ref={ref}>
      <ParallaxContainer>
        <div className="section-container relative z-10">
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

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={
                isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="flex flex-wrap gap-2 mb-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {description?.slice(1).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                {skills?.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="grid gap-6"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
              }}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {features?.map((item, index) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { x: -50, opacity: 0 },
                      visible: {
                        x: 0,
                        opacity: 1,
                        transition: { duration: 0.6, ease: "easeOut" },
                      },
                    }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <motion.div
                          className="flex items-center mb-4"
                          whileHover={{ x: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <IconComponent className="h-8 w-8 text-primary mr-3" />
                          <h3 className="text-xl font-semibold">
                            {item.title}
                          </h3>
                        </motion.div>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </ParallaxContainer>
    </section>
  );
}
