import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client'
import {ErrorLink, onError} from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context';
import { GRAPHQL_URL } from './GlobalConfigurations';


const BASE_URL=GRAPHQL_URL;



  const errorLink = onError(({graphqlErrors, networkError}) => {
    if(graphqlErrors){
        graphqlErrors.map(({message, location, path})=>{
            console.log(`graphql error ${message}`);
        });
    }
  });


  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');    
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "ABC",
      }
    }
  });


  const link = from([
      errorLink,
      new HttpLink({uri: BASE_URL}), 
      
  ])

  const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(link)
  })



export default client ;