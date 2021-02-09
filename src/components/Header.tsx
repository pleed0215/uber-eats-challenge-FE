import {
  faCoffee,
  faPodcast,
  faSearch,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { getRandomSoftBgColor, useBackgroundImageOrDefaultUrl } from "../utils";

interface PopupMenuProps {
  dropdownRef: React.MutableRefObject<HTMLDivElement>;
  popup: boolean | null;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ dropdownRef, popup }) => {
  return (
    <div
      ref={dropdownRef}
      className={`origin-top-right opacity-0 absolute z-50 left-0 top-8 mt-2 w-56 rounded-md shadown-lg bg-white ring-1 ring-black ring-opacity-5 ${
        popup === true && "dropdown__show block"
      } ${popup === false && "dropdown__hide hidden"} ${
        popup === null && "hidden"
      }`}
    >
      <div className="py-1" role="menu" aria-orientation="vertical">
        <Link
          to="/category"
          className="block px-4 py-2 text-sm text-purple-700 hover:bg-purple-200 hover:text-puple-900"
          role="menuitem"
        >
          <FontAwesomeIcon icon={faPodcast} size="lg" className="mr-3" />
          Category
        </Link>
        <Link
          to="/find"
          className="block px-4 py-2 text-sm text-purple-700 hover:bg-purple-200 hover:text-puple-900"
          role="menuitem"
        >
          <FontAwesomeIcon icon={faSearch} size="lg" className="mr-3" />
          Search
        </Link>
        <Link
          to="/my-page"
          className="block px-4 py-2 text-sm text-purple-700 hover:bg-purple-200 hover:text-puple-900"
          role="menuitem"
        >
          <FontAwesomeIcon icon={faCoffee} size="lg" className="mr-3" />
          My page
        </Link>
        <hr className="my-2" />
        <Link
          to="/logout"
          className="block px-4 py-2 text-sm text-purple-700 hover:bg-purple-200 hover:text-puple-900"
          role="menuitem"
        >
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-3" />
          Log out
        </Link>
      </div>
    </div>
  );
};

export const Header = () => {
  const { data, loading, error } = useMe();

  const { pathname, search } = useLocation();
  const [popup, setPopup] = useState<boolean | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(document.createElement("div"));

  const onPopupClick = () => {
    setPopup(!popup);
  };

  const onDropdownFocusOut = () => {
    if (popup !== null) {
      dropdownRef.current.classList.add("dropdown__hide");
      setTimeout(() => {
        setPopup(false);
        dropdownRef.current.classList.remove("dropdown__hide");
      }, 500);
    }
  };

  return (
    <div className="w-full flex justify-center bg-gray-800 shadow-lg border-b-2 border-gray-500 min-w-max">
      <div className="layout__container xl:max-w-screen-lg lg:max-w-screen-md  md:flex sm:hidden hidden  px-4 pt-4 bg-gray-800 justify-between">
        <div className="flex font-bold text-white -mb-1 w-full max-w-2xl">
          <Link to="/" className="mr-6">
            <div
              className="w-10 h-10 bg-cover bg-center animate-bounce"
              style={{ backgroundImage: `url(/podcast.svg)` }}
            />
          </Link>

          <ul className="items-center justify-around w-full flex">
            <Link
              to="/"
              className="hover:scale-y-125 transform transition duration-300"
            >
              <li
                className={`pb-2 ${
                  pathname === "/" && "border-b-4 border-purple-400 "
                }`}
              >
                Now Listen
              </li>
            </Link>
            <Link
              to="/category"
              className="hover:scale-y-125 transform transition duration-300"
            >
              <li
                className={`pb-2 ${
                  pathname === "/category" && "border-b-4 border-purple-400 "
                }`}
              >
                Categories
              </li>
            </Link>
            <Link
              to="/find"
              className="hover:scale-y-125 transform transition duration-300"
            >
              <li
                className={`pb-2 ${
                  pathname === "/find" && "border-b-4 border-purple-400 "
                }`}
              >
                Search
              </li>
            </Link>
            <Link
              to="/my-page"
              className="hover:scale-y-125 transform transition duration-300"
            >
              <li
                className={`pb-2 ${
                  pathname === "/my-page" && "border-b-4 border-purple-400 "
                }`}
              >
                My Page
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex items-center font-bold text-white min-w-max text-sm relative">
          <button onClick={onPopupClick} onBlur={onDropdownFocusOut}>
            <div className="mr-2 flex items-center">
              {data && loading === false && (
                <div
                  className={`mr-1 w-7 h-7 bg-cover bg-center rounded-full ${getRandomSoftBgColor()}`}
                  style={useBackgroundImageOrDefaultUrl(data?.me.portrait)}
                />
              )}
              <div className="flex flex-col">
                {data && loading === false && <span>{data.me.email}</span>}
                {data && loading === false && data?.me.name && (
                  <span className="text-xs -mt-1 italic">
                    ({data?.me.name})
                  </span>
                )}
              </div>
            </div>
          </button>
          <PopupMenu dropdownRef={dropdownRef} popup={popup} />
        </div>
      </div>
      <div className="layout__container md:hidden sm:flex px-6 pt-4 bg-gray-800 ">
        <div className="flex justify-between font-bold text-purple-200 -mb-1 w-full max-w-2xl ">
          <Link to="/" className="mr-6">
            <div
              className="w-10 h-10 bg-cover bg-center animate-bounce"
              style={{ backgroundImage: `url(/podcast.svg)` }}
            />
          </Link>
          <div className="flex items-center font-bold text-purple-200 min-w-max relative">
            <button onClick={onPopupClick} onBlur={onDropdownFocusOut}>
              <div className="mr-2 hover:underline flex items-center text-sm">
                <div
                  className={`mr-1 w-7 h-7 bg-cover bg-center rounded-full ${getRandomSoftBgColor()}`}
                  style={useBackgroundImageOrDefaultUrl(data?.me.portrait)}
                />
                {data &&
                  loading === false &&
                  `${data.me.email}${data.me.name ? `(${data.me.name})` : ""}`}
              </div>
            </button>

            <PopupMenu dropdownRef={dropdownRef} popup={popup} />
          </div>
        </div>
      </div>
    </div>
  );
};
