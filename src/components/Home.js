// src/Home.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboardcard from './Dashboardcard';
import Linechart from './Linechart'; // Import the Linechart component
import PieChart from './PieChart'; // Import the Donut chart component
import Barchart from './Barchart'; // Import the Barchart component
import Nav from './Nav';

const Home = ({ role }) => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalTrainings, setTotalTrainings] = useState(0);
  const [totalTrainers, setTotalTrainers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesResponse = await axios.get('http://localhost:3000/getEmployeeCount');
        setTotalEmployees(employeesResponse.data.count);

        const trainingsResponse = await axios.get('http://localhost:3000/AllTrainingCount');
        setTotalTrainings(trainingsResponse.data.count);

        const trainersResponse = await axios.get('http://localhost:3000/AllTrainersCount');
        console.log(trainersResponse.data.count);
        setTotalTrainers(trainersResponse.data.count);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full ">
      {/* Navbar Content */}
      <Nav role={role} showNav={true} />

      {/* Dashboard Content */}
      <div className="flex flex-wrap justify-between gap-6 w-full p-4 ">
        {loading ? (
          <div className="text-center w-full">Loading...</div>
        ) : (
          <>
            <div className="flex-1 min-w-[200px] rounded-sm shadow-xl transition-transform transform hover:scale-105 ">
              <Dashboardcard 
                title="Total Employees" 
                count={totalEmployees} 
                icon="👥" 
              />
            </div>
            <div className="flex-1 min-w-[200px] shadow-xl transition-transform transform hover:scale-105">
              <Dashboardcard 
                title="Total Trainings" 
                count={totalTrainings} 
                icon="📚" 
              />
            </div>
            <div className="flex-1 min-w-[200px] shadow-xl transition-transform transform hover:scale-105">
              <Dashboardcard 
                title="Total Trainers" 
                count={totalTrainers} 
                icon="👩‍🎓" 
              />
            </div>
          </>
        )}
      </div>

      {/* Charts Section - Displaying Line Chart and Donut Chart side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full p-4 rounded-sm ">
        <div className="shadow-xl transition-transform transform hover:scale-105 p-4 bg-white rounded w-full h-full">
          <h2 className="text-xl font-bold text-[#3411a3] mb-4">Employee Count by Training</h2>
          <Linechart />
        </div>

        <div className="shadow-xl transition-transform transform hover:scale-105 p-4 bg-white rounded w-full h-full flex flex-col"> {/* Flex column layout */}
  <h2 className="text-xl font-bold text-[#3411a3] mb-4 text-left">Top Project Scores</h2>
  <div className="w-full h-64 flex justify-center items-center"> {/* Set fixed height for proper centering */}
    <PieChart />
  </div>
</div>

      </div>

      {/* Barchart Section - Displaying Barchart at the bottom */}
      <div className="shadow-xl transition-transform transform hover:scale-105 p-4 bg-white rounded w-full h-full mt-6 mb-6">
        <h2 className="text-xl mb-4 font-bold text-[#3411a3]">Average Scores by Training</h2>
        <Barchart />
      </div>
    </div>
  );
};

export default Home;
