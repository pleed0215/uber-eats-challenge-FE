/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPodcastsByCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryByCategory
// ====================================================

export interface QueryByCategory_getPodcastByCategory_podcasts_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  portrait: string | null;
}

export interface QueryByCategory_getPodcastByCategory_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  host: QueryByCategory_getPodcastByCategory_podcasts_host;
  isOnSubscribe: boolean | null;
  numSubscriber: number | null;
  reviewedPodcast: boolean;
}

export interface QueryByCategory_getPodcastByCategory {
  __typename: "GetPodcastsByCategoryOutput";
  ok: boolean;
  error: string | null;
  totalPage: number | null;
  totalCount: number | null;
  currentPage: number | null;
  currentCount: number | null;
  podcasts: QueryByCategory_getPodcastByCategory_podcasts[] | null;
}

export interface QueryByCategory {
  getPodcastByCategory: QueryByCategory_getPodcastByCategory;
}

export interface QueryByCategoryVariables {
  input: GetPodcastsByCategoryInput;
}
