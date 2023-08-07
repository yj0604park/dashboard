import { MouseEvent, useState } from 'react';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import TodayIcon from '@mui/icons-material/Today';
import ChartListRow from './ChartListRow';

function ChartList({ usdTotal, krwTotal }) {
  const [tabs, setTab] = useState<string | null>('watch_list_columns');

  const handleViewOrientation = (
    _event: MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    setTab(newValue);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <Typography variant="h3">Chart List</Typography>
        <ToggleButtonGroup
          value={tabs}
          exclusive
          onChange={handleViewOrientation}
        >
          <ToggleButton disableRipple value="watch_list_columns">
            <TimelineIcon />
          </ToggleButton>
          <ToggleButton disableRipple value="watch_list_rows">
            <TodayIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <ChartListRow usdTotal={usdTotal} krwTotal={krwTotal} />
    </>
  );
}

export default ChartList;
