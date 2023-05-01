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
