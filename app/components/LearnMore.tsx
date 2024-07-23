import React from "react";
import Lottie from "lottie-react";
import ActivitesLoader from "../..//public/hero-animation.json";
import Features from "./Features";
import Benifits from "./Benifits";

const LearnMore = () => (
  <>
    {/* <div className="hero min-h-screen bg-gradient-to-r from-violet-200 to-pink-200 rounded-lg p-8 shadow-lg">
      <div className="hero-content flex-col lg:flex-row">
        <div className="mr-10 px-10">
          <h2 className="text-2xl font-bold mb-4">
            Personalized Therapy Activities
          </h2>
          <p className="mb-4">
            Our AI-generated activities are tailored to each child&apos;s unique
            needs, making therapy effective and engaging.
          </p>
          <h3 className="text-xl font-bold mb-2">Benefits:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Custom Fit:</strong> Activities match the child&apos;s
              specific goals.
            </li>
            <li>
              <strong>Engaging:</strong> Fun tasks that keep kids interested.
            </li>
            <li>
              <strong>Effective:</strong> Designed to achieve real progress.
            </li>
            <li>
              <strong>Convenient:</strong> Ready-to-use activities save time.
            </li>
            <li>
              <strong>Holistic:</strong> Supports overall development.
            </li>
          </ul>
          <p>
            These activities are designed to make therapy both enjoyable and
            impactful.
          </p>
        </div>
        <div className="mockup-window bg-gray-600 border w-2/3">
          <div className="bg-gray-400 flex justify-items-stretch">
            <img src={"/sample-image.png"} className="w-full h-auto max-w-lg" />
          </div>
        </div>
      </div>
    </div> */}
    <Benifits />
    <hr className="mt-10 bg-gray-50 rounded-3xl shadow-2xl"></hr>
      <Features />
  </>
);

export default LearnMore;
