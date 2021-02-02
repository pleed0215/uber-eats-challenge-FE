import {
  faArrowAltCircleDown,
  faArrowCircleDown,
  faPlayCircle,
  faStream,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { PartEpisode } from "../codegen/PartEpisode";
import { timeSince, secondsToTime } from "../utils";

interface IEpisodeItem {
  episode?: PartEpisode;
}

export const EpisodeItem: React.FC<IEpisodeItem> = ({ episode }) => {
  return (
    <div className="bflex flex-col text-white h-70 p-2 my-3">
      <div className="flex items-center mb-4">
        <div
          className="w-16 h-16 bg-cover bg-center mr-4 rounded-md"
          style={{ backgroundImage: `url(${episode?.podcast.thumbnail})` }}
        />
        <div className="flex flex-col justify-center">
          <h6 className="text-lg font-semibold truncate">
            {episode?.podcast.title}
          </h6>
          <p className="text-md">{timeSince(episode?.createdAt)} ago</p>
        </div>
      </div>
      <div className="flex flex-col mb-2 overflow-y-scroll h-30">
        <h4 className="text-2xl font-semibold">{episode?.title}</h4>
        <p className="text-md overflow-ellipsis">{episode?.description}</p>
      </div>
      <div className="flex flex-start items-center text-purple-200">
        <div className="flex items-center py-1 px-2 rounded-3xl border border-gray-200 mr-4">
          <FontAwesomeIcon icon={faPlayCircle} className="mr-2" />
          <span>{secondsToTime(episode?.playLength || 0)}</span>
        </div>
        <FontAwesomeIcon icon={faStream} className="mr-4" size="lg" />
        <FontAwesomeIcon icon={faArrowAltCircleDown} size="lg" />
      </div>
    </div>
  );
};
