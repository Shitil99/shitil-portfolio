import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SkillsChartProps {
  skillLevels: Record<string, number>;
}

export function SkillsChart({ skillLevels }: SkillsChartProps) {
  const chartRef = useRef<ChartJS<"bar">>(null);

  const data = {
    labels: Object.keys(skillLevels).map(skill => 
      skill.length > 15 ? skill.substring(0, 15) + '...' : skill
    ),
    datasets: [
      {
        label: 'Skill Level (%)',
        data: Object.values(skillLevels),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#22c55e',
          font: {
            family: 'monospace',
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'SKILL PROFICIENCY MATRIX',
        color: '#22c55e',
        font: {
          family: 'monospace',
          size: 14,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#22c55e',
        bodyColor: '#22c55e',
        borderColor: '#22c55e',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#22c55e',
          font: {
            family: 'monospace',
            size: 10,
          },
        },
        grid: {
          color: 'rgba(34, 197, 94, 0.2)',
        },
      },
      x: {
        ticks: {
          color: '#22c55e',
          font: {
            family: 'monospace',
            size: 9,
          },
          maxRotation: 45,
        },
        grid: {
          color: 'rgba(34, 197, 94, 0.2)',
        },
      },
    },
  };

  return (
    <div className="bg-black border border-green-500/30 rounded-lg p-4">
      <div className="h-80">
        <Bar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}
