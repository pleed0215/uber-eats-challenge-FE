import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PostReview, PostReviewVariables } from "../codegen/PostReview";
import { GQL_GET_PODCAST } from "../pages/home/podcast";
import { ButtonInactivable } from "./ButtonInactivable";

const GQL_POST_REVIEW = gql`
  mutation PostReview($input: ReviewPodcastInput!) {
    reviewPodcast(input: $input) {
      ok
      error
    }
  }
`;

interface IForm {
  content: string;
  rating: number;
}

interface ReviewFormProps {
  podcastId: number;
  loading?: boolean;
  reviewed?: boolean;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  podcastId,
  loading,
  reviewed,
}) => {
  const [postReview, { data }] = useMutation<PostReview, PostReviewVariables>(
    GQL_POST_REVIEW,
    {
      onCompleted: () => {
        setIsSubmitting(false);
      },
      refetchQueries: [
        {
          query: GQL_GET_PODCAST,
          variables: {
            id: podcastId,
          },
        },
      ],
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleSubmit, getValues, register, watch } = useForm<IForm>({
    defaultValues: { rating: 5 },
  });

  const onSubmit = () => {
    const { content, rating } = getValues();
    if (content != "") {
      setIsSubmitting(true);
      postReview({
        variables: {
          input: {
            content,
            rating: +rating,
            podcastId,
          },
        },
      });
    }
  };

  return (
    <div className="w-full flex items-center">
      {reviewed && <div className="text-purple-200">* Already Reviewed</div>}
      {!reviewed && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full h-32 text-purple-200"
        >
          <div className="flex flex-col w-full mr-2 mb-4 h-full">
            <div className="flex mb-2">
              <label htmlFor="rating" className="mr-2">
                Rating
              </label>
              <input
                type="range"
                min="1"
                max="5"
                name="rating"
                className="mr-2"
                ref={register()}
              />
              <span>You rated: {watch("rating")}</span>
            </div>
            <textarea
              name="content"
              ref={register()}
              placeholder="Write your review."
              className="w-full h-full mr-2 focus:outline-none bg-gray-800 text-purple-200 rounded-lg p-2 border italic"
            />
          </div>
          <div className="flex items-center w-32 h-full">
            <ButtonInactivable
              loading={isSubmitting}
              isActivate={!isSubmitting}
            >
              Post
            </ButtonInactivable>
          </div>
        </form>
      )}
    </div>
  );
};
