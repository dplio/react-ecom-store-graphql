import React from "react";
import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";

import App from "./App";
import Spinner from "./components/spinner/spinner.component";

const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;

const SET_CURRENT_USER = gql`
  mutation SetCurrentUser($user: User!) {
    setCurrentUser(user: $user) @client
  }
`;

// const AppContainer = () => (
//   <Query query={GET_CURRENT_USER}>
//     {({ data: { currentUser } }) => (
//       <Mutation mutation={SET_CURRENT_USER}>
//         {(setCurrentUser) => (
//           <App
//             currentUser={currentUser}
//             setCurrentUser={(user) => {
//               setCurrentUser({ variables: { user } });
//             }}
//           />
//         )}
//       </Mutation>
//     )}
//   </Query>
// );

const AppContainer = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  const [setCurrentUser] = useMutation(SET_CURRENT_USER);
  if (loading) return <Spinner />;
  if (error) {
    console.error(error);
    return;
  }
  const { currentUser } = data;
  return (
    <App
      currentUser={currentUser}
      setCurrentUser={(user) => {
        setCurrentUser({ variables: { user } });
      }}
    />
  );
};

export default AppContainer;
