/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QuerySeeReviews
// ====================================================

export interface QuerySeeReviews_seePodcastReviews_reviews_reviewer {
  __typename: "User";
  id: number;
  name: string | null;
  email: string;
  portrait: string | null;
}

export interface QuerySeeReviews_seePodcastReviews_reviews {
  __typename: "Review";
  id: number;
  content: string;
  rating: number;
  reviewer: QuerySeeReviews_seePodcastReviews_reviews_reviewer;
}

export interface QuerySeeReviews_seePodcastReviews {
  __typename: "SeePodcastReviewsOutput";
  ok: boolean;
  error: string | null;
  reviews: QuerySeeReviews_seePodcastReviews_reviews[] | null;
}

export interface QuerySeeReviews {
  seePodcastReviews: QuerySeeReviews_seePodcastReviews;
}

export interface QuerySeeReviewsVariables {
  podcastId: number;
  page: number;
}
