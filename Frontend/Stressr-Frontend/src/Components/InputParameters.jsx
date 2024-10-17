import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const InputParameters = ({ selectedGenerator, setInputParameters }) => {
    const [minN, setMinN] = useState('');
    const [maxN, setMaxN] = useState('');
    const [minN2, setMinN2] = useState('');
    const [maxN2, setMaxN2] = useState('');
    const [arraySizeMin, setArraySizeMin] = useState('');
    const [arraySizeMax, setArraySizeMax] = useState('');
    const [arrayElemMin, setArrayElemMin] = useState('');
    const [arrayElemMax, setArrayElemMax] = useState('');

    const isValid = (value) => !isNaN(value) && value !== '';

    useEffect(() => {
        let params = {};
        switch (selectedGenerator) {
            case '1':
            case '2':
                params = { min: minN, max: maxN };
                break;
            case '3':
            case '4':
                params = { min1: minN, max1: maxN, min2: minN2, max2: maxN2 };
                break;
            case '5':
            case '6':
                params = { 
                    size_min: arraySizeMin, 
                    size_max: arraySizeMax, 
                    elem_min: arrayElemMin, 
                    elem_max: arrayElemMax 
                };
                break;
            default:
                break;
        }
        setInputParameters(params);
        // console.log(params);
    }, [selectedGenerator, minN, maxN, minN2, maxN2, arraySizeMin, arraySizeMax, arrayElemMin, arrayElemMax, setInputParameters]);

    const renderInputField = (label, value, setValue) => (
        <div className="relative">
            <label className="block mb-2 text-white">{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`border p-2 rounded-lg bg-gray-700 text-white ${isValid(value) ? '' : 'border-red-500'}`}
            />
            {!isValid(value) && value !== '' && <span className="absolute text-red-500 text-xs top-1 right-1">Invalid input</span>}
        </div>
    );

    return (
        <div className="h-full w-full">
            {['1', '2'].includes(selectedGenerator) && (
                <div className="flex flex-row mt-20 justify-evenly">
                    {renderInputField("Min Value:", minN, setMinN)}
                    {renderInputField("Max Value:", maxN, setMaxN)}
                </div>
            )}
            {['3', '4'].includes(selectedGenerator) && (
                <div className="flex flex-row mt-20 justify-evenly">
                    {renderInputField("First Number Min Value:", minN, setMinN)}
                    {renderInputField("First Number Max Value:", maxN, setMaxN)}
                    {renderInputField("Second Number Min Value:", minN2, setMinN2)}
                    {renderInputField("Second Number Max Value:", maxN2, setMaxN2)}
                </div>
            )}
            {['5', '6'].includes(selectedGenerator) && (
                <div className="flex flex-row mt-20 justify-evenly">
                    {renderInputField("Array Size Min:", arraySizeMin, setArraySizeMin)}
                    {renderInputField("Array Size Max:", arraySizeMax, setArraySizeMax)}
                    {renderInputField("Array Element Min:", arrayElemMin, setArrayElemMin)}
                    {renderInputField("Array Element Max:", arrayElemMax, setArrayElemMax)}
                </div>
            )}
        </div>
    );
};

InputParameters.propTypes = {
    selectedGenerator: PropTypes.string.isRequired,
    setInputParameters: PropTypes.func.isRequired,
};

export default InputParameters;
