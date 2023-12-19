import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

function StockTransactionInputRow({ row }) {
  return (
    <TableRow key={row.id}>
      <TableCell>Date</TableCell>
      <TableCell>Stock Selector</TableCell>
      <TableCell>Price</TableCell>
      <TableCell>Share</TableCell>
      <TableCell>Total</TableCell>
    </TableRow>
  );
}

export default StockTransactionInputRow;
