/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryRecentlyPodcasts
// ====================================================

export interface QueryRecentlyPodcasts_getRecentlyPodcast_podcasts_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  portrait: string | null;
}

export interface QueryRecentlyPodcasts_getRecentlyPodcast_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  host: QueryRecentlyPodcasts_getRecentlyPodcast_podcasts_host;
}

export interface QueryRecentlyPodcasts_getRecentlyPodcast {
  __typename: "GetRecentlyPodcastOutput";
  ok: boolean;
  error: string | null;
  podcasts: QueryRecentlyPodcasts_getRecentlyPodcast_podcasts[] | null;
}

export interface QueryRecentlyPodcasts {
  getRecentlyPodcast: QueryRecentlyPodcasts_getRecentlyPodcast;
}
