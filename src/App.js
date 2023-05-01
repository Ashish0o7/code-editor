import "./App.css";
import Landing from "./components/Landing";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import SavedCodes from "./components/SavedCodes"; // import the new component
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeaturedCodes from "./components/Featured"
function App() {
  const [userEmail, setUserEmail] = useState('');
  const [savedCodes, setSavedCodes] = useState([]); // initialize saved codes as an empty array

  return (
    <div>
   
        <Header userEmail={userEmail} />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
          <Route path="/register" element={<Register setUserEmail={setUserEmail}/>} />
          <Route path="/saved-codes" element={<SavedCodes savedCodes={savedCodes} />} /> // add the new route
           <Route path="/featured" element={<FeaturedCodes  />} />
        </Routes>

    </div>
  );
}

export default App;
