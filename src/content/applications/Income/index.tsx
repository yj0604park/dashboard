import { Helmet } from 'react-helmet-async';

import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';
import { useQuery } from '@apollo/client';
import { SalaryData, SalaryYearsData } from 'src/models/bank';
import { GetSalaryQuery, SalaryYears } from 'src/queries/SalaryQuery';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useNavigate } from 'react-router-dom';
import SalaryChart from './SalaryChart';

function Income() {
  const navigate = useNavigate();
  const {
    loading: year_loading,
    error: year_error,
    data: year_data
  } = useQuery<SalaryYearsData>(SalaryYears);

  const {
    loading: chart_loading,
    error: chart_error,
    data: chart_data
  } = useQuery<SalaryData>(GetSalaryQuery);

  const handleClick = (year) => {
    navigate(`yearDetails/${year}`);
  };

  const dataPanel =
    year_loading || year_error
      ? year_error
        ? 'Error!'
        : 'Loading...'
      : year_data?.salaryYears.map((year, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Box p={4}>
              <Typography
                sx={{
                  pb: 3
                }}
                variant="h1"
              >
                <Button
                  startIcon={<PaymentsIcon />}
                  variant="contained"
                  size="large"
                  onClick={() => handleClick(year)}
                >
                  {year}
                </Button>
              </Typography>
            </Box>
          </Grid>
        ));

  var chart =
    chart_loading || chart_error ? (
      <p>Loading...</p>
    ) : (
      <SalaryChart data={chart_data} />
    );
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
            {chart}
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Grid spacing={0} container>
                {dataPanel}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Income;
