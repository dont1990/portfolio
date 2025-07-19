"use client";
import React from "react";

interface SectionContainerProps {
  id?: string;
  children: React.ReactNode;
}

export default function SectionContainer({ id, children }: SectionContainerProps) {
  return (
    <section
      id={id}
      className="max-w-7xl mx-auto px-4 sm:px-8 py-8 md:py-16"
    >
      {children}
    </section>
  );
}
