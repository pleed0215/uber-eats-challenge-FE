/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdatePodcastInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePodcast
// ====================================================

export interface UpdatePodcast_updatePodcast {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface UpdatePodcast {
  updatePodcast: UpdatePodcast_updatePodcast;
}

export interface UpdatePodcastVariables {
  input: UpdatePodcastInput;
}
