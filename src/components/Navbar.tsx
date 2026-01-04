'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePathname } from 'next/navigation';
import { useNFT } from '@/context/NFTContext';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/collection', label: 'My Collection' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showChainMenu, setShowChainMenu] = useState(false);
  const pathname = usePathname();
  const { totalClaimed, totalMinted } = useNFT();
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();

  // Check current network
  const isShardeum = chainId === 8119;
  const isPolygon = chainId === 80002;

  const currentChain = chains.find(c => c.id === chainId);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close chain menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowChainMenu(false);
    if (showChainMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showChainMenu]);

  return (
    <div className={`fixed z-50 w-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isScrolled ? 'px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 pt-4' : 'px-0 pt-0'}`}>
      <nav 
        className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isScrolled 
            ? 'bg-black/70 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl shadow-purple-500/10' 
            : 'bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md border-b border-purple-500/20'
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                  <Image
                    src="/favicon.png"
                    alt="Wandr Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-heading bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Wandr
                </span>
                {isConnected && currentChain && (
                    <span
                      className={`text-[10px] font-medium ${
                        isShardeum ? 'text-green-400' : isPolygon ? '' : 'text-gray-400'
                      }`}
                      style={
                        isPolygon
                          ? {
                              color: '#38bdf8'
                            }
                          : undefined
                      }
                    >
                      {isShardeum
                        ? '⚡ Shardeum'
                        : isPolygon
                        ? '⚡ Polygon'
                        : `🔗 ${currentChain.name}`}
                    </span>
                )}
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 p-1 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    pathname === link.href
                      ? 'bg-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Stats, Chain Switcher & Wallet Connect */}
            <div className="hidden md:flex items-center gap-3">
              {/* Stats Display */}
              {isConnected && (
                <div className="flex items-center gap-2">
                  {/* Claimed Count */}
                  <div className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-medium text-purple-300">
                      {totalClaimed}
                    </span>
                  </div>

                  {/* Minted Count */}
                  {totalMinted > 0 && (
                    <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-xs font-medium text-green-300">
                        {totalMinted}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Chain Switcher Button */}
              {isConnected && (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowChainMenu(!showChainMenu);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-slate-700/50 to-slate-600/50 hover:from-slate-600/50 hover:to-slate-500/50 border border-slate-500/30 rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      isShardeum
                        ? 'bg-green-400'
                        : isPolygon
                        ? 'bg-sky-400'
                        : 'bg-gray-400'
                    } animate-pulse`}></div>
                    <span className="text-sm font-medium text-gray-200">
                      {currentChain?.name || 'Switch Network'}
                    </span>
                    <svg 
                      className={`w-4 h-4 text-gray-400 transition-transform ${showChainMenu ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Chain Dropdown Menu */}
                  {showChainMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
                      <div className="p-2">
                        <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Select Network
                        </div>
                        {chains.map((chain) => {
                          const isCurrentChain = chain.id === chainId;
                          const isShardeum = chain.id === 8119;
                          const isPolygon = chain.id === 80002;
                          
                          return (
                            <button
                              key={chain.id}
                              onClick={() => {
                                switchChain({ chainId: chain.id });
                                setShowChainMenu(false);
                              }}
                              disabled={isCurrentChain}
                              className={`w-full px-3 py-2.5 rounded-lg flex items-center justify-between transition-all duration-200 ${
                                isCurrentChain
                                  ? 'bg-purple-500/20 cursor-default'
                                  : 'hover:bg-slate-700/50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${
                                  isShardeum
                                    ? 'bg-green-400'
                                    : isPolygon
                                    ? 'bg-sky-400'
                                    : 'bg-blue-400'
                                }`}></div>
                                <div className="flex flex-col items-start">
                                  <span className="text-sm font-medium text-white">
                                    {chain.name}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    {isShardeum ? 'Fast & Low Cost' : isPolygon ? 'Fallback Chain' : 'EVM Compatible'}
                                  </span>
                                </div>
                              </div>
                              {isCurrentChain && (
                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <ConnectButton 
                showBalance={false}
                chainStatus="none"
                accountStatus={{
                  smallScreen: 'avatar',
                  largeScreen: 'full',
                }}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-purple-400 hover:bg-slate-700/50 transition-all duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-purple-500/20">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      pathname === link.href
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'text-gray-300 hover:bg-slate-700/50 hover:text-purple-400'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Chain Switcher */}
                {isConnected && (
                  <div className="px-4 py-2">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Network
                    </div>
                    <div className="space-y-2">
                      {chains.map((chain) => {
                        const isCurrentChain = chain.id === chainId;
                        const isShardeum = chain.id === 8119;
                        const isPolygon = chain.id === 80002;
                        
                        return (
                          <button
                            key={chain.id}
                            onClick={() => {
                              switchChain({ chainId: chain.id });
                              setIsMobileMenuOpen(false);
                            }}
                            disabled={isCurrentChain}
                            className={`w-full px-3 py-2.5 rounded-lg flex items-center justify-between transition-all ${
                              isCurrentChain
                                ? 'bg-purple-500/20'
                                : 'bg-slate-700/30 hover:bg-slate-700/50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                isShardeum
                                  ? 'bg-green-400'
                                  : isPolygon
                                  ? 'bg-sky-400'
                                  : 'bg-blue-400'
                              }`}></div>
                              <span className="text-sm font-medium text-white">
                                {chain.name}
                              </span>
                            </div>
                            {isCurrentChain && (
                              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Mobile Stats */}
                {isConnected && (
                  <div className="px-4 py-2 flex flex-col gap-2">
                    <div className="flex items-center justify-between px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <span className="text-xs text-gray-400">Claimed</span>
                      <span className="text-sm font-bold text-purple-300">{totalClaimed}</span>
                    </div>
                    {totalMinted > 0 && (
                      <div className="flex items-center justify-between px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <span className="text-xs text-gray-400">Minted</span>
                        <span className="text-sm font-bold text-green-300">{totalMinted}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="px-4 py-2">
                  <ConnectButton 
                    showBalance={false}
                    chainStatus="none"
                    accountStatus="avatar"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}