import { useState } from 'react';

const InputParameters = ({ selectedGenerator }) => {
    const [minN, setMinN] = useState('');
    const [maxN, setMaxN] = useState('');
    const [minN2, setMinN2] = useState('');
    const [maxN2, setMaxN2] = useState('');
    const [arraySizeMin, setArraySizeMin] = useState('');
    const [arraySizeMax, setArraySizeMax] = useState('');
    const [arrayElemMin, setArrayElemMin] = useState('');
    const [arrayElemMax, setArrayElemMax] = useState('');

    const isMinNValid = !isNaN(minN);
    const isMaxNValid = !isNaN(maxN);
    const isMinN2Valid = !isNaN(minN2);
    const isMaxN2Valid = !isNaN(maxN2);
    const isArraySizeMinValid = !isNaN(arraySizeMin);
    const isArraySizeMaxValid = !isNaN(arraySizeMax);
    const isArrayElemMinValid = !isNaN(arrayElemMin);
    const isArrayElemMaxValid = !isNaN(arrayElemMax);

    return (
        <div className="mt-4">
            {selectedGenerator === '1' && (
                <div>
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <label className="block mb-2">Min Value:</label>
                            <input
                                type="text"
                                value={minN}
                                onChange={(e) => setMinN(e.target.value)}
                                className={`border p-2 rounded-lg ${isMinNValid ? '' : 'border-red-500'}`}
                            />
                            {!isMinNValid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                        <div className="relative">
                            <label className="block mb-2">Max Value:</label>
                            <input
                                type="text"
                                value={maxN}
                                onChange={(e) => setMaxN(e.target.value)}
                                className={`border p-2 rounded-lg ${isMaxNValid ? '' : 'border-red-500'}`}
                            />
                            {!isMaxNValid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                    </div>
                </div>
            )}
            {selectedGenerator === '2' && (
                <div>
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <label className="block mb-2">Min Value:</label>
                            <input
                                type="text"
                                value={minN}
                                onChange={(e) => setMinN(e.target.value)}
                                className={`border p-2 rounded-lg ${isMinNValid ? '' : 'border-red-500'}`}
                            />
                            {!isMinNValid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                        <div className="relative">
                            <label className="block mb-2">Max Value:</label>
                            <input
                                type="text"
                                value={maxN}
                                onChange={(e) => setMaxN(e.target.value)}
                                className={`border p-2 rounded-lg ${isMaxNValid ? '' : 'border-red-500'}`}
                            />
                            {!isMaxNValid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                    </div>
                </div>
            )}
            {selectedGenerator === '3' && (
                <div>
                    <div className="flex flex-row gap-4">
                        <div className="relative">
                            <label className="block mb-2">First Number Min Value:</label>
                            <input
                                type="text"
                                value={minN}
                                onChange={(e) => setMinN(e.target.value)}
                                className={`border p-2 rounded-lg ${isMinNValid ? '' : 'border-red-500'}`}
                            />
                            {!isMinNValid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                        <div className="relative">
                            <label className="block mb-2">First Number Max Value:</label>
                            <input
                                type="text"
                                value={maxN}
                                onChange={(e) => setMaxN(e.target.value)}
                                className={`border p-2 rounded-lg ${isMaxNValid ? '' : 'border-red-500'}`}
                            />
                            {!isMaxNValid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                        <div className="relative">
                            <label className="block mb-2">Second Number Min Value:</label>
                            <input
                                type="text"
                                value={minN2}
                                onChange={(e) => setMinN2(e.target.value)}
                                className={`border p-2 rounded-lg ${isMinN2Valid ? '' : 'border-red-500'}`}
                            />
                            {!isMinN2Valid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                        <div className="relative">
                            <label className="block mb-2">Second Number Max Value:</label>
                            <input
                                type="text"
                                value={maxN2}
                                onChange={(e) => setMaxN2(e.target.value)}
                                className={`border p-2 rounded-lg ${isMaxN2Valid ? '' : 'border-red-500'}`}
                            />
                            {!isMaxN2Valid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                    </div>
                </div>
            )}
            {selectedGenerator === '4' && (
                <div>
                    <div className="flex flex-row gap-4">
                        <div className="relative">
                            <label className="block mb-2">First Number Min Value:</label>
                            <input
                                type="text"
                                value={minN}
                                onChange={(e) => setMinN(e.target.value)}
                                className={`border p-2 rounded-lg ${isMinNValid ? '' : 'border-red-500'}`}
                            />
                            {!isMinNValid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                        <div className="relative">
                            <label className="block mb-2">First Number Max Value:</label>
                            <input
                                type="text"
                                value={maxN}
                                onChange={(e) => setMaxN(e.target.value)}
                                className={`border p-2 rounded-lg ${isMaxNValid ? '' : 'border-red-500'}`}
                            />
                            {!isMaxNValid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                        <div className="relative">
                            <label className="block mb-2">Second Number Min Value:</label>
                            <input
                                type="text"
                                value={minN2}
                                onChange={(e) => setMinN2(e.target.value)}
                                className={`border p-2 rounded-lg ${isMinN2Valid ? '' : 'border-red-500'}`}
                            />
                            {!isMinN2Valid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                        <div className="relative">
                            <label className="block mb-2">Second Number Max Value:</label>
                            <input
                                type="text"
                                value={maxN2}
                                onChange={(e) => setMaxN2(e.target.value)}
                                className={`border p-2 rounded-lg ${isMaxN2Valid ? '' : 'border-red-500'}`}
                            />
                            {!isMaxN2Valid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                    </div>
                </div>
            )}
            {selectedGenerator === '5' && (
                <div>
                    <div className="flex flex-row gap-4">
                        <div className="relative">
                            <label className="block mb-2">Array Size Min:</label>
                            <input
                                type="text"
                                value={arraySizeMin}
                                onChange={(e) => setArraySizeMin(e.target.value)}
                                className={`border p-2 rounded-lg ${isArraySizeMinValid ? '' : 'border-red-500'}`}
                            />
                            {!isArraySizeMinValid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                        <div className="relative">
                            <label className="block mb-2">Array Size Max:</label>
                            <input
                                type="text"
                                value={arraySizeMax}
                                onChange={(e) => setArraySizeMax(e.target.value)}
                                className={`border p-2 rounded-lg ${isArraySizeMaxValid ? '' : 'border-red-500'}`}
                            />
                            {!isArraySizeMaxValid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                        <div className="relative">
                            <label className="block mb-2">Array Element Min:</label>
                            <input
                                type="text"
                                value={arrayElemMin}
                                onChange={(e) => setArrayElemMin(e.target.value)}
                                className={`border p-2 rounded-lg ${isArrayElemMinValid ? '' : 'border-red-500'}`}
                            />
                            {!isArrayElemMinValid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                        <div className="relative">
                            <label className="block mb-2">Array Element Max:</label>
                            <input
                                type="text"
                                value={arrayElemMax}
                                onChange={(e) => setArrayElemMax(e.target.value)}
                                className={`border p-2 rounded-lg ${isArrayElemMaxValid ? '' : 'border-red-500'}`}
                            />
                            {!isArrayElemMaxValid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                    </div>
                </div>
            )}
            {selectedGenerator === '6' && (
                <div>
                    <div className="flex flex-row gap-4">
                        <div className="relative">
                            <label className="block mb-2">Array Size Min:</label>
                            <input
                                type="text"
                                value={arraySizeMin}
                                onChange={(e) => setArraySizeMin(e.target.value)}
                                className={`border p-2 rounded-lg ${isArraySizeMinValid ? '' : 'border-red-500'}`}
                            />
                            {!isArraySizeMinValid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                        <div className="relative">
                            <label className="block mb-2">Array Size Max:</label>
                            <input
                                type="text"
                                value={arraySizeMax}
                                onChange={(e) => setArraySizeMax(e.target.value)}
                                className={`border p-2 rounded-lg ${isArraySizeMaxValid ? '' : 'border-red-500'}`}
                            />
                            {!isArraySizeMaxValid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                        <div className="relative">
                            <label className="block mb-2">Array Element Min:</label>
                            <input
                                type="text"
                                value={arrayElemMin}
                                onChange={(e) => setArrayElemMin(e.target.value)}
                                className={`border p-2 rounded-lg ${isArrayElemMinValid ? '' : 'border-red-500'}`}
                            />
                            {!isArrayElemMinValid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                        <div className="relative">
                            <label className="block mb-2">Array Element Max:</label>
                            <input
                                type="text"
                                value={arrayElemMax}
                                onChange={(e) => setArrayElemMax(e.target.value)}
                                className={`border p-2 rounded-lg ${isArrayElemMaxValid ? '' : 'border-red-500'}`}
                            />
                            {!isArrayElemMaxValid && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputParameters