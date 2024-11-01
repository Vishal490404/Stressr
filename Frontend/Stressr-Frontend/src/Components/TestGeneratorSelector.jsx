import { useState, useEffect } from 'react';
import InputParameters from './InputParameters';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import { motion, AnimatePresence } from 'framer-motion';

export function SelectorMenu({ onPayloadChange }) {
    const [activeTab, setActiveTab] = useState('Trivial_gens');
    const [selectedGenerator, setSelectedGenerator] = useState('Generator 1');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [stdinInput, setStdinInput] = useState('');
    const [inputParameters, setInputParameters] = useState({});
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiGeneratedCode, setAiGeneratedCode] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [modelId, setModelId] = useState(1);
    // const [showTooltip, setShowTooltip] = useState(false);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setFileContent(e.target.result);
            };
            reader.readAsText(file);
        }
    };

    const handleStdinChange = (e) => {
        setStdinInput(e.target.value);
    };

    const handleModelChange = (e) => {
        setModelId(e.target.value);
    };

    const handleGeneratorChange = (e) => {
        const newGenerator = e.target.value;
        // console.log(newGenerator);
        setSelectedGenerator(newGenerator);
        // console.log(inputParameters);
        onPayloadChange({
            generator_id: newGenerator,
            params: ''
        });
    };

    const handleAiPromptChange = (e) => {
        setAiPrompt(e.target.value);
    };

    const generateAiTestCases = async () => {
        if (!aiPrompt.trim()) {
            toast.error('Please enter a valid prompt.');
            return;
        }

        setIsGenerating(true);
        setAiGeneratedCode('');

        try {
            const response = await axios.post('http://localhost:9563/ai-generate', { prompt: aiPrompt, model_id: modelId });
            const { generator_id, generator_code } = response.data;

            setAiGeneratedCode(generator_code);
            onPayloadChange({
                generator_id: `ai_generated_${generator_id}`,
                params: { prompt: aiPrompt, generated_code: generator_code }
            });
        } catch (error) {
            console.error('Error generating AI test cases:', error);
            toast.error('Error generating test cases. Please try again.',
                {
                    duration: 1500,
                }
            );
        } finally {
            setIsGenerating(false);
        }
    };

    const getFileExtension = (filename) => {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    };

    const createUserGeneratorPayload = () => {
        if (!uploadedFile) {
            toast.error('Please upload a file');
            return;
        }

        const fileExtension = getFileExtension(uploadedFile.name).toLowerCase();
        let language;

        switch (fileExtension) {
            case 'py':
                language = 'python';
                break;
            case 'js':
                language = 'javascript';
                break;
            case 'java':
                language = 'java';
                break;
            case 'cpp':
            case 'cc':
                language = 'cpp';
                break;
            case 'c':
                language = 'c';
                break;
            default:
                toast.error('Unsupported file type');
                return;
        }

        const payload = {
            generator_id: 'user_generator',
            params: {
                language: language,
                code: fileContent,
                stdin: stdinInput
            }
        };

        onPayloadChange(payload);
        toast.success('User generator payload created');
    };

    useEffect(() => {
        if (activeTab === 'User_gens' && uploadedFile && fileContent) {
            createUserGeneratorPayload();
        }
    }, [uploadedFile, fileContent, stdinInput, activeTab]);

    useEffect(() => {
        // console.log(inputParameters);
        onPayloadChange({
            generator_id: selectedGenerator,
            params: inputParameters
        });
    }, [inputParameters, selectedGenerator]);

    const handleDownloadCode = () => {
        const codeLines = aiGeneratedCode.split('\n');
        const trimmedCode = codeLines.slice(1, -1).join('\n');

        const blob = new Blob([trimmedCode], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Stressr.py';

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast.success('Generator downloaded successfully!', {
            duration: 2000,
        });
    };

    const handleCopyCode = () => {
        const codeLines = aiGeneratedCode.split('\n');
        const trimmedCode = codeLines.slice(1, -1).join('\n');
        navigator.clipboard.writeText(trimmedCode).then(() => {
            toast.success('Code copied to clipboard!', {
                duration: 2000,
            });
        }, (err) => {
            console.error('Could not copy text: ', err);
            toast.error('Failed to copy code', {
                duration: 2000,
            });
        });
    };

    const handlePreviewCode = () => {
        setShowPreview(true);
    };

    const closePreview = (e) => {
        if (e && e.target.className.includes('modal-overlay')) {
            setShowPreview(false);
        }
    };

    const displayCode = () => {
        const codeLines = aiGeneratedCode.split('\n');
        return codeLines.slice(1, -1).join('\n');
    };

    return (
        <div className="ml-0 mt-0 w-full h-80 grid grid-cols-5 px-8">
            <div className="col-span-1 flex flex-col justify-evenly h-full bg-white bg-opacity-20 backdrop-blur-sm border rounded-xl editor-container mr-3">
                <button
                    className={`relative inline-flex items-center justify-center px-6 py-3 overflow-hidden text-lg font-medium 
              text-white border-2 border-white rounded-full hover:text-white group 
              hover:bg-gray-50 ${activeTab === 'Trivial_gens' ? 'font-bold' : ''} mx-2`}
                    onClick={() => handleTabClick('Trivial_gens')}
                >
                    <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                    <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </span>
                    <span className="relative">Pre-Defined Generators</span>
                </button>
                <button
                    className={`relative inline-flex items-center justify-center px-6 py-3 overflow-hidden text-lg font-medium 
              text-white border-2 border-white rounded-full hover:text-white group 
              hover:bg-gray-50 ${activeTab === 'User_gens' ? 'font-bold' : ''} mx-2`}
                    onClick={() => handleTabClick('User_gens')}
                >
                    <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                    <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </span>
                    <span className="relative">User Generators</span>
                </button>
                <button
                    className={`relative inline-flex items-center justify-center px-6 py-3 overflow-hidden text-lg font-medium 
              text-white border-2 border-white rounded-full hover:text-white group 
              hover:bg-gray-50 ${activeTab === 'Ai_gens' ? 'font-bold' : ''} mx-2`}
                    onClick={() => handleTabClick('Ai_gens')}
                >
                    <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                    <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </span>
                    <span className="relative">AI Generators</span>
                </button>
            </div>

            <div className={`editor-container ${activeTab === 'Trivial_gens' || activeTab === 'User_gens' || activeTab === 'Ai_gens' ? 'shadow-lg rounded-2xl col-span-4' : ''}`}>

                {activeTab === 'Trivial_gens' && (
                    <div id="Trivial_gens ">
                        <h1 className="editor-title ">Choose a Test Case Generator</h1>
                        <div className="flex justify-center mt-2">
                            <select
                                value={selectedGenerator}
                                onChange={handleGeneratorChange}
                                className="border p-2 rounded-lg w-1/2 bg-gray-700 text-gray-300"
                            >
                                <option value="0" className="bg-gray-700 text-gray-300">Select a generator</option>
                                <option value="1" className="bg-gray-700 text-gray-300">Single Number Generator with testcases</option>
                                <option value="2" className="bg-gray-700 text-gray-300">Single Number Generator</option>
                                <option value="3" className="bg-gray-700 text-gray-300">Two Space Separated Integers Generator with testcases</option>
                                <option value="4" className="bg-gray-700 text-gray-300">Two Space Separated Integers Generator</option>
                                <option value="5" className="bg-gray-700 text-gray-300">Array Generator with testcases</option>
                                <option value="6" className="bg-gray-700 text-gray-300">Array Generator</option>
                            </select>
                        </div>
                        <InputParameters selectedGenerator={selectedGenerator} setInputParameters={setInputParameters} />
                    </div>
                )}

                {activeTab === 'User_gens' && (
                    <div id="User_gens">
                        <h1 className="editor-title">Upload a File and Provide Input</h1>
                        <div className="mb-4">
                            <input
                                type="file"
                                onChange={handleFileUpload}
                                className="border p-2 rounded-lg bg-gray-700 text-gray-300"
                                accept=".py,.js,.java,.cpp,.cc,.c"
                            />
                            {uploadedFile && (
                                <p className="mt-4 text-gray-300">File uploaded: {uploadedFile.name}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="stdin" className="block mb-2 text-gray-300">
                                Provide Input (stdin):
                            </label>
                            <textarea
                                id="stdin"
                                value={stdinInput}
                                onChange={handleStdinChange}
                                className="border p-2 rounded-lg w-full h-24 bg-gray-700 text-gray-300"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'Ai_gens' && (
                    <div id="Ai_gens">
                        <h1 className="editor-title mb-4">AI-Powered Test Case Generator</h1>
                        <div className="mb-4">
                            <div className='flex flex-row justify-between'>
                                <label htmlFor="ai-prompt" className="mb-2 text-gray-300 flex flex-col">
                                    Describe the test case generator you want to generate:
                                    <span className='text-yellow-300 text-sm mt-2 flex items-center gap-2'>
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5" 
                                            viewBox="0 0 24 24" 
                                            fill="currentColor"
                                        >
                                            <path 
                                                fillRule="evenodd" 
                                                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        The code generated by AI may not be correct. Please verify the code before using it.
                                    </span>
                                </label>
                                
                                <select 
                                    name="model-selector" 
                                    id="model-selector"
                                    className="bg-gray-800 text-gray-300 mb-6 px-2 py-1 border border-gray-800 rounded-lg hover:border-gray-400 transition-colors duration-200"
                                    onChange={handleModelChange}
                                >
                                    <option value="1" className="bg-gray-800 text-gray-300">Gemini Pro</option>
                                    <option value="2" className="bg-gray-800 text-gray-300">Llama 3.0</option>
                                    <option value="3" className="bg-gray-800 text-gray-300">Llama 3.1</option>
                                    <option value="4" className="bg-gray-800 text-gray-300">Llama 3.2</option>
                                </select>
                            </div>
                            <textarea
                                id="ai-prompt"
                                value={aiPrompt}
                                onChange={handleAiPromptChange}
                                className="border p-2 rounded-lg w-full h-24 bg-gray-800 text-gray-300"
                                placeholder="E.g., Generator for binary string of size in range 1 and 100"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={generateAiTestCases}
                                className={`px-4 py-2 text-sm font-medium rounded-md 
                                text-white bg-orange-600 hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isGenerating}
                            >
                                {isGenerating ? 'Generating...' : 'Generate generator'}
                            </button>
                            {aiGeneratedCode && (
                                <>
                                    <button
                                        onClick={handleDownloadCode}
                                        className="px-4 py-2 text-sm font-medium rounded-md 
                                        text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                    >
                                        Download Code
                                    </button>
                                    <button
                                        onClick={handlePreviewCode}
                                        className="px-4 py-2 text-sm font-medium rounded-md 
                                        text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    >
                                        Preview Code
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {showPreview && (
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full z-50 modal-overlay"
                    onClick={closePreview}
                >
                    <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-xl bg-gray-800">
                        <button
                            onClick={() => setShowPreview(false)}
                            className="absolute top-3 right-3 text-gray-300 hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-300">Generator Code</h3>
                            <div className="mt-2 px-7 py-3">
                                <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-left">
                                    {displayCode()}
                                </pre>
                            </div>
                            <div className="items-center px-4 py-3 space-x-2">
                                <button
                                    onClick={handleCopyCode}
                                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-red-800 "
                                >
                                    Copy Code
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

SelectorMenu.propTypes = {
    onPayloadChange: PropTypes.func.isRequired,
};
