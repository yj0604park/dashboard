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
  const getDisplayColor = (value: number) => NumberHelper.GetDisplayColor(value);
  const formatAccountingUSD = (value: number) => NumberHelper.FormatAccountingUSD(value);
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
                        sx={{ color: getDisplayColor(account.grossPay) }}
                        gutterBottom
                        noWrap
                      >
                        {formatAccountingUSD(account.grossPay)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{ color: getDisplayColor(account.totalAdjustment) }}
                        gutterBottom
                        noWrap
                      >
                        {formatAccountingUSD(account.totalAdjustment)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{ color: getDisplayColor(account.totalWithheld) }}
                        gutterBottom
                        noWrap
                      >
                        {formatAccountingUSD(account.totalWithheld)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{ color: getDisplayColor(account.totalDeduction) }}
                        gutterBottom
                        noWrap
                      >
                        {formatAccountingUSD(account.totalDeduction)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{ color: getDisplayColor(account.netPay) }}
                        gutterBottom
                        noWrap
                      >
                        {formatAccountingUSD(account.netPay)}
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
