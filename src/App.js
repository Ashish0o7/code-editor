import "./App.css";
import Landing from "./components/Landing";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [userEmail, setUserEmail] = useState('');

  return (
    <div>
      <Header userEmail={userEmail} />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
        <Route path="/register" element={<Register setUserEmail={setUserEmail}/>} />
      </Routes>
    </div>
  );
}


export default App;