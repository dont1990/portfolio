"use client";

import { Experience } from "@/app/types/shared/experience/experience";
import Link from "next/link";

interface Props {
  experienceData: {
    experiences: Experience[];
  };
}

export default function ExperiencePreview({ experienceData }: Props) {
  const experiences = experienceData?.experiences?.slice(0, 3) || [];

  return (
    <>
      <h2 className="text-xl font-bold mb-4 border-b pb-2">
        Recent Experiences
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiences.map((exp: Experience, i: number) => (
          <Link
            key={i}
            href={"/admin/experiences"}
            className="border bg-white/80 dark:bg-slate-800/70 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <h3 className="font-semibold text-lg">{exp.title}</h3>
            <p className="text-sm text-muted-foreground">
              {exp.company} — {exp.period}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
