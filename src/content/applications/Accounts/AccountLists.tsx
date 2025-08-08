import { Card } from '@mui/material';
import { GetAccountNodeQuery } from 'src/queries/BankQuery';
import { useQuery } from '@apollo/client';
import { AccountData } from 'src/types/bank';
import AccountTable from './AccountTable';

function AccountList({ bankFilterId }) {
  const variables: any = { After: '' };
  if (bankFilterId != null) {
    variables.BankId = String(bankFilterId);
  }

  const { loading, error, data } = useQuery<AccountData>(GetAccountNodeQuery, {
    variables
  });

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
