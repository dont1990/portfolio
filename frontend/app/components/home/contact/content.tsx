"use client";

import type React from "react";

import { useState, useRef } from "react";
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
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { motion, useInView } from "framer-motion";
import toast from "react-hot-toast";
import { ContactInfo } from "@/app/types/shared/contact/contactInfo";


type Props = {
  contactInfoData: ContactInfo;
};

export function ContactContent({ contactInfoData }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success("Form submitted successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      toast.success("Failed to submit form");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    <section id="contact" className="py-20" ref={ref}>
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects.
            Let's discuss how we can work together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
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

          <motion.div
            className="space-y-8"
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {[
                  { icon: Mail, text: contactInfoData.email },
                  { icon: Phone, text: contactInfoData.phone },
                  { icon: MapPin, text: contactInfoData.location },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    variants={itemVariants as any}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon className="h-5 w-5 text-primary" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-2xl font-semibold mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                {[
                  { icon: Github, link: contactInfoData.social.github },
                  { icon: Linkedin, link: contactInfoData.social.linkedin },
                  { icon: Twitter, link: contactInfoData.social.twitter },
                ].map(({ icon: Icon, link }, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon">
                        <Icon className="h-5 w-5" />
                      </Button>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Let's collaborate!</h4>
                  <p className="text-muted-foreground text-sm">
                    I'm currently available for freelance projects and full-time
                    opportunities. Whether you have a project in mind or just
                    want to chat about technology, I'd love to hear from you.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
