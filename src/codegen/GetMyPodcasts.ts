/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMyPodcasts
// ====================================================

export interface GetMyPodcasts_getMyPodcasts_podcasts_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  portrait: string | null;
}

export interface GetMyPodcasts_getMyPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  host: GetMyPodcasts_getMyPodcasts_podcasts_host;
  isOnSubscribe: boolean | null;
  numSubscriber: number | null;
  reviewedPodcast: boolean;
}

export interface GetMyPodcasts_getMyPodcasts {
  __typename: "GetMyPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: GetMyPodcasts_getMyPodcasts_podcasts[] | null;
}

export interface GetMyPodcasts {
  getMyPodcasts: GetMyPodcasts_getMyPodcasts;
}
