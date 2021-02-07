/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryMe
// ====================================================

export interface QueryMe_me_podcasts_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  portrait: string | null;
}

export interface QueryMe_me_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  host: QueryMe_me_podcasts_host;
}

export interface QueryMe_me_subscriptions_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  portrait: string | null;
}

export interface QueryMe_me_subscriptions {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  host: QueryMe_me_subscriptions_host;
}

export interface QueryMe_me_reviews_podcast_host {
  __typename: "User";
  id: number;
  email: string;
  name: string | null;
  portrait: string | null;
}

export interface QueryMe_me_reviews_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  host: QueryMe_me_reviews_podcast_host;
}

export interface QueryMe_me_reviews {
  __typename: "Review";
  id: number;
  content: string;
  rating: number;
  podcast: QueryMe_me_reviews_podcast;
}

export interface QueryMe_me_sawEpisode {
  __typename: "Episode";
  id: number;
}

export interface QueryMe_me {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  name: string | null;
  portrait: string | null;
  podcasts: QueryMe_me_podcasts[] | null;
  subscriptions: QueryMe_me_subscriptions[] | null;
  reviews: QueryMe_me_reviews[] | null;
  sawEpisode: QueryMe_me_sawEpisode[] | null;
}

export interface QueryMe {
  me: QueryMe_me;
}
