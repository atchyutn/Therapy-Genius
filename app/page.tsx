"use client";
import React, { useRef } from "react";
import TherapyForm from "./components/TherapyForm";
import LearnMore from "./components/LearnMore";
import Lottie from "lottie-react";
import kidsTherapyAnimation from "../public/AI-therapy.json"; // Adjust the path as needed
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import GradientBackground from "./components/GradientBackground";
import HeroSection from "./components/HeroSection";
import { SpeedInsights } from "@vercel/speed-insights/next";

const HomePage: React.FC = () => {
  const learnMoreRef = useRef<HTMLDivElement>(null);
  const therapyFormRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SpeedInsights />
      <GradientBackground>
        <Navbar />
        <div className="container mx-auto px-4 py-12 pt-0">
          <HeroSection
            scrollToLearnMore={() => scrollToSection(learnMoreRef)}
            scrollToTherapyForm={() => scrollToSection(therapyFormRef)}
          />
          <div className="mt-16 md:mt-5">
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              ref={therapyFormRef}
            >
              <TherapyForm />
            </div>
          </div>
          <hr className="mt-10 bg-black" />
          <div ref={learnMoreRef}>
            <LearnMore />
          </div>
          <hr className="mt-10 bg-black" />
          <Footer />
        </div>
      </GradientBackground>
    </div>
  );
};

export default HomePage;