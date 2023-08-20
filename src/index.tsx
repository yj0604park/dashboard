import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
} from '@apollo/client';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { UserProvider } from './contexts/UserContext';

const client = new ApolloClient({
  uri: 'http://192.168.68.62:58000/money/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <UserProvider>
        <BrowserRouter>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </BrowserRouter>
      </UserProvider>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
