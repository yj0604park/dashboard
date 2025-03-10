import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  InputAdornment,
} from '@mui/material';
import { useState } from 'react';

interface TransactionCreateModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    amount: number;
    date: string;
    isInternal?: boolean;
    note?: string;
  }) => void;
  currency: string;
}

export const TransactionCreateModal = ({
  open,
  onClose,
  onSubmit,
  currency
}: TransactionCreateModalProps) => {
  const [type, setType] = useState('DEPOSIT');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    onSubmit({
      amount: type === 'WITHDRAW' ? -Math.abs(Number(amount)) : Math.abs(Number(amount)),
      date: new Date().toISOString(),
      isInternal: false,
      note: note || undefined
    });
    setType('DEPOSIT');
    setAmount('');
    setNote('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>거래 내역 추가</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>거래 종류</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="거래 종류"
            >
              <MenuItem value="DEPOSIT">입금</MenuItem>
              <MenuItem value="WITHDRAW">출금</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="금액"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">{currency}</InputAdornment>,
            }}
            fullWidth
          />

          <TextField
            label="메모"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!amount || Number(amount) <= 0}
        >
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 