"use server";

import { AboutData } from "@/app/types/shared/about/aboutData";
import { revalidateTag } from "next/cache";


export async function updateAboutData(data: AboutData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update About data");
  }

  revalidateTag("about");
}
