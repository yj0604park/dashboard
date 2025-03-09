import { Typography, Grid, Card, CardContent, CircularProgress, Box, Stack } from '@mui/material';
import { useGetBankNodeQueryQuery, GetBankNodeQueryQuery } from '../generated/graphql';

type AccountNode = GetBankNodeQueryQuery['bankRelay']['edges'][0]['node']['accountSet']['edges'][0]['node'];

interface CurrencyBalance {
  [key: string]: number;
}

type CurrencySymbols = {
  KRW: string;
  USD: string;
  EUR: string;
  JPY: string;
  [key: string]: string;
};

const currencySymbol: CurrencySymbols = {
  KRW: '₩',
  USD: '$',
  EUR: '€',
  JPY: '¥',
};

const formatCurrency = (amount: number, currency: string) => {
  const symbol = currencySymbol[currency] || currency;
  if(amount > 0 ) {
    return `${symbol} ${amount.toLocaleString()}`;
  } else {
    return `-${symbol} ${(-amount).toLocaleString()}`;
  }
};

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

  const balanceByCurrency = accounts.reduce((acc: CurrencyBalance, account: AccountNode) => {
    if (account?.amount && account?.currency) {
      acc[account.currency] = (acc[account.currency] || 0) + Number(account.amount);
    }
    return acc;
  }, {});

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h1" gutterBottom>
        대시보드
      </Typography>
      <Grid container spacing={4} sx={{ width: '100%' }}>
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
    </Box>
  );
}; 