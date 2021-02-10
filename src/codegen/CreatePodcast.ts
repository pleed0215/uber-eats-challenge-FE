/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePodcastInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePodcast
// ====================================================

export interface CreatePodcast_createPodcast {
  __typename: "CreatePodcastOutput";
  ok: boolean;
  error: string | null;
}

export interface CreatePodcast {
  createPodcast: CreatePodcast_createPodcast;
}

export interface CreatePodcastVariables {
  input: CreatePodcastInput;
}
