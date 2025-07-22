export async function fetchSubmissions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch submissions");
  return res.json();
}
