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
import { ServerUrlProvider } from './contexts/ServerContext';

const client = new ApolloClient({
  uri: 'http://192.168.50.13:58000/money/graphql',
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
