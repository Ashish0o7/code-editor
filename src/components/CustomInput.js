import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <div className="w-full max-w-md">
      <label className="block text-gray-700 font-bold mb-2">Custom Input</label>
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Enter your custom input here...`}
        className={classnames(
          "w-full border border-gray-400 p-2 rounded-md shadow-md transition duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        )}
      ></textarea>
    </div>
  );
};

export default CustomInput;
