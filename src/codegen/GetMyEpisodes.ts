/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetEpisodesInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetMyEpisodes
// ====================================================

export interface GetMyEpisodes_getEpisodes_episodes_podcast_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  role: UserRole;
}

export interface GetMyEpisodes_getEpisodes_episodes_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  thumbnail: string | null;
  host: GetMyEpisodes_getEpisodes_episodes_podcast_host;
}

export interface GetMyEpisodes_getEpisodes_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  description: string | null;
  playLength: number | null;
  createdAt: any;
  haveSeen: boolean;
  watchCounter: number;
  url: string | null;
  podcast: GetMyEpisodes_getEpisodes_episodes_podcast;
}

export interface GetMyEpisodes_getEpisodes {
  __typename: "EpisodesOutput";
  ok: boolean;
  error: string | null;
  totalPage: number | null;
  totalCount: number | null;
  currentPage: number | null;
  currentCount: number | null;
  episodes: GetMyEpisodes_getEpisodes_episodes[] | null;
}

export interface GetMyEpisodes {
  getEpisodes: GetMyEpisodes_getEpisodes;
}

export interface GetMyEpisodesVariables {
  input: GetEpisodesInput;
}
