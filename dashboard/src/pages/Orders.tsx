import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, CircularProgress } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../graphql/queries';
import { OrdersResponse } from '../graphql/types';

export const Orders = () => {
  const { data, loading, error } = useQuery<OrdersResponse>(GET_ORDERS);

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

  const orders = data?.orders ?? [];

  return (
    <>
      <Typography variant="h1" gutterBottom>
        주문 관리
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>주문번호</TableCell>
              <TableCell>고객명</TableCell>
              <TableCell>상품</TableCell>
              <TableCell align="right">가격</TableCell>
              <TableCell>상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell align="right">
                  ₩{order.price.toLocaleString()}
                </TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}; 