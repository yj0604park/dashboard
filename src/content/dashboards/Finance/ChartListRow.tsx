import { Card, Box, Typography, Stack, Divider, useTheme } from '@mui/material';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import Chart from 'react-apexcharts';
import ChartItem from './ChartItem';
import type { ApexOptions } from 'apexcharts';
import TrendingDownTwoToneIcon from '@mui/icons-material/TrendingDownTwoTone';
import { GetAmountSnapshotQuery } from '../../../queries/AmountSnapshotQuery';
import { useQuery } from '@apollo/client';
import Loading from './Loading';

interface AmountSnpahost {
  id: number;
  currency: string;
  amount: number;
  summary: any;
  date: Date;
}

interface AmountSnapshotData {
  krwSnapshot: AmountSnpahost[];
  usdSnapshot: AmountSnpahost[];
}

function GetDateAndAmount(data: AmountSnpahost[]) {
  const date = [];
  const amount = [];
  data.forEach((snapshot) => {
    date.push(snapshot.date);
    amount.push(snapshot.amount);
  });
  return [date, amount];
}

function ChartListRow({ usdTotal, krwTotal }) {
  const { loading, error, data } = useQuery<AmountSnapshotData>(
    GetAmountSnapshotQuery
  );
  if (!loading) {
    const [usdChartLabel, usdChartData] = GetDateAndAmount(data.usdSnapshot);
    const [krwChartLabel, krwChartData] = GetDateAndAmount(data.krwSnapshot);

    return (
      <Card>
        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="stretch"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={0}
        >
          <ChartItem
            currency="USD"
            totalBalance={usdTotal}
            chartLabel={usdChartLabel}
            chartData={usdChartData}
          />
          <ChartItem
            currency="KRW"
            totalBalance={krwTotal}
            chartLabel={krwChartLabel}
            chartData={krwChartData}
          />
        </Stack>
      </Card>
    );
  } else {
    return <Loading />;
  }
}

export default ChartListRow;
