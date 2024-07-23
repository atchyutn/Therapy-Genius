import React, { useState } from "react";
import axios from "axios";

interface ApiResponse {
  activities: string; // Changed from html to activities
}

const TherapyForm: React.FC = () => {
  const [name, setName] = useState("kid");
  const [age, setAge] = useState("6");
  const [gender, setGender] = useState("Male");
  const [therapyType, setTherapyType] = useState("");
  const [goalList, setGoalList] = useState([""]);
  const [activities, setActivities] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
          goals: goalList.filter((goal) => goal.trim() !== ""),
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

  const handleAddGoal = () => {
    setGoalList([...goalList, ""]);
  };

  const handleGoalChange = (index: number, value: string) => {
    const updatedGoals = [...goalList];
    updatedGoals[index] = value;
    setGoalList(updatedGoals);
  };

  const handleRemoveGoal = (index: number) => {
    const updatedGoals = goalList.filter((_, i) => i !== index);
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
              <div key={index} className="mb-4 flex items-center">
                <input
                  type="text"
                  placeholder={`Goal ${index + 1}`}
                  className="input input-bordered w-full max-w-xs mr-2"
                  value={goal}
                  onChange={(e) => handleGoalChange(index, e.target.value)}
                  required
                />
                {goalList.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveGoal(index)}
                  >
                    Remove
                  </button>
                )}
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
              disabled={loading}
            >
              {loading ? "Loading..." : "Get Activities"}
            </button>
          </form>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="flex-1 pl-4">
          {loading && (
            <>
              <div className="flex w-auto flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
              <br></br>
              <div className="flex w-auto flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            </>
          )}
          {activities && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Suggested Activities:</h2>
              <div
                className="bg-gray-100 p-4 rounded"
                dangerouslySetInnerHTML={{ __html: activities }}
              />
            </div>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default TherapyForm;
