import React from "react";
interface ILoader {
  size?: number; // size using tailwindcss unit.
  color?: string; // web color not tailwind color
}

export const Loader: React.FC<ILoader> = ({ size = 5, color = "#0d335d" }) => {
  return (
    <div
      className={`animate-spin w-6 h-6 rounded-full border border-t-2 border-gray-200`}
      style={{ borderTopColor: color }}
    />
  );
};
