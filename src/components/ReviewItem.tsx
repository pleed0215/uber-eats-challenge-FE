import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { PartReview } from "../codegen/PartReview";
import { getRandomSoftBgColor } from "../utils";

interface ReveiwItemProps {
  review?: PartReview | null;
}

export const ReviewItem: React.FC<ReveiwItemProps> = ({ review }) => {
  return (
    <div className="w-full p-2 flex flex-col text-white border border-gray-200 rounded-lg my-4">
      <Link to={`/user/${review?.reviewer.id}`}>
        <div className="w-full flex items-center my-3">
          <div
            className={`w-12 h-12 rounded-full bg-cover bg-center mr-3 ${getRandomSoftBgColor()}`}
            style={{
              backgroundImage: `url(${
                review?.reviewer.portrait
                  ? review?.reviewer.portrait
                  : "/podcast.svg"
              })`,
            }}
          />
          <div className="max-w-sm flex flex-col justify-center">
            <h6 className="text-lg font-bold">{review?.reviewer?.email}</h6>
            {review?.reviewer.name && (
              <p className="text-sm font-bold">{review.reviewer?.name}</p>
            )}
            <div className="flex items-center">
              <p className="text-md mr-2">Rating: </p>
              {Array.from(Array(review?.rating).keys()).map((_, i) => (
                <FontAwesomeIcon
                  key={`${review?.id}-rating-${i}`}
                  className="mr-1 text-yellow-100"
                  icon={faStar}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
      <hr />
      <div className="mt-2 w-full italic text-sm">'{review?.content}'</div>
    </div>
  );
};
