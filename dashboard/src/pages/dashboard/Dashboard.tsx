import { Typography, Grid, Card, CardContent, CircularProgress, Box, Stack } from '@mui/material';
import { useGetBankNodeWithBalanceQueryQuery, GetBankNodeWithBalanceQueryQuery } from '../../generated/graphql';
import { AccountTable } from './components/AccountTable';
import { formatCurrency } from '../../utils/currency';

type AccountNode = GetBankNodeWithBalanceQueryQuery['bankRelay']['edges'][0]['node']['accountSet']['edges'][0]['node'];

interface CurrencyBalance {
  [key: string]: number;
}

export const Dashboard = () => {
  const { data, loading, error } = useGetBankNodeWithBalanceQueryQuery();

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

  const bankLists = data?.bankRelay?.edges.map(edge => edge.node) ?? [];
  const accounts = bankLists.flatMap(bank => bank?.accountSet?.edges.map(edge => edge?.node) ?? []);

  const balanceByCurrency = accounts.reduce((acc: CurrencyBalance, account: AccountNode) => {
    if (account?.amount && account?.currency) {
      acc[account.currency] = (acc[account.currency] || 0) + Number(account.amount);
    }
    return acc;
  }, {});

  return (
    <Box sx={{ width: '100%' }}>
      <Typography 
        variant="h1" 
        gutterBottom 
        sx={{ 
          fontSize: '1.6rem',
          fontWeight: 600,
          mb: 3
        }}
      >
        대시보드
      </Typography>
      <Grid container spacing={4} sx={{ width: '100%', mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
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
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                총 잔액
              </Typography>
              <Stack spacing={1}>
                {Object.entries(balanceByCurrency).map(([currency, amount]) => (
                  <Typography 
                    key={currency} 
                    variant="h4" 
                    sx={{ 
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontSize: '1.5rem'
                    }}
                  >
                    {formatCurrency(amount, currency)}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
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

      <Typography 
        variant="h2" 
        sx={{ 
          fontSize: '1.4rem',
          fontWeight: 600,
          mb: 2
        }}
      >
        계좌 목록
      </Typography>
      <AccountTable accounts={accounts} />
    </Box>
  );
}; 