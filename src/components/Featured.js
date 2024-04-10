import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Rating from "./Rating";
import MonacoEditor from "@monaco-editor/react";
import { ToastContainer, toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
const FeaturedCodes = () => {
  const [fetchingQuestions, setFetchingQuestions] = useState(false);
  const [shareCode, setShareCode] = useState(false);
  const [codes, setCodes] = useState([]);
  const [newCode, setNewCode] = useState({ title: "", code: "" });
  const [loggedInUserEmail, setLoggedInUserEmail] = useState("");
  const [userRating, setUserRating] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    fetchData();
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setLoggedInUserEmail(userEmail);
    }
  }, []);

  const fetchData = async () => {

  try {
    const response = await axios.get(
      "https://featured-code-server.onrender.com/api/codes"
    );
    const sortedCodes = response.data.sort((a, b) => b.averageRating - a.averageRating);
    setCodes(sortedCodes);
    setFetchingQuestions(true);
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
    setShareCode(false);
    const email2=loggedInUserEmail;
    await axios.post(
      "https://featured-code-server.onrender.com/api/codes",
        { ...newCode, email: email2 },

    );
    setNewCode({ title: "", code: "" });

    fetchData(); // Fetch the updated list of codes after submission
  };

  const handleRatingChange = (value) => {
    setUserRating(value);
  };

  const submitRating = async (codeId) => {
    try {
      await axios.post(
        `https://featured-code-server.onrender.com/api/rating/${codeId}`,
        {
          email: loggedInUserEmail,
          rating: userRating,
        }
      );

      setUserRating(0);
      fetchData(); // Refresh the codes after rating submission
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };
 return (
      <div className="p-4">
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
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">Featured Codes</h1>

        {!fetchingQuestions && (
            <div className="flex overflow-x-auto max-w-full gap-4">
              {Array.from({length: 5}).map((_, index) => (
                  <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden animate-pulse"
                       style={{minWidth: '300px'}}>
                    <div className="p-4">
                      <div className="h-6 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-40 bg-gray-100 p-2 rounded-md"></div>
                      <div className="mt-2">
                        <div className="h-4 bg-blue-300 rounded w-1/4 mb-2"></div>
                        <div className="h-8 bg-blue-300 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
        )}

        {!shareCode && (
            <div className="mt-8">
              <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setShareCode(true)}
              >
                Share Your Code
              </button>
            </div>
        )}

        {!shareCode && fetchingQuestions && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {codes.map((code) => (
                    <div key={code.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                      <div className="p-4">
                        <h2 className="text-xl font-bold text-indigo-700 mb-2">{code.title}</h2>
                        <p className="text-sm text-gray-600">Submitted by: {code.email}</p>
                        <div className="h-40 overflow-y-auto bg-gray-100 p-2 rounded-md">
                          <pre className="text-sm text-gray-800">{code.code}</pre>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center">
                            {/* Rating and button components */}
                          </div>
                          <p className="text-sm text-gray-700 mt-1">Average Rating: {code.averageRating}</p>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
              <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-800 mt-8">
                <p className="font-bold mb-2">Note:</p>
                <p>All codes are stored, rated by others, with top-rated posts featured prominently</p>
              </div>
            </>
        )}

        {shareCode && (
            <div className="bg-gradient-to-r from-purple-600 to-indigo-500 p-4 rounded-md text-white mt-8">
              {/* Share code form */}
            </div>
        )}
      </div>
  );
};
export default FeaturedCodes;


