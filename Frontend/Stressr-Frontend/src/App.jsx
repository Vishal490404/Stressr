import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Particle from "./Components/Particle";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import { AuthProvider } from "./AuthContext";
import AboutPage from "./AboutPage";
// import MainEditor from "./Components/MainEditor";
// import { SelectorMenu } from "./Components/TestGeneratorSelector";
// import MainEditor from "./Components/MainEditor";
// import SelectorMenu from "./Components/TestGeneratorSelector";

function App() {
  return (
    <AuthProvider>
      <Particle />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/editor" element={<MainEditor />} />
          <Route path="/test-generator" element={<SelectorMenu />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
