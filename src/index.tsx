import React from "react";
import { ApolloProvider } from "@apollo/client";
import { render } from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { apolloClient } from "./apollo";
import App from "./components/App";
import "./index.css";

const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={apolloClient}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ApolloProvider>,
  rootElement
);
