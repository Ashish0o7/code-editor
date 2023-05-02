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

  

  return (
     
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <div className="flex items-center justify-between px-4 py-2 bg-black border-b border-gray-600">
      <h1 className="text-xl font-bold text-white">Code Editor</h1>
      
    </div>
      <Editor
        height="74vh"
        width={`100%`}
        language={language || "c++"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
     
    </div>
  );
};

export default CodeEditorWindow;
