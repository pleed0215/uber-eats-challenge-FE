import { useApolloClient } from "@apollo/client";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeLogout } from "../apollo";

export const LogoutPage = () => {
  const history = useHistory();
  const client = useApolloClient();

  useEffect(() => {
    const timeoutHandle = setTimeout(() => {
      client.cache.reset().then(() => {
        history.push("/");
        makeLogout();
      });
    }, 2000);
    return () => {
      clearTimeout(timeoutHandle);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center text-2xl font-bold">
      Bye Bye
    </div>
  );
};
