import React from 'react'
interface DropdownProps{
    value : string;
    onChange: (value: string) => void;
    className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ value, onChange, className}) => {
    const options = ["Presets 1", "Presets 2", "Presets 3"];

    return (
        <select 
            className={`w-full p-4 border-gray-400 rounded-xl mt-1 cursor-pointer bg-gray-100 text-gray-700 ${className}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );
};

export default Dropdown;
