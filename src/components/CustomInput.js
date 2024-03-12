import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-300 p-4 shadow-sm">
            <label className="block text-gray-800 font-semibold mb-2">Custom Input</label>
            <textarea
                rows="5"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Enter your custom input here..."
                className={classnames(
                    "w-full bg-gray-100 text-gray-800 border border-gray-300 p-2 rounded-lg shadow-sm transition duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                )}
            ></textarea>
        </div>
    );
};

export default CustomInput;
