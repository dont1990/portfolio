import { fetchSkills } from "@/app/lib/fetch/fetchSkills";
import React from "react";
import { SkillsContent } from "./content";


const Skills = async () => {
  const skills = await fetchSkills();

  return <SkillsContent skills={skills} />;
};

export default Skills;
