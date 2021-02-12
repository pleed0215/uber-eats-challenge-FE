import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";

import {
  QueryGetPodcast,
  QueryGetPodcastVariables,
} from "../../codegen/QueryGetPodcast";
import { GQL_GET_EPISODES, GQL_GET_PODCAST } from "../home/podcast";
import { Link, useParams } from "react-router-dom";
import { LoaderWithLogo } from "../../components/LoaderWithLogo";
import { secondsToTime, useBackgroundImageOrDefaultUrl } from "../../utils";

import {
  QueryGetEpisodes,
  QueryGetEpisodesVariables,
} from "../../codegen/QueryGetEpisodes";
import { Pagination } from "../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPodcast,
  faTrash,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  QuerySeeReviews,
  QuerySeeReviewsVariables,
} from "../../codegen/QuerySeeReviews";
import { GQL_GET_REVIEWS } from "../home/podcast";

export const HostEpisodePage = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [whichTab, setWhichTab] = useState<"episodes" | "reviews">("episodes");

  const { data: podcast, loading: loadingPodcast } = useQuery<
    QueryGetPodcast,
    QueryGetPodcastVariables
  >(GQL_GET_PODCAST, { variables: { id: +id } });

  const [
    getEpisodes,
    { data: episodes, loading: loadingEpisodes },
  ] = useLazyQuery<QueryGetEpisodes, QueryGetEpisodesVariables>(
    GQL_GET_EPISODES
  );

  useEffect(() => {
    if (whichTab === "episodes") {
      getEpisodes({
        variables: {
          podcastId: +id,
          page,
        },
      });
    } else {
      getReviews({ variables: { podcastId: +id, page } });
    }
  }, [whichTab, page]);

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

  const [
    getReviews,
    { data: reviews, loading: loadingReview, error },
  ] = useLazyQuery<QuerySeeReviews, QuerySeeReviewsVariables>(GQL_GET_REVIEWS);

  return (
    <div className="w-screen min-h-screen flex justify-center bg-gray-800">
      {(loadingPodcast || loadingEpisodes) && <LoaderWithLogo />}
      {!loadingPodcast && !loadingEpisodes && (
        <div className="layout__container   flex flex-col mt-12 px-2">
          <h4 className="text-xl font-bold text-white">
            Podcast: {podcast?.getPodcast.podcast?.title}
          </h4>
          <div className="flex items-start mt-3 w-full">
            <div className="flex flex-col mr-2 w-26">
              <div
                className="w-24 h-24 bg-center bg-cover rounded-lg bg-purple-100"
                style={useBackgroundImageOrDefaultUrl(
                  podcast?.getPodcast.podcast?.thumbnail
                )}
              />
              <Link
                to={`/host/${podcast?.getPodcast.podcast?.id}/update`}
                className="form__button mt-2 text-center"
              >
                Update
              </Link>
            </div>
            <div className="flex flex-col w-full overflow-hidden">
              <div className="flex flex-col  text-white p-2 border rounded-lg w-full">
                <h6 className="text-md font-bold">
                  <strong>
                    <FontAwesomeIcon
                      icon={faPodcast}
                      className="mr-1 text-purple-400"
                    />
                    Category:{" "}
                  </strong>
                  {podcast?.getPodcast.podcast?.category}
                </h6>

                <h6 className="text-md font-bold">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="mr-1 text-purple-400"
                  />
                  Description
                </h6>
                <p className="text-sm mt-2 block truncate">
                  {podcast?.getPodcast.podcast?.description}
                </p>
                <h6 className="text-md font-bold mt-4">
                  <strong>
                    <FontAwesomeIcon
                      icon={faUsers}
                      className="mr-1 text-purple-400"
                    />
                    Listener:{" "}
                  </strong>
                  {podcast?.getPodcast.podcast?.numSubscriber}
                </h6>
              </div>
            </div>
          </div>
          {!loadingPodcast && (
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
            <div className="w-full flex flex-col">
              <div className="flex items-center">
                <h4 className="text-xl font-bold text-white">Episodes</h4>
                <Link
                  to={`/host/${id}/episode/create`}
                  className="form__button mt-0 ml-2"
                >
                  CREATE
                </Link>
              </div>
              <p className="text-md text-white">
                {episodes?.getEpisodes.totalCount === 0
                  ? "No Episode... How about create one?..."
                  : `${episodes?.getEpisodes.totalCount} Episodes`}
              </p>

              {episodes?.getEpisodes.totalCount !== 0 && (
                <table
                  className="table-fixed border-collapse text-white border w-full rounded-lg mt-4"
                  cellPadding="8px"
                >
                  <thead>
                    <th className="w-1/12">ID</th>
                    <th className="w-1/6 truncate">Title</th>
                    <th className=" w-1/6">Listened</th>
                    <th className="w-1/6">Length</th>
                    <th className="w-1/2">Description</th>
                    <th className="w-1/12 truncate">Menu</th>
                  </thead>
                  <tbody className="text-xs text-center">
                    {episodes?.getEpisodes.episodes?.map((episode) => (
                      <tr
                        key={episode.id}
                        className="border y-1 hover:bg-purple600 hover:text-white"
                      >
                        <td>{episode.id}</td>
                        <td>{episode.title}</td>
                        <td>{episode.watchCounter}</td>
                        <td>{secondsToTime(episode.playLength || 0)}</td>
                        <td className="text-left truncate">
                          {episode.description}
                        </td>
                        <td>
                          <div className="flex items-center justify-around">
                            <Link
                              to={`/host/${id}/episode/${episode.id}/update`}
                              className="hover:bg-purple-600 transition duration-300 rounded-full w-8 h-8 flex items-center justify-center"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Link>
                            <Link
                              to={`/host/${id}/episode/${episode.id}/delete`}
                              className="hover:bg-purple-600 transition duration-300 rounded-full w-8 h-8 flex items-center justify-center"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div className="mt-2 self-center">
                {episodes?.getEpisodes?.totalPage !== 0 && (
                  <Pagination
                    onNext={onNext}
                    onPrev={onPrev}
                    currentPage={page}
                    totalPage={episodes?.getEpisodes.totalPage}
                  />
                )}
              </div>
            </div>
          )}
          {whichTab === "reviews" && (
            <div className="w-full flex flex-col">
              <h4 className="text-xl font-bold text-white">Reviews</h4>

              <p className="text-md text-white">
                {reviews?.seePodcastReviews.totalCount === 0
                  ? "... No Reviews... "
                  : `${episodes?.getEpisodes.totalCount} Review(s)`}
              </p>

              {reviews?.seePodcastReviews.totalCount !== 0 && (
                <table
                  className="table-fixed border-collapse text-white border w-full rounded-lg mt-4"
                  cellPadding="8px"
                >
                  <thead>
                    <th className="w-1/12">ID</th>
                    <th className="w-1/6 truncate">Reveiwer</th>
                    <th className=" w-1/12">Rating</th>
                    <th className="w-2/3">Review</th>
                  </thead>
                  <tbody className="text-xs text-center">
                    {reviews?.seePodcastReviews.reviews?.map((review) => (
                      <tr
                        key={review.id}
                        className="border y-1 hover:bg-purple600 hover:text-white"
                      >
                        <td>{review.id}</td>
                        <td>
                          <Link
                            to={`/user/${review.reviewer.id}`}
                            className="truncate flex items-center"
                          >
                            <div
                              className={`w-5 h-5 mr-1 bg-cover bg-center rounded-full bg-purple-100`}
                              style={useBackgroundImageOrDefaultUrl(
                                review.reviewer.portrait
                              )}
                            />
                            {review.reviewer.email}
                          </Link>{" "}
                        </td>
                        <td>{review.rating}</td>
                        <td className="text-left truncate">{review.content}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div className="mt-2 self-center">
                {episodes?.getEpisodes?.totalPage !== 0 && (
                  <Pagination
                    onNext={onNext}
                    onPrev={onPrev}
                    currentPage={page}
                    totalPage={episodes?.getEpisodes.totalPage}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
