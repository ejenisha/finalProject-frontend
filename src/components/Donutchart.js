import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const Donutchart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/projectscores');
        const chartData = response.data;
        console.log('Raw API response:', chartData);  // Log response data to debug

        // Transform the response data into the format expected by ApexCharts
        const labels = ["0-30", "31-50", "51-80", "81-100"];
        const series = [
          chartData.range0to30,
          chartData.range31to50,
          chartData.range51to80,
          chartData.range81to100,
        ];

        // Set the transformed data
        setData({ labels, series });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donut chart data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Check if data exists before rendering the chart
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.series || !data.labels) {
    return <div>No data available</div>; // Handle case when data is undefined or invalid
  }

  const chartOptions = {
    labels: data.labels,
    chart: {
      type: 'donut',
    },
  };

  return (
    <div>
      <Chart 
        options={chartOptions} 
        series={data.series} 
        type="donut" 
        width="380"
      />
    </div>
  );
};

export default Donutchart;
