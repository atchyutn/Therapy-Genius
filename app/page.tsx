"use client";
import React from "react";
// import { GradientBackground } from "./components/GradientBackground";
// import { HeroSection } from "./components/HeroSection";
// import { Navbar } from "./components/Navbar";
import TherapyForm from "./components/TherapyForm";
// import { Card } from "@/components/ui/card";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <GradientBackground>
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <HeroSection />
          <div className="mt-24">
            {/* <Card className="bg-white bg-opacity-90 backdrop-blur-lg shadow-xl"> */}
              <TherapyForm />
            {/* </Card> */}
          </div>
        </div>
      </GradientBackground>
    </div>
  );
};

export default HomePage;

export const GradientBackground: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 opacity-90" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white bg-opacity-90 backdrop-blur-lg shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-indigo-700">AI Therapy</div>
          <div className="space-x-4">
            <a href="#" className="text-gray-700 hover:text-indigo-600">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">
              Services
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const HeroSection: React.FC = () => {
  return (
    <div className="py-20 text-center">
      <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight">
        Enterprise-Grade <br /> AI-Powered Therapy Platform
      </h1>
      <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
        Revolutionize mental health support with our cutting-edge AI technology,
        designed for large-scale organizational deployment.
      </p>
      <div className="space-x-4">
        <button className="bg-white text-indigo-700 font-semibold py-3 px-8 rounded-md hover:bg-indigo-50 transition duration-300 shadow-lg">
          Get Started
        </button>
        <button className="bg-indigo-700 text-white font-semibold py-3 px-8 rounded-md hover:bg-indigo-600 transition duration-300 shadow-lg">
          Learn More
        </button>
      </div>
    </div>
  );
};
