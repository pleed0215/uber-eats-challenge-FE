import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const GQL_CREATE_EPISODE = gql`
  mutation CreateEpisode($input: CreateEpisodeInput!) {
    createEpisode(input: $input) {
      ok
      error
    }
  }
`;

const GQL_UPDATE_EPISODE = gql`
  mutation UpdateEpisode($input: UpdateEpisodeInput!) {
    updateEpisode(input: $input) {
      ok
      error
    }
  }
`;

const GQL_DELETE_EPISODE = gql`
  mutation DeleteEpisode($input: EpisodesSearchInput!) {
    deleteEpisode(input: $input) {
      ok
      error
    }
  }
`;

export const DoEpisode = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation(); // possible pathname on this component: '/host/create', /host/edit/:id, /host/delete/:id
  const [job, setJob] = useState<"create" | "delete" | "update">();

  useEffect(() => {
    console.log(pathname);
  }, [id, pathname]);

  return (
    <div>
      {pathname}
      {id}
      {job}
    </div>
  );
};
