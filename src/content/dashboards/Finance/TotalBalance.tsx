import {
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItemAvatar
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import Loading from './Loading';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
    };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

function TotalBalance({ loading, usdTotal, krwTotal }: { loading: boolean, usdTotal: string, krwTotal: string }) {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: ['#ff9900', '#1c81c2', '#333', '#5c6ac0'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: ['Checking', 'Savings', 'Installment', 'Deposit'],
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const chartSeries = [10, 20, 25, 45];

  if (!loading) {
    return (
      <Card>
        <Grid spacing={0} container>
          <Grid item xs={12} md={6}>
            <Box p={4}>
              <Typography
                sx={{
                  pb: 3
                }}
                variant="h2"
              >
                Total Balance
              </Typography>
              <Box>
                <Typography variant="h1" align="right" gutterBottom>
                  {usdTotal}
                </Typography>
                <Typography variant="h1" align="right" gutterBottom>
                  {krwTotal}
                </Typography>
                <Box
                  display="flex"
                  sx={{
                    py: 4
                  }}
                  alignItems="center"
                >
                  <AvatarSuccess
                    sx={{
                      mr: 2
                    }}
                    variant="rounded"
                  >
                    <TrendingUp fontSize="large" />
                  </AvatarSuccess>
                  <Box>
                    <Typography variant="h4">+ $3,594.00</Typography>
                    <Typography variant="subtitle2" noWrap>
                      this month
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            sx={{
              position: 'relative'
            }}
            display="flex"
            alignItems="center"
            item
            xs={12}
            md={6}
          >
            <Box
              component="span"
              sx={{
                display: { xs: 'none', md: 'inline-block' }
              }}
            >
              <Divider absolute orientation="vertical" />
            </Box>
            <Box py={4} pr={4} flex={1}>
              <Grid container spacing={0}>
                <Grid
                  xs={12}
                  sm={12}
                  item
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Chart
                    height={250}
                    options={chartOptions}
                    series={chartSeries}
                    type="donut"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Card>
    );
  } else {
    return <Loading />;
  }
}

export default TotalBalance;
