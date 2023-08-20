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
import {
  TransactionData,
  TransactionEdge,
  TransactionNode
} from 'src/models/bank';
import { TransactionFilter } from 'src/models/internal';

interface RecentOrdersTableProps {
  transactionData: TransactionData;
}

interface Filters {
  status?: TransactionFilter;
}

const applyFilters = (
  transactions: TransactionEdge,
  filters: Filters
): TransactionNode[] => {
  return transactions.edges.filter((transaction) => {
    let matches = true;

    if (filters.status === 'all') {
      return true;
    }

    if (filters.status && transaction.node.type !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  transactionList: TransactionNode[],
  page: number,
  limit: number
): TransactionNode[] => {
  return transactionList.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable = ({ transactionData }: RecentOrdersTableProps) => {
  const [selectedTransactions, setSelectedTransactions] = useState<number[]>(
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
        ? transactionData.transactionRelay.edges.map(
            (transaction) => transaction.node.id
          )
        : []
    );
  };

  const handleSelectOneTransaction = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: number
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
              <TableCell align="right">IsInternal</TableCell>
              <TableCell align="right">Details</TableCell>
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
                      {transactionNode.node.amount}
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
                      {transactionNode.node.balance}
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
                    {transactionNode.node.isInternal ? 'true' : 'false'}
                  </TableCell>
                  <TableCell align="right">
                    {transactionNode.node.requiresDetail ? 'true' : 'false'}
                  </TableCell>
                  <TableCell align="right">
                    {transactionNode.node.reviewed ? 'true' : 'false'}
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
