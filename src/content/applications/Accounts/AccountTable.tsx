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
  Select
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { AccountEdge } from 'src/models/bank';
import { useQuery } from '@apollo/client';
import { GetAccountTypeQuery } from 'src/queries/BankQuery';

interface RecentOrdersTableProps {
  className?: string;
  accountList: AccountEdge;
}

const getStatusLabel = (accountStatus: boolean): JSX.Element => {
  const map = {
    false: {
      text: 'In active',
      color: 'error'
    },
    true: {
      text: 'Active',
      color: 'success'
    }
  };

  const { text, color }: any = map[accountStatus.toString()];

  return <Label color={color}>{text}</Label>;
};

const AccountTable: FC<RecentOrdersTableProps> = ({
  accountList: accountList
}) => {
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

  const theme = useTheme();

  if (loading) return <p>Loading...</p>;
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
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
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
          </Box>
        }
        title="Recent Orders"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              <TableCell>Account Name</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Bank</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell align="right">Amount</TableCell>
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
                      {account.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
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
                      {account.currency}
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
    </Card>
  );
};

export default AccountTable;
