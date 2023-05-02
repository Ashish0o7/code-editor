import React, { useState, useEffect } from "react";
import CodeEditorWindow from "./CodeEditorWindow";

const SavedCodes = () => {
  const [savedCodes, setSavedCodes] = useState([]);

  useEffect(() => {
    const codes = JSON.parse(localStorage.getItem("savedCodes")) || [];
    setSavedCodes(codes);
  }, []);

  const handleCodeClick = (index) => {
    setSavedCodes((prevCodes) =>
      prevCodes.map((code, i) =>
        i === index ? { ...code, showCode: !code.showCode } : code
      )
    );
  };

  const handleCodeDelete = (index) => {
    const updatedCodes = [...savedCodes];
    updatedCodes.splice(index, 1);
    setSavedCodes(updatedCodes);
    localStorage.setItem("savedCodes", JSON.stringify(updatedCodes));
  };

  return (
    <div className="mx-6 mt-10 pt-3">
  <h1 className="text-4xl font-bold mb-8 mt-8">Saved Codes</h1>
  {savedCodes.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {savedCodes.map((code, index) => (
        <li
  key={index}
  className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition duration-200"
  onClick={() => handleCodeClick(index)}
>
  <div className="p-6">
    <div className="flex justify-between items-center mb-4">
      <span className="text-xl font-bold">{code.title}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleCodeDelete(index);
        }}
        className="text-red-500 hover:text-red-600 font-medium"
      >
        Delete
      </button>
    </div>
    <span className="text-gray-500 text-sm">{code.date}</span>
   {code.outputDetails && (
  <div className="mt-4 rounded-md bg-gray-100 p-4">
   <p>Status: {code.outputDetails.status && code.outputDetails.status.description}</p>

    <p>Time: {code.outputDetails.time}</p>
    <p>Memory: {code.outputDetails.memory}</p>
  </div>
)}

  </div>
  {code.showCode && (
    <div className="px-6 pb-6">
      <CodeEditorWindow code={code.code} readOnly={true} />
    </div>
  )}
</li>

      ))}
    </ul>
  ) : (
    <p className="text-lg text-gray-500 mt-4">No saved codes found.</p>
  )}
</div>


  );
};

export default SavedCodes;
