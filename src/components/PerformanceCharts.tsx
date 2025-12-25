import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import type { HistoricalPerformance } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceChartsProps {
  historicalData: HistoricalPerformance[];
  classAverage: number;
  schoolAverage: number;
  districtAverage: number;
}

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({
  historicalData,
  classAverage,
  schoolAverage,
  districtAverage,
}) => {
  const currentComparisonData = {
    labels: ['Class', 'School', 'District'],
    datasets: [
      {
        label: 'Average Score',
        data: [classAverage, schoolAverage, districtAverage],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const historicalTrendData = {
    labels: historicalData.map((d) => d.year),
    datasets: [
      {
        label: 'Class Average',
        data: historicalData.map((d) => d.classAverage),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      {
        label: 'School Average',
        data: historicalData.map((d) => d.schoolAverage),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
      },
      {
        label: 'District Average',
        data: historicalData.map((d) => d.districtAverage),
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Current Performance Comparison',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Historical Performance Trends',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <Bar data={currentComparisonData} options={barOptions} />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <Line data={historicalTrendData} options={lineOptions} />
      </div>
    </div>
  );
};

export default PerformanceCharts;
