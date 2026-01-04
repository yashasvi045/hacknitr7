'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { landmarks, Landmark } from '@/data/landmarks';
import { LandmarkCard } from '@/components/LandmarkCard';

// Dynamically import MapComponent with no SSR (Leaflet requires window)
const MapComponent = dynamic(
  () => import('@/components/MapComponent').then((mod) => mod.MapComponent),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-slate-800 rounded-2xl flex items-center justify-center">
        <div className="text-gray-400 flex items-center gap-2">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading map...
        </div>
      </div>
    )
  }
);

type ViewMode = 'map' | 'grid';

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLandmarks = landmarks.filter(
    (landmark) =>
      landmark.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      landmark.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      landmark.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkerClick = (landmark: Landmark) => {
    setSelectedLandmark(landmark);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Explore Landmarks
              </h1>
              <p className="text-gray-400 mt-1">
                Discover {landmarks.length} iconic destinations around the world
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search landmarks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    viewMode === 'map'
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Map
                  </span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Grid
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'map' ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Map */}
            <div className="lg:w-2/3 h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-slate-700/50">
              <MapComponent
                selectedLandmark={selectedLandmark}
                onMarkerClick={handleMarkerClick}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                {selectedLandmark ? 'Selected Landmark' : 'All Landmarks'}
              </h3>
              
              {selectedLandmark ? (
                <div className="space-y-4">
                  <LandmarkCard landmark={selectedLandmark} />
                  <button
                    onClick={() => setSelectedLandmark(null)}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-gray-400 hover:text-white hover:border-purple-500/50 transition-all duration-300"
                  >
                    Show All Landmarks
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredLandmarks.map((landmark) => (
                    <button
                      key={landmark.id}
                      onClick={() => setSelectedLandmark(landmark)}
                      className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-left hover:border-purple-500/50 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center text-white">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white group-hover:text-purple-400 transition-colors">
                            {landmark.name}
                          </h4>
                          <p className="text-sm text-gray-500">{landmark.country}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLandmarks.map((landmark) => (
              <LandmarkCard key={landmark.id} landmark={landmark} />
            ))}
          </div>
        )}

        {filteredLandmarks.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No landmarks found</h3>
            <p className="text-gray-500">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </div>
  );
}
