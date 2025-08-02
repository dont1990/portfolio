import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Navigation } from "@/components/navigation";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ReadingTime } from "@/components/reading-time";
import { ThemeTransition } from "@/components/theme-transition";
import { EnhancedThemeSettings } from "@/components/enhanced-theme-settings";
import { ColorSchemePicker } from "@/components/color-scheme-picker";
import { ParallaxBackground } from "@/components/parallax-background";
import { ParallaxParticles } from "@/components/parallax-particles";
import SectionContainer from "@/components/layout/section-container";
import Footer from "@/components/footer";

const sections = [
  { id: "hero", Component: Hero },
  { id: "about", Component: About },
  { id: "skills", Component: Skills },
  { id: "projects", Component: Projects },
  { id: "experience", Component: Experience },
  { id: "contact", Component: Contact },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <ParallaxBackground />
      <ParallaxParticles />
      <ScrollProgress />
      <ThemeTransition />
      <ReadingTime />
      <Navigation />

      <main>
        {sections.map(({ id, Component }) => (
          <SectionContainer key={id} id={id}>
            <Component />
          </SectionContainer>
        ))}
      </main>
      <Footer />
      <ScrollToTop />
      <EnhancedThemeSettings />
      <ColorSchemePicker />
    </div>
  );
};

export default HomePage;
