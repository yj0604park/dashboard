import {
  Autocomplete,
  Avatar,
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
  Select,
  TextField,
  Typography
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { gql, useQuery } from '@apollo/client';
import { Retailer, RetailerData } from 'src/models/bank';
import { GetRetailerListQuery } from 'src/queries/BankQuery';
import { useState, SyntheticEvent, ChangeEvent } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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
      {value === index && { children }}
    </div>
  );
}
interface CreateAccountDialogProps {
  open: boolean;
  onModalClose: () => void;
  bankName: string;
  bankId: number;
  accountName: string;
  accountId: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// Callback function for retailer change.
// Sets the retailer type.
function onRetailerChange(e: ChangeEvent<HTMLInputElement>) {
  console.log(e.target);
}

function CreateAccountDialog({
  onModalClose,
  open,
  bankName,
  bankId,
  accountName,
  accountId
}: CreateAccountDialogProps) {
  const [value, setValue] = useState(0);
  const { loading, error, data } = useQuery<RetailerData>(GetRetailerListQuery);

  const handleClose = () => {
    onModalClose();
  };

  const submitRequest = (value) => {
    onModalClose();
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let retailer_list: Retailer[] = [];
  if (!loading && !error) {
    retailer_list = data.retailerRelay.edges.map((item) => {
      return item.node;
    });
  }

  return (
    <Dialog onClose={handleClose} open={open}>
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

              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' }
                }}
                noValidate
                autoComplete="off"
              >
                <Tabs
                  variant="scrollable"
                  scrollButtons="auto"
                  textColor="primary"
                  indicatorColor="primary"
                  value={value}
                  onChange={handleChange}
                  aria-label="Form Tabs"
                >
                  <Tab label="External" {...a11yProps(0)} />
                  <Tab label="Internal" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <div>
                    {/* <Autocomplete
                      id="retailer"
                      loading={loading}
                      options={retailer_list}
                      renderInput={(params) => {
                        console.log(params);
                        return <TextField {...params} label="Retailer" />;
                      }}
                      onChange={onRetailerChange}
                    /> */}
                    <TextField required id="type" label="Type" />
                    <TextField required id="name" label="Name" />
                    <TextField
                      id="outlined-read-only-input"
                      label="Currency"
                      defaultValue="USD"
                    />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <div>
                    {/* <Autocomplete
                      id="bank"
                      loading={loading}
                      options={retailer_list}
                      renderInput={(params) => (
                        <TextField {...params} label="Bank" />
                      )}
                    /> */}
                    <TextField required id="account" label="Account" />
                    <TextField required id="name" label="Name" />
                    <TextField
                      required
                      id="type"
                      label="Type"
                      value="Transfer"
                      disabled
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Currency"
                      defaultValue="USD"
                    />
                  </div>
                </TabPanel>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small" onClick={onModalClose}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default CreateAccountDialog;
