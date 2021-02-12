import {
  faPauseCircle,
  faPlayCircle,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useRef, useState } from "react";
import { PlayerContext } from "../routes/logged.in.route";
import { secondsToString } from "../utils";

export const PodcastPlayer = () => {
  const playerState = useContext(PlayerContext);
  const slider = useRef<HTMLInputElement>(document.createElement("input"));
  const [isVolumeVisble, setIsVolumeVisible] = useState(false);

  const toggleShowing = () => {
    playerState?.setIsShowing(!playerState.isShowing);
  };

  return (
    <div className="flex justify-center items-center inset-x-0 bottom-0 fixed">
      <div
        className="w-full max-w-sm bg-red-600 text-white py-3 px-3 rounded-t-xl flex flex-col"
        onClick={() => toggleShowing()}
      >
        <div className="flex justify-center text-sm w-full mb-2">
          {playerState?.title !== null
            ? playerState?.title
            : "No Podcast selected"}
          {playerState?.isShowing ? "Show" : "Hide"}
        </div>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            {playerState?.isPlaying ? (
              <FontAwesomeIcon
                icon={faPauseCircle}
                size="2x"
                className="hover:text-purple-400 transition duration-300 cursor-pointer"
              />
            ) : (
              <FontAwesomeIcon
                icon={faPlayCircle}
                size="2x"
                className="hover:text-purple-400 transition duration-300 cursor-pointer"
              />
            )}
          </div>
          <div className="text-xs mr-2">00:00:00</div>
          <div className="w-full mr-1 player -mt-1">
            <input ref={slider} type="range" className=" w-full" />
          </div>
          <div className="text-xs mr-2">{secondsToString(9890)}</div>
          <div
            className="-mt-1 vertical__wrapper"
            onClick={() => setIsVolumeVisible(!isVolumeVisble)}
          >
            <FontAwesomeIcon
              icon={faVolumeUp}
              size="sm"
              className="hover:text-purple-600 transition duration-300 cursor-pointer"
            />
            {isVolumeVisble && (
              <input
                type="range"
                className="w-30 -left-14 -top-20 vertical__range absolute"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
