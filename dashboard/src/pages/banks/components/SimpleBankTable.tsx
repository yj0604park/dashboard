import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { GetBankSimpleListQuery } from '../../../generated/graphql';
import { StyledTableCell, StyledTableRow } from '../../../components/table/StyledTable';
import { formatCurrency } from '../../../utils/currency';
type BankNode = GetBankSimpleListQuery['bankRelay']['edges'][0]['node'];

interface BankTableProps {
    banks: BankNode[];
}

export const SimpleBankTable = ({ banks }: BankTableProps) => {
    return (
        <TableContainer component={Paper} elevation={2}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>은행명</StyledTableCell>
                        <StyledTableCell align="right">잔액</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {banks.map((bank) => (
                        <StyledTableRow key={bank?.id}>
                            <StyledTableCell>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {bank?.name || '-'}
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {bank.balance.map((balance) => (
                                    <div key={balance.currency}>
                                        {formatCurrency(balance.value, balance.currency)}
                                    </div>
                                ))}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}; 