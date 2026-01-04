'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Landmark } from '@/data/landmarks';
import { useNFT } from '@/context/NFTContext';
import { useAccount } from 'wagmi';
import { useLandmarkContract } from '@/hooks/useLandmarkContract';
import { useState } from 'react';

interface LandmarkCardProps {
  landmark: Landmark;
  showClaimButton?: boolean;
}

export function LandmarkCard({ landmark, showClaimButton = true }: LandmarkCardProps) {
  const { 
    isLandmarkClaimed, 
    isLandmarkMinted, 
    claimNFT, 
    mintNFT, 
    isMinting 
  } = useNFT();
  const { isConnected } = useAccount();
  const { isSupported, chainName, currencySymbol, isShardeum, isPolygon } = useLandmarkContract();
  const [isHovered, setIsHovered] = useState(false);
  const [localMinting, setLocalMinting] = useState(false);
  
  const isClaimed = isLandmarkClaimed(landmark.id);
  const isMintedOnChain = isLandmarkMinted(landmark.id);

  // Handle free claim (local storage)
  const handleClaim = async () => {
    if (!isConnected || isClaimed) return;
    
    setLocalMinting(true);
    // Simulate transaction delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    claimNFT(landmark.id);
    setLocalMinting(false);
  };

  // Handle blockchain mint (Shardeum or Polygon)
  const handleMint = async () => {
    if (!isConnected || isMintedOnChain) return;
    
    if (!isSupported) {
      alert('Please switch to Shardeum or Polygon network to mint NFTs');
      return;
    }
    
    setLocalMinting(true);
    try {
      await mintNFT(landmark.id, {
        name: landmark.name,
        description: landmark.description,
        image: landmark.imageUrl,
        location: `${landmark.coordinates.lat}, ${landmark.coordinates.lng}`,
        country: landmark.country,
      });
      
      // Show success message with chain name
      alert(`Successfully minted ${landmark.name} NFT on ${chainName}!`);
    } catch (error: any) {
      console.error('Mint error:', error);
      alert(`Failed to mint: ${error.message || 'Unknown error'}`);
    } finally {
      setLocalMinting(false);
    }
  };

  const isProcessing = isMinting || localMinting;

  return (
    <div
      className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={landmark.imageUrl}
          alt={landmark.name}
          fill
          loading="lazy"
          className={`object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          {isMintedOnChain ? (
            <span className="px-3 py-1 bg-green-500/90 text-white text-xs font-semibold rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Minted NFT
            </span>
          ) : isClaimed ? (
            <span className="px-3 py-1 bg-purple-500/90 text-white text-xs font-semibold rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Claimed
            </span>
          ) : (
            <span className="px-3 py-1 bg-violet-500/90 text-white text-xs font-semibold rounded-full">
              Available
            </span>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-slate-800/90 text-gray-300 text-xs font-medium rounded-full border border-slate-600/50">
            {landmark.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
            {landmark.name}
          </h3>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {landmark.country}
          </span>
        </div>

        <p className="text-sm text-gray-400 line-clamp-2 mb-4">
          {landmark.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href={`/landmark/${landmark.id}`}
            className="flex-1 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white text-sm font-medium rounded-lg text-center transition-all duration-300"
          >
            View Details
          </Link>
          
          {showClaimButton && (
            <>
              {/* Show Mint button if claimed but not minted, otherwise show Claim button */}
              {isClaimed && !isMintedOnChain ? (
                <button
                  onClick={handleMint}
                  disabled={!isConnected || isProcessing || !isSupported}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                    !isConnected || !isSupported
                      ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white hover:shadow-lg hover:shadow-green-500/25'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Minting...
                    </>
                  ) : !isSupported ? (
                    'Switch Network to Mint'
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Mint on {chainName} (0.01 {currencySymbol})
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleClaim}
                  disabled={!isConnected || isClaimed || isProcessing}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                    isMintedOnChain
                      ? 'bg-green-500/20 text-green-400 cursor-default'
                      : isClaimed
                      ? 'bg-purple-500/20 text-purple-400 cursor-default'
                      : !isConnected
                      ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-400 hover:to-violet-400 text-white hover:shadow-lg hover:shadow-purple-500/25'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Claiming...
                    </>
                  ) : isMintedOnChain ? (
                    'Minted ✓'
                  ) : isClaimed ? (
                    'Claimed ✓'
                  ) : !isConnected ? (
                    'Connect Wallet'
                  ) : (
                    'Claim NFT'
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5"></div>
      </div>
    </div>
  );
}