import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";
import { FaSpinner } from 'react-icons/fa';
import { MdCode } from 'react-icons/md';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
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
  const [fetchingQuestions, setFetchingQuestions] = useState(false);
  const [code, setCode] = useState(javascriptDefault);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionDetails, setQuestionDetails] = useState(null);
  const [customInput, setCustomInput] = useState(input_def);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("Oceanic Next");
  const [language, setLanguage] = useState(languageOptions[0]);
   const [title, setTitle] = useState("");
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const CACHE_KEY = 'questions';
  const CACHE_TIMESTAMP_KEY = 'questions_timestamp';
  const CACHE_LIFETIME = 3600000; 
  useEffect(() => {
    // Fetch questions when the component mounts
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
  try {
    const now = new Date().getTime();
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    let questionsData = localStorage.getItem(CACHE_KEY);

    if (!questionsData || now - cachedTimestamp > CACHE_LIFETIME) {
      const response = await axios.get("https://add-code.onrender.com/api/");
      questionsData = response.data;
      localStorage.setItem(CACHE_KEY, JSON.stringify(questionsData));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, now.toString());
    } else {
      questionsData = JSON.parse(questionsData);
    }
    
    setQuestions(questionsData);
    setFetchingQuestions(true);
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};
const handleRefresh = () => {
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem(CACHE_TIMESTAMP_KEY);
  fetchQuestions();
};

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
};
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
  // const handleCompile = () => {
  //   setProcessing(true);
  //   const formData = {
  //     language_id: language.id,
  //     // encode source code in base64
  //     source_code: btoa(code),
  //     stdin: btoa(customInput),
  //   };
  //   const options = {
  //     method: "POST",
  //     url: process.env.REACT_APP_RAPID_API_URL,
  //     params: { base64_encoded: "true", fields: "*" },
  //     headers: {
  //       "content-type": "application/json",
  //       "Content-Type": "application/json",
  //       "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
  //       "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  //     },
  //     data: formData,
  //   };

  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       console.log("res.data", response.data);
  //       const token = response.data.token;
  //       checkStatus(token);
  //     })
  //     .catch((err) => {
  //       let error = err.response ? err.response.data : err;
  //       // get error status
  //       let status = err.response.status;
  //       console.log("status", status);
  //       if (status === 429) {
  //         console.log("too many requests", status);

  //         showErrorToast(
  //           `Quota of 100 requests exceeded for the Day! !`,
  //           10000
  //         );
  //       }
  //       setProcessing(false);
  //       console.log("catch block...", error);
  //     });
  // };
  const handleCompile = () => {
    setProcessing(true);

    const userEmail = localStorage.getItem('email'); 
    if (!userEmail) {
      showErrorToast('User email not found. Please login again.', 5000);
      setProcessing(false);
      return; 
    }

    const formData = {
      email: userEmail, 
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };

    axios.post('https://featured-code-server.onrender.com/compile', formData)
        .then(response => {
          // Handle success
          const token = response.data.token;
          checkStatus(token);
        })
        .catch(error => {
          // Handle errors and rate limiting
          if (error.response && error.response.status === 429) {
            showErrorToast('You have exceeded the limit of 3 requests per minute', 10000);
          } else {
            // Handle other errors
          }
          setProcessing(false);
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
        <Header />
        <div className="my-8"></div>
        <div className="container mx-auto px-4 mt-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <input
                  className="border-gray-400 border-2 rounded-md p-2 placeholder-gray-500 shadow-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  type="text"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />
              <button
                  onClick={handleSaveCode}
                  className={classnames(
                      "text-white bg-purple-600 border-2 border-purple-600 rounded-md shadow-md px-4 py-2 hover:bg-purple-700 transition duration-200",
                      !code ? "opacity-50 cursor-not-allowed" : ""
                  )}
                  disabled={!code}
              >
                Save Code
              </button>
              <LanguagesDropdown onSelectChange={onSelectChange}/>
              <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme}/>
              <button 
                   onClick={handleRefresh}
                    className="text-white bg-black border-2 border-purple-600 rounded-md shadow-md px-4 py-2 hover:bg-green-700 transition duration-200"
                    >Refresh Questions</button>
            </div>
          </div>
          {!fetchingQuestions ? (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                <ClipLoader
                    color={"#ffffff"} // Adjust the color to match your design
                    loading={true}
                    size={150}
                />
              </div>
          ) : (
              <>
                <h2 className="text-xl font-bold">Choose a Question</h2>
                <div className="flex overflow-x-auto max-w-full">
                  {Array.isArray(questions) && questions.length > 0 ? (
                      questions.map((question) => (
                          <div
                              key={question.pk}
                              className={`cursor-pointer p-2 border border-gray-200 rounded-md mr-4 ${
                                  selectedQuestion && selectedQuestion.pk === question.pk
                                      ? "bg-gray-200 outline-none border-purple-500"
                                      : ""
                              }`}
                              onClick={() => handleQuestionSelect(question)}
                          >
                            {question.fields.title}
                          </div>
                      ))
                  ) : (
                      <div>No questions available</div>
                  )}
                </div>
              </>
          )}

          <div className="my-8"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-2 border-black rounded-lg p-4 bg-gray-100">
                {selectedQuestion ? (
                    <div>
                      <div className="text-gray-800 font-normal text-sm">
                        <div key={selectedQuestion.pk} className="mb-4">
                          <h2 className="text-2xl font-bold mb-2">{selectedQuestion.pk}. {selectedQuestion.fields.title}</h2>
                          <p className="text-lg text-gray-800 mb-4">{selectedQuestion.fields.description}</p>
                          <h3 className="text-xl font-semibold mb-2">Constraints:</h3>
                          <p className="text-lg text-gray-800">{selectedQuestion.fields.constraints}</p>
                        </div>
                      </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                      <h2 className="text-xl font-bold">Please select a question above</h2>
                    </div>
                )}

                <div>
                  <CodeEditorWindow
                      code={code}
                      onChange={(value) => {
                        setCode(value);
                      }}
                      language={language.value}
                      theme={theme}
                  />
                  <div className="flex justify-end mt-4">
                    <button
                        onClick={handleCompile}
                        disabled={!code}
                        className={classnames(
                            "px-6 py-3 text-white rounded-md shadow-md hover:shadow-lg transition duration-200 bg-gradient-to-r from-green-500 to-green-700",
                            !code ? "opacity-50 cursor-not-allowed" : "",
                            processing ? "bg-green-500" : ""
                        )}
                    >
                      {processing ? (
                          <div className="flex items-center space-x-3">
                            <FaSpinner className="w-6 h-6 animate-spin"/>
                            <span>Compiling...</span>
                          </div>
                      ) : (
                          <div className="flex items-center space-x-3 ">
                            <MdCode className="w-6 h-6"/>
                            <span>Compile Code</span>
                          </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>

        </div>
        {selectedQuestion && (
            <div className="container mx-auto px-4 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
                </div>
                <div>
                  <OutputWindow outputDetails={outputDetails} />
                </div>
                <div>
                  <OutputDetails outputDetails={outputDetails} />
                </div>
              </div>
            </div>
        )}
       
      </>
  );

};

export default Landing;
