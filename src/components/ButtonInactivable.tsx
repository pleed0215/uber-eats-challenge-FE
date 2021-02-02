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
      className={`py-3 px-5 font-bold text-white mt-3 text-lg focus:outline-none hover:bg-indigo-800 transition duration-500 rounded-lg flex justify-center ${
        !isActivate ? "pointer-events-none bg-gray-400" : "bg-indigo-700"
      }`}
      {...rest}
    >
      {/*{loading ? <Loader color="" /> : children}*/}
      {loading ? <Loader /> : children}
    </button>
  );
};
