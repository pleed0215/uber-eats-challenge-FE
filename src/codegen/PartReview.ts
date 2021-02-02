/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PartReview
// ====================================================

export interface PartReview_reviewer {
  __typename: "User";
  id: number;
  name: string | null;
  email: string;
  portrait: string | null;
}

export interface PartReview {
  __typename: "Review";
  id: number;
  content: string;
  rating: number;
  reviewer: PartReview_reviewer;
}
