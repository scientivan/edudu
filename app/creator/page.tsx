"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import GlassBox from "../components/GlassBox";
import CreatorPage from "./CreatorPage";
import {
    useAccount,
  } from 'wagmi'

  
const Page: React.FC = () => {
    const [showCreator, setShowCreator] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { address } = useAccount(); // ambil dari wagmi

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/check-auth?address=${address}`,
                    { withCredentials: true }
                );
                // console.log("✅ Auth success:", response.data);
                setIsAuthenticated(true);
            } catch (err) {
                console.warn("❌ Not authenticated:", err);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
    
        if (address) {
            checkAuth();
        }
    }, [address]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen text-white">
                <p>Permission not granted! Please connect your wallet first!</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-screen text-red-500">
                <p>Unauthorized. Please connect your wallet first.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen text-white pb-8">
            {!showCreator ? (
                <div className="w-5xl h-128 flex items-center justify-center">
                    <GlassBox
                        title="Create your Own Video / Images"
                        buttonText="Create"
                        onClick={() => setShowCreator(true)}
                    />
                </div>
            ) : (
                <CreatorPage onBack={() => setShowCreator(false)} />
            )}
        </div>
    );
};

export default Page;
