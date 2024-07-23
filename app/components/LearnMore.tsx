import React from "react";
import Lottie from "lottie-react";
import ActivitesLoader from "../..//public/hero-animation.json";
import Features from "./Features";
import Benefits from "./Benefits";

const LearnMore = () => (
  <>
    <Benefits />
    <hr className="mt-10 bg-gray-50 rounded-3xl shadow-2xl"></hr>
    <Features />
  </>
);

export default LearnMore;
