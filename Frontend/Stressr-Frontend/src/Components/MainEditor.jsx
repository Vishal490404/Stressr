import { useState, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { LANGUAGES } from './AvailableStuff';
import './MainEditor.css';
import { languageTemplates } from './AvailableStuff';
import { toast } from 'react-hot-toast';
import { SelectorMenu } from './TestGeneratorSelector';
import HashLoader from "react-spinners/HashLoader";
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const MainEditor = ({ userId }) => {
  const [code1, setCode1] = useState(languageTemplates.python);
  const [code2, setCode2] = useState(languageTemplates.cpp);
  const [language1, setLanguage1] = useState('python');
  const [language2, setLanguage2] = useState('cpp');
  const [isSending, setIsSending] = useState(false);
  const [isComing, setIsComing] = useState(false);
  const [error_code1, setError_code1] = useState(null);
  const [error_code2, setError_code2] = useState(null);
  const [success, setSuccess] = useState(false);
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
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [activeError, setActiveError] = useState({ code: null, error: null });
  
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
    setIsComing(true);
    setDifferences([]);

    if (loaderRef.current) {
      loaderRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const payload = {
      user_id: userId,
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
      const response = await fetch(`${process.env.BACKEND_URL}/find`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split('\n');
        // console.log(lines);
        try {
          const parsedLine = JSON.parse(lines[0]);
          if ("error" in parsedLine) {
            setSuccess(false);
            setError_code1(parsedLine.error);

            setActiveError({ code: 1, error: parsedLine.error });
            setIsErrorModalOpen(true);
          }
        } catch (e) {
          console.error('Error parsing line:', e);
        }
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              // console.log(data);
              if (data.difference) {
                setDifferences(prev => [...data.difference]);
                setIsSending(false);
              } else if (data.error) {
                setSuccess(false);
                if (data.error === 'Execution failed for code1') {
                  setError_code1(data.what);
                  setActiveError({ code: 1, error: data.what });
                } else {
                  setError_code2(data.what);
                  setActiveError({ code: 2, error: data.what });
                }
                setIsErrorModalOpen(true);
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
      setIsComing(false);
      if(!error_code1 && !error_code2 && success){
        toast.success('Test generation completed!');
      }
    } catch (error) {
      toast.error('Failed to generate test cases');
      console.error('Error:', error);
    } finally {
      setIsComing(false);
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

  const ErrorModal = () => (
    <Transition appear show={isErrorModalOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50" 
        onClose={() => setIsErrorModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-900 p-8 text-left align-middle shadow-2xl transition-all border border-gray-700">
                <button
                  type="button"
                  className="absolute top-4 right-4 inline-flex justify-center items-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
                  onClick={() => setIsErrorModalOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold leading-6 text-red-500 flex items-center gap-2 mb-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Error in {activeError.code === 1 ? 'Sub-optimal' : 'Optimal'} Solution
                </Dialog.Title>
                <div className="mt-4">
                  <div className="text-sm font-semibold text-gray-400 mb-2">Error Details:</div>
                  <pre className="text-sm font-medium text-gray-200 bg-gray-800 p-6 rounded-lg overflow-x-auto border border-gray-700 shadow-inner scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600">
                    {activeError.error}
                  </pre>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  return (
    <Scrollbars style={{ width: '100%', height: '100vh' }}>
        <div className={`${isSending ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="main-editor-container">
            <div className="editor-container">
              <h2 className="editor-title">Sub-optimal Solution</h2>
              <div className="language-selector">
                <label htmlFor="language1">Language:</label>
                <select id="language1" value={language1} onChange={handleLanguageChange1} className='px-2 py-1'>
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
                <select id="language2" value={language2} onChange={handleLanguageChange2} className="px-2 py-1">
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

            <div className="mt-8 mb-6 flex justify-center">
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
            <div className='p-7 '>
              <div className="mt-8 bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-800">
                <h3 className="text-2xl font-semibold text-gray-100 mb-4">
                  You're optimal solution was wrong on following test cases:
                </h3>
                <div className="space-y-6">
                  {differences.map((difference, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                      <div className="flex items-center gap-2 mb-3">
                        <span className='text-gray-200 text-lg font-semibold'>
                          Test Case
                          <span className='ml-2 text-rose-400 font-bold'>
                            #{index + 1}
                          </span>
                        </span>
                      </div>
                      <div className="mt-4 mb-2">
                        <div className="flex justify-between items-center">
                          <span className='text-gray-400 text-sm'>Input:</span>
                          <button
                            onClick={() => copyToClipboard(difference.test_case)}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 bg-gray-800 rounded-md border border-gray-700 hover:bg-gray-700 hover:text-gray-200 hover:border-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-3.5 h-3.5 mr-1.5"
                            >
                              <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                              <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                            </svg>
                            Copy
                          </button>
                        </div>
                        <pre className="bg-gray-950 p-3 rounded text-sm text-gray-300 overflow-x-auto border border-gray-800 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600">
                          {difference.test_case}
                        </pre>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-400">Solution From Sub-optimal Code</h4>
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex gap-2">
                              <button
                                onClick={() => copyToClipboard(difference.output_code1)}
                                className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 bg-gray-800 rounded-md border border-gray-700 hover:bg-gray-700 hover:text-gray-200 hover:border-gray-600 transition-all duration-200"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1.5">
                                  <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                                  <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                                </svg>
                                Copy
                              </button>
                            </div>
                          </div>
                          <pre className="bg-gray-950 p-3 rounded text-sm text-gray-300 overflow-x-auto border border-gray-800 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600">
                            {difference.output_code1}
                          </pre>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-400">Solution From Optimal Code</h4>
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex gap-2">
                              <button
                                onClick={() => copyToClipboard(difference.output_code2)}
                                className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 bg-gray-800 rounded-md border border-gray-700 hover:bg-gray-700 hover:text-gray-200 hover:border-gray-600 transition-all duration-200"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1.5">
                                  <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                                  <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                                </svg>
                                Copy
                              </button>
                            </div>
                          </div>
                          <pre className="bg-gray-950 p-3 rounded text-sm text-gray-300 overflow-x-auto border border-gray-800 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600">
                            {difference.output_code2}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))

                  }
                  {isComing && (
                    <div className="mt-4 flex justify-center">
                      <HashLoader color="#ffffff" size={30} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        
      </div>
      {isSending && (
          <div ref={loaderRef} className="fixed inset-0 bg-zinc-950 bg-opacity-25 flex flex-col items-center justify-center z-100">
            <HashLoader color="#ffffff" loading={isSending} size={60} />
            <p className="mt-8 text-white text-xl">Finding test cases for you...</p>
          </div>
        )}
      <ErrorModal />
    </Scrollbars>
  );
};

MainEditor.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default MainEditor;
