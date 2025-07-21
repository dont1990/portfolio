export async function fetchAboutData() {
  const res = await fetch("http://localhost:4000/api/about", {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch About data");
  return res.json();
}
