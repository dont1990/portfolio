import { Hero } from "@/app/components/home/hero";
import { About } from "@/app/components/home/about";
import { Skills } from "@/app/components/home/skills";
import { Projects } from "@/app/components/home/projects";
import { Experience } from "@/app/components/home/experience";
import { Contact } from "@/app/components/home/contact";
import { Navigation } from "@/app/components/navigation";
import { ScrollProgress } from "@/app/components/scroll-progress";
import { ScrollToTop } from "@/app/components/scroll-to-top";
// import { ReadingTime } from "@/app/components/reading-time";
import { ThemeTransition } from "@/app/components/theme-transition";
import { EnhancedThemeSettings } from "@/app/components/enhanced-theme-settings";
import { ColorSchemePicker } from "@/app/components/color-scheme-picker";
import { ParallaxBackground } from "@/app/components/parallax-background";
import { ParallaxParticles } from "@/app/components/parallax-particles";
import Footer from "@/app/components/footer";
import { fetchHeroData } from "@/app/lib/fetch/fetchHero";
import { fetchAboutData } from "@/app/lib/fetch/fetchAbout";
import { fetchSkills } from "@/app/lib/fetch/fetchSkills";
import { fetchProjects } from "@/app/lib/fetch/fetchProjects";
import { fetchExperiences } from "@/app/lib/fetch/fetchExperiences";

const HomePage = async () => {
  const hero = await fetchHeroData();
  const about = await fetchAboutData();
  const skills = await fetchSkills();
  const projects = await fetchProjects();
  const experiences = await fetchExperiences();

  return (
    <div className="min-h-screen bg-background">
      <ParallaxBackground />
      <ParallaxParticles />
      <ScrollProgress />
      <ThemeTransition />
      {/* <ReadingTime /> */}
      <Navigation />

      <main>
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
      </main>
      <Footer />
      <ScrollToTop />
      <EnhancedThemeSettings />
      <ColorSchemePicker />
    </div>
  );
};

export default HomePage;
