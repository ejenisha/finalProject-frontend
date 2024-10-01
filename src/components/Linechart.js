// src/Barchart.js

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const Linechart = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/emptrainingcount');
        console.log('Fetched training data:', response.data); // Log the response
        setTrainingData(response.data);
      } catch (error) {
        console.error('Error fetching training data:', error);
      } finally {
        setLoading(false); // Set loading to false in finally
      }
    };

    fetchTrainingData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // Prepare data for the chart
  const seriesData = trainingData.map(item => item.employeeCount);
  const categories = trainingData.map(item => item.Training_name);

  const chartOptions = {
    chart: {
      type: 'line', // Change chart type to 'line'
      height: 300,
    },
    stroke: {
      curve: 'smooth', // Makes the line smooth
      width: 2, // Line width
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#000'], // Set label color for better contrast
      },
    },
    xaxis: {
      categories: categories,
    }
   
  };

  return (
    <div>
      <Chart
        options={chartOptions}
        series={[{ name: 'Employees', data: seriesData }]}
        type="line" // Change type to 'line'
        height={300}
      />
    </div>
  );
};

export default Linechart;
