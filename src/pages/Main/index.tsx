import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';
import { Box, Card, Container, Grid, Typography } from '@mui/material';

function FinanceDashboard() {
  return (
    <>
      <Helmet>
        <title>Finance Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <Typography variant="h3" component="h1" gutterBottom>
          Main Page
        </Typography>
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
            <Card>
              <Grid spacing={0} container>
                <Grid item xs={12} md={6}>
                  <Box p={4}>
                    <Typography
                      sx={{
                        pb: 3
                      }}
                      variant="h1"
                    >
                      Finance
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box p={4}>
                    <Typography
                      sx={{
                        pb: 3
                      }}
                      variant="h1"
                    >
                      People
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FinanceDashboard;
