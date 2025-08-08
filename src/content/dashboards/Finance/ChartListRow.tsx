import { Card, Stack, Divider } from '@mui/material';
import ChartItem from './ChartItem';
import Loading from './Loading';
import {
  useGetAmountSnapshotQueryQuery,
  GetAmountSnapshotQueryQuery
} from 'src/__generated__/graphql';

function GetDateAndAmount(
  amountSnapshotList: GetAmountSnapshotQueryQuery['krwSnapshot']
) {
  const date = [];
  const amount = [];

  amountSnapshotList.edges.forEach((snapshot) => {
    date.push(snapshot.node.date);
    amount.push(snapshot.node.amount);
  });
  return [date, amount];
}

function ChartListRow({ usdTotal, krwTotal }) {
  const { loading, error, data } = useGetAmountSnapshotQueryQuery({
    variables: { startDate: '2023-01-01' }
  });
  if (!loading && !error) {
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
