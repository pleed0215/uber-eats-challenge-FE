import { gql, useMutation } from "@apollo/client";
import {
  faPauseCircle,
  faPlayCircle,
  faVolumeUp,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { MarkAsPlayed, MarkAsPlayedVariables } from "../codegen/MarkAsPlayed";
import { GQL_GET_EPISODE } from "../pages/home/episode";
import { PlayerContext } from "../routes/logged.in.route";
import { secondsToString } from "../utils";
import { Loader } from "./Loader";

let intervalHandler: NodeJS.Timeout;

const GQL_MAKR_AS_PLAY = gql`
  mutation MarkAsPlayed($input: MarkEpisodeAsPlayedInput!) {
    markEpisodeAsPlayed(input: $input) {
      ok
      error
    }
  }
`;

export const PodcastPlayer = () => {
  const playerState = useContext(PlayerContext);
  const slider = useRef<HTMLInputElement>(document.createElement("input"));
  const audio = useRef<HTMLAudioElement>(document.createElement("audio"));
  const [isVolumeVisble, setIsVolumeVisible] = useState(false);
  const [volume, setVolume] = useState(100);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [markAsPlayed] = useMutation<MarkAsPlayed, MarkAsPlayedVariables>(
    GQL_MAKR_AS_PLAY,
    {
      onCompleted: () => {
        setLoading(false);
      },
      refetchQueries: [
        {
          query: GQL_GET_EPISODE,
          variables: {
            podcastId: playerState?.episode?.podcast.id,
            episodeId: playerState?.episode?.id,
          },
        },
      ],
    }
  );

  const onCloseClick = () => {
    playerState?.setIsShowing(false);
    playerState?.setIsPlaying(false);
    clearInterval(intervalHandler);
  };

  const onVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(+e.target.value);
    audio.current.volume = +e.target.value / 100;
  };

  const onPlayClick = () => {
    if (playerState?.isPlaying) {
      if (intervalHandler) clearInterval(intervalHandler);
      audio.current.pause();
    } else {
      audio.current.play();
      intervalHandler = setInterval(() => {
        setCurrentTime(audio.current.currentTime + 1);
      }, 1000);
    }
    playerState?.setIsPlaying(!playerState.isPlaying);
  };

  const onSeek = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(+e.target.value);
    audio.current.currentTime = +e.target.value;
  };

  useEffect(() => {
    if (playerState?.fileUrl) {
      audio.current.onloadedmetadata = () => {
        setDuration(audio.current.duration);
        setCurrentTime(0);
        setLoading(false);
      };
      audio.current.onended = () => {
        clearInterval(intervalHandler);
        playerState.setIsPlaying(false);
        audio.current.currentTime = 0;
        setCurrentTime(0);
        if (playerState.episode && !playerState.episode.haveSeen) {
          setLoading(true);
          markAsPlayed({
            variables: { input: { episodeId: playerState.episode?.id } },
          });
        }
      };

      audio.current.src = playerState?.fileUrl;
      audio.current.load();
      setLoading(true);
    }
  }, [playerState?.fileUrl, playerState?.episode]);

  if (!playerState?.isShowing) {
    return <></>;
  }

  return (
    playerState?.isShowing && (
      <div className="flex justify-center items-center inset-x-0 bottom-0 fixed">
        <div
          className={`w-full max-w-sm bg-gradient-to-br from-purple-800  to-indigo-800 text-white py-3 px-3 rounded-t-xl flex flex-col relative ${
            playerState.isShowing ? "player__show" : "player__hide"
          }`}
        >
          <button
            className="absolute w-8 h-8 right-0 top-0 hover:text-purple-300 duration-300 transition  focus:outline-none"
            onClick={onCloseClick}
          >
            <FontAwesomeIcon icon={faWindowClose} size="lg" />
          </button>
          <audio ref={audio}>You're browser does not support audio tag.</audio>
          <div className="flex justify-center text-sm w-full mb-2">
            {loading && <Loader />}
            {!loading && playerState?.episode !== null && (
              <Link
                to={`/podcast/${playerState.episode?.podcast.id}/episodes/${playerState.episode?.id}`}
              >
                <div className="flex flex-col text-xs font-bold items-center">
                  <p>
                    <strong>Podcast: </strong>
                    {playerState?.episode?.podcast.title}
                  </p>
                  <p className="text-xs font-thin">
                    {playerState?.episode?.title}
                  </p>
                </div>
              </Link>
            )}
          </div>
          <div className="flex justify-between items-center">
            <button className="mr-2 focus:outline-none" onClick={onPlayClick}>
              {playerState?.isPlaying ? (
                <FontAwesomeIcon
                  icon={faPauseCircle}
                  size="2x"
                  className="hover:text-purple-300 transition duration-300 cursor-pointer"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPlayCircle}
                  size="2x"
                  className="hover:text-purple-300 transition duration-300 cursor-pointer"
                />
              )}
            </button>
            <div className="text-xs mr-2">{secondsToString(currentTime)}</div>
            <div className="w-full mr-1 player -mt-1">
              <input
                ref={slider}
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={onSeek}
                className=" w-full"
              />
            </div>
            <div className="text-xs mr-2">{secondsToString(duration)}</div>
            <div
              className="-mt-1 vertical__wrapper"
              onClick={() => setIsVolumeVisible(!isVolumeVisble)}
            >
              <FontAwesomeIcon
                icon={faVolumeUp}
                size="sm"
                className="hover:text-purple-300 transition duration-300 cursor-pointer"
              />
              {isVolumeVisble && (
                <input
                  type="range"
                  value={volume}
                  onChange={onVolumeChange}
                  min={0}
                  max={100}
                  step={1}
                  className="w-30 -left-14 -top-20 vertical__range absolute"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};
