import React, { useEffect, useState } from "react";

let timeValue = 0;

export const LoaderWithLogo = () => {
  const [loading, setLoading] = useState("Loading");

  useEffect(() => {
    const handle = setInterval(() => {
      timeValue++;
      if (timeValue === 0) {
        setLoading("Loading");
      } else if (timeValue === 1) {
        setLoading("Loading.");
      } else if (timeValue === 2) {
        setLoading("Loading..");
      } else if (timeValue === 3) {
        setLoading("Loading...");
        timeValue = -1;
      }
    }, 800);

    return () => {
      clearInterval(handle);
    };
  }, []);

  return (
    <div className="fixed w-screen h-screen bg-opacity-10 bg-gray-600 flex justify-center items-center inset-0 z-50">
      <div className="w-60 h-60 rounded-lg bg-white flex flex-col items-center justify-center z-50">
        <img
          src="/podcast.svg"
          width="80px"
          height="80px"
          className="animate-bounce mb-6"
        />
        <p className="text-2xl font-bold">{loading}</p>
      </div>
    </div>
  );
};
