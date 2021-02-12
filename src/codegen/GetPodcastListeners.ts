/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPodcastListenersInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetPodcastListeners
// ====================================================

export interface GetPodcastListeners_getPodcastListeners_listeners {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  portrait: string | null;
  role: UserRole;
}

export interface GetPodcastListeners_getPodcastListeners {
  __typename: "GetPodcastListenersOutput";
  ok: boolean;
  error: string | null;
  totalPage: number | null;
  totalCount: number | null;
  currentCount: number | null;
  currentPage: number | null;
  listeners: GetPodcastListeners_getPodcastListeners_listeners[] | null;
}

export interface GetPodcastListeners {
  getPodcastListeners: GetPodcastListeners_getPodcastListeners;
}

export interface GetPodcastListenersVariables {
  input: GetPodcastListenersInput;
}
