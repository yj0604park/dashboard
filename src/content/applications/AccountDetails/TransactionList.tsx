import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { TransactionData } from 'src/models/bank';
import { ApolloError } from '@apollo/client';

interface TransactionListProps {
  loading: boolean;
  error: ApolloError;
  data: TransactionData;
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
