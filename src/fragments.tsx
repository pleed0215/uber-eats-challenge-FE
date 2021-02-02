import { gql } from "@apollo/client";

export const FRAGMENT_PODCAST = gql`
  fragment PartPodcast on Podcast {
    id
    title
    category
    description
    thumbnail
    host {
      id
      email
      name
      portrait
    }
  }
`;

export const FRAGMENT_FULL_PODCAST = gql`
  fragment FullPodcast on Podcast {
    id
    title
    category
    description
    thumbnail
    host {
      id
      email
      name
      portrait
    }
    listeners {
      id
      email
      portrait
      name
    }
  }
`;

export const FRAGMENT_REVIEW = gql`
  fragment PartReview on Review {
    id
    content
    rating
    reviewer {
      id
      name
      email
      portrait
    }
  }
`;

export const FRAGMENT_EPISODE = gql`
  fragment PartEpisode on Episode {
    id
    title
    description
    playLength
    createdAt
    podcast {
      id
      title
      category
      thumbnail
      host {
        id
        email
        name
        role
      }
    }
  }
`;

export const FRAGMENT_FULL_EPISODE = gql`
  fragment FullEpisode on Episode {
    id
    title
    description
    playLength
    createdAt
    podcast {
      id
      title
      category
      thumbnail
      host {
        id
        email
        name
        portrait
      }
    }
  }
`;
