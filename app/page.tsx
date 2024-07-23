"use client";
import React from "react";
import TherapyForm from "./components/TherapyForm";
import Lottie from "lottie-react";
import kidsTherapyAnimation from "../public/AI-therapy.json"; // Adjust the path as needed
import ActivitesLoader from "../public/activities-loader.json";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <GradientBackground>
        <Navbar />
        <div className="container mx-auto px-4 py-12 pt-0">
          <HeroSection />
          <div className="mt-16 md:mt-5">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <TherapyForm />
            </div>
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
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-pink-200 opacity-70" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-opacity-80 backdrop-blur-md shadow-md sticky">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-700">AI Therapy</div>
          <div className="space-x-6 text-gray-700">
            <a
              href="#"
              className="hover:text-indigo-600 transition duration-300 font-bold"
            >
              Home
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 transition duration-300 font-bold"
            >
              About
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 transition duration-300 font-bold"
            >
              Services
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 transition duration-300 font-bold"
            >
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
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row items-center">
        <div className="flex-shrink-0 lg:w-1/2">
          <Lottie
            animationData={ActivitesLoader}
            loop={true}
            className="w-full h-auto max-w-lg"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-12 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-6 leading-tight">
            AI-Powered Therapy Platform
          </h1>
          <p className="text-lg md:text-xl text-black mb-8">
            Our AI-powered platform delivers tailored activities in seconds,
            making therapy more effective and affordable for all families,
            Saving valuable time for therapists.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-indigo-700 font-semibold py-3 px-6 md:py-3 md:px-8 rounded-lg shadow-md hover:bg-indigo-50 transition duration-300">
              Get Started
            </button>
            <button className="bg-indigo-700 text-white font-semibold py-3 px-6 md:py-3 md:px-8 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
