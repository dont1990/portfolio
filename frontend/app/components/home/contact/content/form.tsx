"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import toast from "react-hot-toast";
import { submitContactForm } from "../actions/submitContactForm";

export function ContactForm({ isInView }: { isInView: boolean }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitContactForm(formData);
      toast.success("Form submitted successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to submit form.");
    }
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
    hidden: { y: 30, opacity: 0 },
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
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Card className="hover:shadow-lg transition-shadow h-full flex flex-col justify-center">
        <CardHeader>
          <CardTitle>Send me a message</CardTitle>
          <CardDescription>
            Fill out the form below and I'll get back to you as soon as
            possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              className="grid md:grid-cols-2 gap-4"
              variants={itemVariants as any}
            >
              <motion.div whileFocus={{ scale: 1.02 }}>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div whileFocus={{ scale: 1.02 }}>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </motion.div>
            </motion.div>
            <motion.div
              variants={itemVariants as any}
              whileFocus={{ scale: 1.02 }}
            >
              <Input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </motion.div>
            <motion.div
              variants={itemVariants as any}
              whileFocus={{ scale: 1.02 }}
            >
              <Textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </motion.div>
            <motion.div
              variants={itemVariants as any}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </motion.div>
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
