"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";

import { CTASection } from "@/components/home/cta-section";
import { EventCategories } from "@/components/home/event-categories";
import { FeaturedEvents } from "@/components/home/featured-events";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { TopHosts } from "@/components/home/top-hosts";
import { UpcomingFeaturedEvents } from "@/components/home/upcoming-events";
import { WhyChooseUs } from "@/components/home/why-choose-us";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

const MotionSection = ({ children }: { children: React.ReactNode }) => (
  <motion.section
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
  >
    {children}
  </motion.section>
);

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <MotionSection>
          <HeroSection />
        </MotionSection>

        <MotionSection>
          <FeaturedEvents />
        </MotionSection>

        <MotionSection>
          <UpcomingFeaturedEvents />
        </MotionSection>

        <MotionSection>
          <HowItWorks />
        </MotionSection>

        <MotionSection>
          <EventCategories />
        </MotionSection>

        <MotionSection>
          <TopHosts />
        </MotionSection>

        <MotionSection>
          <Testimonials />
        </MotionSection>

        <MotionSection>
          <WhyChooseUs />
        </MotionSection>

        <MotionSection>
          <CTASection />
        </MotionSection>
      </main>

      <Footer />
    </div>
  );
}
