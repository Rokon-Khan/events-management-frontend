import { Footer } from "@/components/footer";
import { CTASection } from "@/components/home/cta-section";
import { EventCategories } from "@/components/home/event-categories";
import { FeaturedEvents } from "@/components/home/featured-events";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { TopHosts } from "@/components/home/top-hosts";
import { UpcomingFeaturedEvents } from "@/components/home/upcoming-events";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Navbar } from "@/components/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedEvents />
        <UpcomingFeaturedEvents />
        <HowItWorks />
        <EventCategories />
        <TopHosts />
        <Testimonials />
        <WhyChooseUs />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
