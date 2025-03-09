import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Box,
  tableCellClasses,
  styled
} from '@mui/material';
import { GetBankNodeWithBalanceQueryQuery } from '../../../generated/graphql';
import { formatCurrency } from '../../../utils/currency';

type AccountNode = GetBankNodeWithBalanceQueryQuery['bankRelay']['edges'][0]['node']['accountSet']['edges'][0]['node'];

interface AccountTableProps {
  accounts: AccountNode[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    cursor: 'pointer',
  },
}));

const getStatusColor = (isActive: boolean | null | undefined) => {
  if (isActive === null || isActive === undefined) return 'default';
  return isActive ? 'success' : 'error';
};

export const AccountTable = ({ accounts }: AccountTableProps) => {
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>계좌번호</StyledTableCell>
            <StyledTableCell>계좌종류</StyledTableCell>
            <StyledTableCell align="right">잔액</StyledTableCell>
            <StyledTableCell align="center">상태</StyledTableCell>
            <StyledTableCell>최종 업데이트</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account) => (
            <StyledTableRow key={account?.id}>
              <StyledTableCell>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {account?.name || '-'}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                {account?.type || '-'}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Box sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                  {formatCurrency(account?.amount, account?.currency)}
                </Box>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Chip
                  label={account?.isActive ? '활성' : '비활성'}
                  color={getStatusColor(account?.isActive)}
                  size="small"
                />
              </StyledTableCell>
              <StyledTableCell>
                {account?.lastUpdate ? new Date(account.lastUpdate).toLocaleString() : '-'}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}; 