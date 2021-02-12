/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetFeedsInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetFeeds
// ====================================================

export interface GetFeeds_getFeeds_feeds_podcast_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  role: UserRole;
}

export interface GetFeeds_getFeeds_feeds_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  thumbnail: string | null;
  host: GetFeeds_getFeeds_feeds_podcast_host;
}

export interface GetFeeds_getFeeds_feeds {
  __typename: "Episode";
  id: number;
  title: string;
  description: string | null;
  playLength: number | null;
  createdAt: any;
  haveSeen: boolean;
  watchCounter: number;
  url: string | null;
  podcast: GetFeeds_getFeeds_feeds_podcast;
}

export interface GetFeeds_getFeeds {
  __typename: "GetFeedsOutput";
  ok: boolean;
  error: string | null;
  currentCount: number | null;
  currentPage: number | null;
  totalCount: number | null;
  totalPage: number | null;
  pageSize: number | null;
  feeds: GetFeeds_getFeeds_feeds[] | null;
}

export interface GetFeeds {
  getFeeds: GetFeeds_getFeeds;
}

export interface GetFeedsVariables {
  input: GetFeedsInput;
}
