import Lottie from "lottie-react";
import ActivitesLoader from "../../public/hero-animation.json";

const HeroSection: React.FC<{
  scrollToLearnMore: () => void;
  scrollToTherapyForm: () => void;
}> = ({ scrollToLearnMore, scrollToTherapyForm }) => {
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
            <button
              className="bg-white text-indigo-700 font-semibold py-3 px-6 md:py-3 md:px-8 rounded-lg shadow-md hover:bg-indigo-50 transition duration-300"
              onClick={scrollToTherapyForm}
            >
              Get Started
            </button>
            <button
              className="bg-indigo-700 text-white font-semibold py-3 px-6 md:py-3 md:px-8 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
              onClick={scrollToLearnMore}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
