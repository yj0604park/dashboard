import { Helmet } from 'react-helmet-async';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  Divider,
  Grid,
  Typography,
  styled
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Footer from 'src/components/Footer';
import AmazonOrderTable from './AmazonOrderTable';
import { useState } from 'react';

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(4)};
`
);

function AmazonOrders() {
  const [openAddOrder, setOpenAddOrder] = useState(false);

  const handleCloseAddOrder = () => {
    setOpenAddOrder(false);
  };

  const handleOpendAddOrder = () => {
    setOpenAddOrder(true);
  };

  return (
    <>
      <Helmet>
        <title>Amazon Orders</title>
      </Helmet>
      <PageTitle className="MuiPageTitle-wrapper">
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h3" component="h3" gutterBottom>
                Amazon Orders
              </Typography>
              <Typography variant="subtitle2">
                Your Amazon orders history
              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
                startIcon={<AddTwoToneIcon fontSize="small" />}
                onClick={handleOpendAddOrder}
              >
                Create order history
              </Button>
            </Grid>
          </Grid>
        </Container>
      </PageTitle>
      <AmazonOrderTable />
      <Dialog onClose={handleCloseAddOrder} open={openAddOrder}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Input Fields" />
              <Divider />
              <CardContent></CardContent>

              <CardActions>
                <Button size="small">Submit</Button>
                <Button size="small" onClick={handleCloseAddOrder}>
                  Close
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
      <Footer />
    </>
  );
}

export default AmazonOrders;
