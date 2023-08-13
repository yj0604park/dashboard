import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import { useQuery } from '@apollo/client';
import NumberUtils from 'src/functions/NumberHelper';
import { BankData } from 'src/models/bank';
import { GetBankNodeQuery } from 'src/queries/BankQuery';
import BankList from './BankList';
import ChartList from './ChartList';
import TotalBalance from './TotalBalance';
import Loading from './Loading';

function FinanceDashboard() {
  const { loading, error, data } = useQuery<BankData>(GetBankNodeQuery);

  if (loading) {
    return <Loading />;
  }
  const krwTotal = NumberUtils.FormatString(
    NumberUtils.GetTotalNumber(data.bankRelay.edges, 'KRW'),
    'KRW'
  );
  const usdTotal = NumberUtils.FormatString(
    NumberUtils.GetTotalNumber(data.bankRelay.edges, 'USD'),
    'USD'
  );

  return (
    <>
      <Helmet>
        <title>Finance Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
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
            <TotalBalance
              loading={loading}
              krwTotal={krwTotal}
              usdTotal={usdTotal}
            />
          </Grid>
          <Grid item xs={12}>
            <BankList loading={loading} bankList={data} />
          </Grid>
          <Grid item xs={12}>
            <ChartList krwTotal={krwTotal} usdTotal={usdTotal} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FinanceDashboard;
