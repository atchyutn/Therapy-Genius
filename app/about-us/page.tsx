import React from "react";
import Navbar from "../components/Navbar";

const AboutUs = () => (
  <>
    <Navbar />
    <div className="bg-gradient-to-r from-violet-200 to-pink-200 overflow-hidden shadow-lg p-0">
      <div className="container mx-auto px-10 justify-center py-16 max-w-7xl">
        <h2 className="text-center font-bold text-4xl md:text-5xl lg:text-6xl text-indigo-600 mb-6">
          About Us
        </h2>
        <p className="text-lg font-semibold text-gray-700 mb-8">
          At the heart of our journey is a personal story of problem-solving and
          innovation. As a passionate developer, I&apos;ve always been driven by
          the challenge of solving real-world problems with technology. This
          journey began with a conversation I had with a close friend, a dedicated
          therapist who runs a therapy center.
        </p>
        <p className="text-lg font-semibold text-gray-700 mb-8">
          Listening to my friend&apos;s experiences, I learned about the
          significant challenges they faced. Therapists often spend countless
          hours crafting detailed reports for their young clients, each report
          tailored to the child&apos;s unique condition, goals, and therapy type.
          The process was time-consuming and riddled with potential for
          grammatical errors, inconsistencies, and inefficiencies. These issues
          not only created extra work but also detracted from the time that could
          be spent focusing on the children&apos;s needs.
        </p>
        <p className="text-lg font-semibold text-gray-700 mb-8">
          Inspired by these pain points and fueled by my commitment to making a
          difference, I decided to take action. As part of Hashnode&apos;s &apos;AI for
          Tomorrow&apos; Hackathon, I embarked on a mission to create a solution that
          would streamline this process and enhance the quality of therapy. Using
          data from previous reports, we developed an AI-powered system capable of
          generating personalized therapy activities. This innovative solution
          considers factors such as age, gender, condition, and therapy type to
          create engaging and effective activities tailored to each child&apos;s
          needs.
        </p>
        <p className="text-lg font-semibold text-gray-700 mb-8">
          Our AI-driven platform is designed to save therapists valuable time,
          reduce errors, and ensure consistency across multiple therapists. By
          focusing on the unique needs of each child, we aim to make therapy more
          effective and enjoyable, ultimately helping children reach their full
          potential.
        </p>
        <p className="text-lg font-semibold text-gray-700">
          We are proud of the impact our solution is making in the field of
          therapy and excited to continue evolving and improving our offerings to
          better support therapists and the children they care for.
        </p>
        <p className="text-lg font-semibold text-gray-700 mt-8 text-center">
          Thank you for joining us on this journey. Together, we are paving the
          way for a brighter future in therapy.
        </p>
      </div>
    </div>
  </>
);

export default AboutUs;
