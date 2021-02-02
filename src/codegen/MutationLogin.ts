/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationLogin
// ====================================================

export interface MutationLogin_login {
  __typename: "LoginOutput";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface MutationLogin {
  login: MutationLogin_login;
}

export interface MutationLoginVariables {
  email: string;
  password: string;
}
