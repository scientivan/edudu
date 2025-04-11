"use client"
import React, { useEffect, useState } from 'react'

const LoadingPage = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(false)
        }, 1500);
        return () => clearTimeout(timeout);
    }, [])

    if(!visible) return null;
  return (
    <div className='loading-overlay'>

        <div className="wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <span>Loading</span>
        </div>
    </div>
    )
}

export default LoadingPage