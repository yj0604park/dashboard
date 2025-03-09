import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, CircularProgress } from '@mui/material';
import { useGetBankSimpleListQueryQuery } from '../generated/graphql';

export const Orders = () => {
  const { data, loading, error } = useGetBankSimpleListQueryQuery();

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

  const banks = data?.bankRelay?.edges.map(edge => edge.node) ?? [];

  return (
    <>
      <Typography variant="h1" gutterBottom>
        은행 목록
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>은행명</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banks.map((bank) => (
              <TableRow key={bank.id}>
                <TableCell>{bank.id}</TableCell>
                <TableCell>{bank.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}; 