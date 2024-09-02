import Chart from 'react-apexcharts';

import { Card } from '@mui/material';
import { SalaryData } from 'src/models/bank';

function getChartData(data: SalaryData): [number[], number[], Date[]] {
  if (!data || data === undefined) {
    return [[], [], []];
  }

  const grossPay = data?.salaryRelay.edges.map((item) => {
    return item.node.grossPay;
  });

  const netPay = data?.salaryRelay.edges.map((item) => {
    return item.node.netPay;
  });

  const chartLabel = data?.salaryRelay.edges.map((item) => {
    return item.node.date;
  });

  return [grossPay, netPay, chartLabel];
}

function SalaryChart({ data }) {
  if (!data || data === undefined) {
    return null;
  }

  const [grossPay, netPay, chartLabel] = getChartData(data);

  const chart = {
    options: {
      chart: {
        id: 'basic-bar'
      },
      xaxis: {
        categories: chartLabel.map((item: Date) => {
          return item.toString();
        })
      },
      dataLabels: {
        enabled: false
      }
    },
    series: [
      {
        name: 'Gross Pay',
        data: grossPay
      },
      {
        name: 'Net Pay',
        data: netPay
      }
    ]
  };

  return (
    <Card>
      <Chart options={chart.options} series={chart.series} type="bar" />
    </Card>
  );
}

export default SalaryChart;
