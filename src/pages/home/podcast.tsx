import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { HelmetOnlyTitle } from "../../components/HelmetOnlyTitle";

export const PodcastPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="w-screen h-screen bg-gray-800 flex flex-col items-center relative">
      <HelmetOnlyTitle title="Welcome" />
      <div className="bg-red-800 w-full xl:max-w-screen-lg lg:max-w-screen-md md:max-w-screen-sm sm:max-w-md px-4 pt-4 flex justify-between"></div>
    </div>
  );
};
