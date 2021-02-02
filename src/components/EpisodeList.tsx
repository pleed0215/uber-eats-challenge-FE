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
              key={index}
              className="w-full bg-purple-200 animate-pulse h-72 rounded-lg my-3"
            />
          ))}
        </>
      ) : (
        <>
          {Array.from(Array(7).keys()).map((_, index) => (
            <div key={index} className="w-full bg-purple-200 animate-pulse" />
          ))}
          <h4 className="text-2xl mb-4 font-bold">{title}</h4>
          {episodes?.map((episode) => (
            <EpisodeItem key={`episode-${episode.id}`} episode={episode} />
          ))}
        </>
      )}
    </div>
  );
};
