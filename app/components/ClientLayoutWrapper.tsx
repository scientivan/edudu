'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider } from '@tanstack/react-query';
import Navbar from './Navbar';
import LoadingPage from './LoadingPage';

import { config, queryClient } from '@/lib/wagmi';
import localFont from 'next/font/local';

const jakartaSans = localFont({
  src: [
    { path: '../fonts/PlusJakartaSans-Bold.ttf', weight: '700' },
    { path: '../fonts/PlusJakartaSans-SemiBold.ttf', weight: '600' },
    { path: '../fonts/PlusJakartaSans-Medium.ttf', weight: '500' },
    { path: '../fonts/PlusJakartaSans-Regular.ttf', weight: '400' },
    { path: '../fonts/PlusJakartaSans-Light.ttf', weight: '200' },
  ],
  variable: '--font-jakarta-sans',
});

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className={`${jakartaSans.variable} flex flex-col min-h-screen`}>
            {loading && (
              <div className="fixed inset-0 z-[9999] backdrop-blur-sm flex items-center justify-center">
                <LoadingPage />
              </div>
            )}
            <Navbar />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
