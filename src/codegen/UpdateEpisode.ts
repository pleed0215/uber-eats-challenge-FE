/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateEpisode
// ====================================================

export interface UpdateEpisode_updateEpisode {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface UpdateEpisode {
  updateEpisode: UpdateEpisode_updateEpisode;
}

export interface UpdateEpisodeVariables {
  input: UpdateEpisodeInput;
}
