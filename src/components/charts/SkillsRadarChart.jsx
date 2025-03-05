'use client';

import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const SkillsRadarChart = ({ data, className }) => {
  return (
    <div className={className}>
      <Radar 
        data={data}
        options={{
          responsive: true,
          scales: {
            r: {
              beginAtZero: true,
              grid: { color: 'rgba(255,255,255,0.1)' },
              pointLabels: { color: '#fff' },
              ticks: { display: false }
            }
          },
          plugins: {
            legend: { display: false }
          }
        }}
      />
    </div>
  );
};