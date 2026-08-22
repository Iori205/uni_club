import { SiteHeader } from "../_components/home/navbar";
import { HeroSection } from "../_components/home/hero-section";
import { AboutSection } from "../_components/home/about-section";
import { NewsSection } from "../_components/home/news-section";
import { EventsSection } from "../_components/home/events-section";
import { DepartmentsSection } from "../_components/home/departments-section";
import { StatsSection } from "../_components/home/statistics-section";
import { CtaSection } from "../_components/home/cta-section";
import { SiteFooter } from "../_components/home/footer";

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
