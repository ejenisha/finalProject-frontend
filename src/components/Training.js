import React, { useState } from 'react';

const Training = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    trainingId: '',
    trainingName: '',
    trainerName: '',
    scores: '',
    comments: '',
    understandingRequirements: '',
    codingStandards: '',
    commentsFeedback: ''
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
    // Handle form submission
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="m-12 w-full max-h-full max-w-10xl bg-white rounded-lg shadow-lg p-10">
        <h2 className="text-[#3411a3] text-3xl font-bold mb-4 text-center">Training Score Submission</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-[#3411a3] mb-2" htmlFor="employeeId">Employee Id</label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="border border-gray-300 rounded p-3 w-full"
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
                className="border border-gray-300 rounded p-3 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-[#3411a3] mb-2" htmlFor="employeeName">Employee Name</label>
              <input
                type="text"
                id="employeeName"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                className="border border-gray-300 rounded p-3 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-[#3411a3] mb-2" htmlFor="trainerName">Trainer Name</label>
              <input
                type="text"
                id="trainerName"
                name="trainerName"
                value={formData.trainerName}
                onChange={handleChange}
                className="border border-gray-300 rounded p-3 w-full"
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
                className="border border-gray-300 rounded p-3 w-full"
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

          {/* Radio Button Groups for Understanding Requirements, Coding Standards, Comments Feedback */}
          <div className="mt-8">
          <div className="mt-8 p-6 border border-gray-300 rounded-lg">
  <h3 className="text-2xl font-bold text-[#3411a3] mb-4 text-center">Parameter Scores</h3>
  
  <div className="grid grid-cols-4 gap-4 items-center">
    <div></div>
    <div className="text-center font-bold text-[#3411a3]">1</div>
    <div className="text-center font-bold text-[#3411a3]">2</div>
    <div className="text-center font-bold text-[#3411a3]">3</div>
  </div>

  {/* Coding Standards */}
  <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <h3 className="font-bold text-[#3411a3]">Coding Standards</h3>
    {[1, 2, 3].map((value) => (
      <label key={value} className="flex justify-center">
        <input
          type="radio"
          name="codingStandards"
          value={value}
          onChange={handleChange}
          className="appearance-none h-6 w-6 border border-gray-300 rounded-full checked:bg-[#3411a3]"
          required
        />
      </label>
    ))}
  </div>

  {/* Understanding Requirements */}
  <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <h3 className="font-bold text-[#3411a3]">Understanding Requirements</h3>
    {[1, 2, 3].map((value) => (
      <label key={value} className="flex justify-center">
        <input
          type="radio"
          name="understandingRequirements"
          value={value}
          onChange={handleChange}
          className="appearance-none h-6 w-6 border border-gray-300 rounded-full checked:bg-[#3411a3]"
          required
        />
      </label>
    ))}
  </div>

  {/* Comments Feedback */}
  <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <h3 className="font-bold text-[#3411a3]">Comments Feedback</h3>
    {[1, 2, 3].map((value) => (
      <label key={value} className="flex justify-center">
        <input
          type="radio"
          name="commentsFeedback"
          value={value}
          onChange={handleChange}
          className="appearance-none h-6 w-6 border border-gray-300 rounded-full checked:bg-[#3411a3]"
          required
        />
      </label>
    ))}
  </div>
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
  );
};

export default Training;
