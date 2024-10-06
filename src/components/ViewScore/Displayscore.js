import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Login/Nav";

const DisplayScores = ({ role }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for search inputs
  const [empNameSearch, setEmpNameSearch] = useState("");
  const [trainingNameSearch, setTrainingNameSearch] = useState("");

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get("http://localhost:3000/viewscore");
        setScores(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  // Filtering scores based on search inputs
  const filteredScores = scores.filter((score) => {
    return (
      score.emp_name.toLowerCase().includes(empNameSearch.toLowerCase()) &&
      score.Training_name.toLowerCase().includes(
        trainingNameSearch.toLowerCase()
      )
    );
  });

  return (
    <div>
      <Nav role={role} showNav={role} />

      <div className="overflow-x-auto mb-4 my-5 mx-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#3411a3]">Training Scores</h2>

          {/* Search Inputs */}
          <div className="flex items-center mr-5">
            <div className="mr-4 flex items-center">
              <label
                className="block text-12px font-semibold mr-2 text-[#3411a3]"
                htmlFor="empNameSearch"
              >
                Employee Name
              </label>
              <input
                id="empNameSearch"
                type="text"
                placeholder="Search by Employee Name"
                value={empNameSearch}
                onChange={(e) => setEmpNameSearch(e.target.value)}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:border-gray-300"
              />
            </div>

            <div className="flex items-center">
              <label
                className="block text-12px font-semibold mr-2 text-[#3411a3]"
                htmlFor="trainingNameSearch"
              >
                Training Name
              </label>
              <input
                id="trainingNameSearch"
                type="text"
                placeholder="Search by Training Name"
                value={trainingNameSearch}
                onChange={(e) => setTrainingNameSearch(e.target.value)}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:border-gray-300"
              />
            </div>
          </div>
        </div>

        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-pink-200 text-[#3411a3]">
              <th className="py-4 px-4 border-b-2 border-r-2 border-gray-300">
                Employee ID
              </th>
              <th className="py-4 px-4 border-b-2 border-r-2 border-gray-300">
                Employee Name
              </th>
              <th className="py-4 px-4 border-b-2 border-r-2 border-gray-300">
                Training Name
              </th>
              <th className="py-4 px-4 border-b-2 border-r-2 border-gray-300">
                Trainer Name
              </th>
              <th className="py-4 px-4 border-b-2 border-r-2 border-gray-300">
                Project Scores
              </th>
              <th className="py-4 px-4 border-b-2 border-r-2 border-gray-300">
                Comments
              </th>
              <th className="py-4 px-4 border-b-2 border-r-2 border-gray-300">
                Time Management
              </th>
              <th className="py-4 px-4 border-b-2 border-r-2 border-gray-300">
                Understanding Requirements
              </th>
              <th className="py-4 px-4 border-b-2 border-gray-300">
                HackerRank Scores
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="9" className="py-4 text-red-500 text-center">
                  Error fetching scores: {error}
                </td>
              </tr>
            ) : filteredScores.length === 0 ? (
              <tr>
                <td colSpan="9" className="py-4 text-center">
                  No scores available
                </td>
              </tr>
            ) : (
              filteredScores.map((score, index) => (
                <tr
                  key={score._id}
                  className={`hover:bg-pink-300 ${
                    index % 2 === 0 ? "bg-pink-50" : "bg-pink-100"
                  }`}
                >
                  <td className="py-4 px-4 border-b-4  border-r border-gray-300 text-[#3411a3]">
                    {score.emp_id}
                  </td>
                  <td className="py-4 px-4 border-b-4  border-r border-gray-300 text-[#3411a3]">
                    {score.emp_name}
                  </td>
                  <td className="py-4 px-4 border-b-4 border-r border-gray-300 text-[#3411a3]">
                    {score.Training_name}
                  </td>
                  <td className="py-4 px-4 border-b-4  border-r border-gray-300 text-[#3411a3]">
                    {score.Trainer_name}
                  </td>
                  <td className="py-4 px-4 border-b-4  border-r border-gray-300 text-[#3411a3]">
                    {score.project_scores}
                  </td>
                  <td className="py-4 px-4 border-b-4  border-r border-gray-300 text-[#3411a3]">
                    {score.comments}
                  </td>
                  <td className="py-4 px-4 border-b-4  border-r border-gray-300 text-[#3411a3]">
                    {score.time}
                  </td>
                  <td className="py-4 px-4 border-b-4  border-r border-gray-300 text-[#3411a3]">
                    {score.requirements}
                  </td>
                  <td className="py-4 px-4 border-b-4  border-r border-gray-300 text-[#3411a3]">
                    {score.hackerrank}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayScores;
