import Chart from 'react-apexcharts';

import { Box, Card, Grid } from '@mui/material';
import { GetSalaryQuery } from 'src/queries/SalaryQuery';
import { useQuery } from '@apollo/client';
import { SalaryData } from 'src/models/bank';

function getChartData(data: SalaryData): [number[], number[], Date[]] {
  const grossPay = data.salaryRelay.edges.map((item) => {
    return item.node.grossPay;
  });

  const netPay = data.salaryRelay.edges.map((item) => {
    return item.node.netPay;
  });

  const chartLabel = data.salaryRelay.edges.map((item) => {
    return item.node.date;
  });

  return [grossPay, netPay, chartLabel];
}

function SalaryChart() {
  const { loading, error, data } = useQuery<SalaryData>(GetSalaryQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        pb: 3
      }}
    >
      <Grid item xs={12}>
        <Card>
          <Chart options={chart.options} series={chart.series} type="bar" />
        </Card>
      </Grid>
    </Box>
  );
}

export default SalaryChart;
