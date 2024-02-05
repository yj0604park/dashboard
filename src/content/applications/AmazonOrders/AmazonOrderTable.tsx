import { useQuery } from '@apollo/client';
import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { AmazonOrderData } from 'src/models/bank';
import { GetAmazonOrderQuery } from 'src/queries/AmazonQuery';

function AmazonOrderTable() {
  const { loading, error, data } =
    useQuery<AmazonOrderData>(GetAmazonOrderQuery);

  let tableBodyContent = loading ? (
    <Typography variant="h2">Loading...</Typography>
  ) : (
    <TableBody>
      {data.amazonOrderRelay.edges.map((row) => (
        <TableRow key={row.node.id}>
          <TableCell padding="checkbox">
            <Checkbox color="primary" />
          </TableCell>
          <TableCell>{row.node.id}</TableCell>
          <TableCell>{row.node.date}</TableCell>
          <TableCell>{row.node.item}</TableCell>
          <TableCell>{row.node.isReturned.toString()}</TableCell>
          <TableCell align="right">{row.node.transaction?.amount}</TableCell>
          <TableCell align="right">
            {row.node.transaction?.relatedTransaction}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  let TableBlock = loading ? (
    <Typography variant="h2">Loading...</Typography>
  ) : (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox color="primary" />
            </TableCell>
            <TableCell>Order ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Is Returned</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Related Transaction</TableCell>
          </TableRow>
        </TableHead>
        {tableBodyContent}
      </Table>
    </TableContainer>
  );

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <Card>
            <CardHeader
              action={
                <Grid container direction={'row'} spacing={2} width={300}>
                  <Grid item xs={6}></Grid>
                </Grid>
              }
              title="Account List"
            />
            <Divider />
            {TableBlock}
            <Box p={2}></Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AmazonOrderTable;
