import { FaUser } from 'react-icons/fa';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import "firebase/compat/storage";

function Header() {

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem("email");
      window.location.reload();
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900 text-white px-4 py-2 flex items-center justify-between z-50">
      <div className="flex-shrink-0">
        <div className="flex justify-start">
          <Link to="/" className="flex items-center">
            <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Logo" />
            <span className="ml-2 text-white font-bold text-lg">Code Editor</span>
          </Link>
        </div> 
      </div>
      <div className="flex-shrink-0">
        <ul className="flex flex-row space-x-12">
        
          <li><a href="#">Saved Codes</a></li>
          <li><a href="#">Other Projects</a></li>
        </ul>
      </div>
      <div className="flex-shrink-0">
        {localStorage.getItem("email") ? (
          <div className="flex items-center space-x-2">
            <FaUser className="h-6 w-6 fill-current" />
            <span id="header-email" className="text-white-800 font-bold">{localStorage.getItem("email")}</span>

            <button
              onClick={handleLogout}
              className="border border-white rounded-md px-3 py-1 text-sm font-medium hover:bg-white hover:text-gray-900 transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="flex items-center space-x-2">
            <FaUser className="h-6 w-6 fill-current" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
