import { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { LANGUAGES } from './AvailableStuff';
import './MainEditor.css';
import { languageTemplates } from './AvailableStuff';
import { toast } from 'react-hot-toast';
import { SelectorMenu } from './TestGeneratorSelector'; 

const MainEditor = () => {
  const [code1, setCode1] = useState(languageTemplates.python);
  const [code2, setCode2] = useState(languageTemplates.python);
  const [language1, setLanguage1] = useState('python');
  const [language2, setLanguage2] = useState('python');
  const [isSending, setIsSending] = useState(false);
  const [testCasePayload, setTestCasePayload] = useState({
    generator_id: null,
    params: '',
  });
  const [differences, setDifferences] = useState(null); // State to hold differences response

  const handleTestCasePayload = (payload) => {
    setTestCasePayload(payload);
  };

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

  const handleSendRequest = async () => {
    setIsSending(true);
    const payload = {
      test_generation_option: {
        generator_id: 5, 
        params: "1 200000 1 100",
      },
      code1_payload: {
        language: language1,
        code: code1,
      },
      code2_payload: {
        language: language2,
        code: code2,
      },
    };

    try {
      const response = await fetch('http://localhost:9563/find', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        toast.success('Request successful!');
        setDifferences(responseData.differences || []); // Store differences response
      } else {
        toast.error(`Error: ${response.status}`);
        console.log(await response.text());
      }
    } catch (error) {
      toast.error('Failed to send request');
      console.error('Error:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="main-editor-container">
        <div className="editor-container">
          <h2 className="editor-title">Sub-optimal Solution</h2>
          <div className="language-selector">
            <label htmlFor="language1">Language:</label>
            <select id="language1" value={language1} onChange={handleLanguageChange1}>
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
            onChange={handleEditorChange1}
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
            <select id="language2" value={language2} onChange={handleLanguageChange2}>
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
            onChange={handleEditorChange2}
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

      <div className="mt-4">
        <SelectorMenu onPayloadChange={handleTestCasePayload} />
      </div>

      <div className="f mt-4">
        <button
          onClick={handleSendRequest}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${isSending ? 'opacity-50' : ''}`}
          disabled={isSending}
        >
          {isSending ? 'Sending...' : 'Send Request'}
        </button>
      </div>

      {/* Display the differences if they exist */}
      {differences && differences.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Differences:</h3>
          <ul className="list-disc pl-5">
            {differences.map((difference, index) => (
              <li key={index} className="text-gray-300">
                <strong>Output Code 1:</strong> {difference.output_code1}
                <br />
                <strong>Output Code 2:</strong> {difference.output_code2}
                <br />
                <strong>Test Case:</strong> {difference.test_case}
                <br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MainEditor;
