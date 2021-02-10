/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EpisodesSearchInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteEpisode
// ====================================================

export interface DeleteEpisode_deleteEpisode {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface DeleteEpisode {
  deleteEpisode: DeleteEpisode_deleteEpisode;
}

export interface DeleteEpisodeVariables {
  input: EpisodesSearchInput;
}
