import { useGetAmountSnapshotQueryQuery } from '../../../generated/graphql';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { subMonths } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export const AmountChart = () => {
  const startDate = subMonths(new Date(), 12);
  const { data, loading, error } = useGetAmountSnapshotQueryQuery({
    variables: {
      startDate: startDate.toISOString().split('T')[0],
    },
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        에러가 발생했습니다: {error.message}
      </Typography>
    );
  }

  const krwData = data?.krwSnapshot?.edges.map(edge => ({
    x: new Date(edge.node.date),
    y: Number(edge.node.amount)
  })) || [];

  const usdData = data?.usdSnapshot?.edges.map(edge => ({
    x: new Date(edge.node.date),
    y: Number(edge.node.amount)
  })) || [];

  const chartData = {
    datasets: [
      {
        label: 'KRW',
        data: krwData,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'USD',
        data: usdData,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'month' as const
        }
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          자산 변동 추이
        </Typography>
        <Box sx={{ width: '100%', height: 300 }}>
          <Line data={chartData} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
}; 