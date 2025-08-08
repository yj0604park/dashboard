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
import React from 'react';
import NumberHelper from 'src/functions/NumberHelper';
import { SalaryData } from 'src/types/bank';

interface SalarySummaryTableProps {
  data: SalaryData;
}

const SalarySummaryTable: React.FC<SalarySummaryTableProps> = ({ data }) => {
  const summary = data.salaryRelay.edges.reduce(
    (acc, { node }) =>
    (acc = {
      grossPay: acc['grossPay'] + node.grossPay,
      totalAdjustment: acc['totalAdjustment'] + node.totalAdjustment,
      totalWithheld: acc['totalWithheld'] + node.totalWithheld,
      totalDeduction: acc['totalDeduction'] + node.totalDeduction,
      netPay: acc['netPay'] + node.netPay
    }),
    {
      grossPay: 0,
      totalAdjustment: 0,
      totalWithheld: 0,
      totalDeduction: 0,
      netPay: 0
    }
  );

  const new_summary = {
    grossPay: Math.round(summary.grossPay * 100) / 100,
    totalAdjustment: Math.round(summary.totalAdjustment * 100) / 100,
    totalWithheld: Math.round(summary.totalWithheld * 100) / 100,
    totalDeduction: Math.round(summary.totalDeduction * 100) / 100,
    netPay: Math.round(summary.netPay * 100) / 100
  };

  const getDisplayColor = (value: number) => NumberHelper.GetDisplayColor(value);
  const formatAccountingUSD = (value: number) => NumberHelper.FormatAccountingUSD(value);

  return (
    <Card>
      <CardHeader title="Summary" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Gross Pay</TableCell>
              <TableCell>Total Adjustment</TableCell>
              <TableCell>Total Withheld</TableCell>
              <TableCell>Total Deduction</TableCell>
              <TableCell>Net Pay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ color: getDisplayColor(new_summary.grossPay) }}
                  gutterBottom
                  noWrap
                >
                  {formatAccountingUSD(new_summary.grossPay)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ color: getDisplayColor(new_summary.totalAdjustment) }}
                  gutterBottom
                  noWrap
                >
                  {formatAccountingUSD(new_summary.totalAdjustment)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ color: getDisplayColor(new_summary.totalWithheld) }}
                  gutterBottom
                  noWrap
                >
                  {formatAccountingUSD(new_summary.totalWithheld)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ color: getDisplayColor(new_summary.totalDeduction) }}
                  gutterBottom
                  noWrap
                >
                  {formatAccountingUSD(new_summary.totalDeduction)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ color: getDisplayColor(new_summary.netPay) }}
                  gutterBottom
                  noWrap
                >
                  {formatAccountingUSD(new_summary.netPay)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default SalarySummaryTable;
