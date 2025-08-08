import { Card, Stack, Divider } from '@mui/material';
import BankItem from './BankItem';
import Util from 'src/functions/ArrayHelper';
import { GetBankNodeQueryQuery } from 'src/__generated__/graphql';

function GetBankItem(bank: GetBankNodeQueryQuery['bankRelay']['edges'][number]) {
  let latestUpdated = new Date('2000-01-01');
  bank.node.accountSet.edges.forEach((account) => {
    const accountDate = new Date(account.node.lastUpdate);
    latestUpdated = latestUpdated < accountDate ? accountDate : latestUpdated;
  });
  return (
    <BankItem
      bankName={bank.node.name}
      bankId={bank.node.id}
      balance={bank.node.balance}
      latestUpdated={latestUpdated}
      key={bank.node.id}
      accountCount={bank.node.accountSet.totalCount}
    />
  );
}

function GetBankStack(
  bankList: GetBankNodeQueryQuery['bankRelay']['edges'],
  idx: number
) {
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      alignItems="stretch"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={0}
      key={idx}
    >
      {bankList.map((bank) => GetBankItem(bank))}
    </Stack>
  );
}

interface BankListRowProps {
  bankList: GetBankNodeQueryQuery['bankRelay'];
}

function BankListRow({ bankList }: BankListRowProps) {
  const banks = bankList.edges;
  const chunkedBanks = Util.chunk(banks, 4);

  return (
    <Card>
      {chunkedBanks.map((bankList, idx) => GetBankStack(bankList, idx))}
    </Card>
  );
}

export default BankListRow;
