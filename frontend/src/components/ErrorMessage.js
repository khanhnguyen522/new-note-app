import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-500 text-white font-bold p-2 rounded-md h-8 mt-8 flex items-center justify-start">
      {message}
    </div>
  );
};

export default ErrorMessage;
