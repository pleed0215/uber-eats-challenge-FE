import { gql, useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  CreateEpisode,
  CreateEpisodeVariables,
} from "../../codegen/CreateEpisode";
import {
  DeleteEpisode,
  DeleteEpisodeVariables,
} from "../../codegen/DeleteEpisode";
import {
  QueryGetEpisode,
  QueryGetEpisodeVariables,
} from "../../codegen/QueryGetEpisode";
import {
  UpdateEpisode,
  UpdateEpisodeVariables,
} from "../../codegen/UpdateEpisode";
import { ButtonInactivable } from "../../components/ButtonInactivable";
import { Loader } from "../../components/Loader";
import { LoaderWithLogo } from "../../components/LoaderWithLogo";
import { BASE_URL } from "../../utils";
import { GQL_GET_EPISODE } from "../home/episode";
import { GQL_GET_EPISODES } from "../home/podcast";
import { GQL_RECENTLY_EPISODES } from "../home/home";

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

interface IForm {
  title: string;
  description: string;
  playFile: FileList;
}

export const DoEpisode = () => {
  const { id, episodeId } = useParams<{ id: string; episodeId: string }>();
  const { pathname } = useLocation(); // possible pathname on this component: '/host/create', /host/edit/:id, /host/delete/:id
  const [job, setJob] = useState<"create" | "delete" | "update">();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState,
    errors,
  } = useForm<IForm>({ mode: "onBlur" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [getEpisode, { data: episode, loading: loadingEpisode }] = useLazyQuery<
    QueryGetEpisode,
    QueryGetEpisodeVariables
  >(GQL_GET_EPISODE, {
    onCompleted: (data: QueryGetEpisode) => {
      setValue("title", data.getEpisode.episode?.title);
      setValue("description", data.getEpisode.episode?.description);
    },
  });
  const [createEpisode] = useMutation<CreateEpisode, CreateEpisodeVariables>(
    GQL_CREATE_EPISODE,
    {
      onCompleted: () => {
        setIsSubmitting(false);
        history.push(`/host/${id}/episode`);
      },
      refetchQueries: [
        {
          query: GQL_GET_EPISODES,
          variables: {
            podcastId: +id,
            page: 1,
          },
        },
        {
          query: GQL_RECENTLY_EPISODES,
          variables: {
            page: 1,
          },
        },
      ],
    }
  );
  const [updateEpisode] = useMutation<UpdateEpisode, UpdateEpisodeVariables>(
    GQL_UPDATE_EPISODE,
    {
      onCompleted: () => {
        setIsSubmitting(false);
        history.push(`/host/${id}/episode`);
      },
      refetchQueries: [
        {
          query: GQL_GET_EPISODE,
          variables: {
            podcastId: +id,
            episodeId: +episodeId,
          },
        },
        {
          query: GQL_RECENTLY_EPISODES,
          variables: {
            page: 1,
          },
        },
      ],
    }
  );
  const [deleteEpisode] = useMutation<DeleteEpisode, DeleteEpisodeVariables>(
    GQL_DELETE_EPISODE,
    {
      onCompleted: () => {
        setIsSubmitting(false);
        history.push(`/host/${id}/episode`);
      },
      refetchQueries: [
        {
          query: GQL_GET_EPISODES,
          variables: {
            podcastId: +id,
            page: 1,
          },
        },
        {
          query: GQL_RECENTLY_EPISODES,
          variables: {
            page: 1,
          },
        },
      ],
    }
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

  useEffect(() => {
    if (job === "update") {
      getEpisode({
        variables: {
          podcastId: +id,
          episodeId: +episodeId,
        },
      });
    }
  }, [job]);

  const onSubmit = async () => {
    if (formState.isValid) {
      const { playFile, ...input } = getValues();
      let url, playLength;

      // TODO: playFile will contain audio file.
      if (playFile.length > 0) {
        setIsSubmitting(true);

        const actualFile = playFile[0];
        const formBody = new FormData();
        formBody.append("file", actualFile);
        const { url: fileUrl } = await (
          await fetch(`https://${BASE_URL}/upload`, {
            method: "POST",
            body: formBody,
          })
        ).json();
        url = fileUrl;
        const audio = new Audio(url);

        audio.onloadedmetadata = () => {
          playLength = audio.duration;
          console.log(audio.duration);
        };
        audio.load();
        setTimeout(() => {}, 1000);
      }

      if (job === "create") {
        setIsSubmitting(true);
        createEpisode({
          variables: { input: { ...input, podcastId: +id, playLength, url } },
        });
      } else if (job === "update") {
        setIsSubmitting(true);
        updateEpisode({
          variables: {
            input: {
              ...input,
              podcastId: +id,
              episodeId: +episodeId,
              playLength,
              url,
            },
          },
        });
      }
    }
  };

  const onYesClick = () => {
    setIsSubmitting(true);
    deleteEpisode({
      variables: { input: { podcastId: +id, episodeId: +episodeId } },
    });
  };
  const onNoClick = () => {
    history.goBack();
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-gray-800">
      <div className="layout__container max-w-sm flex flex-col mt-8 px-1 py-4 border border-purple-200 rounded-lg bg-purple-200">
        {loadingEpisode && <LoaderWithLogo />}
        {(job === "create" || job === "update") && (
          <>
            <h4 className="text-xl font-extrabold text-purple-800 mb-4 text-center">
              {job.toLocaleUpperCase()} EPISODE
            </h4>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col  text-purple-600 text-lg"
            >
              <div className="form__input_wrapper mb-4">
                <input
                  className="form__input"
                  ref={register({
                    required: {
                      value: true,
                      message: "Title required on episode",
                    },
                    minLength: {
                      value: 4,
                      message: "Please write longer title.",
                    },
                  })}
                  placeholder="Title"
                  name="title"
                />
                {errors.title && (
                  <span className="form__error mt-1">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div className="form__input_wrapper mb-4">
                <textarea
                  className="form__input"
                  ref={register({
                    required: {
                      value: true,
                      message: "Description required on episode",
                    },
                    minLength: {
                      value: 4,
                      message: "Please write longer....",
                    },
                  })}
                  placeholder="Description"
                  name="description"
                />
                {errors.description && (
                  <span className="text-sm text-red-600 italic text-left mt-1">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="w-full flex flex-col">
                <label
                  htmlFor="thumbnailFile"
                  className="mb-1 text-purple-800 font-bold"
                >
                  Upload audio
                </label>
              </div>
              <div className="form__input_wrapper">
                <input
                  className="form__input border-purple-800"
                  type="file"
                  id="playFile"
                  name="playFile"
                  accept="audio/*"
                  ref={register()}
                />
              </div>
              <ButtonInactivable
                isActivate={!isSubmitting}
                loading={isSubmitting}
              >
                {job.toLocaleUpperCase()}
              </ButtonInactivable>
            </form>
          </>
        )}
        {job === "delete" && (
          <div className="flex flex-col items-center">
            <h4 className="text-purple-600 text-center font-extrabold">
              !!!ARE YOU SURE DELETE IT?!!!
            </h4>
            <div className="flex justify-around w-1/2">
              <button
                className={`form__button flex justify-center items-center w-full ${
                  isSubmitting
                    ? "pointer-events-none bg-gray-400"
                    : "bg-red-600 hover:bg-red-800"
                }`}
                onClick={onYesClick}
              >
                {isSubmitting ? <Loader /> : "YES"}
              </button>
              <button
                className="form__button w-full bg-yellow-600 hover:bg-yellow-800 ml-2"
                onClick={onNoClick}
              >
                NO
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
