import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';
import { QueryClient } from '@tanstack/react-query';

export const learnify_Testnet = defineChain({
  id: 656476,
  name: 'Learnify Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'EDU',
    symbol: 'EDU',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.open-campus-codex.gelato.digital'],
      webSocket: ['wss://rpc.open-campus-codex.gelato.digital'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://edu-chain-testnet.blockscout.com/',
    },
  },
});

export const queryClient = new QueryClient();

export const config = getDefaultConfig({
  appName: 'Learnify',
  projectId: 'YOUR_PROJECT_ID',
  chains: [learnify_Testnet],
  ssr: true,
});
