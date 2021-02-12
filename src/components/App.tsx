import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "../apollo";
import { LoggedInRouter } from "../routes/logged.in.route";
import { LoggedOutRouter } from "../routes/logged.out.route";

export default function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return isLoggedIn ? (
    <div className="relative">
      <LoggedInRouter />
    </div>
  ) : (
    <LoggedOutRouter />
  );
}
