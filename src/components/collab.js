import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import './CollabEditor.css';
import axios from "axios";
const CollabEditor = () => {
  const [roomId, setRoomId] = useState('');
  const [code, setCode] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const codeEditorRef = useRef(null);
  const socketRef = useRef();

  useEffect(() => {
  const newSocket = io('http://localhost:8000');
  socketRef.current = newSocket;

  newSocket.on('connect', () => {
    setIsConnected(true);
  });

  newSocket.on('disconnect', () => {
    setIsConnected(false);
  });

  newSocket.on('newMessage', (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  });

  newSocket.on('code', (code) => {
    setCode(code);
    if (codeEditorRef.current) {
      codeEditorRef.current.setValue(code);
    }
  });

  newSocket.on('users', (users) => {
    setUsers(users);
  });

  return () => {
    newSocket.disconnect();
  };
}, []);


 const handleJoinRoom = () => {
  socketRef.current.emit('joinRoom', { roomId, username });
};


  const handleSendMessage = (message) => {
    socketRef.current.emit('newMessage', message);
  };

  const handleCodeChange = (editor, data, value) => {
  setCode(value);
  socketRef.current.emit('code', { roomId, code: value });
};


  const renderChatMessages = () => {
    return messages.map((message, index) => (
      <div key={index} className="chat-message">
        <span className="chat-username">{message.username}: </span>
        <span className="chat-text">{message.text}</span>

      </div>
    ));
  };

  function renderUsers(users) {
  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

function handleSubmit(event) {

    event.preventDefault();

    const messageInput = event.target.elements.messageInput;

    const message = messageInput.value.trim();

    if (message) {

      setMessages((prevMessages) => [

        ...prevMessages,

        { text: message, sender: "user" },

      ]);

      getChatGPTResponse(message);

      messageInput.value = "";

    }

  }
function getChatGPTResponse(message) {

    const apiKey = "your_api_key_here";

    const url = "https://api.openai.com/v1/engines/davinci-codex/completions";

    const data = {

      prompt: message,

      max_tokens: 64,

      temperature: 0.7,

      n: 1,

      stop: "\n",

    };

    axios

      .post(url, data, {

        headers: {

          "Content-Type": "application/json",

          Authorization: `Bearer ${apiKey}`,

        },

      })

      .then((response) => {

        const chatGPTResponse = response.data.choices[0].text.trim();

        setMessages((prevMessages) => [

          ...prevMessages,

          { text: chatGPTResponse, sender: "chatbot" },

        ]);

      })

      .catch((error) => console.error(error));

  }

  return (
  <div className="bg-gray-100 min-h-screen">
  <div className="container mx-auto px-4 py-8 mt-[-64px]">
    <div className="flex justify-center items-center mb-2 mt-10">
      <h1 className="text-1xl  text-white-000">Collaborate real time with others (Work in progress with Socket.Io)</h1>
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
        <button onClick={handleJoinRoom} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
          Join Room
        </button>
      </div>
    </div>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="h-full">
            <CodeMirror
              value={code}
              options={{
                mode: 'javascript',
                theme: 'material',
                lineNumbers: true,
              }}
              onBeforeChange={handleCodeChange}
              editorDidMount={(editor) => {
                codeEditorRef.current = editor;
              }}
            />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="h-full">
            <div className="flex flex-col h-full">
              <div className="flex-shrink-0 border-b-2 border-gray-400 pb-2 mb-2">
                <h2 className="text-lg font-bold text-gray-800">Users</h2>
              </div>
              <div className="flex-grow overflow-auto">
                {renderUsers()}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 col-span-2">
          <div className="h-full">
            <div className="flex flex-col h-full">
              <div className="flex-shrink-0 border-b-2 border-gray-400 pb-2 mb-2">
                <h2 className="text-lg font-bold text-gray-800">Chat</h2>
              </div>
              <div className="flex-grow overflow-auto">
                   <p> Will integrate ChatGPT 3.5 here pretty soon I guess :) </p>
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
              <div className="flex-shrink-0 mt-4">
                <input
                  type="text"
                  placeholder="Enter message"
                  className="px-3 py-2 rounded-lg border-2 border-gray-200 w-full focus:outline-none focus:border-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage(e.target.value);
                      e.target.value = '';
                    }
                  }}
               />
                  </div>
            </div>
          </div>
        </div>
      </div>
    
      
    )}
  </div>
</div>


  );
};

export default CollabEditor;
