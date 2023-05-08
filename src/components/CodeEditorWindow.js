import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { db } from "./firebase";
import { classnames } from "../utils/general";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(value);
    toast.success("Code copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <div className="flex items-center justify-between px-4 py-2 bg-black border-b border-gray-600">
        <h1 className="text-xl font-bold text-white">Code Editor</h1>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:shadow-lg transition duration-200"
          onClick={handleCopyToClipboard}
        >
          Copy
        </button>
      </div>
      <Editor
        height="68vh"
        width={`100%`}
        language={language || "c++"}
        value={value}
        theme={theme}
        options={{
          fontSize: 16,
          lineNumbers: "on",
          wordWrap: "on",
          automaticLayout: true,
          fontFamily: "monospace",
        }}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
      <ToastContainer />
    </div>
  );
};

export default CodeEditorWindow;
