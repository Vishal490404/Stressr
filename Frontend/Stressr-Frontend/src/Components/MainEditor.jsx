import React from 'react';
import { Editor } from '@monaco-editor/react';
import { LANGUAGES } from './AvailableStuff';

const MainEditor = ({ code1, setCode1, code2, setCode2, language, setLanguage }) => {

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleEditorChange1 = (value) => {
    setCode1(value);
  };

  const handleEditorChange2 = (value) => {
    setCode2(value);
  };

  return (
    <div>
      <div className="language-selector">
        <label htmlFor="language">Select Language: </label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang.toLowerCase()}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className="editors-container flex flex-row">
        <Editor
          height="50vh"
          width="48%"
          language={language}
          theme="vs-dark"
          value={code1}
          onChange={(value, ev) => handleEditorChange1(value)}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
          }}
        />

        <Editor
          height="50vh"
          width="48%"
          language={language}
          theme="vs-dark"
          value={code2}
          onChange={(value, ev) => handleEditorChange2(value)}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
          }}
        />
      </div>
    </div>
  );
};

export default MainEditor;
