import {
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { AccountState } from 'src/types/internal';
import { UserContext } from 'src/contexts/UserContext';
import { useContext, useState } from 'react';
import { useGetAccountDetailQueryQuery, useGetSimpleAccountListQueryQuery } from 'src/__generated__/graphql';

import UpdateIcon from '@mui/icons-material/Update';
import { ServerContext } from 'src/contexts/ServerContext';
import CreateMultipleTransactionDialog from './Dialog/CreateMultipleTransactionDialog';
import CreateMultipleStockTransactionDialog from './Dialog/CreateMultipleStockTransactionDialog';

interface HeaderProps {
  accountState: AccountState;
  setAccountState: (accountState: AccountState) => void;
  refetch: any;
}

function PageHeader({ accountState, setAccountState, refetch }: HeaderProps) {
  const [openStock, setStockOpen] = useState(false);
  const [openMultiple, setOpenMultiple] = useState(false);
  const { userName } = useContext(UserContext);
  const { serverUrl } = useContext(ServerContext);
  const {
    loading: loadingAccount,
    error: errorAccount,
    data: dataAccount,
    refetch: refetchAccount
  } = useGetAccountDetailQueryQuery();

  function handleAccountChange(event: any) {
    let [accountId, accountName] = event.target.value.split(',');
    refetchAccount({ AccountID: accountId }).then(({ data }) => {
      let accountDetail = data.accountRelay.edges[0].node;
      let newAccountState = {
        accountId: accountId,
        accountName: accountName,
        bankId: accountState.bankId,
        bankName: accountState.bankName,
        accountType: accountDetail.type,
        accountCurrency: accountDetail.currency
      };
      setAccountState(newAccountState);
      refetch({ AccountID: accountId });
    });
  }
  const handleCloseStock = () => {
    setStockOpen(false);
  };

  const handleCloseMultiple = () => {
    setOpenMultiple(false);
  };

  const handleClickOpen = () => {
    setStockOpen(true);
  };

  const handleClickOpenMultiple = () => {
    setOpenMultiple(true);
  };

  const { loading, error, data } = useGetSimpleAccountListQueryQuery({
    variables: { BankId: String(accountState?.bankId ?? '') }
  });

  if (loading) return <p>Loading...</p>;

  function updateAccountInfo(accountId: string) {
    return () => {
      let endpoint = serverUrl + 'update_balance/' + accountId;
      fetch(endpoint, {
        method: 'GET'
      }).then(() => {
        refetch({ AccountID: accountId });
      });
    };
  }

  return (
    <Grid container>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Transactions{' '}
            {accountState?.accountName ? 'at ' + accountState.accountName : ''}
          </Typography>
          <Typography variant="subtitle2">
            {userName}, these are your recent transactions
          </Typography>
        </Grid>
        {accountState?.accountType === 'STOCK' && (
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={handleClickOpen}
            >
              Create stock transaction
            </Button>
            <CreateMultipleStockTransactionDialog
              open={openStock}
              onModalClose={handleCloseStock}
              bankId={accountState?.bankId}
              bankName={accountState?.bankName}
              accountId={accountState?.accountId}
              accountName={accountState?.accountName}
              accountCurrency={accountState?.accountCurrency}
              refresh={(event: any) => { }}
            />
          </Grid>
        )}
        <Grid item>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={handleClickOpenMultiple}
            >
              Create multiple transactions
            </Button>
          </Stack>
          <CreateMultipleTransactionDialog
            open={openMultiple}
            onModalClose={handleCloseMultiple}
            bankId={accountState?.bankId}
            bankName={accountState?.bankName}
            accountId={accountState?.accountId}
            accountName={accountState?.accountName}
            refresh={updateAccountInfo(accountState.accountId)}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Select Account
            </Typography>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Account</InputLabel>
              {!loading && !error && (
                <Select
                  value={
                    accountState?.accountId + ',' + accountState?.accountName
                  }
                  onChange={handleAccountChange}
                  defaultValue={
                    accountState?.accountId + ',' + accountState?.accountName
                  }
                  label="Account"
                  autoWidth
                >
                  {data.accountRelay.edges.map((account) => {
                    return (
                      <MenuItem
                        key={account.node.id}
                        value={account.node.id + ',' + account.node.name}
                      >
                        {account.node.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </FormControl>
          </Grid>

          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<UpdateIcon fontSize="small" />}
              onClick={updateAccountInfo(accountState.accountId)}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
