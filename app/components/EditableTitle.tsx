import React from 'react'
import {FiEdit2} from "react-icons/fi"
interface EditableTitleProps{
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>
}

const EditableTitle: React.FC<EditableTitleProps> = ({ title, setTitle }) => {
    return (
        <div className='w-full flex justify-center mb-4'>
            <div className='relative '>
                <input 
                    type="text"
                    className="text-2xl font-bold text-black text-center pr-8 pl-2 py-2 border-0 rounded focus:outline-none hover:bg-gray-50 transition duration-150"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <FiEdit2 
                    className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition duration-150'
                    size={18}
                />
            </div>

        </div>
    );
};

export default EditableTitle;
