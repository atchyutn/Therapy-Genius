import React, { useState } from "react";
import axios from "axios";

interface Activity {
  [key: string]: string;
}

interface ActivitiesResponse {
  [key: string]: string | Activity[];
}

function parseActivitiesResponse(response: string): string {
  try {
    const parsedResponse: ActivitiesResponse = JSON.parse(response);

    let formattedResponse = "";


    for (const [key, value] of Object.entries(parsedResponse)) {
      if (key.startsWith("Goal")) {
        formattedResponse += `<div class="font-bold text-xl mb-2">${key}:</div>`;
        formattedResponse += `<div class="mb-4">${value}</div>`;
        formattedResponse += `<div class="font-semibold text-lg mb-2">Activities:</div>`;
      } else if (key === "Activities" && Array.isArray(value)) {
        value.forEach((activity: Activity, index: number) => {
          formattedResponse += `<div class="mb-4"><div class="font-bold">Activity ${
            index + 1
          }:</div>`;
          for (const [actKey, actValue] of Object.entries(activity)) {
            formattedResponse += `<div><strong>${actKey}:</strong> ${actValue}</div>`;
          }
          formattedResponse += `</div>`;
        });
      }
    }


    return formattedResponse.replace(/"/g, "");
  } catch (error) {
    console.error("Error parsing activities response:", error);
    return "Error parsing activities response";
  }
}

const TherapyForm: React.FC = () => {
  const [name, setName] = useState("kid");
  const [age, setAge] = useState("6");
  const [gender, setGender] = useState("Male");
  const [therapyType, setTherapyType] = useState("");
  const [goalList, setGoalList] = useState([
    "Sitting Tolerance (with and without activity)",
  ]);
  const [activities, setActivities] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/get-therapy-activities", {
        name,
        age,
        gender,
        therapyType,
        goals: goalList,
      });

      console.log("Response from API:", response.data);

      if (
        response.data.activities &&
        typeof response.data.activities === "string"
      ) {
        const parsedActivities = parseActivitiesResponse(
          response.data.activities
        );
        console.log("Parsed Activities:", parsedActivities);
        setActivities(parsedActivities);
        setError(null);
      } else {
        console.error("Unexpected response format:", response.data);
        setError("Unexpected response format from the server");
        setActivities(null);
      }
    } catch (err: any) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong");
      setActivities(null);
    }
  };

  const handleAddGoal = () => {
    setGoalList([...goalList, ""]);
  };

  const handleGoalChange = (index: number, value: string) => {
    const updatedGoals = [...goalList];
    updatedGoals[index] = value;
    setGoalList(updatedGoals);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row">
        <div className="flex-shrink-0 pr-4 mb-6 md:mb-0">
          <h1 className="text-2xl font-bold mb-6">
            Therapy Activity Suggestion
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name of the kid"
                className="input input-bordered w-full max-w-xs"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Age"
                className="input input-bordered w-full max-w-xs"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Gender"
                className="input input-bordered w-full max-w-xs"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <select
                className="select select-bordered w-full max-w-xs"
                value={therapyType}
                onChange={(e) => setTherapyType(e.target.value)}
                required
              >
                <option disabled value="">
                  Select Therapy Type
                </option>
                <option>Occupational Therapy</option>
                <option>Behavior Therapy</option>
                <option>Speech Therapy</option>
              </select>
            </div>
            {goalList.map((goal, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder={`Goal ${index + 1}`}
                  className="input input-bordered w-full max-w-xs"
                  value={goal}
                  onChange={(e) => handleGoalChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
            <div className="mb-4">
              <button
                className="text-blue-500 underline focus:outline-none"
                type="button"
                onClick={handleAddGoal}
              >
                + Add goal
              </button>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Get Activities
            </button>
          </form>
        </div>
        <div className="flex-1 pl-4">
          {activities && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Suggested Activities:</h2>
              <div
                className="bg-gray-100 p-4 rounded"
                dangerouslySetInnerHTML={{ __html: activities }}
              >
                {activities}
              </div>
            </div>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default TherapyForm;
