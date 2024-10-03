import React, { useState } from 'react';
import Modal from 'react-modal';
import Nav from './Nav';
import axios from 'axios'; // Import Axios

const AddTraining = ({ role }) => {
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);

  // Employee form state (unchanged)
  const [employee, setEmployee] = useState({
    emp_id: '',
    emp_name: '',
    designation: '',
  });

  // Training form state
  const [training, setTraining] = useState({
    email: '',
    password: '',
    role: 'Trainer', // Default value for role
    Training_id: '',
    Training_name: '',
    Trainer_name: ''
  });

  const handleEmployeeChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleTrainingChange = (e) => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  // Employee submission (unchanged)
  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/addEmployee', employee); // Replace with your actual endpoint
      console.log('Employee added:', response.data);
      setIsEmployeeModalOpen(false);
      setEmployee({ emp_id: '', emp_name: '', designation: '' });
    } catch (error) {
      console.error('Error adding employee:', error.response.data);
      alert('Redundant employee: ' + error.response.data.message);
    }
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
        role,  // Add the role field here
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
    } catch (error) {
      console.error('Error adding training:', error.response.data);
      alert('Error: ' + error.response.data.message);
    }
  };
  return (
    <div>
      <Nav role={role} showNav={true} />
      <div className="flex p-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setIsEmployeeModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Employee
          </button>
          <button
            onClick={() => setIsTrainingModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Training
          </button>
        </div>

        {/* Employee Modal */}
        <Modal
          isOpen={isEmployeeModalOpen}
          onRequestClose={() => setIsEmployeeModalOpen(false)}
          className="bg-white p-4 rounded shadow-lg w-1/3 h-2/5 relative"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-lg font-bold mb-4 font-bold text-[#3411a3]">Add Employee</h2>
          <button
            onClick={() => setIsEmployeeModalOpen(false)}
            className="absolute top-4 right-4 text-gray-700 bg-gray-200 hover:bg-gray-300 font-bold py-1 px-2 rounded-full text-2xl"
          >
            &times;
          </button>
          <form onSubmit={handleEmployeeSubmit}>
            <label className="font-semibold block mb-1 text-[#3411a3]" htmlFor="emp_id">Employee ID</label>
            <input
              type="text"
              id="emp_id"
              name="emp_id"
              placeholder="Enter Employee ID"
              value={employee.emp_id}
              onChange={handleEmployeeChange}
              required
              className="border rounded p-2 mb-2 w-full outline-none "
            />
            <label className="block mb-1 font-semibold text-[#3411a3]" htmlFor="emp_name">Employee Name</label>
            <input
              type="text"
              id="emp_name"
              name="emp_name"
              placeholder="Enter Employee Name"
              value={employee.emp_name}
              onChange={handleEmployeeChange}
              required
              className="border rounded p-2 mb-2 w-full outline-none"
            />
            <label className="block mb-1 font-semibold text-[#3411a3]" htmlFor="designation">Designation</label>
            <input
              type="text"
              id="designation"
              name="designation"
              placeholder="Enter Designation"
              value={employee.designation}
              onChange={handleEmployeeChange}
              required
              className="border rounded p-2 mb-4 w-full outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Employee
            </button>
          </form>
        </Modal>

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
            <label className="font-semibold text-[#3411a3] block mb-1" htmlFor="email">Trainer Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Trainer Email"
              value={training.email}
              onChange={handleTrainingChange}
              required
              className="border rounded p-2 mb-2 w-full outline-none"
            />
            <label className="font-semibold text-[#3411a3] block mb-1" htmlFor="password">Trainer Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Trainer Password"
              value={training.password}
              onChange={handleTrainingChange}
              required
              className="border rounded p-2 mb-4 w-full outline-none"
            />

            {/* Role Input Box */}
            <label className="font-semibold text-[#3411a3] block mb-1" htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              value={training.role} // Default value set here
              onChange={handleTrainingChange}
              required
              className="border rounded p-2 mb-4 w-full outline-none"
            />

            <label className="font-semibold text-[#3411a3] block mb-1" htmlFor="Training_id">Training ID</label>
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
            <label className="font-semibold text-[#3411a3] block mb-1" htmlFor="Training_name">Training Name</label>
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
            <label className="font-semibold text-[#3411a3] block mb-1" htmlFor="Trainer_name">Trainer Name</label>
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
    </div>
  );
};

export default AddTraining;