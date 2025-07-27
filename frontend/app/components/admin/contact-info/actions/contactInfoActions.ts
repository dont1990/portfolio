"use server";

import { ContactInfo } from "@/app/types/shared/contact/contactInfo";
import { revalidateTag } from "next/cache";

export async function updateContactInfo(data: ContactInfo) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/contact-info`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update contact info");
  }

  revalidateTag("contact-info");
}
