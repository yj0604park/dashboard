import {
  Alert,
  Autocomplete,
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
  Stack,
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
import createRetailer from 'src/hook/createRetailer';

interface CreateAccountDialogProps {
  open: boolean;
  onModalClose: () => void;
  bankName: string;
  bankId: number;
  accountName: string;
  accountId: number;
  refresh: (event: any) => void;
}

interface CreateRetailerInfo {
  name: string;
  type: string;
  category: string;
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
  const [createRetailerInfo, setCreateRetailerInfo] =
    useState<CreateRetailerInfo>({ name: '', type: '', category: '' });

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

  const {
    createRetailerMutation,
    retailerData,
    transactionCategoryData,
    transactionCategoryLoading,
    retailerTypeData,
    retailerTypeLoading,
    convertEnumToArray
  } = createRetailer();

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

              <Fab color="primary" aria-label="add" onClick={addNewRow}>
                <AddIcon />
              </Fab>

              <Divider />
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' }
                }}
                noValidate
                autoComplete="off"
              >
                <Stack direction="row" spacing={1}>
                  <TextField
                    id="retailerName"
                    label="Retailer"
                    value={createRetailerInfo.name}
                    onChange={(event) => {
                      setCreateRetailerInfo({
                        ...createRetailerInfo,
                        name: event.target.value
                      });
                    }}
                  />
                  <Autocomplete
                    id="retailerType"
                    loading={retailerTypeLoading}
                    options={convertEnumToArray(retailerTypeData)}
                    renderInput={(params) => (
                      <TextField {...params} label="Type" />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(event, value: any) => {
                      console.log(value);
                      setCreateRetailerInfo({
                        ...createRetailerInfo,
                        type: value?.label
                      });
                    }}
                  />
                  <Autocomplete
                    id="transactionCategory"
                    loading={transactionCategoryLoading}
                    options={convertEnumToArray(transactionCategoryData)}
                    renderInput={(params) => (
                      <TextField {...params} label="Category" />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(event, value: any) => {
                      console.log(value);
                      setCreateRetailerInfo({
                        ...createRetailerInfo,
                        category: value?.label
                      });
                    }}
                  />
                  <Button
                    variant="text"
                    size="medium"
                    onClick={() => {
                      createRetailerMutation({
                        variables: createRetailerInfo
                      }).then((response) => {
                        let newRetailer = {
                          id: response.data?.createRetailer.id,
                          label: response.data?.createRetailer.name,
                          category: response.data?.createRetailer.category
                        };
                        setRetailerInfo({
                          ...retailerInfo,
                          totalRetailers: [
                            ...retailerInfo.totalRetailers,
                            newRetailer
                          ]
                        });
                        setCreateRetailerInfo({
                          name: '',
                          type: '',
                          category: ''
                        });
                      });
                    }}
                  >
                    Create Retailer
                  </Button>
                </Stack>
              </Box>
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
