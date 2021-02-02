/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryRecentlyEpisodes
// ====================================================

export interface QueryRecentlyEpisodes_getRecentlyEpisodes_episodes_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  thumbnail: string | null;
}

export interface QueryRecentlyEpisodes_getRecentlyEpisodes_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  description: string | null;
  playLength: number | null;
  createdAt: any;
  podcast: QueryRecentlyEpisodes_getRecentlyEpisodes_episodes_podcast;
}

export interface QueryRecentlyEpisodes_getRecentlyEpisodes {
  __typename: "GetRecentlyEpisodesOutput";
  ok: boolean;
  error: string | null;
  episodes: QueryRecentlyEpisodes_getRecentlyEpisodes_episodes[] | null;
}

export interface QueryRecentlyEpisodes {
  getRecentlyEpisodes: QueryRecentlyEpisodes_getRecentlyEpisodes;
}

export interface QueryRecentlyEpisodesVariables {
  page: number;
}
