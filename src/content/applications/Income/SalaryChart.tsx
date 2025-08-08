import Chart from 'react-apexcharts';

import { Card } from '@mui/material';
import { GetSalaryQueryQuery, GetSalaryFilterQueryQuery } from 'src/__generated__/graphql';
import NumberHelper from 'src/functions/NumberHelper';

function getChartData(
  data: GetSalaryQueryQuery | GetSalaryFilterQueryQuery
): [number[], number[], string[]] {
  if (!data || data === undefined) {
    return [[], [], []];
  }

  const grossPay = data?.salaryRelay.edges.map((item) => NumberHelper.ToNumber(item.node.grossPay));

  const netPay = data?.salaryRelay.edges.map((item) => NumberHelper.ToNumber(item.node.netPay));

  const chartLabel = data?.salaryRelay.edges.map((item) => item.node.date);

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
        categories: chartLabel
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
