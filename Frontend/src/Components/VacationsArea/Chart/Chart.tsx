import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
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
import { Undo } from '@mui/icons-material';
import VacationModel from '../../../Models/VacationModel';
import notifyService from '../../../Services/NotifyService';
import vacationsService from '../../../Services/VacationsService';

import './Chart.css';

const Chart: React.FC = (): JSX.Element => {

  const [vacations, setVacations] = useState<VacationModel[]>([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  // Chart configuration
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: true,
        text: 'Number of Followers per Vacation',
        color: 'white',
        font: {
          size: 24
        }
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'white',
          beginAtZero: true
        }
      },
      x: {
        ticks: {
          color: 'white',
          beginAtZero: true
        }
      }
    }
  };

  // Get all followed vacations
  useEffect(() => {
    vacationsService.getAllVacations()
      .then(vacations => setVacations(vacations.filter(v => v.followersCount > 0)))
      .catch(err => notifyService.error(err));
  }, []);

  // Chart labels
  const labels = vacations.map(v => v.destination);

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: 'Number of Followers',
        data: vacations.map(v => v.followersCount),
        backgroundColor: [
          'violet', 'indigo', 'red'
        ],
      }
    ],
  };

  return (
    <div className="Chart">
      <Bar options={options} data={data} />
      <NavLink to="/vacations" className="Back"><Undo /> Back</NavLink>
    </div>
  );
};

export default Chart;