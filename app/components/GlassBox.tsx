import React from 'react'

interface GlassBoxProps{
    title: string;
    buttonText: string;
    onClick:() => void;
}

const GlassBox: React.FC<GlassBoxProps> = ({title, buttonText, onClick}) => {
  return (
    <div className='glassmorphism text-center w-full h-full flex flex-col items-center justify-center p-8'>
        <p className="text-3xl font-bold mb-6 text-center">
            {title.split(" ").slice(0, 3).join(" ")} <br /> {title.split(" ").slice(3).join(" ")}
        </p>
        <div className='w-full flex justify-center'>
            <button
                className="bg-[#EACA91] font-semibold w-[240px] text-xl text-black px-6 py-2 rounded-md cursor-pointer"
                onClick={onClick}
            >
                {buttonText}
            </button>

        </div>
    </div>
  )
}

export default GlassBox