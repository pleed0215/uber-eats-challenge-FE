import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FRAGMENT_PODCAST } from "../../fragments";
import { GetMyPodcasts } from "../../codegen/GetMyPodcasts";
import { Link } from "react-router-dom";
import { LoaderWithLogo } from "../../components/LoaderWithLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GQL_MY_PODCASTS = gql`
  query GetMyPodcasts {
    getMyPodcasts {
      ok
      error
      podcasts {
        ...PartPodcast
      }
    }
  }
  ${FRAGMENT_PODCAST}
`;

export const HostPage = () => {
  const {
    data: myPodcasts,
    loading: loadingPodcasts,
  } = useQuery<GetMyPodcasts>(GQL_MY_PODCASTS);

  return (
    <div className="w-screen min-h-screen bg-gray-800 flex justify-center text-white">
      <div className="layout__container bg-red-800 flex flex-col">
        {loadingPodcasts && <LoaderWithLogo />}
        {!loadingPodcasts && (
          <div className="flex flex-col mt-14">
            <div className="flex items-center">
              <h4 className="text-xl font-bold">My podcasts</h4>
              <Link
                to="/host/create"
                className="form__button px-2 py-1 flex items-center mt-0 ml-3"
              >
                <span>Create</span>
              </Link>
            </div>
            {myPodcasts?.getMyPodcasts.podcasts?.length === 0 && (
              <h6 className="text-lg">
                ... No Podcasts.. how about create one?
                <Link to="/host/create">
                  <span className="text-lg underline text-purple-600 font-extrabold ml-2">
                    Create
                  </span>
                </Link>
              </h6>
            )}
            {myPodcasts?.getMyPodcasts.podcasts &&
              myPodcasts?.getMyPodcasts.podcasts?.length !== 0 &&
              myPodcasts?.getMyPodcasts.podcasts.map((podcast, index) => (
                <Link
                  key={index}
                  to={`/podcast/${podcast.id}`}
                  className="hover:scale-110 transform duration-300"
                >
                  <div
                    className="bg-blue-100 h-52 rounded-lg bg-cover bg-center flex flex-col justify-end"
                    style={{ backgroundImage: `url(${podcast.thumbnail})` }}
                  >
                    <div className="w-full flex flex-col bg-gray-800 bg-opacity-50 px-2">
                      <p className="text-md font-semibold truncate">
                        {podcast.title}
                      </p>
                      <p className="text-sm truncate">{podcast.host.email}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
