import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-950">
      <div className="text-6xl animate-bounce">
        🍔
      </div>

      <p className="mt-6 text-lg font-semibold text-gray-700 dark:text-gray-300">
        Preparing your delicious experience...
      </p>

      <div className="mt-6 h-2 w-64 overflow-hidden rounded-full bg-orange-100 dark:bg-gray-800">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-orange-500"></div>
      </div>
    </div>
  );
};

export default Loader;