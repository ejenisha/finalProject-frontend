import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const PieChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getTopScores"); //get top project scores in each training
        const chartData = response.data.data;
        console.log("Raw API response:", chartData);

        // Transform the response data into the format expected by ApexCharts
        const labels = chartData.map(
          (item) => `${item.Training_name} (${item.emp_name})`
        ); // Training names + Employee names as labels
        const series = chartData.map((item) => item.project_scores); // Project scores as series

        // Set the transformed data
        setData({ labels, series });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
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
    labels: data.labels, // Display training names and employee names
    chart: {
      type: "pie", // Using pie chart
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => {
        // Display raw values (whole numbers) instead of percentages
        return opts.w.config.series[opts.seriesIndex];
      },
      style: {
        fontSize: "12px",
        colors: ["#3411a3"], // Set data label color to #3411a3
      },
    },
    tooltip: {
      y: {
        formatter: (val) => {
          // Tooltip to show raw values instead of percentages
          return `${val} points`;
        },
      },
    },
    legend: {
      labels: {
        colors: "#3411a3", // Set legend text color to #3411a3
      },
    },
    colors: [
      "#e4007c",
      "#ff1493",
      "#db7093",
      "#ff69b4",
      "#ffe4e1",
      "#ffc0cb",
      "#cc3366",
      "#fc0fc0",
      "#cf6ba9",
      "#d7837f",
      "#fb607f",
    ], // Custom colors
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 500,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div>
      <Chart
        options={chartOptions}
        series={data.series}
        type="pie" // Display as a pie chart
        width="500"
      />
    </div>
  );
};

export default PieChart;
