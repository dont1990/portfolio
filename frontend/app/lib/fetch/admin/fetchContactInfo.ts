export async function fetchContactInfo() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/contact-info`,
    {
      cache: "force-cache",
      next: { tags: ["contact-info"] },
    }
  );
  return res.json();
}

export async function fetchContactInfoClient() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/contact-info`
  );
  if (!res.ok) throw new Error("Failed to fetch contact info");
  return res.json();
}
