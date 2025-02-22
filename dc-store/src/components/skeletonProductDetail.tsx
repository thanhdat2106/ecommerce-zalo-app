import React from "react";

type Props = {};

const SkeletonProductDetail = (props: Props) => {
  return (
    <div className="relative bg-gray-100 rounded-lg shadow-lg h-full">
      <div className="relative bg-white mt-4">
        <div className="w-[80%] h-[500px] bg-gray-300 animate-pulse mx-auto rounded-t-lg"></div>
        <span className="absolute top-2 right-2 bg-gray-300 text-white text-sm px-2 py-1 rounded-full">
          <div className="w-20 h-5 bg-gray-400 rounded animate-pulse"></div>
        </span>
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 py-4 border rounded-2xl bg-white w-11/12">
        <div className="px-4 text-lg font-semibold bg-gray-300 h-6 w-1/2 rounded animate-pulse"></div>
        <div className="flex items-center justify-between mt-2 bg-gray-200 p-4">
          <div className="h-5 w-24 bg-gray-400 rounded animate-pulse"></div>
          <div className="h-5 w-10 bg-gray-400 rounded animate-pulse"></div>
        </div>
        <div className="px-4 mt-4">
          <div className="border p-2 rounded-lg">
            <div className="h-5 w-32 bg-gray-400 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-300 rounded mt-2 animate-pulse"></div>
            <div className="h-4 w-full bg-gray-300 rounded mt-2 animate-pulse"></div>
            <div className="h-4 w-full bg-gray-300 rounded mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white rounded-t-lg shadow-lg">
        <div className="h-12 w-full bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonProductDetail;
