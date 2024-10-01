import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dashboardcard from './Dashboardcard';
import Linechart from './Linechart'; // Import the Linechart component
import Donutchart from './Donutchart'; // Import the Donut chart component
import Barchart from './Barchart'; // Import the Barchart component

const Home = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalTrainings, setTotalTrainings] = useState(0);
  const [totalTrainers,setTotalTrainers]=useState(0)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesResponse = await axios.get('http://localhost:3000/getEmployees');
        setTotalEmployees(employeesResponse.data.count);

        const trainingsResponse = await axios.get('http://localhost:3000/getTraining');
        setTotalTrainings(trainingsResponse.data.count);
        
        const trainersResponse=await axios.get('http://localhost:3000/AllTrainers')
        console.log(trainersResponse.data.count)
        setTotalTrainers(trainersResponse.data.count)
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full ml-6 mr-6"> {/* Ensure the div takes full width */}
      <nav className="bg-[#3411a3] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-semibold">Learning Management Portal</div>
          <div className="space-x-12">
            <Link to="/trainer/scores" className="hover:text-gray-200">Training Scores</Link>
            <Link to="/trainer/displayscores" className="hover:text-gray-200">View Scores</Link>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="flex flex-wrap justify-between gap-6 w-full p-4  my-8"> {/* Flex container with padding for spacing */}
        {loading ? (
          <div className="text-center w-full">Loading...</div> // Center loading text
        ) : (
          <>
            <div className="flex-1 min-w-[200px]"> {/* Minimum width for responsive layout */}
              <Dashboardcard 
                title="Total Employees" 
                count={totalEmployees} 
                icon="👥" 
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Dashboardcard 
                title="Total Trainings" 
                count={totalTrainings} 
                icon="📚" 
              />
            </div>
            <div className="flex-1 min-w-[200px]">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full p-4"> {/* Grid layout for charts */}
        <div className="shadow-xl transition-transform transform hover:scale-105 p-4 bg-white rounded w-full h-full">
          <h2 className="text-xl font-semibold mb-4">Employee Count by Training</h2>
          <Linechart />
        </div>

        <div className="shadow-xl transition-transform transform hover:scale-105 p-4 bg-white rounded w-full h-full">
          <h2 className="text-xl font-semibold mb-4">Percentage of Employees by Score Range</h2>
          <Donutchart />
        </div>
      </div>

      {/* Barchart Section - Displaying Barchart at the bottom */}
      <div className="shadow-xl transition-transform transform hover:scale-105 p-4 bg-white rounded w-full h-full mt-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Average Scores by Training</h2>
        <Barchart /> {/* Barchart component here */}
      </div>
    </div>
  );
};

export default Home;
