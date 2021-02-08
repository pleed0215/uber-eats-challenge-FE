/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditProfileInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutationEditProfile
// ====================================================

export interface MutationEditProfile_editProfile {
  __typename: "EditProfileOutput";
  ok: boolean;
  error: string | null;
}

export interface MutationEditProfile {
  editProfile: MutationEditProfile_editProfile;
}

export interface MutationEditProfileVariables {
  input: EditProfileInput;
}
