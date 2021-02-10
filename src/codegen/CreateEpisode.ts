/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateEpisode
// ====================================================

export interface CreateEpisode_createEpisode {
  __typename: "CreateEpisodeOutput";
  ok: boolean;
  error: string | null;
}

export interface CreateEpisode {
  createEpisode: CreateEpisode_createEpisode;
}

export interface CreateEpisodeVariables {
  input: CreateEpisodeInput;
}
