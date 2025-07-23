import React from "react";
import HeroEditor from "./content";
import { fetchHeroData } from "@/app/lib/fetch/fetchHero";


const AdminHeroEditor = async () => {
  const hero = await fetchHeroData();
  return <HeroEditor heroData={hero} />;
};

export default AdminHeroEditor;
