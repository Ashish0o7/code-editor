import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <div className="bg-gradient-to-r from-purple-700 to-indigo-900 rounded-md p-4">
      <label className="block text-white font-bold mb-2">Custom Input</label>
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder="Enter your custom input here..."
        className={classnames(
          "w-full bg-indigo-800 text-white border border-indigo-900 p-2 rounded-md shadow-md transition duration-200",
          "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        )}
      ></textarea>
    </div>
  );
};

export default CustomInput;
