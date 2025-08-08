import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { GetTransactionListQueryQuery } from 'src/__generated__/graphql';

interface TransactionListProps {
  loading: boolean;
  error: any;
  data: GetTransactionListQueryQuery;
}

function TransactionList({ loading, error, data }: TransactionListProps) {
  return (
    <Card>
      {!loading && !error && data && (
        <RecentOrdersTable transactionData={data} />
      )}
    </Card>
  );
}

export default TransactionList;
