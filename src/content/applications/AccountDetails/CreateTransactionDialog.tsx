import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  Divider,
  Grid,
  MenuItem,
  TextField
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useMutation, useQuery } from '@apollo/client';
import { RetailerData } from 'src/models/bank';
import {
  CreateTransactionMutation,
  CreateTransactionWithoutRetailerMutation,
  GetRetailerListQuery
} from 'src/queries/BankQuery';
import { useState, SyntheticEvent, ChangeEvent } from 'react';
import { RetailerList } from 'src/models/internal';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface CreateAccountDialogProps {
  open: boolean;
  onModalClose: () => void;
  bankName: string;
  bankId: number;
  accountName: string;
  accountId: number;
}

interface TransactionCreationData {
  amount: number | string;
  date: string;
  accountId: number;
  isInternal: boolean;
  category: string;
  note: string;
  retailerId?: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function CreateAccountDialog({
  onModalClose,
  open,
  bankName,
  bankId,
  accountName,
  accountId
}: CreateAccountDialogProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [retailerInfo, setRetailerInfo] = useState<RetailerList>({
    firstAdded: false,
    loadMore: false,
    nextPage: '',
    totalRetailers: []
  });
  // form information
  const DefaultTransactionCreationData: TransactionCreationData = {
    amount: '',
    date: '',
    accountId: accountId,
    isInternal: false,
    category: 'ETC',
    note: ''
  };

  const [transactionCreationData, setTransactionCreationData] =
    useState<TransactionCreationData>(DefaultTransactionCreationData);

  if (transactionCreationData.accountId !== accountId) {
    setTransactionCreationData({
      ...transactionCreationData,
      accountId: accountId
    });
  }

  // graphql connection
  const { loading, error, data, fetchMore } =
    useQuery<RetailerData>(GetRetailerListQuery);
  const [
    useCreateTransaction,
    { data: mutataionData, loading: mutationLoading, error: mudataionError }
  ] = useMutation(CreateTransactionMutation);
  const [
    useCreateTransactionWithoutRetailer,
    {
      data: mutataionWithoutRetailerData,
      loading: mutationWithoutRetailerLoading,
      error: mudataionWithoutRetailerError
    }
  ] = useMutation(CreateTransactionWithoutRetailerMutation);

  const handleModalClose = () => {
    onModalClose();
  };

  if (!loading && !error) {
    if (!retailerInfo.firstAdded) {
      setRetailerInfo({
        firstAdded: true,
        loadMore: data.retailerRelay.pageInfo.hasNextPage,
        nextPage: data.retailerRelay.pageInfo.endCursor,
        totalRetailers: data.retailerRelay.edges.map((item) => {
          return {
            id: item.node.id,
            label: item.node.name,
            category: item.node.category
          };
        })
      });
    }
    if (retailerInfo.loadMore) {
      fetchMore({
        variables: {
          After: retailerInfo.nextPage
        }
      }).then((result) => {
        setRetailerInfo({
          ...retailerInfo,
          loadMore: result.data.retailerRelay.pageInfo.hasNextPage,
          nextPage: result.data.retailerRelay.pageInfo.endCursor,
          totalRetailers: [
            ...retailerInfo.totalRetailers,
            ...result.data.retailerRelay.edges.map((item) => {
              return {
                id: item.node.id,
                label: item.node.name,
                category: item.node.category
              };
            })
          ]
        });
      });
    } else {
      if (transactionCreationData.date === '') {
        setTransactionCreationData({
          ...transactionCreationData,
          date: data.transactionRelay.edges[0].node.date.toString()
        });
      }
    }
  }

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setSelectedTabIndex(newValue);

    if (newValue === 1) {
      setTransactionCreationData({
        ...transactionCreationData,
        category: 'TRANSFER',
        retailerId: undefined,
        isInternal: true
      });
    } else {
      setTransactionCreationData({
        ...transactionCreationData,
        isInternal: false
      });
    }
  };

  // reset fields
  function resetFields() {
    setTransactionCreationData({
      ...transactionCreationData,
      amount: '',
      note: ''
    });
  }

  // Callback function for retailer change.
  // Sets the retailer type.
  function onRetailerChange(e: ChangeEvent<HTMLInputElement>, value: any) {
    if (!value) {
      setTransactionCreationData({
        ...transactionCreationData,
        category: 'ETC',
        retailerId: undefined
      });
    } else {
      setTransactionCreationData({
        ...transactionCreationData,
        category: value.category,
        retailerId: value.id
      });
    }
  }

  const submitRequest = (value) => {
    // submit mutation request with graphql
    if (transactionCreationData.retailerId === undefined) {
      useCreateTransactionWithoutRetailer({
        variables: transactionCreationData
      });
    } else {
      useCreateTransaction({
        variables: transactionCreationData
      });
    }
    resetFields();
  };
  if (retailerInfo.loadMore) {
    return <h1>Loading</h1>;
  }
  return (
    <Dialog onClose={handleModalClose} open={open}>
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

                <TextField
                  required
                  id="category"
                  label="Category"
                  value={transactionCreationData.category}
                />

                <TextField
                  id="note"
                  label="Note"
                  value={transactionCreationData.note}
                  onChange={(e) => {
                    setTransactionCreationData({
                      ...transactionCreationData,
                      note: e.target.value
                    });
                  }}
                />

                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  value={transactionCreationData.date}
                  onChange={(e) => {
                    setTransactionCreationData({
                      ...transactionCreationData,
                      date: e.target.value
                    });
                  }}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  id="amount"
                  label="Amount"
                  type="number"
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    inputProps: { step: '0.01' }
                  }}
                  value={transactionCreationData.amount}
                  onChange={(e) => {
                    setTransactionCreationData({
                      ...transactionCreationData,
                      amount: Number(e.target.value)
                    });
                  }}
                />
              </Box>

              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' }
                }}
                noValidate
              >
                <Tabs
                  variant="scrollable"
                  scrollButtons="auto"
                  textColor="primary"
                  indicatorColor="primary"
                  value={selectedTabIndex}
                  onChange={handleTabChange}
                  aria-label="Form Tabs"
                >
                  <Tab label="External" {...a11yProps(0)} />
                  <Tab label="Internal" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={selectedTabIndex} index={0}>
                  <div>
                    <Autocomplete
                      id="retailer"
                      loading={loading}
                      options={retailerInfo.totalRetailers}
                      renderInput={(params) => (
                        <TextField {...params} label="Retailer" />
                      )}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      onChange={onRetailerChange}
                    />
                  </div>
                </TabPanel>
                <TabPanel value={selectedTabIndex} index={1}>
                  <div>
                    <TextField required id="account" label="Account" />
                  </div>
                </TabPanel>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={submitRequest}>
                Submit
              </Button>
              <Button size="small" onClick={onModalClose}>
                Close
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default CreateAccountDialog;
