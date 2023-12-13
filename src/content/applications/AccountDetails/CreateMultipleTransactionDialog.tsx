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
import createTransaction from 'src/hook/createTransaction';
import retailerList from 'src/hook/reatilerLIst';
import { useState } from 'react';

interface CreateAccountDialogProps {
  open: boolean;
  onModalClose: () => void;
  bankName: string;
  bankId: number;
  accountName: string;
  accountId: number;
}

function CreateAccountDialog({
  onModalClose,
  open,
  bankName,
  bankId,
  accountName,
  accountId
}: CreateAccountDialogProps) {
  const [openSnack, setOpenSnack] = useState(false);

  const handleSnackbar = () => {
    setOpenSnack(true);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const {
    transactionCreationDataList,
    setTransactionCreationDataList,
    addNewRow,
    setTransactionCreationData,
    onRetailerChange,
    submitRequest
  } = createTransaction({ accountId });

  const { retailerInfo, setRetailerInfo, retailerLoading, retailerError } =
    retailerList();

  const handleSubmit = () => {
    submitRequest();
    handleSnackbar();
  };

  return (
    <Dialog fullScreen onClose={onModalClose} open={open}>
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
                    />
                  ))}
                </TableBody>
              </Table>
            </CardContent>

            <CardActions>
              <Button size="small" onClick={handleSubmit}>
                Submit
              </Button>
              <Button size="small" onClick={onModalClose}>
                Close
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={open}
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
