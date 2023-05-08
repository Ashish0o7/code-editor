import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";
import { FaSpinner } from 'react-icons/fa';
import { MdCode } from 'react-icons/md';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import Footer from "./Footer";
import Header from "./Header";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import { db } from "./firebase";
const javascriptDefault = `/*
 DFS Traversal
*/
#include<bits/stdc++.h>
using namespace std;

void dfs(int u, vector<int> adj[], vector<bool> &visited) {
    visited[u] = true;
    cout << u << " ";
    for(int v : adj[u]) {
        if(!visited[v]) {
            dfs(v, adj, visited);
        }
    }
}

int main() {
    int n, m;
    cout << "Enter the number of nodes and edges: ";
    cin >> n >> m;

    vector<int> adj[n+1];
    vector<bool> visited(n+1, false);

    cout << "Enter the edges: " << endl;
    for(int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    cout << "DFS Traversal: ";
    for(int i = 1; i <= n; i++) {
        if(!visited[i]) {
            dfs(i, adj, visited);
        }
    }

    return 0;
}

`;
const input_def=`5 4
1 3
2 4
1 2
4 3`;

const Landing = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState(input_def);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("Oceanic Next");
  const [language, setLanguage] = useState(languageOptions[0]);
   const [title, setTitle] = useState("");
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleSaveCode = () => {
  const savedCodes = JSON.parse(localStorage.getItem("savedCodes")) || [];

  const newCode = {
    code,
    title: title,
    timestamp: new Date().toLocaleString(),
    outputDetails: outputDetails, // add outputDetails property
  };

  savedCodes.push(newCode);
  localStorage.setItem("savedCodes", JSON.stringify(savedCodes));
  showSuccessToast("Code saved successfully!");
};
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

     
      
      {/* <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div> */}
     <Header/>
     <div></div>
  <div className="flex flex-row justify-between items-center p-4 rounded-md shadow-lg pt-20 relative z-5">
  <div className="flex">
    <div className="px-4 py-2">
      <LanguagesDropdown onSelectChange={onSelectChange} />
    </div>
    <div className="px-4 py-2">
      <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
    </div>
  </div>
  <div className="px-4 py-1">
    <input
      className="border-gray-400 border-2 rounded-md p-2 placeholder-gray-500 shadow-md text-black bg-white mr-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
      type="text"
      placeholder="Enter Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <button onClick={handleSaveCode} className={classnames(
        "text-white bg-purple-600 border-2 border-purple-600 z-10 rounded-md shadow-md px-4 py-2 hover:bg-purple-700 transition duration-200",
        "mt-2 ml-4", // adjust the margin values to match the other elements
        !code ? "opacity-50 cursor-not-allowed" : ""
      )}
      disabled={!code}
    >
      Save Code
    </button>
  </div>
</div>

      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
        <button
  onClick={handleCompile}
  disabled={!code}
  className={classnames(
    "mt-4 mb-4 px-6 py-3 text-white rounded-md shadow-md hover:shadow-lg transition duration-200 bg-gradient-to-r from-green-500 to-green-700",
    !code ? "opacity-50 cursor-not-allowed" : "",
    processing ? "bg-green-500" : ""
  )}
>

  {processing ? (
    <div className="flex items-center justify-center space-x-2">
      <FaSpinner className="w-6 h-6 animate-spin" />
      <span>Compiling...</span>
    </div>
  ) : (
    <div className="flex items-center justify-center space-x-2">
      <MdCode className="w-6 h-6" />
      <span>Compile Code</span>
    </div>
  )}
</button>


        <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
      

          <div className="flex flex-col pt-4">
               <OutputWindow outputDetails={outputDetails} />
           
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Landing;
