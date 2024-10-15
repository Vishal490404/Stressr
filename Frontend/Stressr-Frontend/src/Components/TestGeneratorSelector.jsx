import { useState } from 'react';
import InputParameters from './InputParameters'; 

export function SelectorMenu({ onPayloadChange }) { // Accept onPayloadChange as prop
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

    const handleGeneratorChange = (e) => {
        const newGenerator = e.target.value;
        setSelectedGenerator(newGenerator);

        // Call the onPayloadChange prop to pass data to the parent (MainEditor)
        onPayloadChange({
            generator_id: newGenerator,
            params: '' // Add logic for params if necessary
        });
    };

    return (
        <div className="main-editor-container-1 m-0 ">
            <div className="grid grid-flow-row rounded-2xl">
                <button
                    className={`p-2 ${activeTab === 'Trivial_gens' ? 'bg-gray-800 text-blue-400 font-bold border-2 border-b-0 rounded-b-none' : 'bg-gray-600 hover:bg-gray-500 text-gray-300 border'}`}
                    onClick={() => handleTabClick('Trivial_gens')}
                >
                    Trivial Gens
                </button>
                <button
                    className={`p-2 ${activeTab === 'User_gens' ? 'bg-gray-800 text-blue-400 font-bold border-2 border-b-0 rounded-b-none' : 'bg-gray-600 hover:bg-gray-500 text-gray-300 border'}`}
                    onClick={() => handleTabClick('User_gens')}
                >
                    User Gens
                </button>
                <button
                    className={`p-2  ${activeTab === 'Ai_gens' ? 'bg-gray-800 text-blue-400 font-bold border-2 border-b-0 rounded-b-none' : 'bg-gray-600 hover:bg-gray-500 text-gray-300 border'}`}
                    onClick={() => handleTabClick('Ai_gens')}
                >
                    AI Gens
                </button>
            </div>

            <div className={`editor-container ${activeTab === 'Trivial_gens' || activeTab === 'User_gens' || activeTab === 'Ai_gens' ? 'shadow-lg rounded-2xl' : ''}`}>
                {activeTab === 'Trivial_gens' && (
                    <div id="Trivial_gens">
                        <h1 className="editor-title h-40">Choose a Test Case Generator</h1>
                        <div className="flex justify-center mb-4">
                            <select
                                value={selectedGenerator}
                                onChange={handleGeneratorChange} // Call handleGeneratorChange instead
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
                        <InputParameters selectedGenerator={selectedGenerator} />
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
                                <p className="mt-2 text-gray-300">File uploaded: {uploadedFile.name}</p>
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
