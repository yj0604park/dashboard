import {
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import NumberHelper from 'src/functions/NumberHelper';
import { SalaryData } from 'src/types/bank';

function SalaryDetailTable({ data, year }: { data: SalaryData; year: string }) {
  return (
    <>
      <Card>
        <CardHeader title={`Incomes in ${year}`} />
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell>Gross Pay</TableCell>
                <TableCell>Total Adjustment</TableCell>
                <TableCell>Total Withheld</TableCell>
                <TableCell>Total Deduction</TableCell>
                <TableCell>Net Pay</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.salaryRelay.edges.map((accountNode) => {
                const account = accountNode.node;
                return (
                  <TableRow hover key={account.id}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {account.date}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {NumberHelper.FormatString(account.grossPay, 'USD')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {NumberHelper.FormatString(
                          account.totalAdjustment,
                          'USD'
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {NumberHelper.FormatString(
                          account.totalWithheld,
                          'USD'
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {NumberHelper.FormatString(
                          account.totalDeduction,
                          'USD'
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {NumberHelper.FormatString(account.netPay, 'USD')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}

export default SalaryDetailTable;
