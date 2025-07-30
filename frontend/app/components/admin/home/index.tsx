"use client";

import useSWR from "swr";
import { motion } from "framer-motion";
import {
  Briefcase,
  Code,
  Contact,
  Info,
  Mail,
  NotebookPen,
} from "lucide-react";
import { fetcher } from "@/app/lib/utils/swr/fetcher";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { SummaryCard } from "../../summary-card";

export default function AdminDashboard() {
  const { data: projects } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/projects`,
    fetcher
  );
  const { data: skills } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/skills`,
    fetcher
  );
  const { data: experienceData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/experiences`,
    fetcher
  );
  const { data: contactInfo } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/contact-info`,
    fetcher
  );
  const { data: submissions } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/contact?limit=5`,
    fetcher
  );
  const { data: aboutData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/about`,
    fetcher
  );

  const totalProjects = projects?.length || 0;
  const totalSkills =
    skills?.reduce((sum, cat) => sum + cat.skills.length, 0) || 0;
  const totalExperiences = experienceData?.experiences.length || 0;
  const contactLastUpdated = contactInfo?.updatedAt || null;
  const submissionsCount = submissions?.length || 0;
  const aboutFeaturesCount = aboutData?.features.length || 0;

  const summaryItems = [
    {
      label: "Projects",
      count: totalProjects,
      icon: <Code className="text-primary" />,
      href: "/admin/projects",
    },
    {
      label: "Skills",
      count: totalSkills,
      icon: <NotebookPen className="text-primary" />,
      href: "/admin/skills",
    },
    {
      label: "Experiences",
      count: totalExperiences,
      icon: <Briefcase className="text-primary" />,
      href: "/admin/experience",
    },
    {
      label: "Contact Info",
      count: contactLastUpdated
        ? new Date(contactLastUpdated).toLocaleDateString()
        : "Not Set",
      icon: <Contact className="text-primary" />,
      href: "/admin/contact",
    },
    {
      label: "Submissions",
      count: submissionsCount,
      icon: <Mail className="text-primary" />,
      href: "/admin/submissions",
    },
    {
      label: "About Features",
      count: aboutFeaturesCount,
      icon: <Info className="text-primary" />,
      href: "/admin/about",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Cards with animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {summaryItems.map((item) => (
          <SummaryCard
            key={item.label}
            label={item.label}
            count={item.count}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </motion.div>

      {/* Submissions Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h2 className="text-xl font-bold mb-4 border-b pb-2">
          Recent Contact Submissions
        </h2>
        <div className="rounded-xl border bg-white/80 dark:bg-slate-800/70 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {submissions?.map((sub) => (
                <tr
                  key={sub.id}
                  onClick={() => (window.location.href = "/admin/submissions")}
                  className="hover:bg-muted transition-colors cursor-pointer border-b"
                >
                  <td className="p-3">{sub.name}</td>
                  <td className="p-3">{sub.email}</td>
                  <td className="p-3">{sub.subject}</td>
                  <td className="p-3">
                    {new Date(sub.submittedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Experience Preview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <h2 className="text-xl font-bold mb-4 border-b pb-2">
          Recent Experiences
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {experienceData?.experiences.slice(0, 3).map((exp, i) => (
            <div
              key={i}
              onClick={() => (window.location.href = "/admin/experience")}
              className="border bg-white/80 dark:bg-slate-800/70 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="font-semibold text-lg">{exp.title}</h3>
              <p className="text-sm text-muted-foreground">
                {exp.company} — {exp.period}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
