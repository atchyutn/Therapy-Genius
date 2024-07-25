import React, { useState, useRef } from "react";
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
  const printRef = useRef<HTMLDivElement>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const editableRef = useRef<HTMLDivElement>(null);


  const handleButtonClick = () => {
    if (activities) {
      const printContent = editableRef.current?.innerHTML;
      const printWindow = window.open("", "", "width=800,height=600");
      if (printWindow && printContent) {
        printWindow.document.write(`
        <html>
          <head>
            <style>
              @media print {
                @page { margin: 20mm; }
                body { 
                  -webkit-print-color-adjust: exact; 
                  margin: 0; 
                }
                body::before {
                  content: '';
                  display: block;
                  height: 20mm; /* space for header */
                }
                body::after {
                  content: '';
                  display: block;
                  height: 20mm; /* space for footer */
                }
                header {
                  position: fixed;
                  top: 0;
                  width: 100%;
                  height: 20mm;
                  background: white;
                  text-align: center;
                  padding: 10px;
                  border-bottom: 1px solid #ccc;
                }
                footer {
                  position: fixed;
                  bottom: 0;
                  width: 100%;
                  height: 20mm;
                  background: white;
                  text-align: center;
                  padding: 10px;
                  border-top: 1px solid #ccc;
                }
              }
              .print-header, .print-footer {
                width: 100%;
                text-align: center;
                padding: 10px 0;
              }
              .print-header {
                border-bottom: 1px solid #ccc;
              }
              .print-footer {
                border-top: 1px solid #ccc;
              }
              .company-info {
                display: flex;
                justify-content: space-between;
              }
              .company-info div {
                flex: 1;
              }
            </style>
          </head>
          <body>
            <header class="print-header">
              <div class="company-info">
                <div>Therapy Genius</div>
                <div>123 Therapy St, Wellness City</div>
                <div>+123-456-7890</div>
              </div>
            </header>
            <br />
            ${printContent}
            <br />  
            <footer class="print-footer">
              <div class="company-info">
                <div>Therapy Genius</div>
                <div>Contact us: info@reportgenius.com</div>
                <div>+123-456-7890</div>
              </div>
            </footer>
          </body>
        </html>
      `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleEditClick = () => {
    setIsEditable(true);
    if (editableRef.current) {
      editableRef.current.focus();
    }
  };

  const handleSaveClick = () => {
    setIsEditable(false);
    // Add any save logic if needed
  };

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
                  <div className="timeline-end mb-10 md:text-end">
                    <div className="text-lg text-indigo-600 font-bold">
                      2. Select Therapy Type
                    </div>
                    Choose the appropriate therapy type based on the
                    patient&apos;s needs.
                  </div>
                  <hr />
                </li>
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
                      3. Add Therapy Goals
                    </div>
                    Enter specific therapy goals to generate customized
                    activities.
                  </div>
                  <hr />
                </li>
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
                  <div className="timeline-end md:text-end">
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
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {!loading && activities && (
            <div ref={printRef}>
              <h2 className="text-2xl font-bold mb-4">
                Generated Therapy Activities:
              </h2>
              <div
                ref={editableRef}
                className={`mt-4 ${
                  isEditable ? "border border-indigo-600 p-2" : ""
                }`}
                contentEditable={isEditable}
                suppressContentEditableWarning={true}
                dangerouslySetInnerHTML={{ __html: activities }}
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={handleButtonClick}
                  className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-200 transition duration-300"
                >
                  Print Activities
                </button>
                <button
                  className={`text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ${
                    isEditable
                      ? "bg-red-700 hover:bg-red-600"
                      : "bg-blue-700 hover:bg-blue-600"
                  }`}
                  onClick={() => setIsEditable(!isEditable)}
                >
                  {isEditable ? "Cancel Edit" : "Edit Report"}
                </button>
                {/* {isEditable && (
                  <button
                    className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                    onClick={handleSaveClick}
                  >
                    Save Report
                  </button>
                )} */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapyForm;
