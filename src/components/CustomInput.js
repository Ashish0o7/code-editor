import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <div className="bg-gray-800 rounded-md p-4">
  <label className="block text-white font-bold mb-2">Custom Input</label>
  <textarea
    rows="5"
    value={customInput}
    onChange={(e) => setCustomInput(e.target.value)}
    placeholder={`Enter your custom input here...`}
    className={classnames(
      "w-full bg-gray-600 text-white border border-gray-600 p-2 rounded-md shadow-md transition duration-200",
      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    )}
  ></textarea>
</div>
  );
};

export default CustomInput;
