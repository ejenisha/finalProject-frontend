// src/AverageScoresChart.js

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const AverageScoresChart = () => {
  const [averageScores, setAverageScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAverageScores = async () => {
      try {
        const response = await axios.get('http://localhost:3000/avgscores');
        console.log('Fetched average scores:', response.data); // Log the response
        setAverageScores(response.data);
      } catch (error) {
        console.error('Error fetching average scores:', error);
      } finally {
        setLoading(false); // Set loading to false in finally
      }
    };

    fetchAverageScores();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // Prepare data for the chart
  const trainingNames = averageScores.map(item => item.Training_name);
  const averageProjectScores = averageScores.map(item => item.average_project_scores);
  const averageTime = averageScores.map(item => item.average_time);
  const averageRequirements = averageScores.map(item => item.average_requirements);
  const averageHackerrank = averageScores.map(item => item.average_hackerrank);

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 330,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: trainingNames,
    },
    legend: {
      position: 'top',
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
  };

  return (
    <div>
      <Chart
        options={chartOptions}
        series={[
          { name: 'Project Scores', data: averageProjectScores },
          { name: 'Time Management Scores', data: averageTime },
          { name: 'Requirements Understanding Scores', data: averageRequirements },
          { name: 'Hackerrank Scores', data: averageHackerrank },
        ]}
        type="bar"
        height={330}
      />
    </div>
  );
};

export default AverageScoresChart;
