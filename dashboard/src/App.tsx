import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { Navigation } from './components/Navigation';
import { Box, Container, CssBaseline } from '@mui/material';
import { client } from './lib/apollo';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
          <Navigation />
          <Container maxWidth="lg" sx={{ py: 3 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </Container>
        </Box>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
