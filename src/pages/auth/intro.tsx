import React from "react";
import { Link } from "react-router-dom";

export const IntroPage = () => {
  return (
    <div className="w-screen h-screen min-w-max flex justify-center bg-gradient-to-br from-white via-indigo-200 to-purple-600">
      <div className="w-full max-w-sm h-full shadow-lg bg-purple-300 flex flex-col items-center relative">
        <div className="w-40 h-40 rounded-full bg-white mt-28 flex items-center justify-center  animate-bounce shadow-lg">
          <img className="w-32 h-32" src={`/podcast.svg`} alt="Podcast Logo" />
        </div>
        <h4 className="font-mono mt-4 text-white text-3xl font-extrabold text-center">
          Welcome to
          <br />
          Podcast cloning Challenge
        </h4>
        <div className="py-10 flex flex-col px-2 items-center h-50  w-full bg-white absolute bottom-0 rounded-t-3xl text-xl font-bold font-mono ">
          <Link
            to="/create-account"
            className="w-full h-16 max-w-sm bg-purple-600 text-white mb-4 flex items-center justify-center text-xl font-bold font-mono hover:bg-purple-700 transition duration-200 rounded-lg cursor-pointer"
          >
            Sign up for test
          </Link>
          <Link
            to="/login"
            className="w-full max-w-sm hover:underline text-center"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
