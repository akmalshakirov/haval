import React from "react";
import PropTypes from "prop-types";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Filler,
    Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

import "./LineChart.css";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Filler,
    Title
);

const defaultOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
            labels: {
                color: "#333",
            },
        },
        title: {
            display: false,
            text: "",
        },
    },
    scales: {
        x: {
            ticks: {
                color: "#666",
            },
        },
        y: {
            ticks: {
                color: "#666",
            },
        },
    },
};

const LineChart = ({ data, options = {}, title = "", className = "" }) => {
    if (!data || !data.datasets || data.datasets.length === 0) {
        return (
            <div className={`chart-wrapper ${className}`}>
                <p className='chart-loading'>
                    Grafik yuklanmoqda yoki ma'lumot yo'q...
                </p>
            </div>
        );
    }

    const mergedOptions = {
        ...defaultOptions,
        ...options,
        plugins: {
            ...defaultOptions.plugins,
            ...options.plugins,
        },
    };

    return (
        <div className={`chart-wrapper ${className}`} aria-label='Line chart'>
            <Line data={data} options={mergedOptions} />
        </div>
    );
};

LineChart.propTypes = {
    data: PropTypes.object.isRequired,
    options: PropTypes.object,
    title: PropTypes.string,
    className: PropTypes.string,
};

export default LineChart;
