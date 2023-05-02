import "./App.css";
import Landing from "./components/Landing";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import SavedCodes from "./components/SavedCodes";
import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // use HashRouter instead of BrowserRouter
import FeaturedCodes from "./components/Featured";

function App() {
  const [userEmail, setUserEmail] = useState('');
  
  return (
    <div>
     
        <Header userEmail={userEmail} />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
          <Route path="/register" element={<Register setUserEmail={setUserEmail}/>} />
          <Route path="https://code-editor-6rqa.onrender.com/saved-codes" element={<SavedCodes/>} />
          <Route path="https://code-editor-6rqa.onrender.com/featured" element={<FeaturedCodes  />} />
        </Routes>
   
    </div>
  );
}

export default App;
