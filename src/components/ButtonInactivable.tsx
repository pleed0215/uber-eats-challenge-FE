import React from "react";
import { Loader } from "./Loader";

interface IButtonInactivableType {
  isActivate?: boolean;
  loading: boolean;
}

export const ButtonInactivable: React.FC<IButtonInactivableType> = ({
  children,
  ...props
}) => {
  const { isActivate, loading, ...rest } = props;

  return (
    <button
      className={`form__button flex justify-center ${
        !isActivate ? "pointer-events-none bg-gray-400" : "bg-indigo-700"
      }`}
      {...rest}
    >
      {/*{loading ? <Loader color="" /> : children}*/}
      {loading ? <Loader /> : children}
    </button>
  );
};
