import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import {
  ApolloClient,
  // gql
} from "apollo-boost";
import { resolvers, typeDefs } from "./graphql/resolvers";

import "./index.css";
import { default as App } from "./App.container";

// establish connection to backend
const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com",
});

const cache = new InMemoryCache();

// see resolvers.js!
const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});

// setting initial local state in apollo client
client.writeData({
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount: 0,
    cartTotal: 0,
    currentUser: null,
  },
});

// test the client is working with the below code
// const coll = "hats";

// client
//   .query({
//     query: gql`
//       {
//         getCollectionsByTitle(title: "${coll}") {
//           id
//           title
//           items {
//             id
//             name
//             price
//             imageUrl
//           }
//         }
//       }
//     `,
//   })
//   .then((res) => console.log(res));

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
