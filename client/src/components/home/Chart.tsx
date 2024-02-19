'use client';
import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import dayjs from 'dayjs';
import {
  Tooltip,
  PointElement,
  LineElement,
  LinearScale,
  Legend,
  Filler,
  Chart as ChartJS,
  CategoryScale,
} from 'chart.js';

import { ExchangeRate } from '@/@Types/exchange-rate';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip, Filler);

interface ChartProps {
  variation: ExchangeRate[];
}

interface ChartColor {
  primary: string;
  secondary: string;
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        font: {
          size: 12,
          weight: 'bold',
        },
      },
    },
    x: {
      display: false,
    },
  },
};

function generateChartConfiguration(variation: ExchangeRate[], chartColor: ChartColor) {
  return {
    labels: variation.map((data) => dayjs(data.createdAt).format('DD/MM/YYYY HH:mm')),
    datasets: [
      {
        label: 'Price',
        data: variation.map((data) => data.value),
        borderColor: chartColor.primary,
        borderWidth: 3,
        pointBorderColor: chartColor.primary,
        pointBorderWidth: 3,
        tension: 0.1,
        fill: true,
        legend: {
          display: false,
        },
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, chartColor.primary);
          gradient.addColorStop(1, chartColor.secondary);
          return gradient;
        },
      },
    ],
  };
}

export function Chart({ variation }: ChartProps) {
  const { theme } = useTheme();

  const chartColor: ChartColor = {
    primary: theme === 'dark' ? '#333333' : '#6b7280',
    secondary: theme === 'dark' ? '#7f7f7f' : '#e5e7eb',
  };

  const [chartData, setChartData] = useState(() =>
    generateChartConfiguration(variation, chartColor),
  );

  useEffect(() => {
    setChartData(() => generateChartConfiguration(variation, chartColor));
  }, [variation]);

  return (
    <div className="w-auto h-auto sm:w-3/4 2xl:h-[500px] m-2 p-5 dark:bg-slate-100/30 bg-white/30 rounded-lg shadow-md cursor-pointer ">
      <Line data={chartData} options={chartOptions as any} />
    </div>
  );
}
