import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center mt-8">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-500 h-10 w-10"></div>
    </div>
  );
};

export default Loading;
