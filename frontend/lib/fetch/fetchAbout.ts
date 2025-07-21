export async function fetchAboutData() {
  const res = await fetch("http://localhost:4000/api/about", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch About data");
  return res.json();
}
