import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { SeeProfile, SeeProfileVariables } from "../../codegen/SeeProfile";
import {
  SeeSubScription,
  SeeSubScriptionVariables,
} from "../../codegen/SeeSubScription";
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
      }
    }
  }
`;

export const UserPage: React.FC<{ isSelf: boolean }> = ({ isSelf = true }) => {
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const me = useMe();
  const [
    seeProfile,
    { data: seeProfileData, loading: seeProfileLoading },
  ] = useLazyQuery<SeeProfile, SeeProfileVariables>(GQL_SEE_PROFILE);
  const [
    seeSubscription,
    { data: seeSubscriptionData, loading: seeSubscriptionLoading },
  ] = useLazyQuery<SeeSubScription, SeeSubScriptionVariables>(
    GQL_SEE_SUBSCRIPTIONS
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isSelf && !pathname.includes("my-page")) {
      seeProfile({ variables: { userId: +id } });
    }
  }, [isSelf]);

  useEffect(() => {
    if (isSelf && pathname.includes("my-page")) {
      seeSubscription({ variables: { input: { page } } });
    }
  }, [page]);

  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-800">
      <div className="layout__container flex flex-col mt-20  items-center">
        {isSelf && <Profile user={me.data?.me} loading={me.loading} />}
        {!isSelf && (
          <Profile
            user={seeProfileData?.seeProfile.user}
            loading={seeProfileLoading}
          />
        )}
      </div>
    </div>
  );
};
