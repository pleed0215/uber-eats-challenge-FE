import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { UserRole } from "../../codegen/globalTypes";
import { SeeProfile, SeeProfileVariables } from "../../codegen/SeeProfile";
import {
  SeeSubScription,
  SeeSubScriptionVariables,
} from "../../codegen/SeeSubScription";
import { LoaderWithLogo } from "../../components/LoaderWithLogo";
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
        sawEpisode {
          id
        }
        subscriptions {
          ...PartPodcast
        }
      }
    }
  }
  ${FRAGMENT_PODCAST}
`;

export const UserPage: React.FC<{ isSelf: boolean }> = ({ isSelf = true }) => {
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
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
  const [page, setPage] = useState(1);
  console.log(error);
  useEffect(() => {
    if (!isSelf && !pathname.includes("my-page")) {
      seeProfile({ variables: { userId: +id } });
    }
  }, [isSelf]);

  useEffect(() => {
    if (isSelf) {
      seeSubscription({ variables: { input: { page } } });
    }
  }, [page]);

  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-800">
      <div className="layout__container flex flex-col mt-20  items-center">
        {(seeProfileLoading || me.loading) && <LoaderWithLogo />}
        {isSelf && <Profile user={me.data?.me} loading={me.loading} />}
        {!isSelf && (
          <Profile
            user={seeProfileData?.seeProfile.user}
            loading={seeProfileLoading}
          />
        )}
        {(me.data?.me.role === UserRole.Host ||
          seeProfileData?.seeProfile.user?.role === UserRole.Host) && (
          <div className="w-full border-t mt-4">
            <PodcastList
              podcasts={
                isSelf
                  ? me.data?.me.podcasts
                  : seeProfileData?.seeProfile.user?.podcasts
              }
              loading={isSelf ? me.loading : seeProfileLoading}
              title={"User's podcast"}
            />
            {isSelf &&
              me.data?.me.podcasts &&
              me.data?.me.podcasts.length === 0 && (
                <h4 className="text-xl text-white font-bold">
                  ... Have no podcast ....
                </h4>
              )}
          </div>
        )}
        {isSelf && me.data?.me.role === UserRole.Listener && (
          <div className="w-full border-t mt-4">
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
                  ... Have no subscriptions ....
                </h4>
              )}
          </div>
        )}
        {!isSelf &&
          seeProfileData?.seeProfile.user?.role === UserRole.Listener && (
            <div className="w-full border-t mt-4">
              <PodcastList
                podcasts={seeProfileData.seeProfile.user.subscriptions}
                loading={seeProfileLoading}
                title={"User's subscriptions"}
              />
              {!isSelf &&
                seeProfileData?.seeProfile.user.subscriptions &&
                seeProfileData?.seeProfile.user.subscriptions.length === 0 && (
                  <h4 className="text-xl text-white font-bold">
                    ... Have no subscriptions ....
                  </h4>
                )}
            </div>
          )}
      </div>
    </div>
  );
};
