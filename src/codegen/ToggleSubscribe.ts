/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ToggleSubscriptionInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ToggleSubscribe
// ====================================================

export interface ToggleSubscribe_subscribeToPodcast {
  __typename: "ToggleSubscriptionOutput";
  ok: boolean;
  error: string | null;
  result: string | null;
}

export interface ToggleSubscribe {
  subscribeToPodcast: ToggleSubscribe_subscribeToPodcast;
}

export interface ToggleSubscribeVariables {
  input: ToggleSubscriptionInput;
}
