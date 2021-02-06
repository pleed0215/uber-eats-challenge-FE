/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface GetPodcastsByCategoryInput {
  page?: number | null;
  pageSize?: number | null;
  category: string;
}

export interface SearchPodcastInput {
  title: string;
  page?: number | null;
  pageSize?: number | null;
}

export interface SeeSubscriptionInput {
  page?: number | null;
  pageSize?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
