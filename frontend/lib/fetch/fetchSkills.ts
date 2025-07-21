export async function fetchSkills() {
  const res = await fetch("http://localhost:4000/api/skills", {
    cache: "no-store", 
  });
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}
