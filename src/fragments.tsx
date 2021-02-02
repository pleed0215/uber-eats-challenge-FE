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
    episodes {
      id
      title
      description
      playLength
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
    }
  }
`;
