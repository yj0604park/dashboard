import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountLists from './AccountLists';
import { useLocation } from 'react-router-dom';

interface LocationState {
  bankId?: string;
  bankName?: string;
}

function ApplicationsTransactions() {
  let { state } = useLocation();
  const { bankId, bankName } = (state as LocationState) || {};

  return (
    <>
      <Helmet>
        <title>Accounts</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader bankName={bankName} />
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
            <AccountLists bankFilterId={bankId} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
