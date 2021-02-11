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
  loading?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  onPrev,
  onNext,
  currentPage,
  totalPage,
  loading = false,
}) => {
  if (!loading && totalPage && totalPage <= 1) {
    return <></>;
  }

  return loading ? (
    <div className="py-4 px-20 bg-purple-200 rounded-md animate-pulse" />
  ) : (
    <div className="flex items-center text-white text-xl py-2">
      {currentPage !== 1 && (
        <button
          onClick={onPrev}
          className="mr-3 hover:text-purple-800 hover:bg-purple-200 transition druation-300 px-2 py border border-purple-200 rounded-md"
        >
          <FontAwesomeIcon icon={faArrowCircleLeft} className="mr-3" />
          prev
        </button>
      )}
      <span className="mr-3">{`Page ${currentPage} of ${totalPage}`}</span>
      {currentPage !== totalPage && (
        <button
          onClick={onNext}
          className="hover:text-purple-800 hover:bg-purple-200 transition druation-300 px-2 py border border-purple-200 rounded-md"
        >
          next
          <FontAwesomeIcon icon={faArrowCircleRight} className="ml-3" />
        </button>
      )}
    </div>
  );
};
