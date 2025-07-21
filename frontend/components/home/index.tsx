import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { Skills } from "@/components/home/skills";
import { Projects } from "@/components/home/projects";
import { Experience } from "@/components/home/experience";
import { Contact } from "@/components/home/contact";
import { Navigation } from "@/components/navigation";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollToTop } from "@/components/scroll-to-top";
// import { ReadingTime } from "@/components/reading-time";
import { ThemeTransition } from "@/components/theme-transition";
import { EnhancedThemeSettings } from "@/components/enhanced-theme-settings";
import { ColorSchemePicker } from "@/components/color-scheme-picker";
import { ParallaxBackground } from "@/components/parallax-background";
import { ParallaxParticles } from "@/components/parallax-particles";
import Footer from "@/components/footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <ParallaxBackground />
      <ParallaxParticles />
      <ScrollProgress />
      <ThemeTransition />
      {/* <ReadingTime /> */}
      <Navigation />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
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
