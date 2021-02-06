/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: SearchPodcast
// ====================================================

export interface SearchPodcast_searchPodcast_results_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  portrait: string | null;
}

export interface SearchPodcast_searchPodcast_results {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  host: SearchPodcast_searchPodcast_results_host;
}

export interface SearchPodcast_searchPodcast {
  __typename: "SearchPodcastOutput";
  ok: boolean;
  error: string | null;
  totalCount: number | null;
  totalPage: number | null;
  currentPage: number | null;
  currentCount: number | null;
  results: SearchPodcast_searchPodcast_results[] | null;
}

export interface SearchPodcast {
  searchPodcast: SearchPodcast_searchPodcast;
}

export interface SearchPodcastVariables {
  input: SearchPodcastInput;
}
