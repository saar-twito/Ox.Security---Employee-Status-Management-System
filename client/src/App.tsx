// App.js
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import DashboardEmployeeList from './components/DashboardEmployeeList/DashboardEmployeeList';
import './App.css';

const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'production'
    ? 'https://ox-security-server.onrender.com/graphql'
    : 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        {/* <h1>Employee Status Management By Ox.Security</h1> */}
        <DashboardEmployeeList />
      </div>
    </ApolloProvider>
  );
}

export default App;
