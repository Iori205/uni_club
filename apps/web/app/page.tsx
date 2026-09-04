import { HeroSection } from "../_components/home/hero-section";
import { AboutSection } from "../_components/home/about-section";
import { NewsSection } from "../_components/home/news-section";
import { EventsSection } from "../_components/home/events-section";
import { DepartmentsSection } from "../_components/home/departments-section";
import { StatsSection } from "../_components/home/statistics-section";
import { Reveal } from "../_components/ui/reveal";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Reveal>
        <AboutSection />
      </Reveal>
      <Reveal>
        <NewsSection />
      </Reveal>
      <Reveal>
        <EventsSection />
      </Reveal>
      <Reveal>
        <DepartmentsSection />
      </Reveal>
      <Reveal>
        <StatsSection />
      </Reveal>
    </>
  );
}
