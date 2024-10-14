import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrainingModal from "./TrainingModal";

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
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold text-[#3411a3]">Add Training</h1>
        <button
          onClick={() => setIsTrainingModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Add Training
        </button>
        {/* Training List */}
        <h2 className="text-xl font-bold mt-8 text-[#3411a3]">Training List</h2>
        <ul className="list-disc ml-6">
          {trainings.map((trainingItem) => (
            <li key={trainingItem.Training_id}>
              <div>
                {trainingItem.Training_name} by {trainingItem.Trainer_name}
                <button
                  onClick={() => handleEditClick(trainingItem)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded ml-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCompleteTraining(trainingItem)}
                  className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                >
                  Complete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <ToastContainer />

        {/* Modal for Add/Edit Training */}
        <TrainingModal
          isOpen={isTrainingModalOpen}
          onRequestClose={() => setIsTrainingModalOpen(false)}
          training={training}
          setTraining={setTraining}
          handleTrainingSubmit={handleTrainingSubmit}
          handleTrainingChange={handleTrainingChange}
          currentTraining={currentTraining}
          setCurrentTraining={setCurrentTraining}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </div>
    </div>
  );
};

export default AddTraining;
