import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { QueryMe } from "../codegen/QueryMe";

export const GQL_QUERY_ME = gql`
  query QueryMe {
    me {
      id
      email
      role
      name
      portrait
    }
  }
`;

export const useMe = () => {
  return useQuery<QueryMe>(GQL_QUERY_ME);
};

export const useLazyMe = () => {
  return useLazyQuery<QueryMe>(GQL_QUERY_ME);
};
