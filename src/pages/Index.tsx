
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeatureSection } from "@/components/FeatureSection";
import { FeaturedProjectsSection } from "@/components/FeaturedProjectsSection";
import { StatisticsSection } from "@/components/StatisticsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeatureSection />
      <StatisticsSection />
      <FeaturedProjectsSection />
      <Footer />
    </div>
  );
};

export default Index;
