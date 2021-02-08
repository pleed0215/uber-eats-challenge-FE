/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryGetEpisode
// ====================================================

export interface QueryGetEpisode_getEpisode_episode_podcast_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  role: UserRole;
}

export interface QueryGetEpisode_getEpisode_episode_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  thumbnail: string | null;
  host: QueryGetEpisode_getEpisode_episode_podcast_host;
}

export interface QueryGetEpisode_getEpisode_episode {
  __typename: "Episode";
  id: number;
  title: string;
  description: string | null;
  playLength: number | null;
  createdAt: any;
  haveSeen: boolean;
  watchCounter: number;
  podcast: QueryGetEpisode_getEpisode_episode_podcast;
}

export interface QueryGetEpisode_getEpisode {
  __typename: "GetEpisodeOutput";
  ok: boolean;
  error: string | null;
  episode: QueryGetEpisode_getEpisode_episode | null;
}

export interface QueryGetEpisode {
  getEpisode: QueryGetEpisode_getEpisode;
}

export interface QueryGetEpisodeVariables {
  podcastId: number;
  episodeId: number;
}
