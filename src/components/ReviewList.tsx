import React from "react";
import { PartReview } from "../codegen/PartReview";
import { ReviewItem } from "./ReviewItem";

interface ReviewListProps {
  reviews?: Array<PartReview> | null;
  loading: boolean;
  title: string;
}

export const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  loading,
  title,
}) => {
  return (
    <>
      {loading ? (
        Array.from(Array(7).keys()).map((_, index) => (
          <div
            key={index}
            className="w-full h-48 border rounded-lg flex flex-col p-2 my-2"
          >
            <div className="w-full flex">
              <div className="w-12 h-12 animate-pulse bg-purple-200 rounded-full my-4 mr-3" />
              <div className="w-full max-w-sm flex flex-col">
                <div className="w-52 h-8 animate-pulse bg-purple-200 rounded-lg mb-2" />
                <div className="w-32 h-6 animate-pulse bg-purple-200 rounded-lg mb-2" />
                <div className="w-28 h-6 animate-pulse bg-purple-200 rounded-lg mb-2" />
              </div>
            </div>
            <hr className="mb-2" />
            <div className="w-full h-6 animate-pulse bg-purple-200 rounded-lg mb-2" />
            <div className="w-full h-6 animate-pulse bg-purple-200 rounded-lg" />
          </div>
        ))
      ) : (
        <>
          <h4 className="text-2xl mb-4 font-bold text-white">{title}</h4>
          <div className="w-full flex flex-col">
            {reviews?.map((review, index) => (
              <ReviewItem key={index} review={review} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
