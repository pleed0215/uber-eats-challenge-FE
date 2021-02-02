/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PartEpisode
// ====================================================

export interface PartEpisode_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  thumbnail: string | null;
}

export interface PartEpisode {
  __typename: "Episode";
  id: number;
  title: string;
  description: string | null;
  playLength: number | null;
  createdAt: any;
  podcast: PartEpisode_podcast;
}
