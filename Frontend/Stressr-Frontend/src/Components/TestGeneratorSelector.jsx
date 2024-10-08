import { useState } from 'react';
import InputParameters from './InputParameters'; // Import the new component

export function SelectorMenu() {
    const [activeTab, setActiveTab] = useState('Trivial_gens');
    const [selectedGenerator, setSelectedGenerator] = useState('Generator 1');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [stdinInput, setStdinInput] = useState('');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const handleFileUpload = (e) => {
        setUploadedFile(e.target.files[0]);
    };

    const handleStdinChange = (e) => {
        setStdinInput(e.target.value);
    };

    return (
        <div className="m-10">
            <div className="grid grid-flow-col">
                <button
                    className={`p-2 rounded-t-lg ${activeTab === 'Trivial_gens' ? 'bg-white text-blue-600 font-bold border-2 border-b-0 rounded-b-none' : 'bg-gray-200 hover:bg-gray-300 border'}`}
                    onClick={() => handleTabClick('Trivial_gens')}
                >
                    Trivial Gens
                </button>
                <button
                    className={`p-2 rounded-t-lg ${activeTab === 'User_gens' ? 'bg-white text-blue-600 font-bold border-2 border-b-0 rounded-b-none' : 'bg-gray-200 hover:bg-gray-300 border'}`}
                    onClick={() => handleTabClick('User_gens')}
                >
                    User Gens
                </button>
                <button
                    className={`p-2 rounded-t-lg ${activeTab === 'Ai_gens' ? 'bg-white text-blue-600 font-bold border-2 border-b-0 rounded-b-none ' : 'bg-gray-200 hover:bg-gray-300 border'}`}
                    onClick={() => handleTabClick('Ai_gens')}
                >
                    AI Gens
                </button>
            </div>
            <div className={`border-2 border-t-0 rounded-b-lg bg-white h-80 p-5 transition-opacity duration-500 ${activeTab === 'Trivial_gens' || activeTab === 'User_gens' || activeTab === 'Ai_gens' ? 'shadow-lg rounded-t-none' : ''}`}>
                {activeTab === 'Trivial_gens' && (
                    <div id="Trivial_gens">
                        <h1>Choose a Test Case Generator</h1>
                        <div className="flex justify-center mb-4"> {/* Center the select box */}
                            <select
                                value={selectedGenerator}
                                onChange={(e) => setSelectedGenerator(e.target.value)}
                                className="border p-2 rounded-lg w-1/2"
                            >
                                <option value="0">Select a generator</option>
                                <option value="1">Single Number Generator with testcases</option>
                                <option value="2">Single Number Generator</option>
                                <option value="3">Two Space Separated Integers Generator with testcases</option>
                                <option value="4">Two Space Separated Integers Generator</option>
                                <option value="5">Array Generator with testcases</option>
                                <option value="6">Array Generator</option>
                            </select>
                        </div>
                        <InputParameters selectedGenerator={selectedGenerator} />
                    </div>
                )}
                {activeTab === 'User_gens' && (
                    <div id="User_gens">
                        <h1>Upload a File and Provide Input</h1>
                        <div className="mb-4">
                            <input
                                type="file"
                                onChange={handleFileUpload}
                                className="border p-2 rounded-lg"
                            />
                            {uploadedFile && (
                                <p className="mt-2">File uploaded: {uploadedFile.name}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="stdin" className="block mb-2">
                                Provide Input (stdin):
                            </label>
                            <textarea
                                id="stdin"
                                value={stdinInput}
                                onChange={handleStdinChange}
                                className="border p-2 rounded-lg w-full h-24"
                            />
                        </div>
                    </div>
                )}
                {activeTab === 'Ai_gens' && (
                    <div id="Ai_gens">
                        <h1>Hello AI Gens</h1>
                    </div>
                )}
            </div>
        </div>
    );
}
