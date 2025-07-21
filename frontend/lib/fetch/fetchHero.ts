export async function fetchHeroData() {
  const res = await fetch("http://localhost:4000/api/hero");
  if (!res.ok) throw new Error("Failed to fetch hero data");
  return res.json();
}