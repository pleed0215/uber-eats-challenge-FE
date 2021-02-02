import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../../utils";
import { ButtonInactivable } from "../../components/ButtonInactivable";
import { makeLogin } from "../../apollo";
import { HelmetOnlyTitle } from "../../components/HelmetOnlyTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faMailBulk, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./auth.css";
import { MutationLogin } from "../../codegen/MutationLogin";
import { MutationCreateAccount } from "../../codegen/MutationCreateAccount";

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

interface IAuthForm {
  email: string;
  password: string;
  password2: string;
  role: UserRole;
}

const GQL_LOGIN = gql`
  mutation MutationLogin($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      error
      token
    }
  }
`;

const GQL_CREATE_ACCOUNT = gql`
  mutation MutationCreateAccount(
    $email: String!
    $password: String!
    $role: UserRole!
  ) {
    createAccount(input: { email: $email, password: $password, role: $role }) {
      ok
      error
    }
  }
`;

export const AuthPage: React.FC = () => {
  const [loginPage, setLoginPage] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { pathname } = useLocation();

  const {
    register,
    handleSubmit,
    getValues,
    formState,
    errors,
  } = useForm<IAuthForm>({
    mode: "onChange",
  });
  const history = useHistory();
  const onLoginCompleted = async (data: MutationLogin) => {
    const {
      login: { ok, error, token },
    } = data;
    setLoading(false);
    if (ok && token) {
      history.push("/");
      makeLogin(token);
    } else {
      setErrorMsg(error);
    }
  };
  const onCreateAccountCompleted = (data: MutationCreateAccount) => {
    const {
      createAccount: { ok, error },
    } = data;
    setLoading(false);
    if (ok) {
      setLoginPage(true);
    } else {
      setErrorMsg(error);
    }
  };
  const [login] = useMutation(GQL_LOGIN, {
    onCompleted: onLoginCompleted,
  });
  const [createAccount] = useMutation(GQL_CREATE_ACCOUNT, {
    onCompleted: onCreateAccountCompleted,
  });

  const onLogin = () => {
    const { email, password } = getValues();
    if (formState.isValid) {
      setLoading(true);
      login({
        variables: {
          email,
          password,
        },
      });
    }
  };
  const onCreateAccount = () => {
    const { email, password, password2, role } = getValues();
    setLoading(true);
    if (formState.isValid) {
      if (password !== password2) {
        setErrorMsg(
          "Please check your passwords. passwords do not match each other."
        );
        setLoading(false);
      } else {
        createAccount({
          variables: {
            email,
            password,
            role,
          },
        });
      }
    }
  };

  useEffect(() => {
    if (pathname === "/create-account") {
      setLoginPage(false);
    } else {
      setLoginPage(true);
    }
  }, [pathname]);

  useEffect(() => {
    setErrorMsg(null);
  }, [formState.isValidating]);

  const onSubmit = () => {
    if (loginPage) {
      onLogin();
    } else {
      onCreateAccount();
    }
  };

  return (
    <div className="w-screen h-screen min-w-max flex justify-center font-mono bg-gradient-to-tr from-indigo-300 via-white to-purple-300">
      <HelmetOnlyTitle title={loginPage ? "Login" : "Create Account"} />
      <div className="w-full max-w-lg  bg-purple-300 flex flex-col items-center p-8 relative mt-20 shadow-lg rounded-lg">
        <div className=" bg-gray-50 absolute -top-16 flex items-center justify-center bg-white rounded-full w-32 h-32 bg-opacity-80">
          <img
            className={`w-20 h-20 ${
              loading ? "animate-spin" : "animate__little_swing"
            }`}
            src={`/podcast.svg`}
            alt="Podcast Logo"
          />
        </div>
        <h4 className="text-4xl font-bold mt-16 mb-6 text-center text-indigo-700 mb-8">
          {loginPage ? "Welcome back" : "Creating account"}
        </h4>
        <form
          className="w-full flex flex-col text-lg text-indigo-700 ouline-none"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col mb-4">
            <div className="flex items-center relative">
              <input
                type="email"
                ref={register({
                  required: {
                    value: true,
                    message: "Email address required",
                  },
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "Email address invalid.",
                  },
                })}
                placeholder="Email address"
                name="email"
                className="w-full border rounded-lg  py-3 px-5 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-opacity-80 outline-none transition duration-500"
              />
              <FontAwesomeIcon
                className="text-gray-600 absolute right-5"
                icon={faMailBulk}
              />
            </div>
            {errors.email && (
              <span className="text-sm text-red-600 italic text-left mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <div className="flex items-center relative">
              <input
                type="password"
                ref={register({
                  required: {
                    value: true,
                    message: "Please write your password",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be longer than 6.",
                  },
                  maxLength: {
                    value: 16,
                    message: "Password must be shorter than 16.",
                  },
                })}
                placeholder="Password"
                name="password"
                className="w-full border rounded-lg py-3 px-5 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-opacity-80 outline-none transition duration-500"
              />
              <FontAwesomeIcon
                className="text-gray-600 right-5 absolute"
                icon={faKey}
              />
            </div>
            {errors.password && (
              <span className="text-sm text-red-600 italic text-left mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
          {!loginPage && (
            <>
              <div className="flex flex-col mb-4">
                <div className="flex items-center relative">
                  <input
                    type="password"
                    ref={register({
                      required: {
                        value: true,
                        message: "Please check your password",
                      },
                      minLength: {
                        value: 6,
                        message: "Password must be longer than 6.",
                      },
                      maxLength: {
                        value: 16,
                        message: "Password must be shorter than 16.",
                      },
                    })}
                    placeholder="Verify your password"
                    name="password2"
                    className="w-full border rounded-lg py-3 px-5 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-opacity-80 outline-none transition duration-500"
                  />
                  <FontAwesomeIcon
                    className="text-gray-600 right-5 absolute"
                    icon={faKey}
                  />
                </div>
                {errors.password2 && (
                  <span className="text-sm text-red-600 italic text-left mt-1">
                    {errors.password2.message}
                  </span>
                )}
              </div>
              <select
                ref={register()}
                name="role"
                className="w-full border rounded-lg py-4 px-5 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-opacity-80 outline-none transition duration-500"
                defaultValue="Host"
              >
                <option>Host</option>
                <option>Listener</option>
              </select>
            </>
          )}
          {errorMsg && (
            <div>
              <p className="text-sm text-red-600 italic text-left mt-1 text-center">
                {errorMsg}
              </p>
            </div>
          )}
          <div className="mt-6" />
          <ButtonInactivable isActivate={!loading} loading={loading}>
            {loginPage ? "Log in" : "Create Account"}
          </ButtonInactivable>
        </form>
        <div className="mt-2 text-md">
          {loginPage ? (
            <p>
              Don't you have account? Then,{" "}
              <Link
                to="/create-account"
                className="text-blue-600 hover:underline font-bold cursor-pointer"
              >
                Create Account
              </Link>
            </p>
          ) : (
            <p>
              Do you already have your account? Then,{" "}
              <Link
                to="/login"
                className="text-indigo-700 hover:underline font-bold cursor-pointer"
              >
                Log In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
