import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  CreatePodcast,
  CreatePodcastVariables,
} from "../../codegen/CreatePodcast";
import {
  DeletePodcast,
  DeletePodcastVariables,
} from "../../codegen/DeletePodcast";
import {
  UpdatePodcast,
  UpdatePodcastVariables,
} from "../../codegen/UpdatePodcast";

const GQL_CREATE_PODCAST = gql`
  mutation CreatePodcast($input: CreatePodcastInput!) {
    createPodcast(input: $input) {
      ok
      error
    }
  }
`;

const GQL_UPDATE_PODCAST = gql`
  mutation UpdatePodcast($input: UpdatePodcastInput!) {
    updatePodcast(input: $input) {
      ok
      error
    }
  }
`;

const GQL_DELETE_PODCAST = gql`
  mutation DeletePodcast($input: PodcastSearchInput!) {
    deletePodcast(input: $input) {
      ok
      error
    }
  }
`;

interface IForm {}

export const DoPodcast = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation(); // possible pathname on this component: '/host/create', /host/edit/:id, /host/delete/:id
  const [job, setJob] = useState<"create" | "delete" | "update">();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createPodcast] = useMutation<CreatePodcast, CreatePodcastVariables>(
    GQL_CREATE_PODCAST,
    { onCompleted: () => {} }
  );
  const [udpatePodcast] = useMutation<UpdatePodcast, UpdatePodcastVariables>(
    GQL_UPDATE_PODCAST,
    { onCompleted: () => {} }
  );
  const [deletePodcast] = useMutation<DeletePodcast, DeletePodcastVariables>(
    GQL_DELETE_PODCAST,
    { onCompleted: () => {} }
  );

  useEffect(() => {
    if (pathname.includes("update")) {
      setJob("update");
    } else if (pathname.includes("delete")) {
      setJob("delete");
    } else {
      setJob("create");
    }
  }, [id, pathname]);

  return <div>{job}</div>;
};
