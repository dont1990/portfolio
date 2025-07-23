export async function fetchHeroData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero`, {
    cache: "force-cache",
    next: { tags: ["hero"] },
  });
  if (!res.ok) throw new Error("Failed to fetch hero data");
  return res.json();
}
