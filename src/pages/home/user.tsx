import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { GetFeeds, GetFeedsVariables } from "../../codegen/GetFeeds";
import { UserRole } from "../../codegen/globalTypes";
import { SeeProfile, SeeProfileVariables } from "../../codegen/SeeProfile";
import {
  SeeSubScription,
  SeeSubScriptionVariables,
} from "../../codegen/SeeSubScription";
import { ButtonInactivable } from "../../components/ButtonInactivable";
import { EpisodeList } from "../../components/EpisodeList";
import { LoaderWithLogo } from "../../components/LoaderWithLogo";
import { Pagination } from "../../components/Pagination";
import { PodcastList } from "../../components/PodcastList";
import { Profile } from "../../components/Profile";
import { FRAGMENT_EPISODE, FRAGMENT_PODCAST } from "../../fragments";
import { useMe } from "../../hooks/useMe";

const GQL_SEE_SUBSCRIPTIONS = gql`
  query SeeSubScription($input: SeeSubscriptionInput!) {
    seeSubscribtions(input: $input) {
      ok
      error

      totalPage
      totalCount
      currentPage
      currentCount

      subscriptions {
        ...PartPodcast
      }
    }
  }
  ${FRAGMENT_PODCAST}
`;

const GQL_SEE_PROFILE = gql`
  query SeeProfile($userId: Float!) {
    seeProfile(userId: $userId) {
      ok
      error
      user {
        id
        name
        email
        role
        portrait
        podcasts {
          ...PartPodcast
        }
      }
    }
  }
  ${FRAGMENT_PODCAST}
`;

const GQL_GET_FEEDS = gql`
  query GetFeeds($input: GetFeedsInput!) {
    getFeeds(input: $input) {
      ok
      error
      currentCount
      currentPage
      totalCount
      totalPage
      pageSize
      feeds {
        ...PartEpisode
      }
    }
  }
  ${FRAGMENT_EPISODE}
`;

