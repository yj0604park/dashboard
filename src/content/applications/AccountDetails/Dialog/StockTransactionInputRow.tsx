import { Autocomplete, TextField } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { StockTransactionData } from 'src/models/internal';

interface StockTransactionInputRowProps {
  stockTransactionCreationData: StockTransactionData;
  setStockTransactionCreationData: (value: StockTransactionData) => void;
}

function StockTransactionInputRow({
  stockTransactionCreationData: stockTransactionCreationData,
  setStockTransactionCreationData: setStockTransactionCreationData
}: StockTransactionInputRowProps) {
  console.log(stockTransactionCreationData);

  const getTotal = (share: number, price: number) => {
    if (share && price) {
      return share * price;
    } else {
      return stockTransactionCreationData.total;
    }
  };

  return (
    <TableRow key={stockTransactionCreationData.id}>
      <TableCell>
        <TextField
          required
          id={'date_' + stockTransactionCreationData.id}
          type="date"
          value={stockTransactionCreationData.date}
          onChange={(e) => {
            setStockTransactionCreationData({
              ...stockTransactionCreationData,
              date: e.target.value
            });
          }}
          sx={{ width: 220 }}
          InputLabelProps={{ shrink: true }}
        />
      </TableCell>

      <TableCell>
        <Autocomplete
          id={'stock_' + stockTransactionCreationData.id}
          options={['AAPL', 'GOOG', 'TSLA']}
          sx={{ width: 220 }}
          value={stockTransactionCreationData.stock.ticker}
          onChange={(e, newValue) => {
            setStockTransactionCreationData({
              ...stockTransactionCreationData,
              stock: { name: 'test', ticker: newValue }
            });
          }}
          renderInput={(params) => (
            <TextField {...params} label="Stock" required />
          )}
        />
      </TableCell>

      <TableCell>
        <TextField
          required
          id={'price_' + stockTransactionCreationData.id}
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: { step: '0.01' } }}
          value={stockTransactionCreationData.price}
          onChange={(e) => {
            let new_price = Number(e.target.value);
            setStockTransactionCreationData({
              ...stockTransactionCreationData,
              price: new_price,
              total: getTotal(new_price, stockTransactionCreationData.share)
            });
          }}
        />
      </TableCell>

      <TableCell>
        <TextField
          required
          id={'share_' + stockTransactionCreationData.id}
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: { step: '0.001' } }}
          value={stockTransactionCreationData.share}
          onChange={(e) => {
            let new_share = Number(e.target.value);
            setStockTransactionCreationData({
              ...stockTransactionCreationData,
              share: new_share,
              total: getTotal(stockTransactionCreationData.price, new_share)
            });
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          required
          id={'total_' + stockTransactionCreationData.id}
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: { step: '0.01' } }}
          value={stockTransactionCreationData.total}
          onChange={(e) => {
            setStockTransactionCreationData({
              ...stockTransactionCreationData,
              total: Number(e.target.value)
            });
          }}
        />
      </TableCell>
    </TableRow>
  );
}

export default StockTransactionInputRow;
