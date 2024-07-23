import React from "react";
import Lottie from "lottie-react";
import InstantReportAnimation from "../../public/instant-report-animation.json"; // replace with actual path
import PrintReadyAnimation from "../../public/print-ready-animation.json"; // replace with actual path
import EditableAnimation from "../../public/editable-animation.json"; // replace with actual path

const tiles = [
  {
    title: "Instant Report Generation",
    description:
      "Generate comprehensive reports in seconds, not hours or minutes, saving you valuable time.",
    animationData: InstantReportAnimation,
  },
  {
    title: "Fully Editable Reports",
    description:
      "Easily customize and edit your reports to perfectly match your specific needs and preferences.",
    animationData: EditableAnimation,
  },
  {
    title: "Print-Ready Output",
    description:
      "Produce professionally formatted reports that are immediately ready for printing or digital distribution.",
    animationData: PrintReadyAnimation,
  },
];

const Features = () => (
  <div className="bg-gradient-to-r from-violet-200 to-pink-200 rounded-3xl overflow-hidden shadow-lg p-8">
    <div className="container mx-auto px-4">
      <h2 className="text-center font-bold text-4xl md:text-5xl lg:text-6xl text-indigo-600 mb-6">
        Features
      </h2>
      <p className="text-center font-medium text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-16">
        Writing reports has never been so easy and efficient
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="w-32 h-32 mx-auto mb-4">
                <Lottie animationData={tile.animationData} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {tile.title}
              </h3>
              <p className="text-gray-600 text-center">{tile.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Features;
