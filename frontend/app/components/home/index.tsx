import { Hero } from "@/app/components/home/hero";
import { About } from "@/app/components/home/about";
import { Skills } from "@/app/components/home/skills";
import { Projects } from "@/app/components/home/projects";
import { Experience } from "@/app/components/home/experience";
import { Contact } from "@/app/components/home/contact";
import { fetchHeroData } from "@/app/lib/fetch/fetchHero";
import { fetchAboutData } from "@/app/lib/fetch/fetchAbout";
import { fetchSkills } from "@/app/lib/fetch/fetchSkills";
import { fetchProjects } from "@/app/lib/fetch/fetchProjects";
import { fetchExperiences } from "@/app/lib/fetch/fetchExperiences";

const HomePageContent = async () => {
  const hero = await fetchHeroData();
  const about = await fetchAboutData();
  const skills = await fetchSkills();
  const projects = await fetchProjects();
  const experiences = await fetchExperiences();

  return (
    <>
      <Hero hero={hero} />
      <About
        description={about.description}
        skills={about.skills}
        features={about.features}
      />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience data={experiences} />
      <Contact />
    </>
  );
};

export default HomePageContent;
