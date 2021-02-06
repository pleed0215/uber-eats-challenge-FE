/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SeeSubscriptionInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: SeeSubScription
// ====================================================

export interface SeeSubScription_seeSubscribtions_subscriptions_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  portrait: string | null;
}

export interface SeeSubScription_seeSubscribtions_subscriptions {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  host: SeeSubScription_seeSubscribtions_subscriptions_host;
}

export interface SeeSubScription_seeSubscribtions {
  __typename: "SeeSubscriptionOutput";
  ok: boolean;
  error: string | null;
  totalPage: number | null;
  totalCount: number | null;
  currentPage: number | null;
  currentCount: number | null;
  subscriptions: SeeSubScription_seeSubscribtions_subscriptions[] | null;
}

export interface SeeSubScription {
  seeSubscribtions: SeeSubScription_seeSubscribtions;
}

export interface SeeSubScriptionVariables {
  input: SeeSubscriptionInput;
}
