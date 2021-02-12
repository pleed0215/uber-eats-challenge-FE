import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import {
  QueryGetPodcasts,
  QueryGetPodcastsVariables,
} from "../../codegen/QueryGetPodcasts";
import {
  QueryRecentlyEpisodes,
  QueryRecentlyEpisodesVariables,
} from "../../codegen/QueryRecentlyEpisodes";
import { QueryRecentlyPodcasts } from "../../codegen/QueryRecentlyPodcasts";
import { EpisodeItem } from "../../components/EpisodeItem";
import { EpisodeList } from "../../components/EpisodeList";
import { HelmetOnlyTitle } from "../../components/HelmetOnlyTitle";
import { LoaderWithLogo } from "../../components/LoaderWithLogo";
import { PodcastList } from "../../components/PodcastList";
import { FRAGMENT_EPISODE, FRAGMENT_PODCAST } from "../../fragments";
import { PodcastPage } from "./podcast";

const GQL_GET_PODCASTS = gql`
  query QueryGetPodcasts($page: Int!, $pageSize: Int!) {
    getAllPodcasts(input: { page: $page, pageSize: $pageSize }) {
      ok
      error
      podcasts {
        ...PartPodcast
      }
    }
  }
  ${FRAGMENT_PODCAST}
`;
const GQL_RECENTLY_PODCASTS = gql`
  query QueryRecentlyPodcasts {
    getRecentlyPodcast(input: { page: 1, pageSize: 4 }) {
      ok
      error
      podcasts {
        ...PartPodcast
      }
    }
  }
  ${FRAGMENT_PODCAST}
`;

export const GQL_RECENTLY_EPISODES = gql`
  query QueryRecentlyEpisodes($page: Int!) {
    getRecentlyEpisodes(input: { page: $page, pageSize: 10 }) {
      ok
      error
      episodes {
        ...PartEpisode
      }
    }
  }
  ${FRAGMENT_EPISODE}
`;

export const HomePage = () => {
  const { data: populars, loading: loadingPopular } = useQuery<
    QueryGetPodcasts,
    QueryGetPodcastsVariables
  >(GQL_GET_PODCASTS, {
    variables: {
      page: 1,
      pageSize: 4,
    },
  });

  const {
    data: recentlies,
    loading: loadingRecentlies,
  } = useQuery<QueryRecentlyPodcasts>(GQL_RECENTLY_PODCASTS);
  const { data: episodes, loading: loadingEpisodes } = useQuery<
    QueryRecentlyEpisodes,
    QueryRecentlyEpisodesVariables
  >(GQL_RECENTLY_EPISODES, {
    variables: {
      page: 1,
    },
  });

  return (
    <div className="w-screen min-h-screen bg-gray-800 flex flex-col items-center relative">
      <HelmetOnlyTitle title="Welcome" />
      <div className="w-full xl:max-w-screen-lg lg:max-w-screen-md md:max-w-screen-sm sm:max-w-md px-4 pt-4 justify-between flex flex-col">
        {loadingPopular && loadingEpisodes && loadingRecentlies && (
          <LoaderWithLogo />
        )}
        <PodcastList
          podcasts={populars?.getAllPodcasts.podcasts}
          loading={loadingPopular}
          title="Most Popular"
        />
        <div className="mt-6" />
        <hr />
        <PodcastList
          podcasts={recentlies?.getRecentlyPodcast.podcasts}
          loading={loadingRecentlies}
          title="Most Recently"
        />
        <div className="mt-8" />
        <hr />
        <div className="mb-4" />
        <EpisodeList
          episodes={episodes?.getRecentlyEpisodes.episodes}
          title="Recently Episodes..."
          loading={loadingEpisodes}
        />
      </div>
    </div>
  );
};
