import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from '@apollo/client';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { ServerUrlProvider } from './contexts/ServerContext';
import { UserProvider } from './contexts/UserContext';

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:58000'}${process.env.REACT_APP_GRAPHQL_ENDPOINT || '/money/graphql'}`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          GetRetailerListQuery: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,

            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing, incoming) {
              return [...existing, ...incoming];
            }
          }
        }
      }
    }
  })
});

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <UserProvider>
        <ServerUrlProvider>
          <BrowserRouter>
            <ApolloProvider client={client}>
              <App />
            </ApolloProvider>
          </BrowserRouter>
        </ServerUrlProvider>
      </UserProvider>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
