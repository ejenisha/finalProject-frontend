import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Nav from './Nav';
import axios from 'axios'; // Import Axios
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css';

const AddTraining = ({ role }) => {
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [trainings, setTrainings] = useState([]); // State to store training data
  const [isEditing, setIsEditing] = useState(false); // State to track editing status
  const [currentTraining, setCurrentTraining] = useState(null); // State to track current training being edited
  const[isclicked,setClick]=useState(false)

  // Training form state
  const [training, setTraining] = useState({
    email: '',
    password: '',
    role: 'Trainer', // Default value for role
    Training_id: '',
    Training_name: '',
    Trainer_name: '',
  });

  // Fetch all trainings when the component mounts
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getAllTrainings');
        setTrainings(response.data); // Set the training data
      } catch (error) {
        console.error('Error fetching trainings:', error);
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

    // Separate the trainer's email, password, and role for submission to the createuser route
    const { email, password, role, Training_id, Training_name, Trainer_name } = training;

    try {
      // First POST request to store trainer email, password, and role in createuser controller
      const createUserResponse = await axios.post('http://localhost:3000/register', {
        email,
        password,
        role, // Add the role field here
      });
      console.log('Trainer user created:', createUserResponse.data);

      // Second POST request to store remaining training details in addtraining controller
      const addTrainingResponse = await axios.post('http://localhost:3000/addTraining', {
        Training_id,
        Training_name,
        Trainer_name,
      });
      console.log('Training added:', addTrainingResponse.data);

      // Close modal and reset form fields
      setIsTrainingModalOpen(false);
      setTraining({
        Training_id: '',
        Training_name: '',
        Trainer_name: '',
        email: '',
        password: '',
        role: 'Trainer', // Reset role to default value
      });
      toast.success('Training added successfully', {
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error adding training:', error.response.data);
      toast.error('Training already exists', {
        autoClose: 3000,
      });
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
      const response = await axios.patch(`http://localhost:3000/editTraining/${currentTraining.Training_id}`, {
        Training_name: currentTraining.Training_name,
        Trainer_name: currentTraining.Trainer_name,
      });
      console.log('Training updated:', response.data);
      setTrainings((prevTrainings) =>
        prevTrainings.map((training) =>
          training.Training_id === currentTraining.Training_id ? response.data : training
        )
      );
      toast.success('Training updated successfully', {
        autoClose: 3000,
      });
      setIsEditing(false); // Close editing state
      setCurrentTraining(null); // Clear current training
    } catch (error) {
      console.error('Error updating training:', error.response.data);
      toast.error('Failed to update training', {
        autoClose: 3000,
      });
    }
  };
 const handleClick=async()=>{
    setClick(true)
 }
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
          className="bg-white p-4 rounded shadow-lg h-4/6 w-2/5 relative"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-lg font-bold mb-4 font-bold text-[#3411a3]">Add Training</h2>
          <button
            onClick={() => setIsTrainingModalOpen(false)}
            className="absolute top-4 right-4 text-gray-700 bg-gray-200 hover:bg-gray-300 font-bold py-1 px-2 rounded-full text-2xl"
          >
            &times;
          </button>
          <form onSubmit={handleTrainingSubmit}>
            <label className="block mb-1 font-semibold text-[#3411a3]" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Trainer's Email"
              value={training.email}
              onChange={handleTrainingChange}
              required
              className="border rounded p-2 mb-2 w-full outline-none"
            />
            <label className="block mb-1 font-semibold text-[#3411a3]" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Trainer's Password"
              value={training.password}
              onChange={handleTrainingChange}
              required
              className="border rounded p-2 mb-2 w-full outline-none"
            />
            <label className="block mb-1 font-semibold text-[#3411a3]" htmlFor="Training_id">Training ID</label>
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
            <label className="block mb-1 font-semibold text-[#3411a3]" htmlFor="Training_name">Training Name</label>
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
            <label className="block mb-1 font-semibold text-[#3411a3]" htmlFor="Trainer_name">Trainer Name</label>
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
      <div className="mt-4">
        <h2 className="text-lg font-bold text-[#3411a3] mb-2">Training List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainings.map((trainingItem) => (
            <div key={trainingItem.Training_id} className="border rounded p-4">
              <h3 className="font-semibold text-[#3411a3]">{trainingItem.Training_name}</h3>
              <p>Trainer: {trainingItem.Trainer_name}</p>
              <p>Training ID: {trainingItem.Training_id}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEditClick(trainingItem)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    try {
                      await axios.delete(`http://localhost:3000/deleteTraining/${trainingItem.Training_id}`);
                      setTrainings(trainings.filter((item) => item.Training_id !== trainingItem.Training_id));
                      toast.success('Training deleted successfully', {
                        autoClose: 3000,
                      });
                    } catch (error) {
                      console.error('Error deleting training:', error.response.data);
                      toast.error('Failed to delete training', {
                        autoClose: 3000,
                      });
                    }
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
                <input type='checkbox' onClick={handleClick}/>
                <label>Mark as completed</label>
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
          className="bg-white p-4 rounded shadow-lg h-3/6 w-2/5 relative"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-lg font-bold mb-4 font-bold text-[#3411a3]">Edit Training</h2>
          <button
            onClick={() => setIsEditing(false)}
            className="absolute top-4 right-4 text-gray-700 bg-gray-200 hover:bg-gray-300 font-bold py-1 px-2 rounded-full text-2xl"
          >
            &times;
          </button>
          <form onSubmit={handleUpdateSubmit}>
            <label className="block mb-1 font-semibold text-[#3411a3]" htmlFor="Training_name">Training Name</label>
            <input
              type="text"
              id="Training_name"
              name="Training_name"
              value={currentTraining.Training_name}
              onChange={(e) => setCurrentTraining({ ...currentTraining, Training_name: e.target.value })}
              required
              className="border rounded p-2 mb-2 w-full outline-none"
            />
            <label className="block mb-1 font-semibold text-[#3411a3]" htmlFor="Trainer_name">Trainer Name</label>
            <input
              type="text"
              id="Trainer_name"
              name="Trainer_name"
              value={currentTraining.Trainer_name}
              onChange={(e) => setCurrentTraining({ ...currentTraining, Trainer_name: e.target.value })}
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
