export async function fetchSkills() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills`, {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}
