"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ContactInfo } from "@/app/types/shared/contact/contactInfo";

export function ContactSocials({ contactInfoData, isInView }: { contactInfoData: ContactInfo; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <h3 className="text-2xl font-semibold mb-6">Follow Me</h3>
      <div className="flex space-x-4">
        {[{ icon: Github, link: contactInfoData.social.github }, { icon: Linkedin, link: contactInfoData.social.linkedin }, { icon: Twitter, link: contactInfoData.social.twitter }].map(({ icon: Icon, link }, index) => (
          <motion.div key={index} whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Icon className="h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
