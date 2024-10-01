import React, { useState } from 'react';
import axios from 'axios';
const Training = () => {
  const [formData, setFormData] = useState({
    emp_id: '',
    emp_name: '',
    Training_id: '',
    Training_name: '',
    Trainer_name: '',
    project_scores: '',
    comments: '',
    time: '',
    requirements: '',
    hackerrank: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/trainer/enterscore', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      setMessage('Score submitted successfully!');
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setMessage('Failed to submit score.');
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="m-12 w-full max-h-full max-w-7xl bg-white rounded-lg shadow-lg p-10">
        <h2 className="text-[#3411a3] text-3xl font-bold mb-4 text-center">Training Score Submission</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-[#3411a3] mb-2" htmlFor="emp_id">Employee Id</label>
              <input
                type="text"
                id="emp_id"
                name="emp_id"
                value={formData.emp_id}
                onChange={handleChange}
                className="border border-gray-300 rounded p-3 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-[#3411a3] mb-2" htmlFor="Training_name">Training Name</label>
              <input
                type="text"
                id="Training_name"
                name="Training_name"
                value={formData.Training_name}
                onChange={handleChange}
                className="border border-gray-300 rounded p-3 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-[#3411a3] mb-2" htmlFor="emp_name">Employee Name</label>
              <input
                type="text"
                id="emp_name"
                name="emp_name"
                value={formData.emp_name}
                onChange={handleChange}
                className="border border-gray-300 rounded p-3 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-[#3411a3] mb-2" htmlFor="Trainer_name">Trainer Name</label>
              <input
                type="text"
                id="Trainer_name"
                name="Trainer_name"
                value={formData.Trainer_name}
                onChange={handleChange}
                className="border border-gray-300 rounded p-3 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-[#3411a3] mb-2" htmlFor="Training_id">Training Id</label>
              <input
                type="text"
                id="Training_id"
                name="Training_id"
                value={formData.Training_id}
                onChange={handleChange}
                className="border border-gray-300 rounded p-3 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-[#3411a3] mb-2" htmlFor="project_scores">Project Scores (out of 100)</label>
              <input
                type="text"
                id="project_scores"
                name="project_scores"
                value={formData.project_scores}
                onChange={handleChange}
                className="border border-gray-300 rounded p-3 w-full"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[#3411a3] mb-2" htmlFor="comments">Comments</label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                className="border border-gray-300 rounded p-3 w-full"
                rows="4"
                required
              />
            </div>
          </div>

          {/* Parameter Scores */}
          <div className="mt-8 p-6 border border-gray-300 rounded-lg">
            <h3 className="text-2xl font-bold text-[#3411a3] mb-4 text-center">Parameter Scores</h3>
            
            <div className="grid grid-cols-3 gap-20 items-center">
              <h3 className="font-bold text-[#3411a3] text-center">Understanding Requirements</h3>
              <h3 className="font-bold text-[#3411a3] text-center">Time Management</h3>
              <h3 className="font-bold text-[#3411a3] text-center">Hackerrank Scores</h3>
            </div>

            {/* Number Inputs */}
            <div className="grid grid-cols-3 gap-20 items-center mt-4">
              <input
                type="number"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="w-full px-2 py-1 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-2 py-1 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                name="hackerrank"
                value={formData.hackerrank}
                onChange={handleChange}
                className="w-full px-2 py-1 border border-gray-300 rounded"
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

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Training;
