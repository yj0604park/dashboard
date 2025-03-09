import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Dashboard } from './pages/Dashboard';
import { Banks } from './pages/Banks';
import { Navigation } from './components/Navigation';
import { Box, CssBaseline } from '@mui/material';
import { client } from './lib/apollo';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <CssBaseline />
        <Box sx={{ 
          minHeight: '100vh',
          minWidth: '100vw',
          width: '100%',
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          <Navigation />
          <Box component="main" sx={{ 
            flexGrow: 1, 
            width: '100%',
            px: { xs: 2, sm: 3, md: 4 },
            py: 3,
            boxSizing: 'border-box'
          }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/banks" element={<Banks />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
