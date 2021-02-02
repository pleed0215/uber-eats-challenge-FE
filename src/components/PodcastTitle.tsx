import {
  faGlobeAsia,
  faPlus,
  faShare,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
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
        <div className="w-full h-72 bg-purple-100 animate-pulse"></div>
      ) : (
        <div className="w-full px-4 py-4 flex">
          <div
            className="w-32 h-32 bg-cover bg-center rounded-lg mr-3"
            style={{ backgroundImage: `url(${podcast?.thumbnail})` }}
          />
          <div className="w-2/3 max-w-2/3 h-30 flex flex-col overflow-scroll">
            <h4 className="text-2xl font-semibold mb-2">{podcast?.title}</h4>
            <p className="text-lg text-purple-200 font-bold mb-2">
              {podcast?.host.email}
              {"  "}
              {podcast?.host?.name && `(${podcast?.host?.name})`}
            </p>
            <p className="overflow-ellipsis">{podcast?.description}</p>
            <div className="flex items-center mt-4 text-purple-200">
              <div className="rounded-2xl border border-purple-200 px-2 py-1">
                <FontAwesomeIcon icon={faPlus} />
                <span className="ml-2">Subscribe</span>
              </div>
              <FontAwesomeIcon icon={faGlobeAsia} size="lg" className="mx-5" />
              <FontAwesomeIcon icon={faShareAlt} size="lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
