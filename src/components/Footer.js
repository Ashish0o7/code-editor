import React from "react";

const Footer = () => {
  return (
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <p className="text-sm font-medium">
              Created by Ashish
            </p>
            <div className="flex items-center space-x-4">
              {/* Add links to your other works */}
              <a
                  href="https://github.com/Ashish0o7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition duration-150 ease-in-out"
              >
                <svg
                    className="h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                  <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 0a12 12 0 00-3.819 23.358c.6.117.819-.261.819-.581 0-.29-.012-1.06-.018-2.08-3.338.725-4.042-1.609-4.042-1.609-.546-1.39-1.334-1.758-1.334-1.758-1.089-.745.084-.729.084-.729 1.204.084 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.305 3.493.998.109-.768.419-1.305.763-1.605-2.665-.306-5.466-1.332-5.466-5.93 0-1.313.465-2.386 1.235-3.222-.135-.306-.537-1.527.104-3.176 0 0 1.01-.324 3.3 1.23a11.567 11.567 0 013.006-.402c1.02 0 2.047.137 3.006.402 2.29-1.554 3.3-1.23 3.3-1.23.643 1.65.24 2.87.12 3.176.765.836 1.23 1.91 1.23 3.222 0 4.61-2.805 5.62-5.475 5.916.42.372.81 1.105.81 2.227 0 1.61-.015 2.907-.015 3.307 0 .32.21.7.825.58A12 12 0 0012 0"
                  />
                </svg>
              </a>

              <a
                  href="https://parkvease.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition duration-150 ease-in-out"
              >
                ParkEase
              </a>
              <a
                  href="https://github.com/Ashish0o7/product_recommendation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition duration-150 ease-in-out"
              >
                IntelliSelect
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
