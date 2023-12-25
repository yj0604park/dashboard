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
import createStockTransaction from 'src/hook/createStockTransaction';
import { useState } from 'react';
import createStock from 'src/hook/createStock';
import { Stock } from 'src/models/bank';
import StockTransactionInputRow from './StockTransactionInputRow';
import getStockListInfo from 'src/hook/getStockListInfo';

interface CreateMultipleStockTransactionDialogProps {
  open: boolean;
  onModalClose: () => void;
  bankName: string;
  bankId: number;
  accountName: string;
  accountId: number;
  accountCurrency: string;
  refresh: (event: any) => void;
}

const CreateMultipleStockTransactionDialog = ({
  open,
  onModalClose,
  bankName,
  bankId,
  accountName,
  accountId,
  accountCurrency,
  refresh
}: CreateMultipleStockTransactionDialogProps) => {
  const [CreateStockInput, setCreateStockInput] = useState<Stock>({
    name: '',
    ticker: '',
    currency: accountCurrency
  });

  // Stock list
  const [stockList, setStockList] = useState<Stock[]>([]);

  const { stockListInfo, setStockListInfo, stockLoading } = getStockListInfo();

  console.log(stockListInfo);

  const resetTransactionCreationDataList = () => {
    setStockTransactionDataList([]);
  };

  const handleModalClose = () => {
    resetTransactionCreationDataList();
    onModalClose();
  };

  const {
    stockTransactionDataList,
    setStockTransactionDataList,
    setStockTransactionData,
    addNewRow
  } = createStockTransaction({ accountId });

  const { createStockMutation, stockData, getStockLoading } = createStock();

  if (getStockLoading) {
    return <div>Loading...</div>;
  }

  if (stockList.length === 0 && stockData) {
    let newStockList: Stock[] = [];
    for (let i = 0; i < stockData?.stockRelay.edges.length; i++) {
      let newStock: Stock = stockData?.stockRelay.edges[i].node;
      newStockList.push(newStock);
    }
    setStockList(newStockList);
  }

  const handleSubmit = () => {
    // submitRequest();
    // if (!mutationLoading && !mutationError) {
    //   handleSnackbar();
    // }
    // resetTransactionCreationDataList();
    // refresh(null);
    // refetchTransaction();
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
                    <TableCell>Date</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stockTransactionDataList.map((row) => (
                    <StockTransactionInputRow
                      key={row.id}
                      stockTransactionCreationData={row}
                      setStockTransactionCreationData={setStockTransactionData(
                        row.id
                      )}
                    />
                    // <TransactionRow
                    //   key={row.id}
                    //   id={row.id}
                    //   transactionCreationData={row}
                    //   setTransactionCreationData={setTransactionCreationData(
                    //     row.id
                    //   )}
                    //   loading={retailerLoading}
                    //   retailerInfo={retailerInfo}
                    //   onRetailerChange={onRetailerChange(row.id)}
                    //   onIsInternalChange={onIsInternalChange(row.id)}
                    // />
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
                    id="stockName"
                    label="Stock"
                    value={CreateStockInput.name}
                    onChange={(event) => {
                      setCreateStockInput({
                        ...CreateStockInput,
                        name: event.target.value
                      });
                    }}
                  />
                  <TextField
                    id="stockTicker"
                    label="Ticker"
                    value={CreateStockInput.ticker}
                    onChange={(event) => {
                      setCreateStockInput({
                        ...CreateStockInput,
                        ticker: event.target.value
                      });
                    }}
                  />
                  <Button
                    variant="text"
                    size="medium"
                    onClick={() => {
                      createStockMutation({
                        variables: {
                          input: CreateStockInput
                        }
                      }).then((response) => {
                        let newStock: Stock = {
                          id: response.data?.createStock.id,
                          name: response.data?.createStock.name,
                          ticker: response.data?.createStock.ticker
                        };

                        setStockList([...stockList, newStock]);
                      });
                    }}
                  >
                    Add Stock
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

      {/* <Snackbar
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
      </Snackbar> */}
    </Dialog>
  );
};

export default CreateMultipleStockTransactionDialog;
