import React from 'react'
import { useState } from 'react';
const Training = () =>{
    const [formData, setFormData] = useState({
      employeeId: '',
      employeeName: '',
      trainingId: '',
      trainingName: '',
      trainerName: '',
      scores: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
      // Here you can add the code to handle form submission
    };
  
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="m-1 h-full w-full  bg-white rounded-lg shadow-lg flex flex-col justify-center p-8">
          <h2 className="text-[#3411a3] text-2xl font-bold mb-6 text-center">Training Score Submission</h2>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-rows-3 grid-flow-col gap-10'>
            <div>
              <label className="block text-[#3411a3] mb-2" htmlFor="employeeId">Employee Id</label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            <div >
              <label className="block text-[#3411a3] mb-2" htmlFor="employeeName">Employee Name</label>
              <input
                type="text"
                id="employeeName"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-[#3411a3] mb-2" htmlFor="trainingId">Training Id</label>
              <input
                type="text"
                id="trainingId"
                name="trainingId"
                value={formData.trainingId}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-[#3411a3] mb-2" htmlFor="trainingName">Training Name</label>
              <input
                type="text"
                id="trainingName"
                name="trainingName"
                value={formData.trainingName}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            <div >
              <label className="block text-[#3411a3] mb-2" htmlFor="trainerName">Trainer Name</label>
              <input
                type="text"
                id="trainerName"
                name="trainerName"
                value={formData.trainerName}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-[#3411a3] mb-2" htmlFor="scores">Scores</label>
              <input
                type="text"
                id="scores"
                name="scores"
                value={formData.scores}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#3411a3] text-white font-bold py-2 rounded hover:bg-[#2a0e85] mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  

export default Training