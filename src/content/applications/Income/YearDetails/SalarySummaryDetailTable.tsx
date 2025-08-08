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
import { number } from 'prop-types';
import React from 'react';
import NumberHelper from 'src/functions/NumberHelper';
import { SalaryData } from 'src/types/bank';

interface SalarySummaryDetailTableProps {
  data: SalaryData;
}

const updateSummary = (summary: { [key: string]: number }, node: JSON) => {
  Object.keys(node).forEach((key) => {
    if (summary[key]) {
      summary[key] += node[key];
    } else {
      summary[key] = node[key];
    }
  });
  return summary;
};

const SalarySummaryDetailTable: React.FC<SalarySummaryDetailTableProps> = ({
  data
}) => {
  const summary = data.salaryRelay.edges.reduce(
    (
      acc: {
        grossPay: { [key: string]: number };
        totalAdjustment: { [key: string]: number };
        totalWithheld: { [key: string]: number };
        totalDeduction: { [key: string]: number };
        netPay: number;
      },
      { node }
    ) =>
    (acc = {
      grossPay: updateSummary(acc.grossPay, node.payDetail),
      totalAdjustment: updateSummary(
        acc.totalAdjustment,
        node.adjustmentDetail
      ),
      totalWithheld: updateSummary(acc.totalWithheld, node.taxDetail),
      totalDeduction: updateSummary(acc.totalDeduction, node.deductionDetail),
      netPay: acc['netPay'] + node.netPay
    }),
    {
      grossPay: {},
      totalAdjustment: {},
      totalWithheld: {},
      totalDeduction: {},
      netPay: 0
    }
  );

  const new_summary = {
    grossPay: {},
    totalAdjustment: {},
    totalWithheld: {},
    totalDeduction: {},
    netPay: Math.round(summary.netPay * 100) / 100
  };

  const getDisplayColor = (value: number) => NumberHelper.GetDisplayColor(value);
  const formatAccountingUSD = (value: number) => NumberHelper.FormatAccountingUSD(value);

  return (
    <Card>
      <CardHeader title="Summary Detail" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Gross Pay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(summary.grossPay).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>
                  <Typography
                    key={key}
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: getDisplayColor(value as number) }}
                    gutterBottom
                    noWrap
                  >
                    {formatAccountingUSD(value as number)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Total Adjustment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(summary.totalAdjustment).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>
                  <Typography
                    key={key}
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: getDisplayColor(value as number) }}
                    gutterBottom
                    noWrap
                  >
                    {formatAccountingUSD(value as number)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Total Withheld</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(summary.totalWithheld).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>
                  <Typography
                    key={key}
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: getDisplayColor(value as number) }}
                    gutterBottom
                    noWrap
                  >
                    {formatAccountingUSD(value as number)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Total Deduction</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(summary.totalDeduction).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>
                  <Typography
                    key={key}
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: getDisplayColor(value as number) }}
                    gutterBottom
                    noWrap
                  >
                    {formatAccountingUSD(value as number)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Net Pay</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default SalarySummaryDetailTable;
