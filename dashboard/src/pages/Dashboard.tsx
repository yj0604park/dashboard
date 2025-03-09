import { Typography, Grid, Card, CardContent, CircularProgress, Box } from '@mui/material';
import { useGetBankNodeQueryQuery, GetBankNodeQueryQuery } from '../generated/graphql';

export const Dashboard = () => {
  const { data, loading, error } = useGetBankNodeQueryQuery();

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

  const bankNode = data?.bankRelay?.edges[0]?.node;
  const accounts = bankNode?.accountSet?.edges.map(edge => edge?.node) ?? [];
  const totalBalance = accounts.reduce((sum: number, account: GetBankNodeQueryQuery['bankRelay']['edges'][0]['node']['accountSet']['edges'][0]['node']) => 
    sum + (account?.amount ?? 0), 0);

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
                계좌 수
              </Typography>
              <Typography variant="h3">
                {accounts.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                총 잔액
              </Typography>
              <Typography variant="h3">
                ₩{totalBalance.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                활성 계좌
              </Typography>
              <Typography variant="h3">
                {accounts.filter(account => account?.isActive).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}; 