/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MarkEpisodeAsPlayedInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MarkAsPlayed
// ====================================================

export interface MarkAsPlayed_markEpisodeAsPlayed {
  __typename: "MarkEpisodeAsPlayedOutput";
  ok: boolean;
  error: string | null;
}

export interface MarkAsPlayed {
  markEpisodeAsPlayed: MarkAsPlayed_markEpisodeAsPlayed;
}

export interface MarkAsPlayedVariables {
  input: MarkEpisodeAsPlayedInput;
}
