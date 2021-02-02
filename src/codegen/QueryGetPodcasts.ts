/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryGetPodcasts
// ====================================================

export interface QueryGetPodcasts_getAllPodcasts_podcasts_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  portrait: string | null;
}

export interface QueryGetPodcasts_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  host: QueryGetPodcasts_getAllPodcasts_podcasts_host;
}

export interface QueryGetPodcasts_getAllPodcasts {
  __typename: "GetAllPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: QueryGetPodcasts_getAllPodcasts_podcasts[] | null;
}

export interface QueryGetPodcasts {
  getAllPodcasts: QueryGetPodcasts_getAllPodcasts;
}

export interface QueryGetPodcastsVariables {
  page: number;
  pageSize: number;
}
