// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   function handleSubmit(e) {
//     e.preventDefault();
//     // Your authentication logic goes here
//     navigate('/dashboard');
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Here, you can use any authentication service or logic
//     // For example, you can use a library like Firebase to authenticate the user
//     // and store the user's information in the app's state
//     // or in the browser's local storage or cookies

//     // For this sample code, let's assume that the authentication was successful
//     // and we have a valid username and password combination
//     if (username === "user" && password === "password") {
//       localStorage.setItem("username", username);
//       navigate("/");
//     } else {
//       setErrorMessage("Invalid username or password");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-md w-full space-y-4 p-8 bg-white rounded-md shadow-md"
//       >
//         <h2 className="text-2xl font-bold text-gray-800">Log in</h2>
//         {errorMessage && (
//           <div className="text-red-500 font-bold">{errorMessage}</div>
//         )}
//         <div>
//           <label
//             htmlFor="username"
//             className="block text-gray-800 font-bold mb-2"
//           >
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//             className="w-full border-2 border-gray-400 p-2 rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="password"
//             className="block text-gray-800 font-bold mb-2"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//             className="w-full border-2 border-gray-400 p-2 rounded-md"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600"
//         >
//           Log in
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
  auth,
  email,
  password
);
const user = userCredential.user;
localStorage.setItem("email", user.email);
localStorage.setItem("password", password);
localStorage.setItem("displayName", user.displayName);

    navigate("/");
  } catch (error) {
    setErrorMessage(error.message);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full space-y-4 p-8 bg-white rounded-md shadow-md"
      >
        <h2 className="text-2xl font-bold text-gray-800">Log in</h2>
        {errorMessage && (
          <div className="text-red-500 font-bold">{errorMessage}</div>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-gray-800 font-bold mb-2"
          >
            Email
          </label>
          <input
         type="email"
          id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
          className="w-full border-2 border-gray-400 p-2 rounded-md" required/>

        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-800 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full border-2 border-gray-400 p-2 rounded-md"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-bold bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ..."
          >
            Log in
          </button>
          <Link
            to="/register"
            className="text-blue-600 font-bold hover:underline "
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
