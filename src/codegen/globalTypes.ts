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
  category: string;
  podcastId: number;
}

export interface CreatePodcastInput {
  title: string;
  category: string;
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

export interface GetEpisodesInput {
  page?: number | null;
  pageSize?: number | null;
  podcastId: number;
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
  podcastId: number;
  episodeId: number;
  title?: string | null;
  category?: string | null;
}

export interface UpdatePodcastInput {
  id: number;
  payload: UpdatePodcastPayload;
}

export interface UpdatePodcastPayload {
  title?: string | null;
  category?: string | null;
  rating?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
