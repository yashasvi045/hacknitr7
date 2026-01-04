'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getLandmarkById } from '@/data/landmarks';
import { useNFT } from '@/context/NFTContext';
import { useAccount } from 'wagmi';
import { useState } from 'react';

export default function LandmarkDetailPage() {
  const params = useParams();
  const landmarkId = params.id as string;
  const landmark = getLandmarkById(landmarkId);
  
  const { isLandmarkClaimed, claimNFT } = useNFT();
  const { isConnected } = useAccount();
  const [isClaiming, setIsClaiming] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const isClaimed = landmark ? isLandmarkClaimed(landmark.id) : false;

  const handleClaim = async () => {
    if (!isConnected || isClaimed || !landmark) return;
    
    setIsClaiming(true);
    // Simulate blockchain transaction delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    claimNFT(landmark.id);
    setIsClaiming(false);
  };

  if (!landmark) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-20 h-20 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-2xl font-bold text-white mb-2">Landmark Not Found</h1>
          <p className="text-gray-400 mb-6">The landmark you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/explore"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const images = landmark.images || [landmark.imageUrl];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section with Image Gallery */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src={images[selectedImageIndex]}
          alt={landmark.name}
          fill
          className="object-cover transition-opacity duration-500"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        
        {/* Image Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/70 hover:border-purple-500/50 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/70 hover:border-purple-500/50 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === selectedImageIndex
                    ? 'bg-purple-500 w-8'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Back Button */}
        <Link
          href="/explore"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl text-white hover:border-purple-500/50 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {/* Status Badge */}
        <div className="absolute top-6 right-6">
          {isClaimed ? (
            <span className="px-4 py-2 bg-purple-500/90 text-white font-semibold rounded-full flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Claimed
            </span>
          ) : (
            <span className="px-4 py-2 bg-violet-500/90 text-white font-semibold rounded-full">
              Available
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-20">
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-slate-700/50 text-gray-300 text-sm font-medium rounded-full">
                    {landmark.category}
                  </span>
                  <span className="text-gray-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {landmark.country}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">{landmark.name}</h1>
              </div>

              {/* Claim Button */}
              <button
                onClick={handleClaim}
                disabled={!isConnected || isClaimed || isClaiming}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 ${
                  isClaimed
                    ? 'bg-purple-500/20 text-purple-400 cursor-default'
                    : !isConnected
                    ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-400 hover:to-violet-400 text-white hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105'
                }`}
              >
                {isClaiming ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Minting NFT...
                  </>
                ) : isClaimed ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Owned
                  </>
                ) : !isConnected ? (
                  'Connect Wallet'
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Claim NFT
                  </>
                )}
              </button>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-3">About</h2>
              <p className="text-gray-400 leading-relaxed">{landmark.description}</p>
            </div>

            {/* Coordinates */}
            <div className="mb-8 p-4 bg-slate-700/30 rounded-xl border border-slate-700/50">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Coordinates</h3>
              <div className="flex items-center gap-4">
                <span className="text-white font-mono">
                  {landmark.coordinates.lat.toFixed(4)}°N, {landmark.coordinates.lng.toFixed(4)}°E
                </span>
                <button className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                  Open in Maps →
                </button>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Fun Facts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {landmark.funFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-700/30 rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </span>
                      <p className="text-gray-300 text-sm">{fact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Gallery Thumbnails */}
            {images.length > 1 && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">📸</span>
                  Gallery
                </h2>
                <div className="grid grid-cols-4 gap-3">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                        index === selectedImageIndex
                          ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-slate-900'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${landmark.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
