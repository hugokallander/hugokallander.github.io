import AnimatedBackground from "@/components/AnimatedBackground";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen dark">
      <AnimatedBackground />
      <main>
        <HeroSection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
