import { useState, useEffect } from 'react';
import InputParameters from './InputParameters';
import PropTypes from 'prop-types';

export function SelectorMenu({ onPayloadChange }) { 
    const [activeTab, setActiveTab] = useState('Trivial_gens');
    const [selectedGenerator, setSelectedGenerator] = useState('Generator 1');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [stdinInput, setStdinInput] = useState('');
    const [inputParameters, setInputParameters] = useState({});

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const handleFileUpload = (e) => {
        setUploadedFile(e.target.files[0]);
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

    useEffect(() => {
        // console.log(inputParameters);
        onPayloadChange({
            generator_id: selectedGenerator,
            params: inputParameters
        });
    }, [inputParameters, selectedGenerator]);
    
    return (
        <div className="ml-0 mt-0 w-full h-80 grid grid-cols-5 px-8">
            <div className="col-span-1 flex flex-col justify-evenly h-full  bg-white bg-opacity-20 backdrop-blur-sm border rounded-xl editor-container  mr-3 ">
                <button
                    className={`relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium 
              text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group 
              hover:bg-gray-50 ${activeTab === 'Trivial_gens' ? 'font-bold  mx-2' : 'mx-3'}`}
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
                    className={`relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium 
              text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group 
              hover:bg-gray-50 ${activeTab === 'User_gens' ? 'font-bold  mx-2' : 'mx-3'}`}
                    onClick={() => handleTabClick('User_gens')}
                >
                    <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                    <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </span>
                    <span className="relative pl-3">User Generators</span>
                </button>
                <button
                    className={`relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium 
              text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group 
              hover:bg-gray-50 ${activeTab === 'Ai_gens' ? 'font-bold  mx-2' : 'mx-3'}`}
                    onClick={() => handleTabClick('Ai_gens')}
                >
                    <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                    <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </span>
                    <span className="relative pl-5">AI Generators</span>
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
                    <div id="Ai_gens ">
                        <h1 className="editor-title">Hello AI Gens</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

// Add prop types validation
SelectorMenu.propTypes = {
    onPayloadChange: PropTypes.func.isRequired, // Validate onPayloadChange as a required function
};
