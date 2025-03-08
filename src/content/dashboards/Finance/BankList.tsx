import { MouseEvent, useState } from 'react';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import ViewWeekTwoToneIcon from '@mui/icons-material/ViewWeekTwoTone';
import BankListRow from './BankListRow';
import Loading from './Loading';
import { BankData } from 'src/types/bank';

interface BankListProps {
  loading: boolean;
  bankList: BankData;
}

function BankList({ loading, bankList }: BankListProps) {
  const [tabs, setTab] = useState<string | null>('watch_list_columns');

  const handleViewOrientation = (
    _event: MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    setTab(newValue);
  };

  if (!loading) {
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
          <Typography variant="h3">Bank List</Typography>
          <ToggleButtonGroup
            value={tabs}
            exclusive
            onChange={handleViewOrientation}
          >
            <ToggleButton disableRipple value="watch_list_columns">
              <ViewWeekTwoToneIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <BankListRow bankList={bankList.bankRelay} />
      </>
    );
  } else {
    return <Loading />;
  }
}

export default BankList;
