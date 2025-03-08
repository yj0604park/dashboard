import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import {
  Tooltip,
  Divider,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
  Grid
} from '@mui/material';
import { Link } from 'react-router-dom';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { AccountEdge, AccountNode } from 'src/types/bank';
import { useQuery } from '@apollo/client';
import { GetAccountTypeQuery } from 'src/queries/BankQuery';

interface RecentOrdersTableProps {
  className?: string;
  accountList: AccountEdge;
}

const getStatusLabel = (accountStatus: boolean): JSX.Element => {
  const status_map = {
    false: {
      text: 'Inactive',
      color: 'error'
    },
    true: {
      text: 'Active',
      color: 'success'
    }
  };

  const { text, color }: any = status_map[accountStatus.toString()];

  return <Label color={color}>{text}</Label>;
};

const applyPagination = (
  accounts: AccountEdge,
  page: number,
  limit: number
): AccountNode[] => {
  return accounts.edges.slice(page * limit, page * limit + limit);
};

const AccountTable = ({ accountList: accountList }: RecentOrdersTableProps) => {
  const [page, setPage] = useState<number>(0);

  const [filters, setFilters] = useState({
    status: null
  });

  const { loading, error, data } = useQuery(GetAccountTypeQuery);

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handlePageChange = (event: any, newPage: number): void => {};

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {};

  const theme = useTheme();

  if (loading) return <p>Loading...</p>;

  // get status options from graphql
  const statusOptions = data['__type'].enumValues.map((enumValue) => {
    return {
      id: enumValue.name,
      name: enumValue.name
    };
  });
  statusOptions.push({ id: 'all', name: 'All' });

  return (
    <Card>
      <CardHeader
        action={
          <Grid container direction={'row'} spacing={2} width={300}>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Account Type</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Account Type"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Bank</InputLabel>
                <Select label="Bank" value={0} autoWidth>
                  <MenuItem key={0} value={0}>
                    TODO: BankList
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        }
        title="Account List"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Bank</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>First Transaction</TableCell>
              <TableCell>Last Transaction</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accountList.edges.map((accountNode) => {
              let account = accountNode.node;
              return (
                <TableRow hover key={account.id}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      <Link
                        to="/management/accountDetails"
                        state={{
                          accountId: account.id,
                          accountName: account.name,
                          accountType: account.type,
                          bankId: account.bank.id,
                          bankName: account.bank.name,
                          accountCurrecny: account.currency
                        }}
                      >
                        {account.name}
                      </Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(new Date(account.lastUpdate), 'yyyy-MM-dd HH:mm')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.bank.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.firstTransaction}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.lastTransaction}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.currency == 'KRW'
                        ? account.amount.toLocaleString('ko-KR', {
                            style: 'currency',
                            currency: 'KRW'
                          })
                        : numeral(account.amount).format(`${'$'}0,0.00`)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {getStatusLabel(account.isActive)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={accountList.edges.length}
          page={page}
          rowsPerPage={25}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
        />
      </Box>
    </Card>
  );
};

export default AccountTable;
