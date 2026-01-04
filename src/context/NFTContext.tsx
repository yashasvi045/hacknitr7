'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { useLandmarkContract } from '@/hooks/useLandmarkContract';

interface ClaimedNFT {
  landmarkId: string;
  claimedAt: Date;
  tokenId: string;
  txHash?: string;
  onChain?: boolean; // true if minted on blockchain, false if just local
}

interface NFTContextType {
  claimedNFTs: ClaimedNFT[];
  claimNFT: (landmarkId: string) => void;
  mintNFT: (landmarkId: string, landmarkData: any) => Promise<void>;
  isLandmarkClaimed: (landmarkId: string) => boolean;
  isLandmarkMinted: (landmarkId: string) => boolean;
  totalClaimed: number;
  totalMinted: number;
  isMinting: boolean;
  mintError: string | null;
}

const NFTContext = createContext<NFTContextType | undefined>(undefined);

const STORAGE_KEY = 'nft-tourism-claimed';

export function NFTProvider({ children }: { children: ReactNode }) {
  const { address } = useAccount();
  const { 
    mintLandmark: contractMint, 
    totalMinted: contractTotalMinted,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  } = useLandmarkContract();

  const [claimedNFTs, setClaimedNFTs] = useState<ClaimedNFT[]>([]);
  const [isMinting, setIsMinting] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    if (address) {
      const stored = localStorage.getItem(`${STORAGE_KEY}-${address}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // Remove duplicates - keep the most recent entry for each landmarkId
        const uniqueNFTs = parsed.reduce((acc: ClaimedNFT[], nft: ClaimedNFT) => {
          const existingIndex = acc.findIndex(n => n.landmarkId === nft.landmarkId);
          if (existingIndex >= 0) {
            // Keep the one that's on-chain, or the most recent
            if (nft.onChain || (!acc[existingIndex].onChain && new Date(nft.claimedAt) > new Date(acc[existingIndex].claimedAt))) {
              acc[existingIndex] = nft;
            }
          } else {
            acc.push(nft);
          }
          return acc;
        }, []);
        
        setClaimedNFTs(uniqueNFTs.map((nft: ClaimedNFT) => ({
          ...nft,
          claimedAt: new Date(nft.claimedAt),
        })));
      }
    } else {
      setClaimedNFTs([]);
    }
  }, [address]);

  // Save to localStorage when claimed NFTs change (debounced)
  useEffect(() => {
    if (address && claimedNFTs.length > 0) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(`${STORAGE_KEY}-${address}`, JSON.stringify(claimedNFTs));
      }, 500); // Debounce for 500ms

      return () => clearTimeout(timeoutId);
    }
  }, [claimedNFTs, address]);

  // Update NFT status when transaction confirms
  useEffect(() => {
    if (isConfirmed && hash) {
      setClaimedNFTs((prev) =>
        prev.map((nft) =>
          nft.txHash === hash
            ? { ...nft, onChain: true }
            : nft
        )
      );
    }
  }, [isConfirmed, hash]);

  // Local claim (for backwards compatibility or free claiming)
  const claimNFT = useCallback((landmarkId: string) => {
    if (!address) return;
    
    const alreadyClaimed = claimedNFTs.some((nft) => nft.landmarkId === landmarkId);
    if (alreadyClaimed) return;

    const newNFT: ClaimedNFT = {
      landmarkId,
      claimedAt: new Date(),
      tokenId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      onChain: false,
    };

    setClaimedNFTs((prev) => [...prev, newNFT]);
  }, [address, claimedNFTs]);

  // Mint NFT on Shardeum blockchain
  const mintNFT = useCallback(async (landmarkId: string, landmarkData: any) => {
    if (!address) {
      setMintError('Please connect your wallet');
      throw new Error('Wallet not connected');
    }

    const alreadyMinted = claimedNFTs.some(
      (nft) => nft.landmarkId === landmarkId && nft.onChain
    );
    if (alreadyMinted) {
      setMintError('Landmark already minted on blockchain');
      throw new Error('Already minted');
    }

    setIsMinting(true);
    setMintError(null);

    try {
      // Create metadata for the NFT
      const metadata = {
        name: landmarkData.name,
        description: landmarkData.description,
        image: landmarkData.image,
        attributes: [
          { trait_type: 'Location', value: landmarkData.location },
          { trait_type: 'Country', value: landmarkData.country || 'Unknown' },
          { trait_type: 'Type', value: 'Landmark' },
          { trait_type: 'Minted At', value: new Date().toISOString() },
        ],
      };

      // For hackathon: use data URI (in production, upload to IPFS)
      const tokenURI = `data:application/json;base64,${btoa(JSON.stringify(metadata))}`;

      // Call smart contract
      const txHash = await contractMint(landmarkId, tokenURI);

      // Update existing NFT or create new one with transaction hash
      setClaimedNFTs((prev) => {
        const existingIndex = prev.findIndex(nft => nft.landmarkId === landmarkId);
        
        if (existingIndex >= 0) {
          // Update existing NFT
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            txHash,
            onChain: false, // Will be set to true when confirmed
            tokenId: `blockchain-${Date.now()}`,
          };
          return updated;
        } else {
          // Create new NFT record
          const newNFT: ClaimedNFT = {
            landmarkId,
            claimedAt: new Date(),
            tokenId: `blockchain-${Date.now()}`,
            txHash,
            onChain: false, // Will be set to true when confirmed
          };
          return [...prev, newNFT];
        }
      });

      // Success!
      setIsMinting(false);
      return;
    } catch (err: any) {
      console.error('Mint error:', err);
      const errorMessage = err.message || 'Failed to mint NFT';
      setMintError(errorMessage);
      setIsMinting(false);
      throw err;
    }
  }, [address, claimedNFTs, contractMint]);

  const isLandmarkClaimed = useCallback((landmarkId: string) => {
    return claimedNFTs.some((nft) => nft.landmarkId === landmarkId);
  }, [claimedNFTs]);

  const isLandmarkMinted = useCallback((landmarkId: string) => {
    return claimedNFTs.some((nft) => nft.landmarkId === landmarkId && nft.onChain);
  }, [claimedNFTs]);

  const totalMinted = useMemo(() => 
    claimedNFTs.filter((nft) => nft.onChain).length,
  [claimedNFTs]);

  const contextValue = useMemo(() => ({
    claimedNFTs,
    claimNFT,
    mintNFT,
    isLandmarkClaimed,
    isLandmarkMinted,
    totalClaimed: claimedNFTs.length,
    totalMinted: Number(contractTotalMinted || totalMinted),
    isMinting: isMinting || isPending || isConfirming,
    mintError,
  }), [
    claimedNFTs,
    claimNFT,
    mintNFT,
    isLandmarkClaimed,
    isLandmarkMinted,
    contractTotalMinted,
    totalMinted,
    isMinting,
    isPending,
    isConfirming,
    mintError,
  ]);

  return (
    <NFTContext.Provider value={contextValue}>
      {children}
    </NFTContext.Provider>
  );
}

export function useNFT() {
  const context = useContext(NFTContext);
  if (context === undefined) {
    throw new Error('useNFT must be used within an NFTProvider');
  }
  return context;
}