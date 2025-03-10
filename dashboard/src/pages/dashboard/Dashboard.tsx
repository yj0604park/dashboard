import { Typography, CircularProgress, Box, Stack } from '@mui/material';
import { useGetBankNodeWithBalanceQuery } from '../../generated/graphql';
import { AccountTable } from '../../components/table/AccountTable';
import { AmountChart } from './components/AmountChart';
import { Overview } from './components/Overview';


export const Dashboard = () => {
  const { data, loading, error } = useGetBankNodeWithBalanceQuery();

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

  const accounts = data?.bankRelay.edges.flatMap(bank => 
    bank.node.accountSet.edges.map(account => ({
      ...account.node,
      bankName: bank.node.name,
      bankId: bank.node.id
    }))
  ) ?? [];

  return (
    <Stack spacing={3}>
      <Typography 
        variant="h2" 
        sx={{ 
          fontSize: '1.4rem',
          fontWeight: 600,
        }}
      >
        대시보드
      </Typography>

      <Overview accounts={accounts} />

      <AmountChart />

      <Box>
        <Typography 
          variant="h3" 
          sx={{ 
            fontSize: '1.2rem',
            fontWeight: 500,
            mb: 2
          }}
        >
          계좌 목록
        </Typography>
        <AccountTable accounts={accounts} />
      </Box>
    </Stack>
  );
}; 