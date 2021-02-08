/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL fragment: PartEpisode
// ====================================================

export interface PartEpisode_podcast_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  role: UserRole;
}

export interface PartEpisode_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  thumbnail: string | null;
  host: PartEpisode_podcast_host;
}

export interface PartEpisode {
  __typename: "Episode";
  id: number;
  title: string;
  description: string | null;
  playLength: number | null;
  createdAt: any;
  haveSeen: boolean;
  watchCounter: number;
  podcast: PartEpisode_podcast;
}
