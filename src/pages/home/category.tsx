import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  QueryByCategory,
  QueryByCategoryVariables,
} from "../../codegen/QueryByCategory";
import { HelmetOnlyTitle } from "../../components/HelmetOnlyTitle";
import { LoaderWithLogo } from "../../components/LoaderWithLogo";
import { Pagination } from "../../components/Pagination";
import { PodcastList } from "../../components/PodcastList";
import { FRAGMENT_PODCAST } from "../../fragments";
import { useQueryParam } from "../../hooks/useQueryParam";

export const categories = [
  "Book",
  "Design",
  "Fashion",
  "Food",
  "Careers",
  "Management",
  "Marketing",
  "Non-Profit",
  "Comedy",
  "Stand-up",
  "Courses",
  "Education",
  "Howto",
  "Language",
  "Fiction",
  "Drama",
  "History",
  "Health&Fitness",
  "Medicine",
  "Mental Health",
  "Sexuality",
  "Education for kids",
  "Parenting",
  "Music",
  "Animation",
  "Video Games",
  "Politics",
  "Tech",
  "Sports",
  "Science",
  "Nature",
  "Physics",
  "Social Science",
  "Baseball",
  "Basketball",
  "Film History",
  "Film Reviews",
  "Technology",
];

const GQL_GET_BY_CATEGORY = gql`
  query QueryByCategory($input: GetPodcastsByCategoryInput!) {
    getPodcastByCategory(input: $input) {
      ok
      error
      totalPage
      totalCount
      currentPage
      currentCount
      podcasts {
        ...PartPodcast
      }
    }
  }
  ${FRAGMENT_PODCAST}
`;

export const CategoryPage = () => {
  const categoryName = useQueryParam().get("name");
  const [page, setPage] = useState(1);
  const [getPodcasts, { data: podcasts, loading }] = useLazyQuery<
    QueryByCategory,
    QueryByCategoryVariables
  >(GQL_GET_BY_CATEGORY);

  useEffect(() => {
    if (categoryName) {
      getPodcasts({
        variables: {
          input: {
            category: categoryName,
            page: 1,
          },
        },
      });
      setPage(1);
    }
  }, [categoryName, page]);

  const onPrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
    window.scrollTo(0, 0);
  };

  const onNext = () => {
    if (podcasts) {
      if (page < (podcasts.getPodcastByCategory.totalPage || 0)) {
        setPage(page + 1);
      }
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-800">
      <HelmetOnlyTitle title="Category" />
      <div className="layout__container px-2">
        {!categoryName ? (
          <div className="text-white py-8">
            <h4 className="text-2xl font-bol mb-4">Categories</h4>
            <div className="w-full grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-4 text-center border rounded-lg border-gray-200 p-4 text-white">
              {categories.map((c, index) => (
                <Link
                  to={`/category?name=${c}`}
                  className="px-4 py-2 hover:bg-purple-200 hover:text-purple-600 rounded-lg transition duration-300 truncate"
                  key={`category-name-${index}`}
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <>
            {loading && <LoaderWithLogo />}
            <div className="text-white mt-4">
              <PodcastList
                loading={loading}
                title={`Category: ${categoryName}`}
                podcasts={podcasts?.getPodcastByCategory.podcasts}
              />
              {!loading && (
                <div className="w-full flex justify-center">
                  <Pagination
                    onNext={onNext}
                    onPrev={onPrev}
                    totalPage={podcasts?.getPodcastByCategory.totalPage}
                    currentPage={page}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
