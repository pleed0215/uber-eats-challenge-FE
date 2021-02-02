import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const PageNotFound = () => {
  const [remainSeconds, setRemainSeconds] = useState<number>(5);
  const history = useHistory();

  useEffect(() => {
    const intervalHandler = setInterval(() => {
      setRemainSeconds((prev) => prev - 1);
    }, 1000);
    const timeoutHandler = setTimeout(() => {
      history.replace("/");
    }, 5000);
    return () => {
      clearInterval(intervalHandler);
      clearTimeout(timeoutHandler);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="w-full max-w-lg flex flex-col items-center justify-center">
        <h4 className="text-2xl font-bold">Oops.. Page not found</h4>
        <h6 className="text-lg">Redirecting to home in {remainSeconds}s...</h6>
      </div>
    </div>
  );
};
