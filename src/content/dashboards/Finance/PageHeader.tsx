import { Typography, Avatar, Grid } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from 'src/contexts/UserContext';

function PageHeader() {
  const { userName } = useContext(UserContext);

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {userName}!
        </Typography>
        <Typography variant="subtitle2">
          Today is a good day to earn money!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
