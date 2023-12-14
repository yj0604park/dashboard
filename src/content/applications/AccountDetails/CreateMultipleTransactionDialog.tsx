import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  Divider,
  Fab,
  Grid,
  MenuItem,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TransactionRow from './TransactionRow';
import retailerList from 'src/hook/reatilerLIst';
import { useState } from 'react';
import createTransaction from 'src/hook/createTransaction';
import { useQuery } from '@apollo/client';
import { TransactionData } from 'src/models/bank';
import { GetLastTransactionDate } from 'src/queries/BankQuery';

interface CreateAccountDialogProps {
  open: boolean;
  onModalClose: () => void;
  bankName: string;
  bankId: number;
  accountName: string;
  accountId: number;
  refresh: (event: any) => void;
}

function CreateAccountDialog({
  onModalClose,
  open,
  bankName,
  bankId,
  accountName,
  accountId,
  refresh
}: CreateAccountDialogProps) {
  const [openSnack, setOpenSnack] = useState(false);

  // graphql connection
  const {
    loading: transactionLoading,
    error: transactionError,
    data: transactionData,
    refetch: refetchTransaction
  } = useQuery<TransactionData>(GetLastTransactionDate);

  const {
    updateDefaultTransaction,
    transactionCreationDataList,
    resetTransactionCreationDataList,
    addNewRow,
    setTransactionCreationData,
    onRetailerChange,
    onIsInternalChange,
    submitRequest,
    mutationLoading,
    mutationError
  } = createTransaction({ accountId });

  const { retailerInfo, setRetailerInfo, retailerLoading, retailerError } =
    retailerList();

  if (transactionLoading || transactionError) {
    return <div>loading...</div>;
  }

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setOpenSnack(false);
  };

  updateDefaultTransaction(
    accountId,
    transactionData.transactionRelay.edges[0].node.date.toString()
  );

  const handleSnackbar = () => {
    setOpenSnack(true);
  };

  const handleSubmit = () => {
    submitRequest();
    if (!mutationLoading && !mutationError) {
      handleSnackbar();
    }
    resetTransactionCreationDataList();
    refresh(null);
    refetchTransaction();
  };

  const handleModalClose = () => {
    resetTransactionCreationDataList();
    onModalClose();
  };

  return (
    <Dialog fullScreen onClose={handleModalClose} open={open}>
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
            <CardContent>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' }
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="bankId"
                  select
                  label="Bank"
                  value={bankId}
                  disabled
                >
                  <MenuItem key={bankId} value={bankId} selected>
                    {bankName}
                  </MenuItem>
                </TextField>

                <TextField
                  id="accountId"
                  select
                  label="Account"
                  value={accountId}
                  disabled
                >
                  <MenuItem key={accountId} value={accountId} selected>
                    {accountName}
                  </MenuItem>
                </TextField>
                <Fab color="primary" aria-label="add" onClick={addNewRow}>
                  <AddIcon />
                </Fab>
              </Box>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Note</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Retailer</TableCell>
                    <TableCell>IsInternal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactionCreationDataList.map((row) => (
                    <TransactionRow
                      key={row.id}
                      id={row.id}
                      transactionCreationData={row}
                      setTransactionCreationData={setTransactionCreationData(
                        row.id
                      )}
                      loading={retailerLoading}
                      retailerInfo={retailerInfo}
                      onRetailerChange={onRetailerChange(row.id)}
                      onIsInternalChange={onIsInternalChange(row.id)}
                    />
                  ))}
                </TableBody>
              </Table>
            </CardContent>

            <CardActions>
              <Button size="small" onClick={handleSubmit}>
                Submit
              </Button>
              <Button size="small" onClick={handleModalClose}>
                Close
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

export default CreateAccountDialog;
