"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Link from "next/link";

interface SummaryCardProps {
  label: string;
  count: number | string;
  icon: React.ReactNode;
  href: string;
}

export function SummaryCard({ label, count, icon, href }: SummaryCardProps) {
  return (
    <Card className="hover:shadow-xl cursor-pointer backdrop-blur-md bg-white/80 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl transition-all">
      <Link href={href}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-md font-medium">{label}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {typeof count === "string" ? count : count.toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground">Manage {label}</p>
        </CardContent>
      </Link>
    </Card>
  );
}
