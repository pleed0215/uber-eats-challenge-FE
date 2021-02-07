import React from "react";
import { UserRole } from "../pages/auth/auth";

interface User {
  name?: string | null;
  email?: string | null;
  role?: UserRole | null;
  portrait?: string | null;
}

export const Profile: React.FC<{ user?: User | null; loading: boolean }> = ({
  user,
  loading,
}) => {
  return loading ? (
    <div className="max-w-sm w-full flex flex-col items-center">
      <div className="w-full h-6 bg-purple-200 animate-pulse mb-6 rounded-md" />
      <div className=" w-28 h-28 bg-cover bg-center rounded-full bg-purple-200 mb-6 animate-pulse" />
      <div className="w-full flex flex-col border rounded-lg broder-purple-800 py-2 px-4 text-white text-xl ">
        <div className="w-2/3 h-5 bg-purple-200 animate-pulse mb-2  rounded-md" />
        <div className="w-5/6 h-5 bg-purple-200 animate-pulse mb-2  rounded-md" />
        <div className=" w-4/5 h-5 bg-purple-200 animate-pulse mb-2  rounded-md" />
      </div>
    </div>
  ) : (
    <div className=" max-w-sm w-full flex flex-col items-center">
      <h3 className="text-2xl font-bold text-white mb-6">
        {user?.email}'s Page
      </h3>
      <div
        className=" w-28 h-28 bg-cover bg-center rounded-full bg-blue-200 mb-6"
        style={{
          backgroundImage: `url(${
            user?.portrait ? user.portrait : "/podcast.svg"
          })`,
        }}
      />
      <div className="w-full flex flex-col border rounded-lg broder-purple-800 py-2 px-4 text-white text-xl ">
        <p>
          <strong>Email: </strong>
          {user?.email}
        </p>
        <p>
          {user?.name && <strong>Name: </strong>}
          {user?.name}
        </p>
        <p>
          <strong>Role: </strong>
          {user?.role}
        </p>
      </div>
    </div>
  );
};
