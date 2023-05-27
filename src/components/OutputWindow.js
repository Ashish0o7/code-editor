import React from "react";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // Compilation error
      return (
        <pre className="px-2 py-1 font-normal text-sm text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      // Successful execution
      return (
        <pre className="px-2 py-1 font-normal text-sm text-green-500">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      // Time Limit Exceeded
      return (
        <pre className="px-2 py-1 font-normal text-sm text-yellow-500">
          {"Time Limit Exceeded"}
        </pre>
      );
    } else {
      // Runtime error
      return (
        <pre className="px-2 py-1 font-normal text-sm text-red-500">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };

  return (
    <div className="bg-gray-800 rounded-md p-4">
      <h1 className="font-bold text-lg text-white mb-2">Output</h1>
      <div className="w-full h-48 bg-gray-900 rounded-md text-white font-normal text-sm overflow-y-auto">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </div>
  );
};

export default OutputWindow;
