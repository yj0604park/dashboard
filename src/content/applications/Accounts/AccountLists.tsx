import { Card } from '@mui/material';
import { GetAccountNodeQuery } from 'src/queries/BankQuery';
import { useQuery } from '@apollo/client';
import { AccountData } from 'src/types/bank';
import AccountTable from './AccountTable';

function AccountList({ bankFilterId }) {
  const { loading, error, data } = useQuery<AccountData>(GetAccountNodeQuery, {
    variables: {
      After: '',
      BankId: {
        exact: bankFilterId
      }
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <>
        <h1>Error: {error}</h1>
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
