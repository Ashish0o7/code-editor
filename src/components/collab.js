import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import axios from "axios";
import { FaSpinner } from 'react-icons/fa';
import { MdCode } from 'react-icons/md';
import { classnames } from "../utils/general";
import "react-toastify/dist/ReactToastify.css";

import MonacoEditor from "@monaco-editor/react";
import useKeyPress from "../hooks/useKeyPress";


import ThemeDropdown from "./ThemeDropdown";

import LanguagesDropdown from "./LanguagesDropdown";
import { languageOptions } from "../constants/languageOptions";
import './CollabEditor.css';
import { defineTheme } from "../lib/defineTheme";
const CollabEditor = () => {
  let isEmitting = false;
  let lastEmittedCode = '';
  const [roomId, setRoomId] = useState('');
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState("Oceanic Next");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [customInput, setCustomInput] = useState();
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const monacoRef = useRef(null);
  const [title, setTitle] = useState("");
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const [sender, setSender] = useState(null);
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
                `Quota of 100 requests exceeded for the Day!!`,
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
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('https://chat-code-server.onrender.com'); // Update the URL as per your Socket.IO server configuration

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      console.log('User connected');
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current.on('code-update', ({ code, sender }) => {
      if (sender !== username && monacoRef.current && code !== lastEmittedCode) { // Redundant check
        const model = monacoRef.current.editor.getModel();
        if (model.getValue() !== code) {
          model.setValue(code);
          lastEmittedCode = code;  // Update for consistency
        }
      }
    });

    socketRef.current.on('chat-message', (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.message, sender: data.sender },
      ]);
    });

    socketRef.current.on('user-joined', (data) => {
      setUsers(data.users);
      toast.success(`${data.username} has joined the room`);
    });

    socketRef.current.on('user-left', (data) => {
      setUsers(data.users);
      toast.error(`${data.username} has left the room`);
    });

    return () => {
      socketRef.current.off('code-update');
      socketRef.current.disconnect();
    };
  }, [username]);

  function handleJoinRoom() {
    if (!roomId || !username) return;

    socketRef.current.emit('join-room', { roomId, username }, (data) => {
      setUsers(data.users);
      setMessages(data.messages);
      setCode(data.code);
    });
  }
// Use a different flag name for clarity

  function handleCodeChange(value) {
    setCode(value);
    if (socketRef.current && !isEmitting && value !== lastEmittedCode) { // Additional check
      isEmitting = true;
      lastEmittedCode = value; // Update the last emitted code
      socketRef.current.emit('code-update', { roomId: roomId, code: value, sender: username });
      isEmitting = false;
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    const messageInput = event.target.elements.messageInput;
    const message = messageInput.value.trim();

    if (message) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: username },
      ]);
      socketRef.current.emit('chat-message', {
        roomId: roomId,
        message: message,
        sender: username,
      });

      messageInput.value = '';
    }


  }

  function renderUsers() {
    return users.map((user) => (
        <div key={user} className="flex items-center my-1">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span>{user}</span>
        </div>
    ));
  }
  function handleEditorDidMount(editor, monaco) {
    monacoRef.current = { editor };
  }

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
  function renderChatMessages() {
    return messages.map((message, index) => (
        <div
            key={index}
            className={`${
                message.sender === username ? 'text-blue-700' : 'text-green-700'
            }`}
        >
          <span>{message.sender}: </span>
          {message.text}
        </div>
    ));
  }

  return (
      <div className="bg-gray-100 min-h-screen">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
        <div className="container mx-auto px-4 py-8 mt-[-64px]">
          <div className="flex justify-center items-center mb-2 mt-10">
            <h1 className="text-1xl text-white-000">
              Collaborate real-time with others (Work in progress with Socket.IO)
            </h1>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <input
                  type="text"
                  placeholder="Enter room ID"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full sm:w-auto bg-gray-100 border-b-2 border-gray-400 focus:outline-none focus:border-gray-600 text-gray-700 font-medium py-2 px-2 rounded-md"
              />
              <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full sm:w-auto bg-gray-100 border-b-2 border-gray-400 focus:outline-none focus:border-gray-600 text-gray-700 font-medium py-2 px-2 rounded-md"
              />
              <button
                  onClick={handleJoinRoom}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Join Room
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="h-full">
                <div className="flex flex-col h-full">
                  <div className="flex-shrink-0 border-b-2 border-gray-400 pb-2 mb-2">
                    <h2 className="text-lg font-bold text-gray-800">Chat</h2>
                  </div>
                  <div className="flex-grow overflow-auto">
                    {renderChatMessages()}
                  </div>
                  <form onSubmit={handleSubmit} className="flex p-4">
                    <input
                        type="text"
                        name="messageInput"
                        className="flex-grow border border-gray-400 rounded-l-lg py-2 px-3"
                        placeholder="Type your message here..."
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-r-lg py-2 px-4"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="h-full">
                <div className="flex flex-col h-full">
                  <div className="flex-shrink-0 border-b-2 border-gray-400 pb-2 mb-2">
                    <h2 className="text-lg font-bold text-gray-800">Users</h2>
                  </div>
                  <div className="flex-grow overflow-auto">{renderUsers()}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row space-x-4 items-center p-4 rounded-md shadow-lg pt-20 relative z-5">
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
              <button
                  onClick={handleSaveCode}
                  className={classnames(
                      "text-white bg-purple-600 border-2 border-purple-600 z-10 rounded-md shadow-md px-4 py-2 hover:bg-purple-700 transition duration-200",
                      "mt-2 ml-4",
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
              <div className="w-full" style={{ height: "500px" }}>
                <MonacoEditor
                    height="100%"
                    language="cpp"
                    theme="vs-dark"
                    options={{
                      selectOnLineNumbers: true,
                      roundedSelection: false,
                      readOnly: false,
                      cursorStyle: "line",
                      automaticLayout: true,
                    }}
                    value={code}
                    onChange={handleCodeChange}
                    onMount={handleEditorDidMount}
                />
              </div>
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

              <CustomInput customInput={customInput} setCustomInput={setCustomInput} />

              <div className="flex flex-col pt-4">
                <OutputWindow outputDetails={outputDetails} />
              </div>
              {outputDetails && <OutputDetails outputDetails={outputDetails} />}
            </div>
          </div>
        </div>
      </div>
  );
};

export default CollabEditor;
