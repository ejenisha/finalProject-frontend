import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Login/Nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Training = ({ role }) => {
  const [formData, setFormData] = useState({
    emp_id: "",
    emp_name: "",
    Training_id: "",
    Training_name: "",
    Trainer_name: "",
    project_scores: "",
    comments: "",
    time: "",
    requirements: "",
    hackerrank: "",
  });

  const [employees, setEmployees] = useState([]); // To store the fetched employee data
  const [trainings, setTrainings] = useState([]); // To store the fetched training data

  // Fetch employee data on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/getAllEmployees" //get all employee details
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    const fetchTrainings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/getAllTrainings" //get all training data
        );
        setTrainings(response.data);
      } catch (error) {
        console.error("Error fetching training data:", error);
      }
    };

    fetchEmployees();
    fetchTrainings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // When employee ID is selected, find and set the corresponding employee name
    if (name === "emp_id") {
      const selectedEmployee = employees.find((emp) => emp.emp_id === value);
      setFormData({
        ...formData,
        emp_id: value,
        emp_name: selectedEmployee ? selectedEmployee.emp_name : "", // Automatically populate name
      });
    }
    // When Training ID is selected, find and set the corresponding Training name and Trainer name
    else if (name === "Training_id") {
      const selectedTraining = trainings.find(
        (training) => training.Training_id === value
      );
      setFormData({
        ...formData,
        Training_id: value,
        Training_name: selectedTraining ? selectedTraining.Training_name : "", // Automatically populate Training name
        Trainer_name: selectedTraining ? selectedTraining.Trainer_name : "", // Automatically populate Trainer name
      });
    }
    // Handle other fields
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/trainer/enterscore", //enter training score
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Score submitted successfully!", {
        autoClose: 3,
      });
      console.log("Success:", response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit score.", {
        autoClose: 3,
      });
    }
  };

  return (
    <div>
      <Nav role={role} showNav={true} />
      <div className="flex items-center justify-center h-screen ">
        <div className="m-12 w-full max-h-full max-w-7xl bg-white rounded-lg shadow-lg p-10">
          <h2 className="text-[#3411a3] text-3xl font-bold mb-4 text-center">
            Training Score Submission
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8">
              {/* Employee ID Dropdown */}
              <div>
                <label
                  className="block font-semibold  text-[#3411a3] mb-2"
                  htmlFor="emp_id"
                >
                  Employee Id
                </label>
                <select
                  id="emp_id"
                  name="emp_id"
                  value={formData.emp_id}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-3 w-full"
                  required
                >
                  <option value="">-- Select Employee ID --</option>
                  {employees.map((emp) => (
                    <option key={emp.emp_id} value={emp.emp_id}>
                      {emp.emp_id}
                    </option>
                  ))}
                </select>
              </div>

              {/* Employee Name - Automatically Populated */}
              <div>
                <label
                  className="block font-semibold  text-[#3411a3] mb-2"
                  htmlFor="emp_name"
                >
                  Employee Name
                </label>
                <input
                  type="text"
                  id="emp_name"
                  name="emp_name"
                  value={formData.emp_name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-3 w-full focus:outline-none focus:border-gray-300"
                  readOnly // Make it read-only as it is auto-populated
                />
              </div>

              {/* Training ID Dropdown */}
              <div>
                <label
                  className="block font-semibold text-[#3411a3] mb-2"
                  htmlFor="Training_id"
                >
                  Training Id
                </label>
                <select
                  id="Training_id"
                  name="Training_id"
                  value={formData.Training_id}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-3 w-full"
                  required
                >
                  <option value="">-- Select Training ID --</option>
                  {trainings
                    .filter((training) => training.progress === "In Progress") // Filter trainings based on progress
                    .map((training) => (
                      <option
                        key={training.Training_id}
                        value={training.Training_id}
                      >
                        {training.Training_id}
                      </option>
                    ))}
                </select>
              </div>

              {/* Training Name - Automatically Populated */}
              <div>
                <label
                  className="block font-semibold  text-[#3411a3] mb-2"
                  htmlFor="Training_name"
                >
                  Training Name
                </label>
                <input
                  type="text"
                  id="Training_name"
                  name="Training_name"
                  value={formData.Training_name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-3 w-full focus:outline-none focus:border-gray-300"
                  readOnly // Auto-populated and read-only
                />
              </div>

              {/* Trainer Name - Automatically Populated */}
              <div>
                <label
                  className="block font-semibold text-[#3411a3] mb-2"
                  htmlFor="Trainer_name"
                >
                  Trainer Name
                </label>
                <input
                  type="text"
                  id="Trainer_name"
                  name="Trainer_name"
                  value={formData.Trainer_name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-3 w-full focus:outline-none focus:border-gray-300"
                  readOnly // Auto-populated and read-only
                />
              </div>

              {/* Other fields */}
              <div>
                <label
                  className="block font-semibold  text-[#3411a3] mb-2"
                  htmlFor="project_scores"
                >
                  Project Scores (out of 100)
                </label>
                <input
                  type="text"
                  id="project_scores"
                  name="project_scores"
                  value={formData.project_scores}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-3 w-full focus:outline-none focus:border-gray-300"
                  required
                />
              </div>

              <div className="col-span-2">
                <label
                  className="block font-semibold text-[#3411a3] mb-2"
                  htmlFor="comments"
                >
                  Comments
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-3 w-full focus:outline-none focus:border-gray-300"
                  rows="4"
                  required
                />
              </div>
            </div>

            {/* Parameter Scores */}
            <div className="mt-8 p-6 border border-gray-300 rounded-lg">
              <h3 className="text-2xl font-bold text-[#3411a3] mb-4 text-center">
                Parameter Scores
              </h3>

              <div className="grid grid-cols-3 gap-20 items-center">
                <h3 className="font-semibold text-[#3411a3] text-center">
                  Understanding Requirements (out of 10)
                </h3>
                <h3 className="font-semibold text-[#3411a3] text-center">
                  Time Management (out of 10)
                </h3>
                <h3 className="font-semibold text-[#3411a3] text-center">
                  Hackerrank Scores (out of 10)
                </h3>
              </div>

              {/* Number Inputs */}
              <div className="grid grid-cols-3 gap-20 items-center mt-4">
                <input
                  type="number"
                  max={10}
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-gray-300"
                  required
                />
                <input
                  type="number"
                  max={10}
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-gray-300"
                  required
                />

                <input
                  type="number"
                  max={10}
                  name="hackerrank"
                  value={formData.hackerrank}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-gray-300"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3411a3] text-white font-bold py-3 rounded hover:bg-[#2a0e85] mt-6"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Training;
