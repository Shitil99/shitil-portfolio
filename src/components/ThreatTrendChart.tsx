import { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ThreatTrendChartProps {
  data: Array<{
    month: string;
    threats: number;
    incidents: number;
  }>;
}

export function ThreatTrendChart({ data }: ThreatTrendChartProps) {
  const chartRef = useRef<ChartJS<"line">>(null);

  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Threats Detected',
        data: data.map(item => item.threats),
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(239, 68, 68, 1)',
        pointBorderColor: '#000',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
      {
        label: 'Incidents Resolved',
        data: data.map(item => item.incidents),
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointBorderColor: '#000',
        pointBorderWidth: 2,
        pointRadius: 5,
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
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: 'THREAT INTELLIGENCE TRENDS',
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
            size: 10,
          },
        },
        grid: {
          color: 'rgba(34, 197, 94, 0.2)',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <div className="bg-black border border-green-500/30 rounded-lg p-4">
      <div className="h-80">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
}
