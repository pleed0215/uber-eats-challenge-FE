import {
  faArrowAltCircleDown,
  faStream,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { PartEpisode } from "../codegen/PartEpisode";
import { EpisodeItem } from "./EpisodeItem";

interface IEpisodeList {
  episodes?: Array<PartEpisode> | null;
  title: string;
  loading: boolean;
}

export const EpisodeList: React.FC<IEpisodeList> = ({
  episodes,
  title,
  loading,
}) => {
  return (
    <div className="w-full flex flex-col text-white">
      {loading ? (
        <>
          <div className="w-full max-w-xs rounded-lg h-8 animate-pulse bg-purple-200 mt-4" />
          {Array.from(Array(7).keys()).map((_, index) => (
            <div
              key={`skeleton-episode-${index}`}
              className="flex flex-col h-70 p-2 my-3"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 mr-4 rounded-md bg-purple-200 animate-pulse" />
                <div className="flex flex-col justify-center">
                  <div className="w-2/3 h-8 bg-purple-200 rounded-lg animate-pulse mb-2" />
                  <div className="w-1/3 h-6 rounded-lg bg-purple-200 animate-pulse mb-2" />
                </div>
              </div>
              <div className="flex flex-col mb-2 h-30">
                <div className="w-2/3 h-8 bg-purple-200 rounded-lg animate-pulse mb-2" />
                <div className="w-2/3 h-6 bg-purple-200 rounded-lg animate-pulse mb-2" />
                <div className="w-1/3 h-6 bg-purple-200 rounded-lg animate-pulse" />
              </div>
              <div className="flex flex-start items-center text-purple-200">
                <div className="w-32 h-8 py-1 px-2 rounded-3xl border border-gray-200 animate-pulse mr-4" />
                <FontAwesomeIcon
                  icon={faStream}
                  className="mr-4 animate-pulse"
                  size="lg"
                />
                <FontAwesomeIcon
                  icon={faArrowAltCircleDown}
                  size="lg"
                  className="animate-pulse"
                />
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <h4 className="text-2xl mb-4 font-bold">{title}</h4>
          {episodes?.map((episode) => (
            <EpisodeItem key={`episode-${episode.id}`} episode={episode} />
          ))}
        </>
      )}
    </div>
  );
};
