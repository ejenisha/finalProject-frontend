import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboardcard from './Dashboardcard';
import Linechart from './Linechart'; 
import PieChart from './PieChart'; 
import Barchart from './Barchart'; 
import Nav from '../Login/Nav';

const Home = ({ role }) => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [progressTrainings, setTotalProgressTrainings] = useState(0);
  const[completedTrainings,setCompletedTrainings]=useState(0)
  const [totalTrainers, setTotalTrainers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesResponse = await axios.get('http://localhost:3000/getEmployeeCount');//get enployee count
        setTotalEmployees(employeesResponse.data.count);

        const progresstrainingsResponse = await axios.get('http://localhost:3000/progressTrainingCount');//get trainings count in progress
        setTotalProgressTrainings(progresstrainingsResponse.data.count);

        const completedtrainingsResponse = await axios.get('http://localhost:3000/completedTrainingCount');//get completed training count
        setCompletedTrainings(completedtrainingsResponse.data.count);

        const trainersResponse = await axios.get('http://localhost:3000/AllTrainersCount');//get all trainers count
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
    <div className="min-h-screen w-full bg-gray-100 ">
      {/* Navbar Content */}
      <Nav role={role} showNav={true} />

      {/* Dashboard Content */}
      <div className="flex flex-wrap justify-between gap-6  mt-2 mx-1"> 
        {loading ? (
          <div className="text-center w-full">Loading...</div>
        ) : (
          <>
            <div className="flex-1 min-w-[200px] rounded-sm  transition-transform transform hover:scale-105 ">
              <Dashboardcard 
                title="Total Employees" 
                count={totalEmployees} 
                icon="👥"
              />
            </div>
            <div className="flex-1 min-w-[200px] rounded-sm transition-transform transform hover:scale-105">
              <Dashboardcard 
                title="Total Trainings in Progress" 
                count={progressTrainings} 
                icon="📖"
              />
            </div>
            <div className="flex-1 min-w-[200px] rounded-sm transition-transform transform hover:scale-105">
              <Dashboardcard 
                title="Total Trainings Completed" 
                count={completedTrainings} 
                icon="📚"
              />
            </div>
            <div className="flex-1 min-w-[200px] rounded-sm  transition-transform transform hover:scale-105">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full p-4 "> 
        <div className=" transition-transform transform hover:scale-105 p-4 bg-white rounded-sm w-full h-full">
          <h2 className="text-xl font-bold text-[#3411a3] mb-2">Employee Count by Training</h2> 
          <Linechart />
        </div>

        <div className=" transition-transform transform hover:scale-105 p-4 bg-white rounded-sm w-full h-full flex flex-col">
          <h2 className="text-xl font-bold text-[#3411a3] mb-2">Top Project Scores</h2> 
          <div className="w-full h-64 flex justify-center items-center">
            <PieChart />
          </div>
        </div>
      </div>

      {/* Barchart Section - Displaying Barchart at the bottom */}
      <div className=" transition-transform transform hover:scale-105 p-4 bg-white rounded-sm w-full h-full mb-0"> 
        <h2 className="text-xl font-bold text-[#3411a3] mb-2">Average Scores by Training</h2> 
        <Barchart />
      </div>
    </div>
  );
};

export default Home;
