import { Helmet } from 'react-helmet-async';

import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Grid,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';
import { useQuery } from '@apollo/client';
import { SalaryData } from 'src/types/bank';
import { GetSalaryQuery } from 'src/queries/SalaryQuery';
import { useNavigate } from 'react-router-dom';
import SalaryChart from './SalaryChart';
import NumberHelper from 'src/functions/NumberHelper';

function Income() {
  const navigate = useNavigate();

  const {
    loading: chart_loading,
    error: chart_error,
    data: chart_data
  } = useQuery<SalaryData>(GetSalaryQuery);

  const handleClick = (year) => {
    navigate(`yearDetails/${year}`);
  };

  var chart =
    chart_loading || chart_error ? (
      <p>Loading...</p>
    ) : (
      <SalaryChart data={chart_data} />
    );

  const calculateNetIncomePerYear = (data: SalaryData) => {
    const netIncomePerYear: {
      [year: string]: {
        grossPay: number;
        totalAdjustment: number;
        totalWithheld: number;
        totalDeduction: number;
        netPay: number;
      };
    } = {};

    data?.salaryRelay.edges.forEach((salary) => {
      const year = new Date(salary.node.date).getFullYear().toString();
      if (netIncomePerYear[year]) {
        netIncomePerYear[year].grossPay += salary.node.grossPay;
        netIncomePerYear[year].totalAdjustment += salary.node.totalAdjustment;
        netIncomePerYear[year].totalWithheld += salary.node.totalWithheld;
        netIncomePerYear[year].totalDeduction += salary.node.totalDeduction;
        netIncomePerYear[year].netPay += salary.node.netPay;
      } else {
        netIncomePerYear[year] = {
          grossPay: salary.node.grossPay,
          totalAdjustment: salary.node.totalAdjustment,
          totalWithheld: salary.node.totalWithheld,
          totalDeduction: salary.node.totalDeduction,
          netPay: salary.node.netPay
        };
      }
    });

    return netIncomePerYear;
  };

  let summary;

  if (chart_loading || chart_error) {
    summary = 'Loading...';
  } else {
    const netIncomePerYear = calculateNetIncomePerYear(chart_data);

    const sortedYears = Object.keys(netIncomePerYear).sort();
    const netIncomeList = sortedYears.map((year) => ({
      year,
      grossPay: netIncomePerYear[year].grossPay,
      totalAdjustment: netIncomePerYear[year].totalAdjustment,
      totalWithheld: netIncomePerYear[year].totalWithheld,
      totalDeduction: netIncomePerYear[year].totalDeduction,
      netPay: netIncomePerYear[year].netPay
    }));

    summary = (
      <Card>
        <CardHeader title="Summary" />
        <Grid container>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell>Gross Pay</TableCell>
                  <TableCell>Total Adjustment</TableCell>
                  <TableCell>Total Withheld</TableCell>
                  <TableCell>Total Deduction</TableCell>
                  <TableCell>Net Pay</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {netIncomeList.map((item) => (
                  <TableRow key={item.year}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {item.year}
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
                        {NumberHelper.FormatString(item.grossPay, 'USD')}
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
                        {NumberHelper.FormatString(item.totalAdjustment, 'USD')}
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
                        {NumberHelper.FormatString(item.totalWithheld, 'USD')}
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
                        {NumberHelper.FormatString(item.totalDeduction, 'USD')}
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
                        {NumberHelper.FormatString(item.netPay, 'USD')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleClick(item.year)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Card>
    );
  }

  return (
    <>
      <Helmet>
        <title>Income</title>
      </Helmet>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Income
            </Typography>
            <Typography variant="subtitle2">
              There are your income transaction.
            </Typography>
          </Grid>
        </Grid>
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            {summary}
          </Grid>
          <Grid item xs={12}>
            {chart}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Income;
