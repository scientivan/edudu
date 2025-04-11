"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import LoadingPage from "./LoadingPage"

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
  
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // waktu loading 1 detik (bisa diubah)
  
      return () => clearTimeout(timeout);
    }, [pathname]);
  
    return (
      <>
        {isLoading ? <LoadingPage /> : children}
      </>
    );
  }