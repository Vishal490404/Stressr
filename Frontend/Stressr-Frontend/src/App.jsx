import React, { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

function App() {
  const [response, setResponse] = useState(null);
  const [code, setCode] = useState(``);

  const sendCodeToBackend = async () => {
    const data = {
      code: code
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
      <Editor
        height="50vh"
        defaultLanguage="cpp"
        value={code}
        onChange={(newValue) => setCode(newValue)}
      />
      <button onClick={sendCodeToBackend} className="bg-slate-400">
        Send Code to Backend
      </button>

      {response && response.response.run && (
        <div>
          <h2>Response from Backend:</h2>
          <pre>{response.response.run.stdout || response.response.run.stderr}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
