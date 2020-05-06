import React from "react";
import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import CartDropdown from "./cart-dropdown.component";

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

// const CartDropdownContainer = () => (
//   <Mutation mutation={TOGGLE_CART_HIDDEN}>
//     {(toggleCartHidden) => (
//       <Query query={GET_CART_ITEMS}>
//         {({ data: { cartItems } }) => (
//           <CartDropdown
//             cartItems={cartItems}
//             toggleCartHidden={toggleCartHidden}
//           />
//         )}
//       </Query>
//     )}
//   </Mutation>
// );

const CartDropdownContainer = () => {
  const { loading, error, data } = useQuery(GET_CART_ITEMS);
  const [toggleCartHidden] = useMutation(TOGGLE_CART_HIDDEN);
  if (loading || error) return;
  const { cartItems } = data;
  return (
    <CartDropdown cartItems={cartItems} toggleCartHidden={toggleCartHidden} />
  );
};

export default CartDropdownContainer;
