import Routers from './Routers';
import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import client from "./SBApolloClient";


function App() {
  return (
    <ApolloProvider client={client}>

      <div className="App">
        <Routers/>
      </div>
    </ApolloProvider>
  );
}

export default App;
