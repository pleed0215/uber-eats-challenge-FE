import {
  faGlobeAsia,
  faPlus,
  faShare,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { PartPodcast } from "../codegen/PartPodcast";

interface PodcastTitleProps {
  podcast?: PartPodcast | null;
  loading: boolean;
}

export const PodcastTitle: React.FC<PodcastTitleProps> = ({
  podcast,
  loading,
}) => {
  return (
    <div className="w-full text-white">
      {loading ? (
        <div className="w-full px-4 py-4 flex">
          <div className="w-32 h-32 bg-purple-200 rounded-lg mr-3" />
          <div className="w-2/3 max-w-2/3 h-30 flex flex-col overflow-ellipsis">
            <div className="w-full h-6 bg-purple-200 animate-pulse mb-2" />
            <div className="w-full h-6 bg-purple-200 animate-pulse mb-2" />
            <div className="w-2/3 h-4 bg-purple-200 animate-pulse mb-2" />
            <div className="w-full h-4 bg-purple-200 animate-pulse mb-2" />
            <div className="w-2/3 h-4 bg-purple-200 animate-pulse mb-2" />
            <div className="flex items-center mt-4 text-purple-200">
              <div className="rounded-2xl bg-purple-200 w-16 px-2 py-1" />
              <div className="w-6 h-6 rounded-full bg-purple-200 animate-pulse mx-5" />
              <FontAwesomeIcon
                icon={faShareAlt}
                size="lg"
                className="animate-pulse"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full px-4 py-4 flex">
          <div
            className="w-32 h-32 bg-cover bg-center rounded-lg mr-3"
            style={{ backgroundImage: `url(${podcast?.thumbnail})` }}
          />
          <div className="w-2/3 max-w-2/3 h-30 flex flex-col overflow-ellipsis">
            <h4 className="text-2xl font-semibold mb-2">{podcast?.title}</h4>
            <div className="flex items-center">
              <p className="-mr-6 border-l border-b border-t px-2 rounded-l-3xl h-9 bg-purple-200 text-purple-800 flex items-center z-10">
                <strong>Host</strong>
              </p>
              <div className="flex items-center border-b-2 border-t-2 border-r-2  px-2 rounded-r-3xl pl-8">
                <Link
                  to={`/user/${podcast?.host.id}`}
                  className="flex items-center"
                >
                  <div
                    className=" w-8 h-8 bg-cover bg-center rounded-full bg-blue-200 mr-4 z-20"
                    style={{
                      backgroundImage: `url(${
                        podcast?.host.portrait
                          ? podcast.host.portrait
                          : "/podcast.svg"
                      })`,
                    }}
                  />

                  <span className="mr-4">{podcast?.host.email}</span>
                </Link>
              </div>
            </div>
            <p className="overflow-ellipsis">{podcast?.description}</p>
            <div className="flex items-center mt-4 text-purple-200">
              <div className="rounded-2xl border border-purple-200 px-2 py-1">
                <FontAwesomeIcon icon={faPlus} />
                <span className="ml-2">Subscribe</span>
              </div>
              <FontAwesomeIcon icon={faGlobeAsia} size="lg" className="mx-5" />
              <FontAwesomeIcon icon={faShareAlt} size="lg" className="mr-5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
