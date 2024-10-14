import React from "react";

const TrainingCard = ({ training, onEdit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2">
      <h3 className="text-lg font-bold text-[#3411a3]">
        {training.Training_name}
      </h3>
      <p className="text-gray-700">Trainer Name: {training.Trainer_name}</p>
      <p className="text-gray-500">Training ID: {training.Training_id}</p>
      <button
        onClick={onEdit}
        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
      >
        Edit
      </button>
    </div>
  );
};

export default TrainingCard;
