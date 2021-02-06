import { gql, useLazyQuery } from "@apollo/client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  SearchPodcast,
  SearchPodcastVariables,
} from "../../codegen/SearchPodcast";
import { HelmetOnlyTitle } from "../../components/HelmetOnlyTitle";
import { LoaderWithLogo } from "../../components/LoaderWithLogo";
import { Pagination } from "../../components/Pagination";
import { PodcastList } from "../../components/PodcastList";
import { FRAGMENT_PODCAST } from "../../fragments";
import { useQueryParam } from "../../hooks/useQueryParam";

interface ISearchForm {
  title: string;
}

const GQL_SEARCH_PODCAST = gql`
  query SearchPodcast($input: SearchPodcastInput!) {
    searchPodcast(input: $input) {
      ok
      error
      totalCount
      totalPage
      currentPage
      currentCount
      results {
        ...PartPodcast
      }
    }
  }
  ${FRAGMENT_PODCAST}
`;

export const SearchPage = () => {
  const queryParam = useQueryParam().get("title");
  const [searchPodcast, { data: podcasts, loading }] = useLazyQuery<
    SearchPodcast,
    SearchPodcastVariables
  >(GQL_SEARCH_PODCAST);
  const [page, setPage] = useState(1);
  const { handleSubmit, register, getValues, errors } = useForm<ISearchForm>();

  useEffect(() => {
    if (queryParam && queryParam !== "")
      searchPodcast({
        variables: {
          input: {
            title: queryParam,
            page,
          },
        },
      });
  }, [queryParam, page]);

  const onPrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
    window.scrollTo(0, 0);
  };

  const onNext = () => {
    if (podcasts) {
      if (page < (podcasts.searchPodcast.totalPage || 0)) {
        setPage(page + 1);
      }
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-800">
      <HelmetOnlyTitle title="Search" />
      {loading && <LoaderWithLogo />}
      <div className="layout__container flex flex-col  mt-4">
        <form
          method="GET"
          action="/search"
          className="flex flex-col w-full items-center"
        >
          <div className="flex flex-col mt-6 w-full">
            <label
              className="text-2xl text-white font-bold mb-4"
              htmlFor="title"
            >
              Write podcast title to search...
            </label>
            <input
              name="title"
              type="text"
              ref={register({
                required: { value: true, message: "Title required" },
              })}
              placeholder="Search podcasts by title..."
              className="text-xl p-2 italic w-full rounded-lg"
            />
            {errors.title && (
              <span className="text-sm text-red-600 italic text-center mt-1">
                {errors.title.message}
              </span>
            )}
          </div>
        </form>
        {queryParam && (
          <>
            <PodcastList
              podcasts={podcasts?.searchPodcast.results}
              title={`Search by: ${queryParam} (${podcasts?.searchPodcast.totalCount} found)`}
              loading={loading}
            />
            <div className="w-full flex justify-center">
              <Pagination
                onNext={onNext}
                onPrev={onPrev}
                totalPage={podcasts?.searchPodcast.totalPage}
                currentPage={page}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
