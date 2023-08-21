import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import TransactionList from './TransactionList';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AccountState } from 'src/models/internal';

function ApplicationsTransactions() {
  let { state } = useLocation();
  const [accountState, setAccountState] = useState<AccountState>();

  if (state) {
    if (!accountState) {
      setAccountState(state);
    }
  }

  return (
    <>
      <Helmet>
        <title>Transactions - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          setAccountState={setAccountState}
          accountState={accountState}
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <TransactionList {...accountState} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
