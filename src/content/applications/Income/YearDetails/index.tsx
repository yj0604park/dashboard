import {
  Grid,
  Typography,
  Container,
  Box,
  Tooltip,
  IconButton
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import SalaryChart from '../SalaryChart';
import { useGetSalaryFilterQueryQuery } from 'src/__generated__/graphql';
import { useNavigate } from 'react-router-dom';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import SalaryDetailTable from './SalaryDetailTable';
import SalarySummaryTable from './SalarySummaryTable';
import SalarySummaryDetailTable from './SalarySummaryDetailTable';

const YearDetails = () => {
  const navigate = useNavigate();
  const { year } = useParams();

  const { loading, error, data } = useGetSalaryFilterQueryQuery({
    variables: { DateMin: `${year}-01-01`, DateMax: `${year}-12-31` }
  });

  var chart =
    loading || error ? <p>Loading...</p> : <SalaryChart data={data} />;
  var table =
    loading || error ? (
      <p>Loading...</p>
    ) : (
      <SalaryDetailTable data={data} year={year} />
    );
  var summary =
    loading || error ? <p>Loading...</p> : <SalarySummaryTable data={data} />;
  var summaryDetail =
    loading || error ? (
      <p>Loading...</p>
    ) : (
      <SalarySummaryDetailTable data={data} />
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
          <Grid item xs={12} md={12}>
            <Box display="flex">
              <Tooltip arrow placement="top" title="Go back">
                <IconButton color="primary" onClick={() => navigate('../')}>
                  <ArrowBackTwoToneIcon />
                </IconButton>
              </Tooltip>
              <Box>
                <Typography variant="h3" component="h3">
                  Incomes in {year}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {summary}
          </Grid>
          <Grid item xs={12}>
            {summaryDetail}
          </Grid>
          <Grid item xs={12}>
            {chart}
          </Grid>
          <Grid item xs={12}>
            {table}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default YearDetails;
