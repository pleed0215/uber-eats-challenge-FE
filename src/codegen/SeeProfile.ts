/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: SeeProfile
// ====================================================

export interface SeeProfile_seeProfile_user {
  __typename: "User";
  id: number;
  name: string | null;
  email: string;
  role: UserRole;
  portrait: string | null;
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
