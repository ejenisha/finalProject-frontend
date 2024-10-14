import React from 'react';
import './Dashboardcard.css';
const Dashboardcard = ({ title, count, icon }) => {
  return (
    <div className="dashboard-card bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-[#3411a3]">{title}</h2>
        <p className="text-3xl font-semibold text-[#EC4899]">{count}</p>
      </div>
      <div className="text-[#3411a3] text-5xl">{icon}</div>
    </div>
  );
};

export default Dashboardcard;
