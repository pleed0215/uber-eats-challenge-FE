/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryGetEpisodes
// ====================================================

export interface QueryGetEpisodes_getEpisodes_episodes_podcast_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  role: UserRole;
}

export interface QueryGetEpisodes_getEpisodes_episodes_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  thumbnail: string | null;
  host: QueryGetEpisodes_getEpisodes_episodes_podcast_host;
}

export interface QueryGetEpisodes_getEpisodes_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  description: string | null;
  playLength: number | null;
  createdAt: any;
  haveSeen: boolean;
  watchCounter: number;
  url: string | null;
  podcast: QueryGetEpisodes_getEpisodes_episodes_podcast;
}

export interface QueryGetEpisodes_getEpisodes {
  __typename: "EpisodesOutput";
  ok: boolean;
  error: string | null;
  totalPage: number | null;
  totalCount: number | null;
  currentPage: number | null;
  currentCount: number | null;
  episodes: QueryGetEpisodes_getEpisodes_episodes[] | null;
}

export interface QueryGetEpisodes {
  getEpisodes: QueryGetEpisodes_getEpisodes;
}

export interface QueryGetEpisodesVariables {
  podcastId: number;
  page: number;
}
