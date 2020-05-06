import React from "react";
// import { Query } from "react-apollo";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

import Header from "./header.component";

const GET_CART_HIDDEN_AND_CURRENT_USER = gql`
  {
    cartHidden @client
    currentUser @client
  }
`;

// const HeaderContainer = () => (
//   <Query query={GET_CART_HIDDEN_AND_CURRENT_USER}>
//     {({ data: { cartHidden, currentUser } }) => (
//       <Header hidden={cartHidden} currentUser={currentUser} />
//     )}
//   </Query>
// );

const HeaderContainer = () => {
  const { loading, error, data } = useQuery(GET_CART_HIDDEN_AND_CURRENT_USER);
  if (loading || error) return;
  const { cartHidden, currentUser } = data;
  return <Header hidden={cartHidden} currentUser={currentUser} />;
};

export default HeaderContainer;
