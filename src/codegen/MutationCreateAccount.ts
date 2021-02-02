/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutationCreateAccount
// ====================================================

export interface MutationCreateAccount_createAccount {
  __typename: "CreateAccountOutput";
  ok: boolean;
  error: string | null;
}

export interface MutationCreateAccount {
  createAccount: MutationCreateAccount_createAccount;
}

export interface MutationCreateAccountVariables {
  email: string;
  password: string;
  role: UserRole;
}
