import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { QueryMe } from "../codegen/QueryMe";
import { FRAGMENT_PODCAST } from "../fragments";

export const GQL_QUERY_ME = gql`
  query QueryMe {
    me {
      id
      email
      role
      name
      portrait
      podcasts {
        ...PartPodcast
      }
      subscriptions {
        ...PartPodcast
      }
      reviews {
        id
        content
        rating
        podcast {
          ...PartPodcast
        }
      }
      sawEpisode {
        id
      }
    }
  }
  ${FRAGMENT_PODCAST}
`;

export const useMe = () => {
  return useQuery<QueryMe>(GQL_QUERY_ME);
};

export const useLazyMe = () => {
  return useLazyQuery<QueryMe>(GQL_QUERY_ME);
};
