"use server";

import { revalidateTag } from "next/cache";

export async function updateAboutData(data: any) {
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
