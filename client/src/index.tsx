import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  createHttpLink,
  ApolloProvider,
  InMemoryCache,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { Store } from './state/state';
import reducer from './state/reducer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
      if (message.includes('Context creation failed: jwt expired')) {
        // sign out the user if jwt is expired
        window.localStorage.clear();
        window.alert('Session expired, please sign in again');
        window.location.reload();
      }
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const authLink = setContext(({ headers }: any) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('loggedUser');
  
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <Store reducer={reducer}>
      <App />
    </Store>
  </ApolloProvider>,
  document.getElementById('root')
);