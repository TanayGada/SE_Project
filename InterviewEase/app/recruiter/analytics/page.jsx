"use client";

import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Analytics = () => {
  const [interviewData, setInterviewData] = useState(null);

  // Fetch interview data from an API or use dummy data
  useEffect(() => {
    // Replace with actual API call
    const data = {
      interviewsTaken: 120,
      genderDistribution: { male: 70, female: 50 },
      roleDistribution: { softwareEngineer: 50, dataScientist: 30, pm: 40 },
      scoreDistribution: { 0: 10, 1: 25, 2: 50, 3: 30 },
      experienceDistribution: { '0-2': 40, '3-5': 30, '6+': 50 },
      statusDistribution: { selected: 80, rejected: 40 },
    };

    setInterviewData(data);
  }, []);

  // Charts Data
  const genderChartData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [interviewData?.genderDistribution.male || 0, interviewData?.genderDistribution.female || 0],
        backgroundColor: ['#4E73DF', '#F4B400'],
        hoverBackgroundColor: ['#2e59d9', '#c08400'],
      },
    ],
  };

  const roleChartData = {
    labels: ['Software Engineer', 'Data Scientist', 'Product Manager'],
    datasets: [
      {
        data: [
          interviewData?.roleDistribution.softwareEngineer || 0,
          interviewData?.roleDistribution.dataScientist || 0,
          interviewData?.roleDistribution.pm || 0,
        ],
        backgroundColor: ['#1cc88a', '#36b9cc', '#ff6347'],
        hoverBackgroundColor: ['#17a673', '#2c7f89', '#e55347'],
      },
    ],
  };

  const scoreChartData = {
    labels: ['0', '1', '2', '3'],
    datasets: [
      {
        label: 'Score Distribution',
        data: [
          interviewData?.scoreDistribution['0'] || 0,
          interviewData?.scoreDistribution['1'] || 0,
          interviewData?.scoreDistribution['2'] || 0,
          interviewData?.scoreDistribution['3'] || 0,
        ],
        backgroundColor: '#ffcc00',
      },
    ],
  };

  const experienceChartData = {
    labels: ['0-2 years', '3-5 years', '6+ years'],
    datasets: [
      {
        data: [
          interviewData?.experienceDistribution['0-2'] || 0,
          interviewData?.experienceDistribution['3-5'] || 0,
          interviewData?.experienceDistribution['6+'] || 0,
        ],
        backgroundColor: ['#8e44ad', '#3498db', '#2ecc71'],
        hoverBackgroundColor: ['#732d91', '#2980b9', '#27ae60'],
      },
    ],
  };

  const statusChartData = {
    labels: ['Selected', 'Rejected'],
    datasets: [
      {
        data: [interviewData?.statusDistribution.selected || 0, interviewData?.statusDistribution.rejected || 0],
        backgroundColor: ['#28a745', '#dc3545'],
        hoverBackgroundColor: ['#218838', '#c82333'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r bg-white to-teal-50 p-8">
      <div className="container mx-auto p-6 ">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Interview Analytics</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-8">
          {/* Total Interviews */}
          <div className="bg-blue-200 p-6 rounded-xl shadow-xl flex flex-col justify-center items-center hover:scale-105 transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Total Interviews Taken</h2>
            <p className="text-5xl font-bold text-blue-600">{interviewData?.interviewsTaken || 0}</p>
          </div>

          {/* Gender Distribution Chart */}
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Gender Distribution</h2>
            <Pie data={genderChartData} />
          </div>

          {/* Role Distribution Chart */}
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Role Distribution</h2>
            <Pie data={roleChartData} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {/* Score Distribution Chart */}
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Score Distribution</h2>
            <Bar data={scoreChartData} />
          </div>

          {/* Experience Distribution Chart */}
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Experience Distribution</h2>
            <Pie data={experienceChartData} />
          </div>

          {/* Selection Status Chart */}
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Selected vs Rejected Candidates</h2>
            <Pie data={statusChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;