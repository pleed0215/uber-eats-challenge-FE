import { faTag, faUserTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { PartPodcast } from "../codegen/PartPodcast";

interface IPodcastList {
  podcasts?: Array<PartPodcast> | null;
  loading: boolean;
  title: string;
}

export const PodcastList: React.FC<IPodcastList> = ({
  podcasts,
  loading,
  title,
}) => {
  return (
    <div className="mt-8 text-white w-full">
      <h4 className="text-2xl mb-8 font-bold">{title}</h4>
      <div className="grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-full sm:px-0 px-2">
        {loading ? (
          <>
            <div className="animate-pulse bg-purple-100 h-52 rounded-lg bg-cover bg-center flex items-end"></div>
            <div className="animate-pulse bg-purple-100 h-52 rounded-lg bg-cover bg-center flex items-end"></div>
            <div className="animate-pulse bg-purple-100 h-52 rounded-lg bg-cover bg-center flex items-end"></div>
            <div className="animate-pulse bg-purple-100 h-52 rounded-lg bg-cover bg-center flex items-end"></div>
          </>
        ) : (
          podcasts?.map((podcast, index) => (
            <Link
              key={index}
              to={`/podcast/${podcast.id}`}
              className="hover:scale-110 transform duration-300"
            >
              <div
                className="bg-blue-100 h-52 rounded-lg bg-cover bg-center flex flex-col justify-between"
                style={{ backgroundImage: `url(${podcast.thumbnail})` }}
              >
                <div className="w-full flex bg-gray-800 bg-opacity-50 px-2 justify-between">
                  <p className="text-xs truncate">
                    <FontAwesomeIcon icon={faUserTag} className="mr-1" />
                    {podcast.numSubscriber} joined
                  </p>
                  {podcast?.isOnSubscribe && (
                    <p className="text-xs">
                      <FontAwesomeIcon icon={faTag} /> subscribed
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col bg-gray-800 bg-opacity-50 px-2">
                  <p className="text-md font-semibold truncate">
                    {podcast.title}
                  </p>
                  <p className="text-sm truncate">{podcast.host.email}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
