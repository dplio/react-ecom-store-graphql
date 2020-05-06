import React from "react";
// import { Query, Mutation } from "react-apollo";
import { graphql } from "react-apollo";
import { flowRight } from "lodash";
import { gql } from "apollo-boost";

import CartIcon from "./cart-icon.component";

// see resolvers.js for mutation definition
const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

// const CartIconContainer = () => (
//   <Query query={GET_ITEM_COUNT}>
//     {({ data: { itemCount } }) => (
//       <Mutation mutation={TOGGLE_CART_HIDDEN}>
//         {(toggleCartHidden) => (
//           <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
//         )}
//       </Mutation>
//     )}
//   </Query>
// );

// below is equivalent to above, but using flowRight with graphql function
const CartIconContainer = ({ data: { itemCount }, toggleCartHidden }) => (
  <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
);

export default flowRight(
  graphql(GET_ITEM_COUNT),
  graphql(TOGGLE_CART_HIDDEN, { name: "toggleCartHidden" })
)(CartIconContainer);
