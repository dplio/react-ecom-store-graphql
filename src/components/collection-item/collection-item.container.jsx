import React from "react";
// import { Mutation } from "react-apollo";
// import { graphql } from "react-apollo";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";
// import { flowRight } from "lodash";

import CollectionItem from "./collection-item.component";

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

// see collections.container for longform variable passing
// dynamically pass variables into addItemToCart shorthand:
// const CollectionItemContainer = (props) => (
//   <Mutation mutation={ADD_ITEM_TO_CART}>
//     {(addItemToCart) => (
//       <CollectionItem
//         {...props}
//         addItem={(item) => addItemToCart({ variables: { item } })}
//       ></CollectionItem>
//     )}
//   </Mutation>
// );

// const CollectionItemContainer = ({ addItemToCart, ...props }) => (
//   <CollectionItem
//     {...props}
//     addItem={(item) => addItemToCart({ variables: { item } })}
//   ></CollectionItem>
// );

// export default flowRight(graphql(ADD_ITEM_TO_CART, { name: "addItemToCart" }))(
//   CollectionItemContainer
// );

// we don't need flowRight when not chaining multiple graphql calls to replace Query
// and Mutation components - here graphql can be called like redux connect()()
// export default graphql(ADD_ITEM_TO_CART, { name: "addItemToCart" })(
//   CollectionItemContainer
// );

const CollectionItemContainer = ({ ...props }) => {
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);
  return (
    <CollectionItem
      {...props}
      addItem={(item) => addItemToCart({ variables: { item } })}
    ></CollectionItem>
  );
};

export default CollectionItemContainer;
