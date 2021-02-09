import { gql, useLazyQuery, useQuery } from "@apollo/client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  QueryGetEpisodes,
  QueryGetEpisodesVariables,
} from "../../codegen/QueryGetEpisodes";
import {
  QueryGetPodcast,
  QueryGetPodcastVariables,
} from "../../codegen/QueryGetPodcast";
import {
  QuerySeeReviews,
  QuerySeeReviewsVariables,
} from "../../codegen/QuerySeeReviews";
import { EpisodeList } from "../../components/EpisodeList";
import { HelmetOnlyTitle } from "../../components/HelmetOnlyTitle";
import { LoaderWithLogo } from "../../components/LoaderWithLogo";
import { Pagination } from "../../components/Pagination";
import { PodcastTitle } from "../../components/PodcastTitle";

import { ReviewList } from "../../components/ReviewList";
import {
  FRAGMENT_EPISODE,
  FRAGMENT_PODCAST,
  FRAGMENT_REVIEW,
} from "../../fragments";

const GQL_GET_PODCAST = gql`
  query QueryGetPodcast($id: Int!) {
    getPodcast(input: { id: $id }) {
      ok
      error
      podcast {
        ...PartPodcast
      }
    }
  }
  ${FRAGMENT_PODCAST}
`;
export const GQL_GET_EPISODES = gql`
  query QueryGetEpisodes($podcastId: Int!, $page: Int!) {
    getEpisodes(input: { podcastId: $podcastId, page: $page }) {
      ok
      error
      totalPage
      totalCount
      currentPage
      currentCount
      episodes {
        ...PartEpisode
      }
    }
  }
  ${FRAGMENT_EPISODE}
`;

const GQL_GET_REVIEWS = gql`
  query QuerySeeReviews($podcastId: Int!, $page: Int!) {
    seePodcastReviews(input: { podcastId: $podcastId, page: $page }) {
      ok
      error
      totalPage
      totalCount
      currentPage
      currentCount
      reviews {
        ...PartReview
      }
    }
  }
  ${FRAGMENT_REVIEW}
`;

export const PodcastPage = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<number>(1);
  const [whichTab, setWhichTab] = useState<"episodes" | "reviews">("episodes");
  const { data: podcast, loading: loadingPodcast } = useQuery<
    QueryGetPodcast,
    QueryGetPodcastVariables
  >(GQL_GET_PODCAST, { variables: { id: +id } });

  const [
    getEpisodes,
    { data: episodes, loading: loadingEpispde },
  ] = useLazyQuery<QueryGetEpisodes, QueryGetEpisodesVariables>(
    GQL_GET_EPISODES
  );

  const [
    getReviews,
    { data: reviews, loading: loadingReview, error },
  ] = useLazyQuery<QuerySeeReviews, QuerySeeReviewsVariables>(GQL_GET_REVIEWS);

  useEffect(() => {
    if (whichTab === "episodes") {
      getEpisodes({ variables: { podcastId: +id, page } });
    } else {
      getReviews({ variables: { podcastId: +id, page } });
    }
  }, [whichTab, page]);

  const onEpisodesClick = () => {
    if (whichTab === "reviews") {
      setWhichTab("episodes");
      setPage(1);
    }
  };

  const onReviewsClick = () => {
    if (whichTab === "episodes") {
      setWhichTab("reviews");
      setPage(1);
    }
  };

  const onPrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
    window.scrollTo(0, 0);
  };

  const onNext = () => {
    if (episodes && reviews) {
      const totalPage =
        whichTab === "episodes"
          ? episodes?.getEpisodes?.totalPage
          : reviews?.seePodcastReviews.totalPage;
      if (page < (totalPage || 0)) {
        setPage(page + 1);
      }
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full min-h-screen bg-gray-800 flex flex-col items-center relative">
      <HelmetOnlyTitle title="Podcast" />
      <div className="w-full xl:max-w-screen-lg lg:max-w-screen-md md:max-w-screen-sm flex px-4 justify-between flex-col">
        {(loadingPodcast || loadingEpispde || loadingReview) && (
          <LoaderWithLogo />
        )}
        <PodcastTitle
          podcast={podcast?.getPodcast.podcast}
          loading={loadingPodcast}
        />

        {!loadingPodcast && !loadingEpispde && !loadingReview && (
          <div className="h-10 border-b border-purple-200 mt-10 flex justify-center items-center text-white mb-4">
            <button
              className={`py-2 px-10 ${
                whichTab === "episodes"
                  ? "bg-purple-600 cursor-default underline font-semibold"
                  : "bg-purple-400"
              } text-white rounded-tr-lg rounded-tl-lg `}
              onClick={onEpisodesClick}
            >
              Episodes
            </button>
            <button
              className={`px-10 py-2 text-white  ${
                whichTab === "reviews"
                  ? "bg-purple-600 cursor-default underline font-semibold"
                  : "bg-purple-400"
              } text-white rounded-tr-lg rounded-tl-lg `}
              onClick={onReviewsClick}
            >
              Reviews
            </button>
          </div>
        )}
        {whichTab === "episodes" && (
          <>
            <EpisodeList
              episodes={episodes?.getEpisodes.episodes}
              loading={loadingEpispde}
              title={`${episodes?.getEpisodes.totalCount} Episodes (Page ${page} of ${episodes?.getEpisodes.totalPage})`}
            />
            <div className="w-full flex justify-center">
              <Pagination
                onNext={onNext}
                onPrev={onPrev}
                totalPage={episodes?.getEpisodes.totalPage}
                currentPage={page}
                loading={loadingEpispde}
              />
            </div>
          </>
        )}
        {whichTab === "reviews" && (
          <>
            <ReviewList
              reviews={reviews?.seePodcastReviews.reviews}
              loading={loadingReview}
              title={`${reviews?.seePodcastReviews.totalCount} Reviews (Page ${reviews?.seePodcastReviews.currentPage} of ${reviews?.seePodcastReviews.totalPage})`}
            />
            <div className="w-full flex justify-center">
              <Pagination
                onNext={onNext}
                onPrev={onPrev}
                totalPage={reviews?.seePodcastReviews.totalPage}
                currentPage={page}
                loading={loadingReview}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
