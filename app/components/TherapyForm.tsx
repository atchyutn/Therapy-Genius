import React, { useState, useRef } from "react";
import axios from "axios";
import ActivitesLoader from "../../public/activities-loader.json";
import Lottie from "lottie-react";
import Instructions from "./Instructions";
import ButtonAction from "./ButtonAction";

interface ApiResponse {
  activities: string;
}

interface PredefinedGoals {
  [key: string]: string[];
}

const TherapyForm: React.FC = () => {
  const [name, setName] = useState("kid");
  const [age, setAge] = useState("6");
  const [gender, setGender] = useState("Male");
  const [therapyType, setTherapyType] = useState("");
  const [goalList, setGoalList] = useState<string[]>([]);
  const [customGoal, setCustomGoal] = useState("");
  const [activities, setActivities] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isGoalDropdownOpen, setIsGoalDropdownOpen] = useState(false);

  const predefinedGoals: PredefinedGoals = {
    "Occupational Therapy": [
      "Improve fine motor skills",
      "Enhance sensory processing",
      "Develop self-care skills",
    ],
    "Behavior Therapy": [
      "Reduce challenging behaviors",
      "Improve social skills",
      "Increase communication abilities",
    ],
    "Speech Therapy": [
      "Enhance articulation and pronunciation",
      "Improve language comprehension",
      "Develop fluency in speech",
    ],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post<ApiResponse>(
        "/api/get-therapy-activities",
        {
          name,
          age,
          gender,
          therapyType,
          goals: [...goalList, customGoal].filter((goal) => goal.trim() !== ""),
        }
      );

      console.log("Response from API:", response.data);

      if (response.data.activities) {
        // Parse the activities string
        const parsedResponse = JSON.parse(response.data.activities);

        if (parsedResponse.html) {
          setActivities(parsedResponse.html);
          setError(null);
        } else {
          console.error("Unexpected response format:", parsedResponse);
          setError("Unexpected response format from the server");
          setActivities(null);
        }
      } else {
        console.error("Unexpected response format:", response.data);
        setError("Unexpected response format from the server");
        setActivities(null);
      }
    } catch (err: any) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong");
      setActivities(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomGoal = () => {
    if (customGoal.trim() !== "") {
      setGoalList([...goalList, customGoal.trim()]);
      setCustomGoal("");
    }
  };

  const handleRemoveGoal = (goal: string) => {
    const updatedGoals = goalList.filter((g) => g !== goal);
    setGoalList(updatedGoals);
  };

  const handleGoalToggle = (goal: string) => {
    setGoalList((prevGoals) =>
      prevGoals.includes(goal)
        ? prevGoals.filter((g) => g !== goal)
        : [...prevGoals, goal]
    );
  };

  const handleTherapyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTherapyType = e.target.value;
    setTherapyType(newTherapyType);
    setGoalList([]);
    setCustomGoal("");
  };

  return (
    <div className="bg-gradient-to-r from-violet-200 to-pink-200 p-8">
      <div className="mx-auto bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row">
        <div className="flex-shrink-0 pr-4 mb-6 md:mb-0">
          <h1 className="text-2xl font-bold mb-6">
            Enter Goals and Get Activities
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
              <select
                className="select select-bordered w-full max-w-xs"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <select
                className="select select-bordered w-full max-w-xs"
                value={therapyType}
                onChange={handleTherapyTypeChange}
                required
              >
                <option
                  disabled
                  value=""
                  className="select select-bordered w-full max-w-xs text-left"
                >
                  Select Therapy Type
                </option>
                <option>Occupational Therapy</option>
                <option>Behavior Therapy</option>
                <option>Speech Therapy</option>
              </select>
            </div>
            {therapyType && (
              <div className="mb-4 relative">
                <button
                  type="button"
                  className="select select-bordered w-full max-w-xs text-left"
                  onClick={() => setIsGoalDropdownOpen(!isGoalDropdownOpen)}
                >
                  {goalList.length > 0
                    ? `${goalList.length} goal(s) selected`
                    : "Select goals"}
                </button>
                {isGoalDropdownOpen && (
                  <div className="absolute z-10 w-full max-w-xs mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {predefinedGoals[therapyType].map((goal, index) => (
                      <label
                        key={index}
                        className="flex items-center p-2 hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          checked={goalList.includes(goal)}
                          onChange={() => handleGoalToggle(goal)}
                          className="mr-2"
                        />
                        {goal}
                      </label>
                    ))}
                    {goalList
                      .filter(
                        (goal) => !predefinedGoals[therapyType].includes(goal)
                      )
                      .map((customGoal, index) => (
                        <label
                          key={`custom-${index}`}
                          className="flex items-center p-2 hover:bg-gray-100"
                        >
                          <input
                            type="checkbox"
                            checked={true}
                            onChange={() => handleGoalToggle(customGoal)}
                            className="mr-2"
                          />
                          {customGoal}
                        </label>
                      ))}
                  </div>
                )}
              </div>
            )}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Add custom goal"
                className="input input-bordered w-full max-w-xs"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomGoal();
                  }
                }}
              />
              <button
                type="button"
                className="text-blue-500 underline focus:outline-none mt-2"
                onClick={handleAddCustomGoal}
              >
                + Add goal
              </button>
            </div>
            <div className="mb-4">
              {goalList.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Selected Goals:
                  </h3>
                  {goalList.map((goal, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 hover:bg-gray-100"
                    >
                      <span>{goal}</span>
                      <button
                        className="text-red-500"
                        onClick={() => handleRemoveGoal(goal)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {customGoal && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Custom Goals:</h3>
                  {customGoal && (
                    <div className="flex items-center justify-between p-2 hover:bg-gray-100">
                      <span>{customGoal}</span>
                      <button
                        className="text-red-500"
                        onClick={() => handleRemoveGoal(customGoal)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              className="bg-indigo-700 text-white font-semibold py-3 px-6 md:py-3 md:px-8 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300 mt-4"
              type="submit"
              disabled={loading}
            >
              {loading ? "Generating Activities..." : "Generate Activities"}
            </button>
          </form>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="flex-1 pl-4">
          {loading && (
            <Lottie
              animationData={ActivitesLoader}
              loop={true}
              className="w-full h-auto max-w-lg"
            />
          )}
          {!loading && !activities && <Instructions />}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <ButtonAction loading={loading} activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default TherapyForm;
