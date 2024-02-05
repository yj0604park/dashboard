import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography } from '@mui/material';
import Footer from 'src/components/Footer';

import TransactionList from './TransactionList';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AccountState } from 'src/models/internal';
import { useQuery } from '@apollo/client';
import { TransactionData } from 'src/models/bank';
import { GetTransactionListQuery } from 'src/queries/BankQuery';

function ApplicationsTransactions() {
  let { state } = useLocation() as { state: AccountState };
  const [accountState, setAccountState] = useState<AccountState>();

  if (state) {
    if (!accountState) {
      setAccountState(state);
    }
  }

  if (!state) {
    return (
      <>
        <Helmet>
          <title>Transactions - Applications</title>
        </Helmet>
        <PageTitleWrapper>
          <Typography variant="h3" component="h3" gutterBottom>
            Account not selected
          </Typography>
        </PageTitleWrapper>
      </>
    );
  }

  const { loading, error, data, refetch } = useQuery<TransactionData>(
    GetTransactionListQuery,
    { variables: { AccountID: state.accountId } }
  );

  return (
    <>
      <Helmet>
        <title>Transactions - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          setAccountState={setAccountState}
          accountState={accountState}
          refetch={refetch}
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
            <TransactionList loading={loading} error={error} data={data} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
