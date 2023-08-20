import {
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { AccountState } from 'src/models/internal';
import { UserContext } from 'src/contexts/UserContext';
import { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { AccountData } from 'src/models/bank';
import { GetSimpleAccountListQuery } from 'src/queries/BankQuery';
import CreateTransactionDialog from './CreateTransactionDialog';

interface HeaderProps {
  accountState: AccountState;
  setAccountState: (accountState: AccountState) => void;
}

function PageHeader({ accountState, setAccountState }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const { userName } = useContext(UserContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const { loading, error, data } = useQuery<AccountData>(
    GetSimpleAccountListQuery,
    {
      variables: {
        BankId: accountState?.bankId
      }
    }
  );

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
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={handleClickOpen}
          >
            Create transaction
          </Button>
          <CreateTransactionDialog
            open={open}
            onModalClose={handleClose}
            bankId={accountState?.bankId}
            bankName={accountState?.bankName}
            accountId={accountState?.accountId}
            accountName={accountState?.accountName}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Select Account
          </Typography>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Account Type</InputLabel>
            {!loading && !error && !accountState && (
              <Select
                // value={filters.status || 'all'}
                // onChange={handleStatusChange}
                defaultValue={accountState?.accountId}
                label="Account Type"
                autoWidth
              >
                {data.accountRelay.edges.map((account) => (
                  <MenuItem key={account.node.id} value={account.node.id}>
                    {account.node.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
