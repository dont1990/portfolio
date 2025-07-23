import React from "react";
import { HeroContent } from "./content";
import { fetchHeroData } from "@/app/lib/fetch/fetchHero";

const Hero = async () => {
  const hero = await fetchHeroData();

  return <HeroContent hero={hero} />;
};

export default Hero;
