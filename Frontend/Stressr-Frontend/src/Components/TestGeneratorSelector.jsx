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
            alert('Please enter a prompt for the AI generator.');
            return;
        }

        setIsGenerating(true);
        setAiGeneratedCode(''); 

        try {
            const response = await axios.post('http://localhost:9563/ai-generate', { prompt: aiPrompt });
            const { generator_id, generator_code } = response.data;

            setAiGeneratedCode(generator_code);
            
            // Update the payload
            onPayloadChange({
                generator_id: `ai_generated_${generator_id}`,
                params: { prompt: aiPrompt, generated_code: generator_code }
            });
        } catch (error) {
            console.error('Error generating AI test cases:', error);
            toast.error('Error generating test cases. Please try again.');
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

        toast.success('Test cases downloaded as Stressr.py', {
            duration: 2000,
            position: 'bottom-center',
        });
    };

    const handleCopyCode = () => {
        const codeLines = aiGeneratedCode.split('\n');
        const trimmedCode = codeLines.slice(1, -1).join('\n');
        navigator.clipboard.writeText(trimmedCode).then(() => {
            toast.success('Code copied to clipboard!', {
                duration: 2000,
                position: 'bottom-center',
            });
        }, (err) => {
            console.error('Could not copy text: ', err);
            toast.error('Failed to copy code', {
                duration: 2000,
                position: 'bottom-center',
            });
        });
    };

    const handlePreviewCode = () => {
        setShowPreview(true);
    };

    const closePreview = () => {
        setShowPreview(false);
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
              text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group 
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
              text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group 
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
              text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group 
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
                    <div id="Ai_gens" className="p-4">
                        <h1 className="editor-title mb-4">AI-Powered Test Case Generator</h1>
                        <div className="mb-4">
                            <label htmlFor="ai-prompt" className="block mb-2 text-gray-300">
                                Describe the test cases you want to generate:
                            </label>
                            <textarea
                                id="ai-prompt"
                                value={aiPrompt}
                                onChange={handleAiPromptChange}
                                className="border p-2 rounded-lg w-full h-24 bg-gray-700 text-gray-300"
                                placeholder="E.g., Generate test cases for a sorting algorithm with arrays of varying sizes and elements"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={generateAiTestCases}
                                className={`px-4 py-2 text-sm font-medium rounded-md 
                                text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isGenerating}
                            >
                                {isGenerating ? 'Generating...' : 'Generate Tests'}
                            </button>
                            {aiGeneratedCode && (
                                <>
                                    <button
                                        onClick={handleDownloadCode}
                                        className="px-4 py-2 text-sm font-medium rounded-md 
                                        text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Download Code
                                    </button>
                                    <button
                                        onClick={handlePreviewCode}
                                        className="px-4 py-2 text-sm font-medium rounded-md 
                                        text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-gray-800">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-300">Generated Test Case Code</h3>
                            <div className="mt-2 px-7 py-3">
                                <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-left">
                                    {displayCode()}
                                </pre>
                            </div>
                            <div className="items-center px-4 py-3 space-x-2">
                                <button
                                    onClick={closePreview}
                                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleCopyCode}
                                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
