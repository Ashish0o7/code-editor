import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Rating from "react-rating";
import MonacoEditor from "@monaco-editor/react";
import CodeEditorWindow from "./CodeEditorWindow";

const FeaturedCodes = () => {
  const [codes, setCodes] = useState([]);
  const [newCode, setNewCode] = useState({ title: "", code: "" });
  const formRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://featured-code-server.onrender.com/api/codes");
      setCodes(response.data);
    } catch (error) {
      console.error("Error fetching featured codes:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCode((prevCode) => ({
      ...prevCode,
      [name]: value,
    }));
  };

  const handleCodeChange = (value) => {
    setNewCode((prevCode) => ({
      ...prevCode,
      code: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post("https://featured-code-server.onrender.com/api/codes", newCode);
    setNewCode({ title: "", code: "" });

    fetchData(); // Fetch the updated list of codes after submission
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Featured Codes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {codes.map((code) => (
          <div key={code.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{code.title}</h2>
              <div className="h-40 overflow-y-auto bg-gray-100 p-2 rounded-md">
                <pre className="text-sm text-gray-800">{code.code}</pre>
              </div>
              <div className="mt-2">
                <Rating
                  emptySymbol={<i className="far fa-star text-gray-400"></i>}
                  fullSymbol={<i className="fas fa-star text-yellow-500"></i>}
                  initialRating={code.rating}
                  readonly
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-800 mt-8">
        <p className="font-bold mb-2">Note:</p>
        <p>
          Hi, Ashish here. This page is a work in progress. I will make this page real-time using a MongoDB server and provide a rating option for featured posts. Anyone will be able to post their particular code or post. Stay tuned for updates!
        </p>
      </div>

      <div className="bg-gradient-to-r from-black to-purple-500 p-4 rounded-md text-white mt-8">
        <h2 className="text-2xl font-bold mb-4">Share Your Code</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              name="title"
              placeholder="Enter code title"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block bg-black text-white font-bold mb-2 py-1 px-3 rounded-t-md" htmlFor="code">
              Code
            </label>
            <div className="w-full h-80">
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
                onChange={handleCodeChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeaturedCodes;
