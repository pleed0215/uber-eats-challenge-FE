import {
  faArrowAltCircleDown,
  faArrowCircleDown,
  faCheckCircle,
  faPlayCircle,
  faPodcast,
  faStream,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PartEpisode } from "../codegen/PartEpisode";
import { PlayerContext } from "../routes/logged.in.route";
import {
  timeSince,
  secondsToTime,
  useBackgroundImageOrDefaultUrl,
} from "../utils";

interface IEpisodeItem {
  episode?: PartEpisode | null;
}

export const EpisodeItem: React.FC<IEpisodeItem> = ({ episode }) => {
  const playerState = useContext(PlayerContext);
  const onPlayClick = () => {
    if (episode?.title) playerState?.setEpisode(episode);
    if (episode?.url) {
      playerState?.setFileUrl(episode.url);
    } else {
      playerState?.setFileUrl("/sample.mp3");
    }

    playerState?.setIsShowing(true);
  };

  return (
    <div className="flex flex-col text-white h-70 p-3 my-3 border rounded-lg">
      <Link to={`/podcast/${episode?.podcast.id}/episodes/${episode?.id}`}>
        <div className="flex items-center mb-4">
          <div
            className="w-16 h-16 bg-cover bg-center mr-4 rounded-md bg-purple-100"
            style={useBackgroundImageOrDefaultUrl(episode?.podcast.thumbnail)}
          />
          <div className="flex flex-col justify-center">
            <h6 className="text-lg font-semibold truncate">
              {episode?.podcast.title}
            </h6>
            <div className="flex text-purple-200 items-center mt-2">
              <p className="text-md mr-4">
                {timeSince(episode?.createdAt)} ago
              </p>
              <p className="text-xs italic py-1 px-2 rounded-3xl border border-purple-200">
                <FontAwesomeIcon icon={faPodcast} className="mr-2" />
                {episode?.watchCounter} listened
              </p>
              {episode?.haveSeen && (
                <>
                  <span className="italic text-xs py-1 px-2 border border-purple-200 rounded-3xl ml-4">
                    <FontAwesomeIcon icon={faCheckCircle} /> listened
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-col mb-2 h-30">
        <h4 className="text-2xl font-semibold">{episode?.title}</h4>
        <p className="text-md overflow-ellipsis">{episode?.description}</p>
      </div>
      <div className="flex flex-start items-center text-purple-200">
        <button
          className="flex items-center py-1 px-2 rounded-3xl border border-gray-200 mr-4 hover:text-white hover:bg-purple-600 duration-300 transition"
          onClick={onPlayClick}
        >
          <FontAwesomeIcon icon={faPlayCircle} className="mr-2" />
          <span>{secondsToTime(episode?.playLength || 0)}</span>
        </button>
        <FontAwesomeIcon icon={faStream} className="mr-4" size="lg" />
        <FontAwesomeIcon icon={faArrowAltCircleDown} size="lg" />
      </div>
    </div>
  );
};
