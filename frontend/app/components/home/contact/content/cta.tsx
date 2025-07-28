"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/app/components/ui/card";

export function ContactCTA({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold mb-2">Let's collaborate!</h4>
          <p className="text-muted-foreground text-sm">
            I'm currently available for freelance projects and full-time opportunities.
            Whether you have a project in mind or just want to chat about technology,
            I'd love to hear from you.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
