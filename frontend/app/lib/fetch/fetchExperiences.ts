export async function fetchExperiences() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiences`, {
    cache: "force-cache",
  });
  return res.json();
}