export const UserPage: React.FC<{ isSelf: boolean }> = ({ isSelf = true }) => {
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const [whichTab, setWhichTab] = useState<"mystuff" | "feeds">("mystuff");
  const me = useMe();
  const [
    seeProfile,
    { data: seeProfileData, loading: seeProfileLoading, error },
  ] = useLazyQuery<SeeProfile, SeeProfileVariables>(GQL_SEE_PROFILE);
  const [
    seeSubscription,
    { data: seeSubscriptionData, loading: seeSubscriptionLoading },
  ] = useLazyQuery<SeeSubScription, SeeSubScriptionVariables>(
    GQL_SEE_SUBSCRIPTIONS
  );
  const [getFeeds, { data: myFeeds, loading: loadingMyFeeds }] = useLazyQuery<
    GetFeeds,
    GetFeedsVariables
  >(GQL_GET_FEEDS);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (me.data)
      seeProfile({ variables: { userId: isSelf ? me.data?.me.id : +id } });
  }, [isSelf]);

  useEffect(() => {
    if (whichTab === "mystuff") {
      if (isSelf) {
        seeSubscription({ variables: { input: { page, pageSize: 8 } } });
      }
    } else {
      getFeeds({ variables: { input: { page } } });
    }
  }, [whichTab, page, isSelf]);

  const onMyStuffClick = () => {
    if (whichTab !== "mystuff") {
      setWhichTab("mystuff");
      setPage(1);
    }
  };

  const onMyFeedsClick = () => {
    if (whichTab !== "feeds") {
      setWhichTab("feeds");
      setPage(1);
    }
  };

  const onPrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
    window.scrollTo(0, 0);
  };

  const onNext = () => {
    const totalPage =
      whichTab === "mystuff"
        ? seeSubscriptionData?.seeSubscribtions.totalPage
        : myFeeds?.getFeeds.totalPage;
    if (page < (totalPage || 0)) {
      setPage(page + 1);
    }

    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-800">
      <div className="layout__container flex flex-col mt-20  items-center px-2 pb-4">
        {(seeProfileLoading || me.loading || loadingMyFeeds) && (
          <LoaderWithLogo />
        )}
        {isSelf && <Profile user={me.data?.me} loading={me.loading} />}
        {!isSelf && (
          <Profile
            user={seeProfileData?.seeProfile.user}
            loading={seeProfileLoading}
          />
        )}

        {isSelf && (
          <Link
            to="/my-page/edit"
            className="text-lg font-bold text-white bg-purple-600 hover:bg-purple-800 transition duration-300 mt-4 py-2 px-4 rounded-lg"
          >
            Edit Profile
          </Link>
        )}
        {!seeProfileLoading && !loadingMyFeeds && isSelf && (
          <div className="w-full h-10 border-b border-purple-200 mt-10 flex justify-center items-center text-white mb-4">
            <button
              className={`py-2 px-10 focus:outline-none ${
                whichTab === "mystuff"
                  ? "bg-purple-600 cursor-default underline font-semibold"
                  : "bg-purple-400"
              } text-white rounded-tr-lg rounded-tl-lg `}
              onClick={onMyStuffClick}
            >
              {me.data?.me.role === UserRole.Host
                ? "My Podcast"
                : "My Subscriptions"}
            </button>

            <button
              className={`px-10 py-2 text-white focus:outline-none  ${
                whichTab === "feeds"
                  ? "bg-purple-600 cursor-default underline font-semibold"
                  : "bg-purple-400"
              } text-white rounded-tr-lg rounded-tl-lg `}
              onClick={onMyFeedsClick}
            >
              My Feeds
            </button>
          </div>
        )}
        {whichTab === "mystuff" &&
          seeProfileData?.seeProfile.user &&
          seeProfileData?.seeProfile.user.role === UserRole.Host && (
            <div className="w-full mt-4">
              <PodcastList
                podcasts={seeProfileData.seeProfile.user.podcasts}
                loading={seeProfileLoading}
                title={"User's Podcast"}
              />
              {seeProfileData?.seeProfile.user.podcasts &&
                seeProfileData?.seeProfile.user.podcasts.length === 0 && (
                  <h4 className="text-xl text-white font-bold">
                    ... Has no podcasts ....
                  </h4>
                )}
            </div>
          )}
        {whichTab === "mystuff" &&
          isSelf &&
          me.data?.me.role === UserRole.Listener && (
            <div className="w-full  mt-4">
              <PodcastList
                podcasts={seeSubscriptionData?.seeSubscribtions.subscriptions}
                loading={seeSubscriptionLoading}
                title={"User's subscriptions"}
              />

              {isSelf &&
                seeSubscriptionData?.seeSubscribtions.subscriptions &&
                seeSubscriptionData?.seeSubscribtions.subscriptions.length ===
                  0 && (
                  <h4 className="text-xl text-white font-bold">
                    ... Has no subscriptions ....
                  </h4>
                )}
              <div className="w-full flex justify-center mt-3">
                <Pagination
                  onNext={onNext}
                  onPrev={onPrev}
                  totalPage={seeSubscriptionData?.seeSubscribtions.totalPage}
                  currentPage={page}
                  loading={seeSubscriptionLoading}
                />
              </div>
            </div>
          )}
        {whichTab === "feeds" && (
          <div className="w-full mt-4">
            {myFeeds?.getFeeds.totalCount === 0 && (
              <p>...No feeds.. yet.. Subscribe more...</p>
            )}
            {myFeeds?.getFeeds.totalCount !== 0 && (
              <>
                <EpisodeList
                  loading={loadingMyFeeds}
                  title={`My Feeds (total: ${myFeeds?.getFeeds.totalCount})`}
                  episodes={myFeeds?.getFeeds.feeds}
                />
                <div className="w-full flex justify-center mt-3">
                  <Pagination
                    onNext={onNext}
                    onPrev={onPrev}
                    totalPage={myFeeds?.getFeeds.totalPage}
                    currentPage={page}
                    loading={loadingMyFeeds}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
