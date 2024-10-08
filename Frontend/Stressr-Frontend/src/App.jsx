import React, { useState } from "react";
import axios from "axios";
import MainEditor from "./Components/MainEditor";
import { SelectorMenu } from "./Components/TestGeneratorSelector";

function App() {
  const [response, setResponse] = useState(null);
  const [code, setCode] = useState(`for i in range(1,10):\n    print(i)`);
  const [language, setLanguage] = useState("python");

  const sendCodeToBackend = async () => {
    const data = {
      language: language,
      code: code,
    };

    try {
      const res = await axios.post("http://localhost:9563/execute", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setResponse(res.data);
    } catch (error) {
      console.error("Error sending data", error);
    }
  };

  return (
    <div>
      <h1>Monaco Editor - Send Code to Backend</h1>
      <MainEditor code={code} setCode={setCode} language={language} setLanguage={setLanguage} />

      <button onClick={sendCodeToBackend} className="bg-slate-400">
        Send Code to Backend
      </button>

      {response && response.response?.run && (
        <div>
          {console.log(response)}
          <h2>Response from Backend:</h2>
          <pre>{response.response.run.stdout || response.response.run.stderr}</pre>
        </div>
      )}
      <SelectorMenu />
    </div>
  );
}

export default App;
