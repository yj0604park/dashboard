import { ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { GetTransactionListQueryQuery } from 'src/__generated__/graphql';
import { TransactionFilter } from 'src/types/internal';
import { TransactionCategory } from 'src/__generated__/graphql';
import Util from 'src/functions/NumberHelper';
import Label from 'src/components/Label';

interface RecentOrdersTableProps {
  transactionData: GetTransactionListQueryQuery;
}

interface Filters {
  status?: TransactionFilter;
}

const getReviewLabel = (reviewed: boolean): JSX.Element => {
  const status_map = {
    true: {
      text: 'Reviewed',
      color: 'secondary'
    },
    false: {
      text: 'Required',
      color: 'error'
    }
  };

  const { text, color }: any = status_map[reviewed.toString()];

  return <Label color={color}>{text}</Label>;
};
const getInternalLabel = (isInternal: boolean): JSX.Element => {
  const status_map = {
    false: {
      text: 'External',
      color: 'secondary'
    },
    true: {
      text: 'Internal',
      color: 'success'
    }
  };

  const { text, color }: any = status_map[isInternal.toString()];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  transactions: GetTransactionListQueryQuery['transactionRelay'],
  filters: Filters
): GetTransactionListQueryQuery['transactionRelay']['edges'] => {
  return transactions.edges.filter((transaction) => {
    let matches = true;

    if (filters.status === 'all') {
      return true;
    }

    if (filters.status) {
      const isInternal = transaction.node.type === TransactionCategory.Transfer;
      const isExternal = !isInternal;
      if (filters.status === 'internal' && !isInternal) matches = false;
      if (filters.status === 'external' && !isExternal) matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  transactionList: GetTransactionListQueryQuery['transactionRelay']['edges'],
  page: number,
  limit: number
): GetTransactionListQueryQuery['transactionRelay']['edges'] => {
  return transactionList.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable = ({ transactionData }: RecentOrdersTableProps) => {
  const [selectedTransactions, setSelectedTransactions] = useState<any[]>(
    []
  );
  const selectedBulkActions = selectedTransactions.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(25);
  const [filters, setFilters] = useState<Filters>({
    status: 'all'
  });

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedTransactions(
      event.target.checked
        ? transactionData.transactionRelay.edges.map((transaction) => transaction.node.id)
        : []
    );
  };

  const handleSelectOneTransaction = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedTransactions.includes(cryptoOrderId)) {
      setSelectedTransactions((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedTransactions((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(
    transactionData.transactionRelay,
    filters
  );
  const paginatedTransactions = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedTransactions.length > 0 &&
    selectedTransactions.length < transactionData.transactionRelay.edges.length;
  const selectedAllCryptoOrders =
    selectedTransactions.length ===
    transactionData.transactionRelay.edges.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              {/* <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
            </Box>
          }
          title="Transactions"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              <TableCell>Details</TableCell>
              <TableCell>TID</TableCell>
              <TableCell>Retailer</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="right">Note</TableCell>
              <TableCell align="right">Internal</TableCell>
              <TableCell align="right">Reviewed</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.map((transactionNode) => {
              const isTransactionSelected = selectedTransactions.includes(
                transactionNode.node.id
              );
              return (
                <TableRow
                  hover
                  key={transactionNode.node.id}
                  selected={isTransactionSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isTransactionSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneTransaction(
                          event,
                          transactionNode.node.id
                        )
                      }
                      value={isTransactionSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {transactionNode.node.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {transactionNode.node.date}
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
                      {transactionNode.node.id}
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
                      {transactionNode.node.retailer?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {transactionNode.node.retailer?.id}
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
                      {Util.FormatString(
                        transactionNode.node.amount,
                        transactionData.accountRelay.edges[0].node.currency
                      )}
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
                      {Util.FormatString(
                        transactionNode.node.balance,
                        transactionData.accountRelay.edges[0].node.currency
                      )}
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
                      {transactionNode.node.note}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getInternalLabel(transactionNode.node.isInternal)}
                  </TableCell>
                  <TableCell align="right">
                    {getReviewLabel(transactionNode.node.reviewed)}
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
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: []
};

export default RecentOrdersTable;
