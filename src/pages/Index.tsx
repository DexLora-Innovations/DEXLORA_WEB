import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FoundersSection from "@/components/FoundersSection";
import ConnectSection from "@/components/ConnectSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>DexLora Innovations | Building Digital & Smart Solutions for the Future</title>
        <meta 
          name="description" 
          content="DexLora Innovations builds future-ready digital solutions including websites, apps, games, UI/UX design, and IoT hardware. Partner with us to transform your ideas into reality." 
        />
        <meta name="keywords" content="DexLora, digital solutions, web development, app development, games, UI/UX, IoT, hardware, startup, technology" />
        <meta property="og:title" content="DexLora Innovations | Digital & Smart Solutions" />
        <meta property="og:description" content="Building Digital & Smart Solutions for the Future - Websites, Apps, Games, UI/UX, IoT Hardware" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://dexlora.com" />
      </Helmet>

      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        <HeroSection />
        <FoundersSection />
        <ConnectSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
