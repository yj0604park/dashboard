import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { ServerUrlProvider } from './contexts/ServerContext';
import { UserProvider } from './contexts/UserContext';

const backendBaseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:58000';
const graphqlEndpointPath = process.env.REACT_APP_GRAPHQL_ENDPOINT || '/money/graphql';
const graphqlUri = `${backendBaseUrl}${graphqlEndpointPath}`;

function redirectToLogin() {
  if (typeof window === 'undefined') return;
  const next = encodeURIComponent(window.location.pathname + window.location.search);
  window.location.assign(`${backendBaseUrl}/accounts/login/?next=${next}`);
}

const httpLink = createHttpLink({
  uri: graphqlUri,
  credentials: 'include',
  fetch: async (uri, options) => {
    const response = await fetch(uri as RequestInfo, {
      ...(options as RequestInit),
      credentials: 'include'
    });

    const contentType = response.headers.get('content-type') || '';

    // If Django redirects to the login page, or we got HTML instead of JSON, treat as unauthenticated
    if (response.redirected || response.url.includes('/accounts/login')) {
      redirectToLogin();
      return response;
    }

    if (contentType.includes('text/html')) {
      redirectToLogin();
      // Cause Apollo to surface a network error; the errorLink below will also handle it defensively
      throw new Error('UNAUTHENTICATED_HTML_RESPONSE');
    }

    return response;
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors && graphQLErrors.some((e) => (e.extensions as any)?.code === 'UNAUTHENTICATED')) {
    redirectToLogin();
    return;
  }

  // Apollo ServerError exposes statusCode for HTTP errors; also catch parse errors from HTML bodies
  const statusCode = (networkError as any)?.statusCode as number | undefined;
  if (statusCode === 401 || statusCode === 403) {
    redirectToLogin();
    return;
  }

  if ((networkError as any)?.message?.includes?.('UNAUTHENTICATED_HTML_RESPONSE')) {
    redirectToLogin();
  }
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
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
