import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Nav from "../Login/Nav";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTraining = ({ role }) => {
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [trainings, setTrainings] = useState([]); // State to store training data
  const [isEditing, setIsEditing] = useState(false); // State to track editing status
  const [currentTraining, setCurrentTraining] = useState(null); // State to track current training being edited

  // Training form state
  const [training, setTraining] = useState({
    email: "",
    password: "",
    role: "Trainer", // Default value for role
    Training_id: "",
    Training_name: "",
    Trainer_name: "",
  });

  // Fetch all trainings when the component mounts
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/getAllTrainings"
        );
        setTrainings(response.data); // Set the training data
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };
    fetchTrainings();
  }, []);

  const handleTrainingChange = (e) => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  // Training submission (divided into two requests)
  const handleTrainingSubmit = async (e) => {
    e.preventDefault();

    const { email, password, role, Training_id, Training_name, Trainer_name } =
      training;

    try {
      // First POST request to store trainer email, password, and role
      const createUserResponse = await axios.post(
        "http://localhost:3000/register",
        {
          email,
          password,
          role,
        }
      );
      console.log("Trainer user created:", createUserResponse.data);

      // Second POST request to store remaining training details
      const addTrainingResponse = await axios.post(
        "http://localhost:3000/addTraining",
        {
          Training_id,
          Training_name,
          Trainer_name,
        }
      );
      console.log("Training added:", addTrainingResponse.data);

      // Close modal and reset form fields
      setIsTrainingModalOpen(false);
      setTraining({
        Training_id: "",
        Training_name: "",
        Trainer_name: "",
        email: "",
        password: "",
        role: "Trainer",
      });

      // Update the state to include the new training immediately
      setTrainings((prevTrainings) => [
        ...prevTrainings,
        addTrainingResponse.data,
      ]);

      toast.success("Training added successfully", { autoClose: 3000 });
    } catch (error) {
      console.error(
        "Error adding training:",
        error.response?.data || error.message
      );
      toast.error("Error adding training", { autoClose: 3000 });
    }
  };

  // Handle training edit click
  const handleEditClick = (trainingItem) => {
    setCurrentTraining(trainingItem); // Set the current training for editing
    setIsEditing(true); // Set editing state to true
  };

  // Handle training update submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3000/editTraining/${currentTraining.Training_id}`,
        {
          Training_name: currentTraining.Training_name,
          Trainer_name: currentTraining.Trainer_name,
        }
      );
      console.log("Training updated:", response.data);
      setTrainings((prevTrainings) =>
        prevTrainings.map((training) =>
          training.Training_id === currentTraining.Training_id
            ? response.data
            : training
        )
      );
      toast.success("Training updated successfully", {
        autoClose: 3000,
      });
      setIsEditing(false); // Close editing state
      setCurrentTraining(null); // Clear current training
    } catch (error) {
      console.error("Error updating training:", error.response.data);
      toast.error("Failed to update training", {
        autoClose: 3000,
      });
    }
  };
  const handleCompleteTraining = async (trainingItem) => {
    try {
      await axios.patch(
        `http://localhost:3000/trainingprogress/${trainingItem.Training_id}`,
        {
          progress: "Completed", // Set training progress to "Completed"
        }
      );
      setTrainings((prevTrainings) =>
        prevTrainings.map((training) =>
          training.Training_id === trainingItem.Training_id
            ? { ...training, progress: "Completed" }
            : training
        )
      );
      toast.success("Training marked as completed", { autoClose: 3000 });
    } catch (error) {
      toast.error("Error completing training", { autoClose: 3000 });
    }
  };
  return (
    <div>
      <Nav role={role} showNav={true} />
      <div className="flex p-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setIsTrainingModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Training
          </button>
        </div>

        {/* Training Modal */}
        <Modal
          isOpen={isTrainingModalOpen}
          onRequestClose={() => setIsTrainingModalOpen(false)}
          className="bg-white p-4 rounded shadow-lg h-3/5 w-2/5 relative"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-lg font-bold mb-4  text-[#3411a3]">
            Add Training
          </h2>
          <button
            onClick={() => setIsTrainingModalOpen(false)}
            className="absolute top-4 right-4 text-gray-700 bg-gray-200 hover:bg-gray-300 font-bold py-1 px-2 rounded-full text-2xl"
          >
            &times;
          </button>
          <form onSubmit={handleTrainingSubmit}>
            <label
              className="block mb-1 font-semibold text-[#3411a3]"
              htmlFor="email"
            >
              Trainer Email (Not Required if the trainer already exist)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Trainer's Email"
              value={training.email}
              onChange={handleTrainingChange}
              className="border rounded p-2 mb-2 w-full outline-none"
            />
            <label
              className="block mb-1 font-semibold text-[#3411a3]"
              htmlFor="password"
            >
              Password (Not Required if the trainer already exist)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Trainer's Password"
              value={training.password}
              onChange={handleTrainingChange}
              className="border rounded p-2 mb-2 w-full outline-none"
            />
            <label
              className="block mb-1 font-semibold text-[#3411a3]"
              htmlFor="Training_id"
            >
              Training ID
            </label>
            <input
              type="text"
              id="Training_id"
              name="Training_id"
              placeholder="Enter Training ID"
              value={training.Training_id}
              onChange={handleTrainingChange}
              required
              className="border rounded p-2 mb-2 w-full outline-none"
            />
            <label
              className="block mb-1 font-semibold text-[#3411a3]"
              htmlFor="Training_name"
            >
              Training Name
            </label>
            <input
              type="text"
              id="Training_name"
              name="Training_name"
              placeholder="Enter Training Name"
              value={training.Training_name}
              onChange={handleTrainingChange}
              required
              className="border rounded p-2 mb-2 w-full outline-none"
            />
            <label
              className="block mb-1 font-semibold text-[#3411a3]"
              htmlFor="Trainer_name"
            >
              Trainer Name
            </label>
            <input
              type="text"
              id="Trainer_name"
              name="Trainer_name"
              placeholder="Enter Trainer Name"
              value={training.Trainer_name}
              onChange={handleTrainingChange}
              required
              className="border rounded p-2 mb-4 w-full outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Training
            </button>
          </form>
        </Modal>
      </div>

      {/* Training List */}
      <div className="mt-4 ml-24 mr-24 ">
        <h2 className="text-xl font-bold text-[#3411a3] mb-2">Training List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainings.map((trainingItem) => (
            <div
              key={trainingItem.Training_id}
              className=" text-[#3411a3] border rounded p-6 text-lg bg-pink-200"
            >
              <h3 className="font-bold mb-4 text-xl">
                {trainingItem.Training_name}
              </h3>
              <p className="font-semibold mb-2">
                Training ID:{" "}
                <span className="ml-1">{trainingItem.Training_id}</span>
              </p>
              <p className=" font-semibold mb-2">
                Trainer:{" "}
                <span className="ml-8">{trainingItem.Trainer_name}</span>
              </p>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleCompleteTraining(trainingItem)}
                  disabled={trainingItem.progress === "Completed"}
                  className={`text-white px-2 py-1 rounded ${
                    trainingItem.progress == "Completed"
                      ? "bg-green-400"
                      : "bg-blue-500"
                  } ${
                    trainingItem.progress === "Completed"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {trainingItem.progress}
                </button>
                <button
                  onClick={() => handleEditClick(trainingItem)}
                  className={`${
                    trainingItem.progress === "Completed"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={trainingItem.progress === "Completed"}
                >
                  <svg
                    className="w-6 h-6 text-[#3411a3] dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                    />
                  </svg>
                </button>

                <button
                  onClick={async () => {
                    try {
                      await axios.delete(
                        `http://localhost:3000/deleteTraining/${trainingItem.Training_id}`
                      );
                      setTrainings(
                        trainings.filter(
                          (item) =>
                            item.Training_id !== trainingItem.Training_id
                        )
                      );
                      toast.success("Training deleted successfully", {
                        autoClose: 3000,
                      });
                    } catch (error) {
                      console.error(
                        "Error deleting training:",
                        error.response.data
                      );
                      toast.error("Failed to delete training", {
                        autoClose: 3000,
                      });
                    }
                  }}
                >
                  <svg
                    className="w-6 h-6 text-[#3411a3] dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18 17.94 6M18 18 6.06 6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal for Training */}
      {isEditing && (
        <Modal
          isOpen={isEditing}
          onRequestClose={() => setIsEditing(false)}
          className="bg-white p-4 rounded shadow-lg h-3/2 w-3/3 relative"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-lg font-bold mb-4 font-bold text-[#3411a3]">
            Edit Training
          </h2>
          <button
            onClick={() => setIsEditing(false)}
            className="absolute top-4 right-4 text-gray-700 bg-gray-200 hover:bg-gray-300 font-bold py-1 px-2 rounded-full text-2xl"
          >
            &times;
          </button>
          <form onSubmit={handleUpdateSubmit}>
            <label
              className="block mb-1 font-semibold text-[#3411a3]"
              htmlFor="Training_name"
            >
              Training Name
            </label>
            <input
              type="text"
              id="Training_name"
              name="Training_name"
              value={currentTraining.Training_name}
              onChange={(e) =>
                setCurrentTraining({
                  ...currentTraining,
                  Training_name: e.target.value,
                })
              }
              required
              className="border rounded p-2 mb-2 w-full outline-none"
            />
            <label
              className="block mb-1 font-semibold text-[#3411a3]"
              htmlFor="Trainer_name"
            >
              Trainer Name
            </label>
            <input
              type="text"
              id="Trainer_name"
              name="Trainer_name"
              value={currentTraining.Trainer_name}
              onChange={(e) =>
                setCurrentTraining({
                  ...currentTraining,
                  Trainer_name: e.target.value,
                })
              }
              required
              className="border rounded p-2 mb-4 w-full outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Training
            </button>
          </form>
        </Modal>
      )}

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddTraining;
