import { Button, Card, Typography, styled } from '@mui/material';

const EmptyResultsWrapper = styled('img')(
  ({ theme }) => `
      max-width: 100%;
      width: ${theme.spacing(66)};
      height: ${theme.spacing(34)};
`
);

function Loading() {
  return (
    <Card
      sx={{
        textAlign: 'center',
        p: 3
      }}
    >
      <EmptyResultsWrapper src="/static/images/placeholders/illustrations/1.svg" />

      <Typography
        align="center"
        variant="h2"
        fontWeight="normal"
        color="text.secondary"
        sx={{
          mt: 3
        }}
        gutterBottom
      >
        Click something, anything!
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          mt: 4
        }}
      >
        Maybe, a button?
      </Button>
    </Card>
  );
}

export default Loading;
