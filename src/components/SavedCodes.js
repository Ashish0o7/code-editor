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
      <h1 className="text-2xl font-bold mb-4 mt-8">Saved Codes</h1>
      {savedCodes.length > 0 ? (
        <ul className="space-y-4">
          {savedCodes.map((code, index) => (
            <li
              key={index}
              className="border-2 border-gray-300 p-4 cursor-pointer"
              onClick={() => handleCodeClick(index)}
            >
              <div className="flex justify-between">
                <span className="font-bold">{code.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCodeDelete(index);
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
              <span className="text-gray-500">{code.date}</span>
              {code.showCode && (
                <div className="mt-4">
                  <CodeEditorWindow code={code.code} readOnly={true} />
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved codes found.</p>
      )}
    </div>
  );
};

export default SavedCodes;
