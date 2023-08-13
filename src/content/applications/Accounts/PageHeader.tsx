import { Typography, Button, Grid } from '@mui/material';
import { useContext } from 'react';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { UserContext } from 'src/contexts/UserContext';

function PageHeader() {
  const { userName } = useContext(UserContext);

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Accounts
        </Typography>
        <Typography variant="subtitle2">
          {userName}, these are your Accounts
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Create account
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
