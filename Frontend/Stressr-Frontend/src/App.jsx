import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Particle from "./Components/Particle";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import { AuthProvider } from "./AuthContext";
import AboutPage from "./AboutPage";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Dashboard";
import NotFound from "./Components/NotFound"; 

function App() {
  return (
    <AuthProvider>
      <Particle />
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
