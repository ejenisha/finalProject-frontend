import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const Barchart = () => {
  const [averageScores, setAverageScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAverageScores = async () => {
      try {
        const response = await axios.get("http://localhost:3000/avgscores");
        console.log("Fetched average scores:", response.data); // Log the response
        setAverageScores(response.data);
      } catch (error) {
        console.error("Error fetching average scores:", error);
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
  const trainingNames = averageScores.map((item) => item.Training_name);
  const averageProjectScores = averageScores.map(
    (item) => item.average_project_scores
  );
  const averageTime = averageScores.map((item) => item.average_time);
  const averageRequirements = averageScores.map(
    (item) => item.average_requirements
  );
  const averageHackerrank = averageScores.map(
    (item) => item.average_hackerrank
  );

  const chartOptions = {
    chart: {
      type: "bar",
      height: 330,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => (val % 1 >= 0.5 ? Math.ceil(val) : Math.floor(val)), // Custom logic for ceiling/floor
    },
    xaxis: {
      categories: trainingNames,
      labels: {
        style: {
          colors: "#3411a3", // Hex color for x-axis labels
          fontSize: "12px", // Adjust font size if necessary
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toFixed(0), // Format y-axis values to 2 decimal places
        style: {
          colors: "#3411a3", // Hex color for y-axis labels
          fontSize: "12px", // Adjust font size if necessary
        },
      },
    },
    legend: {
      position: "top",
      labels: {
        colors: "#3411a3",
        fontSize: "12px", // Hex color for legend text
        useSeriesColors: false, // To avoid using series colors for the legend
      },
    },
    colors: ["#BE185D", "#DB2777", "#EC4899", "#F472B6"],
  };

  return (
    <div>
      <Chart
        options={chartOptions}
        series={[
          { name: "Project Scores", data: averageProjectScores },
          { name: "Time Management Scores", data: averageTime },
          {
            name: "Requirements Understanding Scores",
            data: averageRequirements,
          },
          { name: "Hackerrank Scores", data: averageHackerrank },
        ]}
        type="bar"
        height={330}
      />
    </div>
  );
};

export default Barchart;
