import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import Nav from "../Login/Nav";

const EmployeeReport = ({ role }) => {
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [trainingScores, setTrainingScores] = useState([]);
  const [empOptions, setEmpOptions] = useState([]);

  useEffect(() => {
    const fetchEmpIds = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getEmpId"); //get employee ID
        setEmpOptions(response.data);
      } catch (error) {
        console.error("Error fetching employee IDs:", error);
      }
    };
    fetchEmpIds();
  }, []);

  const handleEmpIdChange = (e) => {
    const selectedEmpId = e.target.value;
    setEmpId(selectedEmpId);

    const selectedEmployee = empOptions.find(
      (emp) => emp.emp_id === selectedEmpId
    );
    if (selectedEmployee) {
      setEmpName(selectedEmployee.emp_name);
    }
  };

  //search employee
  const handleSearch = async () => {
    if (!empId || !empName) {
      alert("Please enter both Employee ID and Name.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/getReport?emp_id=${empId}&emp_name=${empName}`
      );
      setEmployeeDetails({
        emp_id: response.data.emp_id,
        emp_name: response.data.emp_name,
        designation: response.data.designation,
      });
      setTrainingScores(response.data.trainings || []);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  //chart to display scores
  const chartData = {
    series: [
      {
        name: "Project Score",
        data: trainingScores.map((score) => score.project_scores || 0),
      },
      {
        name: "Requirements Score",
        data: trainingScores.map((score) => score.requirements || 0),
      },
      {
        name: "Time Management",
        data: trainingScores.map((score) => score.time || 0),
      },
      {
        name: "Hackerrank Score",
        data: trainingScores.map((score) => score.hackerrank || 0),
      },
    ],
    options: {
      chart: { type: "bar", height: 350 },
      xaxis: {
        categories: trainingScores.map(
          (score) => score.Training_name || "Unknown"
        ),
        labels: { style: { colors: "#3411a3" } },
      },
      title: {
        text: "Employee Training Scores",
        align: "center",
        style: { color: "#3411a3", fontSize: "20px", fontWeight: "bold" },
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
        floating: true,
        labels: { colors: "#3411a3" },
      },
      colors: ["#fc6c85", "#fc8eac", "#ff9999", "#ffd1dc"],
    },
  };

  //calculation of project scores
  const calculateProjectPerformance = (score) => {
    if (score >= 70) return "Good";
    if (score >= 40 && score < 70) return "Average";
    return "Poor";
  };

  //calculation on other parameter scores
  const calculatePerformance = (score) => {
    if (score >= 7) return "Good";
    if (score >= 5 && score < 7) return "Average";
    return "Poor";
  };

  //comments based on scores
  const getComment = (
    projectPerformance,
    hackerrankPerformance,
    requirementsPerformance
  ) => {
    if (
      (projectPerformance === "Poor" ||
        projectPerformance === "Average" ||
        hackerrankPerformance === "Poor" ||
        hackerrankPerformance === "Average") &&
      (requirementsPerformance === "Poor" ||
        requirementsPerformance === "Average")
    ) {
      return "Focus technically and on consulting skills";
    }
    if (
      projectPerformance === "Poor" ||
      projectPerformance === "Average" ||
      hackerrankPerformance === "Poor" ||
      hackerrankPerformance === "Average"
    ) {
      return "Focus technically";
    }
    if (
      requirementsPerformance === "Poor" ||
      requirementsPerformance === "Average"
    ) {
      return "Improve consulting skills";
    }
    return "Good";
  };

  return (
    <div className="w-full min-h-screen">
      <Nav role={role} showNav={true} />
      {/*search employee*/}
      <div className="flex flex-col w-full mx-4 mt-4 p-6">
        <div className="flex items-start justify-start mb-4 mr-8">
          <label className="mr-4 font-semibold text-[#3411a3]">
            <span>Employee ID:</span>
            <select
              value={empId}
              onChange={handleEmpIdChange}
              className="border p-2 rounded w-48 ml-2 focus:outline-none focus:border-gray-300"
            >
              <option value="" disabled>
                Select Employee ID
              </option>
              {empOptions.map((emp) => (
                <option key={emp.emp_id} value={emp.emp_id}>
                  {emp.emp_id}
                </option>
              ))}
            </select>
          </label>
          <label className="mr-4 font-semibold text-[#3411a3]">
            <span>Employee Name:</span>
            <input
              type="text"
              value={empName}
              readOnly
              className="border p-2 rounded w-48 ml-2 focus:outline-none focus:border-gray-300"
            />
          </label>
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
        {/*Display employee Details*/}
        {employeeDetails && (
          <div className="flex w-full ">
            <div className="w-1/3 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg p-4 bg-white flex-grow">
              <h2 className="text-xl font-bold mb-2 text-[#3411a3]">
                Employee Details
              </h2>
              <p className="mb-1 font-bold text-xl">
                <strong className="text-[#3411a3] font-bold text-xl mr-20">
                  ID:
                </strong>
                <span className="text-[#EC4899]">
                  {employeeDetails.emp_id}
                </span>
              </p>
              <p className="mb-1 font-bold text-xl">
                <strong className="text-[#3411a3] font-bold text-xl mr-12">
                  Name:
                </strong>
                <span className="text-[#EC4899]">
                  {employeeDetails.emp_name}
                </span>
              </p>
              <p className="mb-4 font-bold text-xl">
                <strong className="text-[#3411a3] font-bold text-xl">
                  Designation:
                </strong>
                <span className="text-[#EC4899]">
                  {employeeDetails.designation}
                </span>
              </p>
              <h3 className="mt-4 text-[#3411a3] font-bold text-xl">
                Trainings:
              </h3>
              <ul className="list-disc list-inside ml-12 font-bold text-xl">
                {trainingScores.map((score, index) => (
                  <li key={index} className="mb-1 text-[#EC4899]">
                    {score.Training_name}
                  </li>
                ))}
              </ul>
            </div>

            {/*Display Employee scores as chart*/}
            <div className="w-2/3 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg p-4 bg-white">
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={350}
              />
            </div>
          </div>
        )}

       {/*Training Score and Comment Table*/}
        {trainingScores.length > 0 && (
          <div className="w-full mt-4 p-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-xl font-bold mb-2 text-[#3411a3]">
              Performance in Each Training
            </h2>
            <div className="flex justify-between border-b font-bold bg-pink-100 h-10 text-[#3411a3]">
              <span className="w-1/4 truncate">Trainings</span>
              <span className="w-1/4 truncate">Project Performance</span>
              <span className="w-1/4 truncate">Hackerrank Performance</span>
              <span className="w-1/4 truncate">Consulting Performance</span>
              <span className="w-1/4 truncate">Comments</span>
            </div>
            <div className="flex flex-col space-y-4">
              {trainingScores.map((score, index) => {
                const projectPerformance = calculateProjectPerformance(
                  score.project_scores
                );
                const hackerrankPerformance = calculatePerformance(
                  score.hackerrank
                );
                const averageRequirementScore =
                  (score.requirements + score.time) / 2;
                const requirementsPerformance = calculatePerformance(
                  averageRequirementScore
                );
                const comments = getComment(
                  projectPerformance,
                  hackerrankPerformance,
                  requirementsPerformance
                );

                return (
                  <div
                    key={index}
                    className={`flex justify-between py-2 border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-pink-50"
                    } font-bold`}
                  >
                    <span className="w-1/4 truncate text-[#EC4899]">
                      {score.Training_name}
                    </span>
                    <span className="w-1/4 truncate text-[#EC4899]">
                      {projectPerformance}
                    </span>
                    <span className="w-1/4 truncate text-[#EC4899]">
                      {hackerrankPerformance}
                    </span>
                    <span className="w-1/4 truncate text-[#EC4899]">
                      {requirementsPerformance}
                    </span>
                    <span className="w-1/4 truncate text-[#EC4899]">
                      {comments}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeReport;
