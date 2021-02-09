/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReviewPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: PostReview
// ====================================================

export interface PostReview_reviewPodcast {
  __typename: "ReviewPodcastOutput";
  ok: boolean;
  error: string | null;
}

export interface PostReview {
  reviewPodcast: PostReview_reviewPodcast;
}

export interface PostReviewVariables {
  input: ReviewPodcastInput;
}
