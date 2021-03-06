/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullPodcast
// ====================================================

export interface FullPodcast_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  portrait: string | null;
}

export interface FullPodcast_listeners {
  __typename: "User";
  id: number;
  email: string;
  portrait: string | null;
  name: string | null;
}

export interface FullPodcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  host: FullPodcast_host;
  listeners: FullPodcast_listeners[] | null;
}
