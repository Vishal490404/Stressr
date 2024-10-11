import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Particle from "./Components/Particle";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
// import MainEditor from "./Components/MainEditor";
// import SelectorMenu from "./Components/TestGeneratorSelector";

function App() {
  return (
    <div>
      <Particle /> 
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/editor" element={<MainEditor />} /> */}
          {/* <Route path="/test-generator" element={<SelectorMenu />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
