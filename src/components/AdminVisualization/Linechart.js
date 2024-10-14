import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const Linechart = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/emptrainingcount" //get employee count for each training
        );
        console.log("Fetched training data:", response.data);
        setTrainingData(response.data);
      } catch (error) {
        console.error("Error fetching training data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // Prepare data for the chart
  const seriesData = trainingData.map((item) => item.employeeCount);
  const categories = trainingData.map((item) => item.Training_name);

  const chartOptions = {
    chart: {
      type: "line",
      height: 300,
    },
    stroke: {
      curve: "smooth", // Makes the line smooth
      width: 2, // Line width
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#3411a3"], // Set label color for data labels
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "#3411a3", // Set the hex color for categories
          fontSize: "12px", // You can adjust the font size if needed
        },
      },
    },
    colors: ["#EC4899"], // Set the line color
  };

  return (
    <div>
      <Chart
        options={chartOptions}
        series={[{ name: "Employees", data: seriesData }]}
        type="line"
        height={300}
      />
    </div>
  );
};

export default Linechart;
