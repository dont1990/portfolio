"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ParallaxContainer } from "@/components/section-parallax"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

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
  }

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
  }

  return (
    <section id="about" ref={ref}>
      <ParallaxContainer>
        <div className="mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-4" variants={itemVariants as any}>
              About Me
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground max-w-2xl mx-auto" variants={itemVariants as any}>
              I'm a passionate frontend developer with 5+ years of experience creating engaging digital experiences that
              users love.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-muted-foreground mb-6 leading-relaxed">
                My journey in web development started with a curiosity about how websites work. Today, I specialize in
                React, Next.js, and modern frontend technologies to build scalable, performant applications.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I believe in writing clean, maintainable code and creating intuitive user interfaces that solve real
                problems. When I'm not coding, you'll find me exploring new technologies, contributing to open source,
                or mentoring aspiring developers.
              </p>
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {["React", "Next.js", "TypeScript", "Tailwind CSS"].map((tech, index) => (
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
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {[
                {
                  icon: Code,
                  title: "Clean Code",
                  description:
                    "Writing maintainable, scalable code that follows best practices and industry standards.",
                },
                {
                  icon: Palette,
                  title: "UI/UX Focus",
                  description: "Creating beautiful, intuitive interfaces that provide exceptional user experiences.",
                },
                {
                  icon: Zap,
                  title: "Performance",
                  description: "Optimizing applications for speed, accessibility, and seamless user interactions.",
                },
              ].map((item, index) => (
                <motion.div key={index} variants={cardVariants as any}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <motion.div
                        className="flex items-center mb-4"
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <item.icon className="h-8 w-8 text-primary mr-3" />
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                      </motion.div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </ParallaxContainer>
    </section>
  )
}
