import "./App.css";
import Landing from "./components/Landing";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import SavedCodes from "./components/SavedCodes";
import { useState } from "react";
import AddQuestion from "./components/add_question";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // use HashRouter instead of BrowserRouter
import FeaturedCodes from "./components/Featured";

import CollabEditor from "./components/collab";
function App() {
  const [userEmail, setUserEmail] = useState('');
  
  return (
    <div>
      
     
        <Header userEmail={userEmail} />

        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
           <Route path="/collab" element={<CollabEditor />} />
          <Route path="/register" element={<Register setUserEmail={setUserEmail}/>} />
          <Route path="/saved-codes" element={<SavedCodes/>} />
          <Route path="/featured" element={<FeaturedCodes  />} />
            <Route path="/add_question" element={<AddQuestion />} />
        </Routes>

    </div>
  );
}

export default App;
