/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: SeeProfile
// ====================================================

export interface SeeProfile_seeProfile_user_podcasts_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  portrait: string | null;
}

export interface SeeProfile_seeProfile_user_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  host: SeeProfile_seeProfile_user_podcasts_host;
}

export interface SeeProfile_seeProfile_user_sawEpisode {
  __typename: "Episode";
  id: number;
}

export interface SeeProfile_seeProfile_user_subscriptions_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  portrait: string | null;
}

export interface SeeProfile_seeProfile_user_subscriptions {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  host: SeeProfile_seeProfile_user_subscriptions_host;
}

export interface SeeProfile_seeProfile_user {
  __typename: "User";
  id: number;
  name: string | null;
  email: string;
  role: UserRole;
  portrait: string | null;
  podcasts: SeeProfile_seeProfile_user_podcasts[] | null;
  sawEpisode: SeeProfile_seeProfile_user_sawEpisode[] | null;
  subscriptions: SeeProfile_seeProfile_user_subscriptions[] | null;
}

export interface SeeProfile_seeProfile {
  __typename: "UserProfileOutput";
  ok: boolean;
  error: string | null;
  user: SeeProfile_seeProfile_user | null;
}

export interface SeeProfile {
  seeProfile: SeeProfile_seeProfile;
}

export interface SeeProfileVariables {
  userId: number;
}
