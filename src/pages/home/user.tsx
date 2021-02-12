import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { UserRole } from "../../codegen/globalTypes";
import { SeeProfile, SeeProfileVariables } from "../../codegen/SeeProfile";
import {
  SeeSubScription,
  SeeSubScriptionVariables,
} from "../../codegen/SeeSubScription";
import { ButtonInactivable } from "../../components/ButtonInactivable";
import { LoaderWithLogo } from "../../components/LoaderWithLogo";
import { Pagination } from "../../components/Pagination";
import { PodcastList } from "../../components/PodcastList";
import { Profile } from "../../components/Profile";
import { FRAGMENT_PODCAST } from "../../fragments";
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

  useEffect(() => {
    if (me.data)
      seeProfile({ variables: { userId: isSelf ? me.data?.me.id : +id } });
  }, [isSelf]);

  useEffect(() => {
    if (isSelf) {
      seeSubscription({ variables: { input: { page, pageSize: 8 } } });
    }
  }, [page]);

  const onPrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
    window.scrollTo(0, 0);
  };

  const onNext = () => {
    if (seeSubscriptionData) {
      if (page < (seeSubscriptionData.seeSubscribtions.totalPage || 0)) {
        setPage(page + 1);
      }
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-800">
      <div className="layout__container flex flex-col mt-20  items-center px-2 pb-4">
        {(seeProfileLoading || me.loading) && <LoaderWithLogo />}
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
        {seeProfileData?.seeProfile.user &&
          seeProfileData?.seeProfile.user.role === UserRole.Host && (
            <div className="w-full border-t mt-4">
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
      </div>
    </div>
  );
};
