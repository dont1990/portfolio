"use client";

import { motion } from "framer-motion";
import { ExperienceData } from "@/app/types/shared/experience/experience";
import { ExperienceSection } from "./experience-section";
import { EducationSection } from "./education-section";
import { CertificationsSection } from "./certifications-section";

type Props = {
  data: ExperienceData;
};

export function ExperienceContent({ data }: Props) {
  const { experiences, education, certifications } = data;

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience & Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and educational background in software
            development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <ExperienceSection experiences={experiences} />
          <div>
            <EducationSection education={education} />
            <CertificationsSection certifications={certifications} />
          </div>
        </div>
      </div>
    </section>
  );
}
