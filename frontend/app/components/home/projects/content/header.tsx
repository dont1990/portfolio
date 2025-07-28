import { motion } from "framer-motion";
import React from "react";

type Props = {
  isInView: boolean;
};

const ProjectContentHeader = ({ isInView }: Props) => {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Here are some of my recent projects that showcase my skills and passion
        for frontend development.
      </p>
    </motion.div>
  );
};

export default ProjectContentHeader;
