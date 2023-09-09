import { Box, Typography } from '@mui/material';
import Label from 'src/components/Label';
import NumberHelper from 'src/functions/NumberHelper';
import { Link } from 'react-router-dom';

interface BankItemProps {
  bankName: string;
  bankId: number;
  balance: any;
  latestUpdated: Date;
  accountCount: number;
}

function BankItem({
  bankName,
  bankId,
  balance,
  latestUpdated,
  accountCount
}: BankItemProps) {
  let dateDiff = new Date().getTime() - latestUpdated.getTime();
  return (
    <Box
      sx={{
        width: '100%',
        p: 3
      }}
    >
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Box>
            <Typography variant="h3" noWrap>
              <Link
                to="/management/accounts"
                state={{ bankId: bankId, bankName: bankName }}
              >
                {bankName}
              </Link>
            </Typography>
          </Box>
        </Box>
        <Label
          color={dateDiff > 1000 * 60 * 60 * 24 * 15 ? 'secondary' : 'success'}
        >
          {Math.floor(dateDiff / (1000 * 3600 * 24))}d
        </Label>
      </Box>
      <Box mt={3} alignItems="center" justifyContent="space-between">
        <Typography
          variant="h4"
          sx={{
            pr: 1
          }}
          align="right"
          noWrap
        >
          계좌수: {accountCount}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            pr: 1
          }}
          align="right"
          noWrap
        >
          {NumberHelper.FormatString(balance.USD, 'USD')}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            pr: 1
          }}
          align="right"
          noWrap
        >
          {NumberHelper.FormatString(balance.KRW, 'KRW')}
        </Typography>
      </Box>
    </Box>
  );
}

export default BankItem;
