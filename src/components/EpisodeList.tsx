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
      <h4 className="text-2xl mb-4 font-bold">{title}</h4>
      {episodes?.map((episode) => (
        <EpisodeItem key={`episode-${episode.id}`} episode={episode} />
      ))}
    </div>
  );
};
