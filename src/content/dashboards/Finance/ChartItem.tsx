import { Box, Typography, useTheme } from '@mui/material';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';

function ChartItem({ currency, totalBalance, chartLabel, chartData }) {
  const theme = useTheme();
  const Box1Options: ApexOptions = {
    chart: {
      animations: {
        enabled: false
      },
      background: 'transparent',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      zoom: {
        enabled: false
      }
    },
    labels: chartLabel,
    stroke: {
      curve: 'smooth',
      colors: [theme.colors.primary.main],
      width: 2
    },
    yaxis: {
      show: true
    },
    colors: [theme.colors.primary.main],
    grid: {
      padding: {
        top: 10,
        right: 5,
        bottom: 10,
        left: 5
      }
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      fixed: {
        enabled: true
      },
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function () {
            return 'Price: $';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };

  const Box1Data = [
    {
      name: 'Bitcoin',
      data: chartData
    }
  ];

  return (
    <Box
      sx={{
        width: '100%',
        p: 3
      }}
    >
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Box>
            <Typography variant="h4" noWrap>
              {currency}
            </Typography>
          </Box>
        </Box>
        <Label color="secondary">1Y</Label>
      </Box>
      <Box
        mt={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <Typography
            variant="h2"
            sx={{
              pr: 1
            }}
          >
            {totalBalance}
          </Typography>
          <Text color="success">
            <b>+12.5%</b>
          </Text>
        </Box>
        <TrendingUpTwoToneIcon
          sx={{
            color: `${theme.colors.success.main}`
          }}
        />
      </Box>
      <Box pt={2}>
        <Chart
          options={Box1Options}
          series={Box1Data}
          type="line"
          height={100}
        />
      </Box>
    </Box>
  );
}

export default ChartItem;
