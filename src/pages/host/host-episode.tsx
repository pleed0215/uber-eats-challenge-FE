import React, { useEffect, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { FRAGMENT_EPISODE } from "../../fragments";
import {
  QueryGetPodcast,
  QueryGetPodcastVariables,
} from "../../codegen/QueryGetPodcast";
import { GQL_GET_EPISODES, GQL_GET_PODCAST } from "../home/podcast";
import { Link, useParams } from "react-router-dom";
import { LoaderWithLogo } from "../../components/LoaderWithLogo";
import {
  secondsToTime,
  timeSince,
  useBackgroundImageOrDefaultUrl,
} from "../../utils";

import {
  QueryGetEpisodes,
  QueryGetEpisodesVariables,
} from "../../codegen/QueryGetEpisodes";
import { Pagination } from "../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export const HostEpisodePage = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);

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
    getEpisodes({
      variables: {
        podcastId: +id,
        page,
      },
    });
  }, [page]);

  const onPrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
    window.scrollTo(0, 0);
  };

  const onNext = () => {
    if (episodes) {
      if (page < (episodes.getEpisodes.totalPage || 0)) {
        setPage(page + 1);
      }
    }
    window.scrollTo(0, 0);
  };

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
                  <strong>Category: </strong>
                  {podcast?.getPodcast.podcast?.category}
                </h6>

                <h6 className="text-md font-bold">Description</h6>
                <p className="text-sm mt-2 block truncate">
                  {podcast?.getPodcast.podcast?.description}
                </p>
                <h6 className="text-md font-bold mt-4">
                  <strong>Listener: </strong>
                  {podcast?.getPodcast.podcast?.numSubscriber}
                </h6>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col mt-10">
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
            {/* TODO: Episode list as table, and Each table item can get remove / update menu. 
                    Table Column: ID, since ago, play length, title, description(ellipis), menu*/}
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
        </div>
      )}
    </div>
  );
};
