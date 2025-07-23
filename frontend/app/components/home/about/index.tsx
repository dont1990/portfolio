import React from "react";
import { AboutContent } from "./content";
import { fetchAboutData } from "@/app/lib/fetch/fetchAbout";

const About = async () => {
  const about = await fetchAboutData();

  return (
    <AboutContent
      description={about.description}
      skills={about.skills}
      features={about.features}
    />
  );
};

export default About;
