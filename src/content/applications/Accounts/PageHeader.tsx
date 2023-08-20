import { Typography, Button, Grid } from '@mui/material';
import { useContext, useState } from 'react';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { UserContext } from 'src/contexts/UserContext';
import CreateAccountDialog from './CreateAccount';

function PageHeader({ bankName }) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('A');
  const { userName } = useContext(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Accounts
        </Typography>
        <Typography variant="subtitle2">
          {userName}, these are your Accounts {bankName ? 'at ' + bankName : ''}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Create account
        </Button>
        <CreateAccountDialog
          selectedValue={selectedValue}
          open={open}
          onModalClose={handleClose}
        />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
