import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountBalance from './AccountBalance';
import TotalBalance from './TotalBalance';
import Wallets from './Wallets';
import AccountSecurity from './AccountSecurity';
import WatchList from './WatchList';
import BankList from './BankList';
import { useQuery, gql } from '@apollo/client';

interface Bank {
  id: number;
  name: string;
}

interface BankData {
  banks: Bank[];
}

const GET_BANKS = gql`
  query MyQuery {
    banks {
      balance
      id
      name
      accountSet {
        amount
        currency
        id
        lastUpdate
        name
      }
    }
  }
`;

function FinanceDashboard() {
  const { loading, error, data } = useQuery<BankData>(GET_BANKS);

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
            <TotalBalance loading={loading} bankList={data} />
          </Grid>
          <Grid item xs={12}>
            <BankList loading={loading} bankList={data} />
          </Grid>
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FinanceDashboard;
