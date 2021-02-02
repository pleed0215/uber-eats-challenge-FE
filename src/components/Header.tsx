import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useMe } from "../hooks/useMe";

export const Header = () => {
  const { data, loading } = useMe();
  const categories = ["book", "fashion", "comedy", "medicine", "music"];
  const { pathname } = useLocation();

  return (
    <div className="w-full flex justify-center bg-gray-800 shadow-lg border-b-2 border-gray-500 min-w-max">
      <div className="w-full xl:max-w-screen-lg lg:max-w-screen-md md:max-w-screen-sm sm:max-w-md px-4 pt-4 bg-gray-800 flex justify-between">
        <div className="flex font-bold text-white -mb-1 w-full max-w-2xl">
          <Link to="/" className="mr-6">
            <div
              className="w-10 h-10 bg-cover bg-center animate-bounce"
              style={{ backgroundImage: `url(/podcast.svg)` }}
            />
          </Link>

          <ul className="flex items-center justify-around w-full">
            <Link
              to="/"
              className="hover:scale-y-125 transform transition duration-300"
            >
              <li
                className={`pb-2 ${
                  pathname === "/" && "border-b-4 border-purple-400 "
                }`}
              >
                Now Listen
              </li>
            </Link>
            {categories.map((category, index) => (
              <Link
                to={`/category?name=${category}`}
                key={index}
                className="hover:scale-y-125 transform transition duration-300"
              >
                <li
                  className={`pb-2 ${
                    pathname === `/category?name=${category}` &&
                    "border-b-4 border-purple-400"
                  }`}
                >
                  {category.toUpperCase()}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex items-center font-bold text-white">
          <div className="mr-2 hover:underline">
            {data &&
              loading === false &&
              `${data.me.email}${data.me.name ? `(${data.me.name})` : ""}`}
          </div>
          <Link
            to="/logout"
            className="transform hover:scale-110 transition duration-300 uppercase"
          >
            <p>log out</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
