import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { TOKEN_NAME } from "./global.constants";

export const getLSToken = () => localStorage.getItem(TOKEN_NAME);
export const setLSToken = (token: string) =>
  localStorage.setItem(TOKEN_NAME, token);
export const removeLSToken = () => localStorage.removeItem(TOKEN_NAME);
export const isLoggedInVar = makeVar(Boolean(getLSToken()));
export const authTokenVar = makeVar(getLSToken());
export const makeLogin = (token: string) => {
  setLSToken(token);
  isLoggedInVar(true);
  authTokenVar(token);
};

export const makeLogout = () => {
  removeLSToken();
  isLoggedInVar(false);
  authTokenVar(null);
};

const HTTP_ENDPOINT = "https://obscure-dawn-29050.herokuapp.com/graphql";
//const HTTP_ENDPOINT = "https://uber-eats-challenge.herokuapp.com/graphql";

const httpLink = createHttpLink({
  uri: HTTP_ENDPOINT,
});

const authLink = setContext((request, prevContext) => {
  return {
    headers: {
      ...prevContext.headers,
      "x-jwt": authTokenVar() || "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
