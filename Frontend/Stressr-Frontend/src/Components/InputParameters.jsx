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
    const [errors, setErrors] = useState({});

    const isValid = (value) => {
        if (value === '') return true;
        const num = Number(value);
        return !isNaN(num) && Number.isInteger(num) && num >= 0;
    };

    const validateInput = (value, setter, name) => {
        if (isValid(value)) {
            setter(value);
            setErrors(prev => ({ ...prev, [name]: '' }));
        } else {
            setErrors(prev => ({ ...prev, [name]: 'Please enter a non-negative integer' }));
        }
    };

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
    }, [selectedGenerator, minN, maxN, minN2, maxN2, arraySizeMin, arraySizeMax, arrayElemMin, arrayElemMax, setInputParameters]);

    const renderInputField = (label, value, setValue, name) => (
        <div className="relative">
            <label className="block mb-2 text-white">{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => validateInput(e.target.value, setValue, name)}
                className={`border p-2 rounded-lg bg-gray-800 text-white ${errors[name] ? 'border-red-500' : ''}`}
            />
            {errors[name] && <span className="absolute text-red-500 text-xs top-full left-0">{errors[name]}</span>}
        </div>
    );

    return (
        <div className="h-full w-full">
            {['1', '2'].includes(selectedGenerator) && (
                <div className="flex flex-row mt-20 justify-evenly">
                    {renderInputField("Min Value:", minN, setMinN, "minN")}
                    {renderInputField("Max Value:", maxN, setMaxN, "maxN")}
                </div>
            )}
            {['3', '4'].includes(selectedGenerator) && (
                <div className="flex flex-row mt-20 justify-evenly">
                    {renderInputField("First Number Min Value:", minN, setMinN, "minN")}
                    {renderInputField("First Number Max Value:", maxN, setMaxN, "maxN")}
                    {renderInputField("Second Number Min Value:", minN2, setMinN2, "minN2")}
                    {renderInputField("Second Number Max Value:", maxN2, setMaxN2, "maxN2")}
                </div>
            )}
            {['5', '6'].includes(selectedGenerator) && (
                <div className="flex flex-row mt-20 justify-evenly">
                    {renderInputField("Array Size Min:", arraySizeMin, setArraySizeMin, "arraySizeMin")}
                    {renderInputField("Array Size Max:", arraySizeMax, setArraySizeMax, "arraySizeMax")}
                    {renderInputField("Array Element Min:", arrayElemMin, setArrayElemMin, "arrayElemMin")}
                    {renderInputField("Array Element Max:", arrayElemMax, setArrayElemMax, "arrayElemMax")}
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
