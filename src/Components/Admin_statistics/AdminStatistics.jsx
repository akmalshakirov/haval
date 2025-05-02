import React from "react";
import LineChart from "../Chart/LineChart";

const AdminStatistics = () => {
    const chartData = {
        labels: ["Yanvar", "Fevral", "Mart", "Aprel", "May"],
        datasets: [
            {
                label: "Sotuvlar",
                data: [150, 200, 199, 220, 250],
                borderColor: "blue",
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <div>
            <h1>Haval avtomobillarining sotuv statistikasi</h1>
            <LineChart data={chartData} options={chartOptions} />
        </div>
    );
};

export default AdminStatistics;
