import { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { LANGUAGES } from './AvailableStuff';
import './MainEditor.css';
import { languageTemplates } from './AvailableStuff';

const MainEditor = () => {
  const [code1, setCode1] = useState(languageTemplates.python);
  const [code2, setCode2] = useState(languageTemplates.python);
  const [language1, setLanguage1] = useState('python');
  const [language2, setLanguage2] = useState('python');

  const handleLanguageChange1 = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage1(selectedLanguage);
    setCode1(languageTemplates[selectedLanguage]);
  };

  const handleLanguageChange2 = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage2(selectedLanguage);
    setCode2(languageTemplates[selectedLanguage]);
  };

  const handleEditorChange1 = (value) => {
    setCode1(value);
  };

  const handleEditorChange2 = (value) => {
    setCode2(value);
  };

  return (
    <div className="main-editor-container">
      <div className="editor-container">
        <h2 className="editor-title">Sub-optimal Solution</h2>
        <div className="language-selector">
          <label htmlFor="language1">Language:</label>
          <select
            id="language1"
            value={language1}
            onChange={handleLanguageChange1}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang.toLowerCase()}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <Editor
          height="65vh"
          width="100%"
          language={language1}
          theme="vs-dark"
          value={code1}
          onChange={(value) => handleEditorChange1(value)}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            suggestOnTriggerCharacters: true,
            wordBasedSuggestions: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      <div className="editor-container">
        <h2 className="editor-title">Optimal Solution</h2>
        <div className="language-selector">
          <label htmlFor="language2">Language:</label>
          <select
            id="language2"
            value={language2}
            onChange={handleLanguageChange2}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang.toLowerCase()}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <Editor
          height="65vh"
          width="100%"
          language={language2}
          theme="vs-dark"
          value={code2}
          onChange={(value) => handleEditorChange2(value)}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            suggestOnTriggerCharacters: true,
            wordBasedSuggestions: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
};

export default MainEditor;
