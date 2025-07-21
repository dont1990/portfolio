export async function fetchAboutData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about`, {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch About data");
  return res.json();
}
