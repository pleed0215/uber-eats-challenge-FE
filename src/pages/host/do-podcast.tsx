import { gql, useLazyQuery, useMutation } from "@apollo/client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  CreatePodcast,
  CreatePodcastVariables,
} from "../../codegen/CreatePodcast";
import {
  DeletePodcast,
  DeletePodcastVariables,
} from "../../codegen/DeletePodcast";
import {
  QueryGetPodcast,
  QueryGetPodcastVariables,
} from "../../codegen/QueryGetPodcast";
import {
  UpdatePodcast,
  UpdatePodcastVariables,
} from "../../codegen/UpdatePodcast";
import { ButtonInactivable } from "../../components/ButtonInactivable";
import { Loader } from "../../components/Loader";
import { LoaderWithLogo } from "../../components/LoaderWithLogo";
import { BASE_URL } from "../../utils";
import { categories } from "../home/category";
import { GQL_GET_PODCAST } from "../home/podcast";
import { GQL_MY_PODCASTS } from "./host";

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

//export type Category = typeof categories[number];

interface IForm {
  title: string;
  description: string;
  thumbnailFile: FileList;
  //  category: Category;
  category: string;
}

export const DoPodcast = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation(); // possible pathname on this component: '/host/create', /host/edit/:id, /host/delete/:id
  const [job, setJob] = useState<"create" | "delete" | "update">();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState<any>();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState,
    errors,
  } = useForm<IForm>({ mode: "onBlur" });
  const history = useHistory();

  const [createPodcast] = useMutation<CreatePodcast, CreatePodcastVariables>(
    GQL_CREATE_PODCAST,
    {
      onCompleted: () => {
        setIsSubmitting(false);
        history.push("/host");
      },
      refetchQueries: [
        {
          query: GQL_MY_PODCASTS,
        },
      ],
    }
  );
  const [udpatePodcast] = useMutation<UpdatePodcast, UpdatePodcastVariables>(
    GQL_UPDATE_PODCAST,
    {
      onCompleted: () => {
        setIsSubmitting(false);
        history.push("/host");
      },
      refetchQueries: [
        {
          query: GQL_MY_PODCASTS,
        },
      ],
    }
  );
  const [deletePodcast] = useMutation<DeletePodcast, DeletePodcastVariables>(
    GQL_DELETE_PODCAST,
    {
      onCompleted: () => {
        setIsSubmitting(false);
        history.push("/host");
      },
      refetchQueries: [
        {
          query: GQL_MY_PODCASTS,
        },
      ],
    }
  );
  const [getPodcast, { data: podcast, loading: loadingPodcast }] = useLazyQuery<
    QueryGetPodcast,
    QueryGetPodcastVariables
  >(GQL_GET_PODCAST, {
    onCompleted: (data: QueryGetPodcast) => {
      if (data.getPodcast.ok) {
        setValue("title", data.getPodcast.podcast?.title);
        setValue("category", data.getPodcast.podcast?.category);
        setValue("description", data.getPodcast.podcast?.description);
        setThumbnailImage(data.getPodcast.podcast?.thumbnail);
        // TODO; thumbnail job....
      }
    },
  });

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
      getPodcast({ variables: { id: +id } });
    }
  }, [job]);

  const onSubmit = async () => {
    if (formState.isValid) {
      const { thumbnailFile, ...input } = getValues();
      let thumbnail;

      if (thumbnailFile && thumbnailFile?.length > 0) {
        setIsSubmitting(true);
        const actualFile = thumbnailFile[0];
        const formBody = new FormData();
        formBody.append("file", actualFile);
        const { url } = await (
          await fetch(`https://${BASE_URL}/upload`, {
            method: "POST",
            body: formBody,
          })
        ).json();
        thumbnail = url;
      }

      if (job === "create") {
        setIsSubmitting(true);
        createPodcast({ variables: { input: { ...input, thumbnail } } });
      } else if (job === "update") {
        setIsSubmitting(true);
        console.log(id);
        udpatePodcast({
          variables: { input: { ...input, thumbnail, podcastId: +id } },
        });
      }
    }
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      e.preventDefault();
      const file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onYesClick = () => {
    setIsSubmitting(true);
    deletePodcast({ variables: { input: { id: +id } } });
  };
  const onNoClick = () => {
    history.replace("/host");
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-gray-800">
      <div className="layout__container max-w-sm flex flex-col mt-8 px-1 py-4 border border-purple-200 rounded-lg bg-purple-200">
        {loadingPodcast && <LoaderWithLogo />}
        {(job === "create" || job === "update") && (
          <>
            <h4 className="text-xl font-extrabold text-purple-800 mb-4 text-center">
              {job.toLocaleUpperCase()} PODCAST
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
                      message: "Title required on podcast",
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
                      message: "Description required on podcast",
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
              <div className="form__input_wrapper mb-4">
                <label
                  htmlFor="category"
                  className="mb-1 text-purple-800 font-bold"
                >
                  Category
                </label>
                <select
                  ref={register()}
                  id="category"
                  name="category"
                  className="form__input"
                  defaultValue="Book"
                >
                  {categories.map((category, index) => (
                    <option key={index}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="w-full flex flex-col">
                <label
                  htmlFor="thumbnailFile"
                  className="mb-1 text-purple-800 font-bold"
                >
                  Thumbnail
                </label>
                <div className="w-32 h-32 p-1 border rounded-lg border-purple-800 mb-3 flex self-center items-center justify-center">
                  <img src={thumbnailImage} className="w-28 h-28" />
                </div>
              </div>
              <div className="form__input_wrapper">
                <input
                  className="form__input border-purple-800"
                  type="file"
                  id="thumbnailFile"
                  name="thumbnailFile"
                  accept="image/*"
                  ref={register()}
                  onChange={onImageChange}
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
