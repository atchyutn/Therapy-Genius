// components/TherapyForm.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

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

  // Ensure component runs on the client side after hydration
  useEffect(() => {}, []);

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

      setActivities(response.data.activities); // Assuming response contains 'activities'
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
      setActivities(null);
    }
  };

  const handleAddGoal = () => {
    setGoalList([...goalList, ""]); // Add a new empty goal to the list
  };

  const handleGoalChange = (index: number, value: string) => {
    const updatedGoals = [...goalList];
    updatedGoals[index] = value;
    setGoalList(updatedGoals);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Therapy Activity Suggestion</h1>
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
        {activities && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Suggested Activities:</h2>
            <pre className="bg-gray-100 p-4 rounded">{activities}</pre>
          </div>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default TherapyForm;
