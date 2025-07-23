export async function fetchContactInfo() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/contact-info`,
    {
      cache: "force-cache",
      next: { tags: ["contact-info"] },
    }
  );
  return res.json();
}
