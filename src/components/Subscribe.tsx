import { gql, useMutation } from "@apollo/client";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { PartPodcast } from "../codegen/PartPodcast";
import {
  ToggleSubscribe,
  ToggleSubscribeVariables,
} from "../codegen/ToggleSubscribe";
import { GQL_GET_PODCAST } from "../pages/home/podcast";
import { Loader } from "./Loader";

const GQL_SUBSCRIBE = gql`
  mutation ToggleSubscribe($input: ToggleSubscriptionInput!) {
    subscribeToPodcast(input: $input) {
      ok
      error
      result
    }
  }
`;

interface SubscribeButtonProps {
  podcast?: PartPodcast | null;
  loading: boolean;
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  podcast,
  loading,
}) => {
  const [toggleSubscribe, { data }] = useMutation<
    ToggleSubscribe,
    ToggleSubscribeVariables
  >(GQL_SUBSCRIBE, {
    onCompleted: (_) => {
      setIsToggling(false);
    },
  });
  const [isToggling, setIsToggling] = useState(false);

  const onClick = () => {
    if (podcast?.id) {
      setIsToggling(true);
      toggleSubscribe({
        variables: {
          input: {
            podcastId: podcast?.id,
          },
        },
        refetchQueries: [
          {
            query: GQL_GET_PODCAST,
            variables: {
              id: podcast.id,
            },
          },
        ],
      });
    }
  };

  return (
    <div
      className={`rounded-2xl border border-purple-200 px-2 py-1 flex justify-center ${
        loading && "animate-pulse bg-purple-200"
      }`}
    >
      {!loading && !isToggling && (
        <div className="cursor-pointer" onClick={onClick}>
          <FontAwesomeIcon icon={podcast?.isOnSubscribe ? faMinus : faPlus} />
          <span className="ml-2">
            {podcast?.isOnSubscribe ? "Unsubscribe" : "Subscribe"}
          </span>
        </div>
      )}
      {isToggling && <Loader />}
    </div>
  );
};
