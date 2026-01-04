'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';
import { landmarks, Landmark } from '@/data/landmarks';
import { useNFT } from '@/context/NFTContext';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
const createCustomIcon = (isClaimed: boolean) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative">
        <div class="w-10 h-10 ${isClaimed ? 'bg-purple-500' : 'bg-violet-500'} rounded-full flex items-center justify-center shadow-lg ${isClaimed ? 'shadow-purple-500/50' : 'shadow-violet-500/50'} border-2 border-white">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 ${isClaimed ? 'border-t-purple-500' : 'border-t-violet-500'} border-l-transparent border-r-transparent"></div>
      </div>
    `,
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
  });
};

interface MapComponentProps {
  selectedLandmark?: Landmark | null;
  onMarkerClick?: (landmark: Landmark) => void;
}

function MapController({ selectedLandmark }: { selectedLandmark?: Landmark | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedLandmark) {
      map.flyTo([selectedLandmark.coordinates.lat, selectedLandmark.coordinates.lng], 8, {
        duration: 1.5,
      });
    }
  }, [selectedLandmark, map]);

  return null;
}

export function MapComponent({ selectedLandmark, onMarkerClick }: MapComponentProps) {
  const { isLandmarkClaimed } = useNFT();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-slate-800 rounded-2xl flex items-center justify-center">
        <div className="text-gray-400 flex items-center gap-2">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading map...
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={[30, 0]}
      zoom={2}
      className="w-full h-full rounded-2xl"
      style={{ background: '#1e293b' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <MapController selectedLandmark={selectedLandmark} />
      
      {landmarks.map((landmark) => {
        const isClaimed = isLandmarkClaimed(landmark.id);
        
        return (
          <Marker
            key={landmark.id}
            position={[landmark.coordinates.lat, landmark.coordinates.lng]}
            icon={createCustomIcon(isClaimed)}
            eventHandlers={{
              click: () => onMarkerClick?.(landmark),
            }}
          >
            <Popup className="custom-popup">
              <div className="min-w-[200px] p-2">
                <h3 className="font-bold text-slate-800 text-lg mb-1">{landmark.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{landmark.country}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${isClaimed ? 'bg-emerald-100 text-emerald-700' : 'bg-cyan-100 text-cyan-700'}`}>
                    {isClaimed ? 'Claimed' : 'Available'}
                  </span>
                  <Link
                    href={`/landmark/${landmark.id}`}
                    className="text-xs text-cyan-600 hover:text-cyan-700 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
