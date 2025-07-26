"use server";

import { revalidateTag } from "next/cache";

export async function updateProjects(data: any) {
  console.log(data);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    method: "PUT", // or POST
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update projects");
  }

  revalidateTag("projects");
}
