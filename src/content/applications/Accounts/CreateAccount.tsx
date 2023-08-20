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
  TextField
} from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import { BankData } from 'src/models/bank';
import { GetBankSimpleListQuery } from 'src/queries/BankQuery';

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`;

function CreateAccountDialog(props) {
  const { loading, error, data } = useQuery<BankData>(GetBankSimpleListQuery);
  const { onModalClose, selectedValue, open } = props;

  const handleClose = () => {
    onModalClose(selectedValue);
  };

  const submitRequest = (value) => {
    onModalClose(value);
  };

  let bank_list = [];
  if (!loading && !error) {
    bank_list = data.bankRelay.edges.map((item) => {
      return { id: item.node.id, label: item.node.name };
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
                <div>
                  <Autocomplete
                    id="bank"
                    loading={loading}
                    options={bank_list}
                    renderInput={(params) => (
                      <TextField {...params} label="Bank" />
                    )}
                  />

                  <TextField required id="name" label="Name" />
                  <TextField required id="type" label="Type" />
                  <TextField
                    id="outlined-read-only-input"
                    label="Currency"
                    defaultValue="USD"
                  />
                </div>
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
