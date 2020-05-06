import React from "react";
// import { Query } from "react-apollo";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

import CheckoutPage from "./checkout.component";

const GET_CART_ITEMS_AND_TOTAL = gql`
  {
    cartItems @client
    cartTotal @client
  }
`;

// const CheckoutPageContainer = () => (
//   <Query query={GET_CART_ITEMS_AND_TOTAL}>
//     {({ data: { cartItems, cartTotal } }) => (
//       <CheckoutPage cartItems={cartItems} total={cartTotal}></CheckoutPage>
//     )}
//   </Query>
// );

const CheckoutPageContainer = () => {
  const { loading, error, data } = useQuery(GET_CART_ITEMS_AND_TOTAL);
  if (loading || error) return;
  const { cartItems, cartTotal } = data;
  return <CheckoutPage cartItems={cartItems} total={cartTotal} />;
};

export default CheckoutPageContainer;
