import React from "react";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // Compilation error
      return (
          <pre className="px-2 py-1 font-normal text-sm text-red-600 whitespace-pre-wrap">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      // Successful execution
      return (
          <pre className="px-2 py-1 font-normal text-sm text-green-600 whitespace-pre-wrap">
          {atob(outputDetails.stdout) !== null
              ? `${atob(outputDetails.stdout)}`
              : null}
        </pre>
      );
    } else if (statusId === 5) {
      // Time Limit Exceeded
      return (
          <pre className="px-2 py-1 font-normal text-sm text-yellow-600 whitespace-pre-wrap">
          {"Time Limit Exceeded"}
        </pre>
      );
    } else {
      // Runtime error
      return (
          <pre className="px-2 py-1 font-normal text-sm text-red-600 whitespace-pre-wrap">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };

  return (
      <div className="bg-white rounded-lg border border-gray-300 p-4 shadow-sm">
        <h1 className="font-semibold text-lg text-gray-800 mb-2">Output</h1>
        <div className="w-full h-40 md:h-48 bg-gray-100 rounded-lg text-gray-800 font-normal text-sm overflow-y-auto">
          {outputDetails ? <>{getOutput()}</> : null}
        </div>
      </div>
  );
};

export default OutputWindow;
