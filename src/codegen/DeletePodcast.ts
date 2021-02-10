/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeletePodcast
// ====================================================

export interface DeletePodcast_deletePodcast {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface DeletePodcast {
  deletePodcast: DeletePodcast_deletePodcast;
}

export interface DeletePodcastVariables {
  input: PodcastSearchInput;
}
