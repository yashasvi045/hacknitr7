'use client';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { polygonAmoy } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { defineChain } from 'viem';

// Define Shardeum EVM testnet
const shardeumEVM = defineChain({
  id: 8119,
  name: 'Shardeum EVM Testnet',
  network: 'shardeum-evm-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Shardeum',
    symbol: 'SHM',
  },
  rpcUrls: {
    default: { 
      http: ['https://api-mezame.shardeum.org/'] 
    },
    public: { 
      http: ['https://api-mezame.shardeum.org/'] 
    },
  },
  blockExplorers: {
    default: { 
      name: 'Shardeum Explorer', 
      url: 'https://explorer-mezame.shardeum.org/' 
    },
  },
  testnet: true,
});

// Configure with both Polygon Amoy and Shardeum EVM
const config = getDefaultConfig({
  appName: 'Wandr',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
  chains: [shardeumEVM, polygonAmoy], // Shardeum first as primary
  ssr: true,
});

const queryClient = new QueryClient();

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#a855f7',
            accentColorForeground: 'white',
            borderRadius: 'medium',
            fontStack: 'system',
          })}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}