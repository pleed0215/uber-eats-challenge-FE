/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryGetPodcast
// ====================================================

export interface QueryGetPodcast_getPodcast_podcast_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  portrait: string | null;
}

export interface QueryGetPodcast_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  host: QueryGetPodcast_getPodcast_podcast_host;
  isOnSubscribe: boolean | null;
  numSubscriber: number | null;
}

export interface QueryGetPodcast_getPodcast {
  __typename: "PodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: QueryGetPodcast_getPodcast_podcast | null;
}

export interface QueryGetPodcast {
  getPodcast: QueryGetPodcast_getPodcast;
}

export interface QueryGetPodcastVariables {
  id: number;
}
