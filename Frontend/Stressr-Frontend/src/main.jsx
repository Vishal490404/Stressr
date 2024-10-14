<<<<<<< Updated upstream
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="382370878900-moij3p8epkqnct9a85k4fffii1g1rnj4.apps.googleusercontent.com">
      
      <App />
    </GoogleOAuthProvider>
)
=======
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import App from "./App"; 
import Guide from "./Guide";
import "./index.css";

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/app" element={<App />} />
        <Route path="/guide" element={<Guide />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
>>>>>>> Stashed changes
