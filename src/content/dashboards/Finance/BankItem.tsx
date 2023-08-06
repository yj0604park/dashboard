import { Box, Typography } from '@mui/material';
import Label from 'src/components/Label';
import NumberHelper from '../.../../../../functions/NumberHelper';

function BankItem({ bankName, balance, latestUpdated }) {
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
              {bankName}
            </Typography>
          </Box>
        </Box>
        <Label color="secondary">
          {Math.floor(
            (new Date().getTime() - latestUpdated.getTime()) /
              (1000 * 3600 * 24)
          )}
          d
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
          {NumberHelper.FormatString(balance['USD'], 'USD')}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            pr: 1
          }}
          align="right"
          noWrap
        >
          {NumberHelper.FormatString(balance['KRW'], 'KRW')}
        </Typography>
      </Box>
    </Box>
  );
}

export default BankItem;
