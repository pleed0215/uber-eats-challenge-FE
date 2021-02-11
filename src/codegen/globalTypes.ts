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

export interface CreateEpisodeInput {
  title: string;
  description?: string | null;
  podcastId: number;
  url?: string | null;
  playLength?: number | null;
}

export interface CreatePodcastInput {
  title: string;
  category: string;
  description?: string | null;
  thumbnail?: string | null;
}

export interface EditProfileInput {
  email?: string | null;
  name?: string | null;
  password?: string | null;
  role?: UserRole | null;
  portrait?: string | null;
}

export interface EpisodesSearchInput {
  podcastId: number;
  episodeId: number;
}

export interface GetPodcastsByCategoryInput {
  page?: number | null;
  pageSize?: number | null;
  category: string;
}

export interface PodcastSearchInput {
  id: number;
}

export interface ReviewPodcastInput {
  content: string;
  rating: number;
  podcastId: number;
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

export interface ToggleSubscriptionInput {
  podcastId: number;
}

export interface UpdateEpisodeInput {
  title?: string | null;
  description?: string | null;
  playLength?: number | null;
  url?: string | null;
  episodeId: number;
  podcastId: number;
}

export interface UpdatePodcastInput {
  title?: string | null;
  category?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  podcastId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
