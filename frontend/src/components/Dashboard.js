import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/measles-data")
      .then(response => {
        const labels = response.data.map(item => item.period);
        const newCases = response.data.map(item => item.newCases);
        const followUpCases = response.data.map(item => item.followUp);
        const referrals = response.data.map(item => item.referrals);

        setChartData({
          labels: labels,
          datasets: [
            { label: "New Cases", data: newCases, backgroundColor: "red" },
            { label: "Follow-up Cases", data: followUpCases, backgroundColor: "blue" },
            { label: "Referrals", data: referrals, backgroundColor: "green" }
          ]
        });
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="card p-4">
      <h3>Measles Cases Summary</h3>
      {chartData ? <Bar data={chartData} /> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
