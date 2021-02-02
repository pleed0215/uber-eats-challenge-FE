import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface PaginationProps {
  onPrev: any;
  onNext: any;
  currentPage?: number;
  totalPage?: number | null;
}

export const Pagination: React.FC<PaginationProps> = ({
  onPrev,
  onNext,
  currentPage,
  totalPage,
}) => {
  return (
    <div className="flex items-center text-white text-xl py-2">
      {currentPage !== 1 && (
        <button
          onClick={onPrev}
          className="mr-3 hover:text-purple-300 transition"
        >
          <FontAwesomeIcon icon={faArrowCircleLeft} className="mr-3" />
          prev
        </button>
      )}
      <span className="mr-3">{`${currentPage} / ${totalPage}`}</span>
      {currentPage !== totalPage && (
        <button onClick={onNext} className="hover:text-purple-300 transition">
          next
          <FontAwesomeIcon icon={faArrowCircleRight} className="ml-3" />
        </button>
      )}
    </div>
  );
};
