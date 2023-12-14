import { CheckBox } from '@mui/icons-material';
import {
  TableCell,
  TextField,
  Autocomplete,
  TableRow,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { ChangeEvent } from 'react';
import { Retailer } from 'src/models/bank';
import {
  RetailerList,
  RetailerSelectionProps,
  TransactionCreationData
} from 'src/models/internal';

interface TransactionRowProps {
  id: number;
  transactionCreationData: TransactionCreationData;
  setTransactionCreationData: (value: TransactionCreationData) => void;
  loading: boolean;
  retailerInfo: RetailerList;
  onRetailerChange: (
    e: ChangeEvent<HTMLInputElement>,
    value: RetailerSelectionProps
  ) => void;
  onIsInternalChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function TransactionRow({
  id,
  transactionCreationData,
  setTransactionCreationData,
  loading,
  retailerInfo,
  onRetailerChange,
  onIsInternalChange
}: TransactionRowProps) {
  return (
    <TableRow
      key={id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        <TextField
          required
          id={'category_' + id}
          label="Category"
          value={transactionCreationData.category}
        />
      </TableCell>
      <TableCell>
        <TextField
          id={'note_' + id}
          label="Note"
          value={transactionCreationData.note}
          onChange={(e) => {
            setTransactionCreationData({
              ...transactionCreationData,
              note: e.target.value
            });
          }}
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          id={'date_' + id}
          label="Date"
          type="date"
          value={transactionCreationData.date}
          onChange={(e) => {
            setTransactionCreationData({
              ...transactionCreationData,
              date: e.target.value
            });
          }}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true
          }}
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          id={'amount_' + id}
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            inputProps: { step: '0.01' }
          }}
          value={transactionCreationData.amount}
          onChange={(e) => {
            setTransactionCreationData({
              ...transactionCreationData,
              amount: Number(e.target.value)
            });
          }}
        />
      </TableCell>
      <TableCell align="right">
        <Autocomplete
          id={'retailer_' + id}
          loading={loading}
          options={retailerInfo.totalRetailers}
          renderInput={(params) => <TextField {...params} label="Retailer" />}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={onRetailerChange}
        />
      </TableCell>
      <TableCell align="right">
        <Checkbox
          id={'isInternal_' + id}
          value={transactionCreationData.isInternal}
          onChange={onIsInternalChange}
        />
      </TableCell>
    </TableRow>
  );
}

export default TransactionRow;
