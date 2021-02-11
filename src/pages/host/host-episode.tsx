import React from "react";
import { gql, useQuery } from "@apollo/client";
import { FRAGMENT_EPISODE } from "../../fragments";
import {
  QueryGetPodcast,
  QueryGetPodcastVariables,
} from "../../codegen/QueryGetPodcast";
import { GQL_GET_PODCAST } from "../home/podcast";
import { useParams } from "react-router-dom";
import { LoaderWithLogo } from "../../components/LoaderWithLogo";
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
  const { id } = useParams<{ id: string }>();

  const { data: podcast, loading: loadingPodcast } = useQuery<
    QueryGetPodcast,
    QueryGetPodcastVariables
  >(GQL_GET_PODCAST, { variables: { id: +id } });

  return (
    <div className="w-screen min-h-screen flex justify-center">
      {loadingPodcast && <LoaderWithLogo />}
      {!loadingPodcast && (
        <div className="layout__container flex flex-col"></div>
      )}
    </div>
  );
};
