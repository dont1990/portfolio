import { motion } from "framer-motion";
import React from "react";

type Props = {
  isInView: boolean;
};

const ContactContentHeader = ({ isInView }: Props) => {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        I'm always interested in new opportunities and exciting projects. Let's
        discuss how we can work together!
      </p>
    </motion.div>
  );
};

export default ContactContentHeader;
