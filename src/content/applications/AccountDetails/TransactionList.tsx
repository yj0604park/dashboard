import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { useQuery } from '@apollo/client';
import { TransactionData } from 'src/models/bank';
import { GetTransactionListQuery } from 'src/queries/BankQuery';
import { AccountState } from 'src/models/internal';

function TransactionList({ accountId }: AccountState) {
  const { loading, error, data } = useQuery<TransactionData>(
    GetTransactionListQuery,
    { variables: { AccountID: accountId } }
  );

  return (
    <Card>
      {!loading && !error && data && (
        <RecentOrdersTable transactionData={data} />
      )}
    </Card>
  );
}

export default TransactionList;
