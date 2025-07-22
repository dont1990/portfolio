"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionParallax } from "@/app/components/section-parallax";

type Skill = {
  name: string;
  level: number;
};

type SkillCategory = {
  title: string;
  skills: Skill[];
};

type Props = {
  skills: SkillCategory[];
};

export function Skills({ skills }: Props) {
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

  const cardVariants = {
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

  return (
    <section id="skills" className="py-20 bg-muted/30" ref={ref}>
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to
            life.
          </p>
        </motion.div>

        <SectionParallax speed={0.3}>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {skills.map((category, index) => (
              <motion.div key={index} variants={cardVariants as any}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <motion.h3
                      className="text-xl font-semibold mb-6 text-center"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    >
                      {category.title}
                    </motion.h3>
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -20 }
                          }
                          transition={{
                            duration: 0.6,
                            delay: 0.5 + index * 0.1 + skillIndex * 0.1,
                          }}
                        >
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">
                              {skill.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <motion.div
                              className="bg-primary h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={
                                isInView
                                  ? { width: `${skill.level}%` }
                                  : { width: 0 }
                              }
                              transition={{
                                duration: 1,
                                delay: 0.7 + index * 0.1 + skillIndex * 0.1,
                                ease: "easeOut",
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </SectionParallax>
      </div>
    </section>
  );
}
