import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          관리자 대시보드
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            onClick={() => navigate('/')}
            color={isActive('/') ? 'primary' : 'inherit'}
            sx={{ mr: 2 }}
          >
            대시보드
          </Button>
          <Button
            onClick={() => navigate('/orders')}
            color={isActive('/orders') ? 'primary' : 'inherit'}
          >
            주문 관리
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 