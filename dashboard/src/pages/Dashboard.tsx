import { Typography, Grid, Card, CardContent, CircularProgress, Box } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_BANK_NODE } from '../graphql/queries';
import { DashboardResponse } from '../graphql/types';

export const Dashboard = () => {
  const { data, loading, error } = useQuery<DashboardResponse>(GET_BANK_NODE);

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

  const stats = data?.stats;

  return (
    <>
      <Typography variant="h1" gutterBottom>
        대시보드
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                주문 현황
              </Typography>
              <Typography variant="h3">
                {stats?.totalOrders ?? 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                매출
              </Typography>
              <Typography variant="h3">
                ₩{(stats?.totalRevenue ?? 0).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                신규 고객
              </Typography>
              <Typography variant="h3">
                {stats?.newCustomers ?? 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}; 