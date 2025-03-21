
import React, { useEffect } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import MedicalHero from '@/components/MedicalHero';
import ServicesSection from '@/components/ServicesSection';
import VideoSection from '@/components/VideoSection';
import ChatAssistant from '@/components/ChatAssistant';
import MouseFollower from '@/components/MouseFollower';
import { motion, useScroll, useSpring } from 'framer-motion';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.title = "HealthCare - Premium Medical Services";
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover opacity-90"
        >
          <source 
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
      </div>

      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-medical z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Mouse follower effect */}
      <MouseFollower />

      {/* Header */}
      <NavigationHeader />

      {/* Hero section */}
      <MedicalHero />

      {/* Services section */}
      <ServicesSection />

      {/* Video section */}
      <VideoSection />

      {/* Chat assistant */}
      <ChatAssistant />
    </div>
  );
};

export default Index;
