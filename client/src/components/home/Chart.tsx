'use client';
import { set } from 'zod';
import { Line } from 'react-chartjs-2';
import React, { useState } from 'react';
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

export function Chart({ variation }: ChartProps) {
  const [chartData, setChartData] = useState({
    labels: variation.map((data) => dayjs(data.createdAt).format('DD/MM/YYYY HH:mm')),
    datasets: [
      {
        label: 'Price',
        data: variation.map((data) => data.value),
        borderColor: '#6b7280',
        borderWidth: 3,
        pointBorderColor: '#6b7280',
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        legend: {
          display: false,
        },
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, '#6b7280');
          gradient.addColorStop(1, '#e5e7eb');
          return gradient;
        },
      },
    ],
  });

  return (
    <div className="w-auto h-auto md:w-3/4 2xl:h-[500px] m-2 p-5 bg-white/30 rounded-lg shadow-md cursor-pointer ">
      <Line
        data={chartData}
        options={{
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
        }}
      />
    </div>
  );
}
