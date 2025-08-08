import { Card } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GetAccountNodeQuery } from 'src/queries/BankQuery';
import { GetAccountNodeQueryQuery } from 'src/__generated__/graphql';
import AccountTable from './AccountTable';

function AccountList({ bankFilterId }: { bankFilterId: string }) {
  const variables: any = { After: '' };
  if (bankFilterId != null) {
    variables.BankId = String(bankFilterId);
  }

  const { loading, error, data } = useQuery<GetAccountNodeQueryQuery>(
    GetAccountNodeQuery,
    { variables: { ...variables, IsActive: { exact: true } } }
  );

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <>
        <p style={{ color: 'red' }}>Error: {error.message}</p>
      </>
    );
  return (
    <>
      <Card>
        <AccountTable accountList={data.accountRelay} />
      </Card>
    </>
  );
}

export default AccountList;
