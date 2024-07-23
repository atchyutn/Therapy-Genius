import React from 'react';
import Image from 'next/image';

const Benifits = () => (
  <div className="bg-gradient-to-r from-violet-200 to-pink-200 rounded-3xl overflow-hidden shadow-lg p-8">
    <div className="container mx-auto px-6 py-16 max-w-7xl">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl text-indigo-600 mb-6">
            Benefits
          </h2>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6 leading-tight">
            Personalized Therapy Activities
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our AI-generated activities are tailored to each child&apos;s unique
            needs, making therapy effective and engaging.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              {
                title: "Custom Fit",
                description: "Activities match the child's specific goals.",
              },
              {
                title: "Engaging",
                description: "Fun tasks that keep kids interested.",
              },
              {
                title: "Effective",
                description: "Designed to achieve real progress.",
              },
              {
                title: "Convenient",
                description: "Ready-to-use activities save time.",
              },
              {
                title: "Holistic",
                description: "Supports overall development.",
              },
            ].map((benefit, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  <strong className="text-gray-800">{benefit.title}:</strong>{" "}
                  <span className="text-gray-600">{benefit.description}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="text-lg text-gray-600 italic">
            These activities are designed to make therapy both enjoyable and
            impactful.
          </p>
        </div>
        <div className="lg:w-1/2 rounded-2xl overflow-hidden">
        <div className="relative h-96 w-full">
            <Image
              src="/sample-image.png"
              alt="Sample Therapy Activity"
              layout="fill"
              objectFit="contain"
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Benifits;