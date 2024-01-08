import { Autocomplete, TextField } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {
  StockAutocompleteItem,
  StockTransactionData
} from 'src/models/internal';

interface StockTransactionInputRowProps {
  stockTransactionCreationData: StockTransactionData;
  setStockTransactionCreationData: (value: StockTransactionData) => void;
  loading: boolean;
  stockListInfo: StockAutocompleteItem[];
}

function StockTransactionInputRow({
  stockTransactionCreationData,
  setStockTransactionCreationData,
  loading,
  stockListInfo
}: StockTransactionInputRowProps) {
  console.log(stockListInfo);

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
          loading={loading}
          options={stockListInfo}
          sx={{ width: 220 }}
          renderInput={(params) => <TextField {...params} label="Stock" />}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(e, newValue) => {
            console.log(newValue);
          }}
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
