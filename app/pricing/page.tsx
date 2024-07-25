// /app/pricing/page.tsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const pricingPlans = [
  {
    title: "Beta Plan",
    price: "Currently in Beta",
    features: ["Access to all features", "Email support", "Default reports styling"],
    isBeta: false,
  },
  {
    title: "Basic Plan",
    price: "$9/month",
    features: ["Access to core features", "Email support"],
    isBeta: true,
  },
  {
    title: "Professional Plan",
    price: "$29/month",
    features: [
      "All features in Basic Plan",
      "Priority support",
      "Custom reports",
    ],
    isBeta: true,
  },
  {
    title: "Enterprise Plan",
    price: "$99/month",
    features: [
      "All features in Professional Plan",
      "Dedicated account manager",
      "API access",
      "On-site training",
    ],
    isBeta: true,
  },
];

const Pricing = () => (
  <>
    <Navbar />
    <div className="bg-gradient-to-r from-violet-200 to-pink-200 overflow-hidden shadow-lg px-20 py-10">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <h2 className="text-center font-bold text-4xl md:text-5xl lg:text-6xl text-indigo-600 mb-6">
          Pricing Plans
        </h2>
        <p className="text-center text-lg text-gray-700 mb-12">
          Currently, our app is in beta as a part of the <b>AI For Tomorrow</b>{" "}
          hackathon, and you can use the app for free. Check back later for more
          customised plan.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                plan.isBeta
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-xl hover:-translate-y-1"
              } p-6`}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                {plan.title}
              </h3>
              <p className="text-xl font-bold text-indigo-600 text-center mb-4">
                {plan.price}
              </p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
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
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.isBeta && (
                <div className="text-center">
                  <a
                    href="#"
                    className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 cursor-not-allowed"
                  >
                    Choose Plan
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  </>
);

export default Pricing;
