import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  QueryGetEpisode,
  QueryGetEpisodeVariables,
} from "../../codegen/QueryGetEpisode";
import {
  QueryGetEpisodes,
  QueryGetEpisodesVariables,
} from "../../codegen/QueryGetEpisodes";
import { EpisodeItem } from "../../components/EpisodeItem";
import { EpisodeList } from "../../components/EpisodeList";
import { HelmetOnlyTitle } from "../../components/HelmetOnlyTitle";
import { LoaderWithLogo } from "../../components/LoaderWithLogo";
import { Pagination } from "../../components/Pagination";
import { FRAGMENT_EPISODE } from "../../fragments";
import { GQL_GET_EPISODES } from "./podcast";

const GQL_GET_EPISODE = gql`
  query QueryGetEpisode($podcastId: Int!, $episodeId: Int!) {
    getEpisode(input: { podcastId: $podcastId, episodeId: $episodeId }) {
      ok
      error
      episode {
        ...PartEpisode
      }
    }
  }
  ${FRAGMENT_EPISODE}
`;

export const EpisodePage = () => {
  const { podcastId, episodeId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();
  const [page, setPage] = useState<number>(1);
  const { data: episodeData, loading } = useQuery<
    QueryGetEpisode,
    QueryGetEpisodeVariables
  >(GQL_GET_EPISODE, {
    variables: {
      podcastId: +podcastId,
      episodeId: +episodeId,
    },
  });

  const [
    getEpisodes,
    { data: episodes, loading: loadingEpisodes, error },
  ] = useLazyQuery<QueryGetEpisodes, QueryGetEpisodesVariables>(
    GQL_GET_EPISODES
  );

  useEffect(() => {
    getEpisodes({
      variables: {
        page,
        podcastId: +podcastId,
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
      if (page < (episodes?.getEpisodes?.totalPage || 0)) {
        setPage(page + 1);
      }
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-screen min-h-screen bg-gray-800 flex flex-col items-center relative">
      <HelmetOnlyTitle title="Episode" />
      <div className="w-full xl:max-w-screen-lg lg:max-w-screen-md md:max-w-screen-sm sm:max-w-md px-4 flex justify-between flex flex-col">
        {(loading || loadingEpisodes) && <LoaderWithLogo />}
        {loading && episodeData ? (
          <></>
        ) : (
          <>
            <h4 className="text-white text-2xl font-bold my-4">
              Now Listening...
            </h4>
            <EpisodeItem episode={episodeData?.getEpisode?.episode} />
            <div className="h-4" />
            <hr />
            <div className="h-4" />
            <span className="text-sm text-white mb-2">Podcast from...</span>
            <Link
              to={`/podcast/${episodeData?.getEpisode.episode?.podcast.id}`}
              className="rounded-lg hover:bg-purple-700 p-4"
            >
              <div className="flex items-center h-16">
                <div
                  className="w-12 h-12 bg-cover bg-center rounded-lg mr-4"
                  style={{
                    backgroundImage: `url(${episodeData?.getEpisode.episode?.podcast.thumbnail})`,
                  }}
                />
                <div className="flex flex-col items-start h-full p-1 text-white">
                  <p className="text-sm font-bold">
                    {episodeData?.getEpisode.episode?.podcast.title}
                  </p>
                  <p className="text-xs font-bold">
                    <span className="mb-2 mr-1 text-purple-300">
                      {episodeData?.getEpisode.episode?.podcast.host.email}
                    </span>
                    <span className="text-purple-300 italic">
                      ({episodeData?.getEpisode.episode?.podcast.host.name})
                    </span>
                  </p>
                </div>
              </div>
            </Link>
            <hr className="my-3" />
            <EpisodeList
              episodes={episodes?.getEpisodes.episodes}
              loading={loadingEpisodes}
              title={`${episodes?.getEpisodes.totalCount} Episodes (${page} of ${episodes?.getEpisodes.totalPage})`}
            />
            <div className="w-full flex justify-center">
              <Pagination
                onNext={onNext}
                onPrev={onPrev}
                totalPage={episodes?.getEpisodes.totalPage}
                currentPage={page}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
