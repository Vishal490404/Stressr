import { useState, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { LANGUAGES } from './AvailableStuff';
import './MainEditor.css';
import { languageTemplates } from './AvailableStuff';
import { toast } from 'react-hot-toast';
import { SelectorMenu } from './TestGeneratorSelector'; 
import HashLoader from "react-spinners/HashLoader";
import { FaCopy } from 'react-icons/fa';
import { Scrollbars } from 'react-custom-scrollbars';

const MainEditor = () => {
  const [code1, setCode1] = useState(languageTemplates.python);
  const [code2, setCode2] = useState(languageTemplates.cpp);
  const [language1, setLanguage1] = useState('python');
  const [language2, setLanguage2] = useState('cpp');
  const [isSending, setIsSending] = useState(false);
  const [testCasePayload, setTestCasePayload] = useState({
    generator_id: null,
    params: '',
  });
  const [differences, setDifferences] = useState([
    // {
    //   output_code1: "10",
    //   output_code2: "15",
    //   test_case: "input = [1, 2, 3, 4]"
    // },
    // {
    //   output_code1: "Error: Division by zero",
    //   output_code2: "Infinity",
    //   test_case: "input = [5, 0]"
    // }
  ]);

  const loaderRef = useRef(null);

  const handleTestCasePayload = (payload) => {
    const { generator_id, params } = payload;
    // console.log(params);
    const paramsString = Object.values(params).join(' ');
    setTestCasePayload({ generator_id, params: paramsString });
  };

  // useEffect(() => {
  //   const formatted = JSON.stringify(testCasePayload, null, 2);
  //   setFormattedPayload(formatted);
  // }, [testCasePayload]);

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
    
    // Scroll to the loader
    if (loaderRef.current) {
      loaderRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const payload = {
      test_generation_option: {
        generator_id: parseInt(testCasePayload.generator_id, 10),
        params: testCasePayload.params
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
      console.log(payload);
      const response = await fetch('http://localhost:9563/find', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        toast.success('Request successful!');
        setDifferences(responseData.differences || []);
      } else {
        toast.error(`Error: ${response.status}`);
        console.log(await response.text());
      }
    } catch (error) {
      toast.error('Failed to generate test cases');
      console.error('Error:', error);
    } finally {
      setIsSending(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
      toast.error('Failed to copy');
    });
  };

  return (
    <Scrollbars style={{ width: '100%', height: '100vh' }}>
      <div className="relative p-4">
        <div className={`${isSending ? 'opacity-50 pointer-events-none' : ''}`}>
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
          <div className="flex flex-col">
            <div className="mt-4 w-full">
              <SelectorMenu onPayloadChange={handleTestCasePayload} />
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleSendRequest}
                className={`relative inline-block text-lg px-5 py-3 font-medium leading-tight text-white transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg overflow-hidden group disabled:opacity-50 ${isSending ? 'cursor-not-allowed' : ''}`}
                disabled={isSending}
              >
                <span className="absolute inset-0 w-full h-full bg-gray-50 rounded-lg"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>

                <span className="relative z-10 text-gray-800 group-hover:text-white ">
                  {isSending ? 'Generating...' : 'Generate Tests'}
                </span>

                <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear color-white rounded-lg group-hover:mb-0 group-hover:mr-0"></span>
              </button>
            </div>
          </div>

          {!isSending && differences && differences.length > 0 && (
            <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-semibold text-white mb-4">Differences</h3>
              <div className="space-y-6">
                {differences.map((difference, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-gray-300">Output Code 1</h4>
                        <pre className="bg-gray-900 p-3 rounded text-sm text-gray-300 overflow-x-auto">
                          {difference.output_code1}
                        </pre>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-gray-300">Output Code 2</h4>
                        <pre className="bg-gray-900 p-3 rounded text-sm text-gray-300 overflow-x-auto">
                          {difference.output_code2}
                        </pre>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium text-gray-300">Test Case</h4>
                        <button
                          onClick={() => copyToClipboard(difference.test_case)}
                          className="flex items-center bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaCopy className="mr-2" /> Copy
                        </button>
                      </div>
                      <pre className="bg-gray-900 p-3 rounded text-sm text-gray-300 overflow-x-auto mt-2">
                        {difference.test_case}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {isSending && (
          <div ref={loaderRef} className="fixed inset-0 bg-gray-900 bg-opacity-75 flex flex-col items-center justify-center z-50">
            <HashLoader color="#ffffff" loading={isSending} size={60} />
            <p className="mt-8 text-white text-xl">Finding test cases for you...</p>
          </div>
        )}
      </div>
    </Scrollbars>
  );
};

export default MainEditor;
