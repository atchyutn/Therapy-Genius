import React, { useState } from "react";
import axios from "axios";
import ActivitesLoader from "../../public/activities-loader.json";
import Lottie from "lottie-react";


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
    setActivities(null);
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
    <div className=" bg-gradient-to-r from-violet-200 to-pink-200 p-8">
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
            <>
              {/* <div className="flex w-auto flex-col gap-4">
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
              </div> */}
              <Lottie
                animationData={ActivitesLoader}
                loop={true}
                className="w-full h-auto max-w-lg"
              />
            </>
          )}
          {!loading && !activities && (
            <div className="">
              <h2 className="text-xl font-bold mb-4">
                How to Generate Therapy Activities:
              </h2>
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                <li>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-indigo-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-start mb-10 md:text-end">
                    <div className="text-lg text-indigo-600 font-bold">
                      1. Enter Patient Details
                    </div>
                    Provide the necessary information about the patient to
                    tailor the activities effectively.
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-indigo-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end mb-10">
                    <div className="text-lg text-indigo-600 font-bold">
                      2. Select Therapy Type
                    </div>
                    Choose the type of therapy that suits the patient&apos;s
                    needs from the available options.
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-indigo-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-start mb-10 md:text-end">
                    <div className="text-lg text-indigo-600 font-bold">
                      3. Enter Therapy Goals
                    </div>
                    Define the specific goals for the therapy to guide the AI in
                    generating relevant activities.
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-indigo-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end mb-10">
                    <div className="text-lg text-indigo-600 font-bold">
                      4. Submit to Generate Activities
                    </div>
                    Click submit to receive a list of activities tailored to the
                    patient&apos;s goals and therapy type.
                  </div>
                </li>
              </ul>
            </div>
          )}

          {activities && (
            <div className="">
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
