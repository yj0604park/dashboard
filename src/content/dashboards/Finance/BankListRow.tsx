import { Card, Stack, Divider } from '@mui/material';
import BankItem from './BankItem';
import Util from 'src/functions/ArrayHelper';

function GetBankItem(bank: any) {
  let latestUpdated = new Date('2000-01-01');
  bank['accountSet'].forEach((account) => {
    const accountDate = new Date(account['lastUpdate']);
    latestUpdated = latestUpdated < accountDate ? accountDate : latestUpdated;
  });

  return (
    <BankItem
      bankName={bank['name']}
      balance={bank['balance']}
      latestUpdated={latestUpdated}
      key={bank['id']}
    />
  );
}

function GetBankStack(bankList: any[], idx: number) {
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

function BankListRow({ bankList }) {
  const banks = bankList['banks'];
  const chunkedBanks = Util.chunk(banks, 4);

  return (
    <Card>
      {chunkedBanks.map((bankList, idx) => GetBankStack(bankList, idx))}
    </Card>
  );
}

export default BankListRow;
