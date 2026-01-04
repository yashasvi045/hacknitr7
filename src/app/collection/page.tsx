'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNFT } from '@/context/NFTContext';
import { landmarks, getLandmarkById } from '@/data/landmarks';

export default function CollectionPage() {
  const { isConnected, address } = useAccount();
  const { claimedNFTs, totalClaimed, totalMinted } = useNFT();

  // Get landmark details for each claimed NFT
  const claimedLandmarks = claimedNFTs
    .map((nft) => {
      const landmark = getLandmarkById(nft.landmarkId);
      return landmark ? { 
        ...landmark, 
        claimedAt: nft.claimedAt, 
        tokenId: nft.tokenId,
        onChain: nft.onChain || false,
        txHash: nft.txHash
      } : null;
    })
    .filter(Boolean);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h1>
          <p className="text-gray-400 mb-8">
            Connect your Web3 wallet to view your NFT collection and track your claimed landmarks.
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                My Collection
              </h1>
              <p className="text-gray-400 mt-1">
                Your digital passport of collected landmarks
              </p>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-4">
              <div className="px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                <div className="text-2xl font-bold text-white">{totalClaimed}</div>
                <div className="text-sm text-gray-400">Claimed</div>
              </div>
              <div className="px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                <div className="text-2xl font-bold text-green-400">{totalMinted}</div>
                <div className="text-sm text-gray-400">Minted</div>
              </div>
              <div className="px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  {Math.round((totalClaimed / landmarks.length) * 100)}%
                </div>
                <div className="text-sm text-gray-400">Progress</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-500"
                style={{ width: `${(totalClaimed / landmarks.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {claimedLandmarks.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No NFTs Yet</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Start exploring landmarks around the world and claim them as unique NFTs to build your collection.
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Explore Landmarks
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <>
            {/* Collection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {claimedLandmarks.map((landmark) => (
                <div
                  key={landmark!.tokenId}
                  className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500"
                >
                  {/* NFT Badge */}
                  <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-purple-500/90 text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {landmark!.onChain ? 'Minted' : 'Claimed'}
                  </div>

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={landmark!.imageUrl}
                      alt={landmark!.name}
                      fill
                      loading="lazy"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                        {landmark!.name}
                      </h3>
                      <span className="text-xs text-gray-500">{landmark!.country}</span>
                    </div>

                    <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                      {landmark!.description}
                    </p>

                    {/* Token Info */}
                    <div className="p-3 bg-slate-700/30 rounded-xl mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Token ID</span>
                        <span className="text-gray-300 font-mono truncate ml-2 max-w-[150px]">
                          {landmark!.tokenId}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-2">
                        <span className="text-gray-500">Claimed</span>
                        <span className="text-gray-300">
                          {new Date(landmark!.claimedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/landmark/${landmark!.id}`}
                      className="w-full px-4 py-2 bg-slate-700/50 hover:bg-purple-500/20 text-gray-300 hover:text-purple-400 text-sm font-medium rounded-lg text-center transition-all duration-300 block"
                    >
                      View Details
                    </Link>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            {totalClaimed < landmarks.length && (
              <div className="mt-12 text-center">
                <p className="text-gray-400 mb-4">
                  {landmarks.length - totalClaimed} more landmarks waiting to be discovered!
                </p>
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-purple-500/50 rounded-xl text-purple-400 hover:bg-purple-500/10 transition-all duration-300"
                >
                  Continue Exploring
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
