import { FaUser } from 'react-icons/fa';
import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import "firebase/compat/storage";
import AddQuestion from "./add_question";
import SavedCodes from './SavedCodes';
import FeaturedCodes from './Featured';
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        firebase.auth().signOut().then(() => {
            localStorage.removeItem("email");
            window.location.reload();
        }).catch((error) => {
            console.error(error);
        });
    };
    return (
        <div
            className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-800 to-indigo-700 text-white px-4 py-3 flex items-center justify-between z-30">
            <div className="flex items-center">
                <Link to="/" className="flex items-center">
                    <img className="h-8 w-auto sm:h-10"
                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Atom_editor_logo.svg/1024px-Atom_editor_logo.svg.png"
                         alt="Atom Logo"/>
                    <span className="ml-3 text-white font-bold text-xl sm:text-2xl">Code Editor</span>
                </Link>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-8 mt-2 sm:mt-0">
                <Link to="/saved-codes"
                      className="text-base sm:text-lg font-medium hover:text-gray-200 transition duration-200">Saved
                    Codes</Link>
                <Link to="/collab"
                      className="text-base sm:text-lg font-medium hover:text-gray-200 transition duration-200">Collaborate</Link>
                <Link to="/featured"
                      className="text-base sm:text-lg font-medium hover:text-gray-200 transition duration-200">Featured
                    Codes</Link>
                <Link to="/add_question"
                      className="text-base sm:text-lg font-medium hover:text-gray-200 transition duration-200">Add
                    Question</Link>
            </div>

            <div className="flex items-center space-x-3">
                {localStorage.getItem("email") ? (
                    <div className="flex items-center space-x-3">
                        <FaUser className="h-6 w-6 fill-current text-gray-300"/>
                        <span id="header-email"
                              className="text-white font-medium text-base sm:text-lg">{localStorage.getItem("email")}</span>

                        <button
                            onClick={handleLogout}
                            className="border border-white rounded-md px-4 py-2 text-base font-medium bg-white text-gray-900 hover:bg-gray-300 hover:text-gray-900 transition duration-200"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login"
                          className="flex items-center space-x-3 bg-white text-gray-900 rounded-md px-4 py-2 text-base font-medium hover:bg-gray-300 hover:text-gray-900 transition duration-200">
                        <FaUser className="h-6 w-6 fill-current text-gray-400"/>
                        <span className="text-lg">Login</span>
                    </Link>
                )}
            </div>
        </div>

    );
}
    export default Header;
