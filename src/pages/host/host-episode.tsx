import React from "react";
import { gql, useQuery } from "@apollo/client";
import { FRAGMENT_EPISODE } from "../../fragments";
const GQL_GET_EPISDOES = gql`
  query GetMyEpisodes($input: GetEpisodesInput!) {
    getEpisodes(input: $input) {
      ok
      error
      totalPage
      totalCount
      currentPage
      currentCount
      episodes {
        ...PartEpisode
      }
    }
  }
  ${FRAGMENT_EPISODE}
`;

export const HostEpisodePage = () => {
  return <div>Episode</div>;
};
