import { SiteHeader } from "../components/home/navbar";
import { HeroSection } from "../components/home/hero-section";
import { AboutSection } from "../components/home/about-section";
import { NewsSection } from "../components/home/news-section";
import { EventsSection } from "../components/home/events-section";
import { DepartmentsSection } from "../components/home/departments-section";
import { StatsSection } from "../components/home/statistics-section";
import { CtaSection } from "../components/home/cta-section";
import { SiteFooter } from "../components/home/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <NewsSection />
        <EventsSection />
        <DepartmentsSection />
        <StatsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
