# 🌍 Wandr - Collect World Landmarks as NFTs

<div align="center">

![Wandr Logo](https://img.shields.io/badge/Wandr-NFT%20Tourism-purple?style=for-the-badge&logo=ethereum)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)
![Polygon](https://img.shields.io/badge/Polygon-Amoy-8247E5?style=for-the-badge&logo=polygon)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

**A Web3-powered digital collectibles platform for iconic world landmarks**

[Live Demo](#) • [Documentation](#) • [Contributing](#contributing)

</div>

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Architecture](#-architecture)
3. [Tech Stack](#-tech-stack)
4. [Project Structure](#-project-structure)
5. [Core Features](#-core-features)
6. [Data Flow](#-data-flow)
7. [Components Documentation](#-components-documentation)
8. [State Management](#-state-management)
9. [Web3 Integration](#-web3-integration)
10. [Getting Started](#-getting-started)
11. [Deployment](#-deployment)
12. [Environment Variables](#-environment-variables)
13. [Future Enhancements](#-future-enhancements)

---

## 🎯 Project Overview

**Wandr** is an innovative NFT tourism platform that allows users to explore iconic world landmarks and collect them as unique digital collectibles. Built on the Polygon Amoy testnet, it combines the excitement of travel discovery with blockchain-powered ownership.

### Vision
Transform the way people experience and remember landmarks by creating a digital passport of collectible memories, bridging physical tourism with Web3 technology.

### Key Value Propositions
- **Gamified Exploration**: Discover landmarks through an interactive global map
- **Digital Ownership**: Claim landmarks as NFTs stored on blockchain
- **Personal Collection**: Build and showcase your digital travel passport

---

## 🏗 Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐│
│  │   Next.js   │  │   React 19  │  │ TailwindCSS │  │   Leaflet   ││
│  │   App Router│  │  Components │  │   Styling   │  │  Maps       ││
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘│
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       STATE MANAGEMENT                               │
│  ┌─────────────────────────┐  ┌─────────────────────────────────┐  │
│  │      NFT Context        │  │        Local Storage            │  │
│  │  (React Context API)    │  │   (Persistent User Data)        │  │
│  └─────────────────────────┘  └─────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        WEB3 LAYER                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐│
│  │  RainbowKit │  │    Wagmi    │  │    Viem     │  │WalletConnect││
│  │   (UI)      │  │  (Hooks)    │  │ (Interface) │  │  (Protocol) ││
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘│
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      BLOCKCHAIN LAYER                                │
│              ┌─────────────────────────────────┐                    │
│              │      Polygon Amoy Testnet       │                    │
│              │    (EVM-Compatible Chain)       │                    │
│              └─────────────────────────────────┘                    │
└─────────────────────────────────────────────────────────────────────┘
```

### Application Architecture Pattern

The application follows a **Component-Driven Architecture** with:

1. **Presentation Layer**: React components with TailwindCSS styling
2. **Business Logic Layer**: Custom hooks and context providers
3. **Data Layer**: Static landmark data + localStorage persistence
4. **Integration Layer**: Web3 providers for blockchain connectivity

---

## 🛠 Tech Stack

### Frontend Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.1 | React framework with App Router, SSR, and optimizations |
| **React** | 19.2.3 | UI component library with latest concurrent features |
| **TypeScript** | 5.x | Type-safe development |

### Styling & UI

| Technology | Version | Purpose |
|------------|---------|---------|
| **TailwindCSS** | 4.x | Utility-first CSS framework |
| **PostCSS** | - | CSS processing and optimization |
| **Poppins & DM Sans** | - | Custom typography via Google Fonts |

### Mapping & Visualization

| Technology | Version | Purpose |
|------------|---------|---------|
| **Leaflet** | 1.9.4 | Interactive map rendering |
| **React-Leaflet** | 5.0.0 | React bindings for Leaflet |
| **CARTO Dark Tiles** | - | Dark-themed map tile layer |

### Web3 & Blockchain

| Technology | Version | Purpose |
|------------|---------|---------|
| **RainbowKit** | 2.2.10 | Beautiful wallet connection UI |
| **Wagmi** | 2.19.5 | React hooks for Ethereum |
| **Viem** | 2.43.3 | TypeScript interface for EVM |
| **WalletConnect** | - | Multi-wallet connection protocol |

### Data Management

| Technology | Purpose |
|------------|---------|
| **TanStack React Query** | Server state management and caching |
| **React Context API** | Global state for NFT claims |
| **localStorage** | Persistent user data storage |

### Development Tools

| Technology | Purpose |
|------------|---------|
| **ESLint** | Code linting and quality |
| **Babel React Compiler** | Automatic component optimization |

---

## 📁 Project Structure

```
wandr/
├── 📁 public/
│   └── 📁 fonts/              # Custom font files
│
├── 📁 src/
│   ├── 📁 app/                # Next.js App Router pages
│   │   ├── 📄 layout.tsx      # Root layout with providers
│   │   ├── 📄 page.tsx        # Homepage with hero section
│   │   ├── 📄 globals.css     # Global styles and animations
│   │   │
│   │   ├── 📁 explore/        # Landmark exploration page
│   │   │   └── 📄 page.tsx    # Map + grid view of landmarks
│   │   │
│   │   ├── 📁 collection/     # User's NFT collection
│   │   │   └── 📄 page.tsx    # Personal collection dashboard
│   │   │
│   │   └── 📁 landmark/       # Dynamic landmark pages
│   │       └── 📁 [id]/       # Dynamic route parameter
│   │           └── 📄 page.tsx # Individual landmark detail
│   │
│   ├── 📁 components/         # Reusable UI components
│   │   ├── 📄 index.ts        # Component exports
│   │   ├── 📄 Navbar.tsx      # Navigation with wallet connect
│   │   ├── 📄 LandmarkCard.tsx # Landmark display card
│   │   └── 📄 MapComponent.tsx # Interactive Leaflet map
│   │
│   ├── 📁 context/            # React Context providers
│   │   └── 📄 NFTContext.tsx  # NFT claim state management
│   │
│   ├── 📁 data/               # Static data sources
│   │   └── 📄 landmarks.ts    # Landmark definitions & types
│   │
│   └── 📁 providers/          # Application providers
│       └── 📄 Web3Provider.tsx # RainbowKit + Wagmi setup
│
├── 📄 next.config.ts          # Next.js configuration
├── 📄 tailwind.config.ts      # TailwindCSS configuration
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 package.json            # Dependencies and scripts
└── 📄 README.md               # This file
```

---

## ✨ Core Features

### 1. Interactive World Map (`/explore`)

- **Technology**: Leaflet with React-Leaflet wrapper
- **Features**:
  - Dark-themed CARTO tile layer
  - Custom animated markers for each landmark
  - Color-coded markers (purple for claimed, violet for available)
  - Smooth fly-to animations when selecting landmarks
  - Popup cards with quick landmark info
  - Toggle between map view and grid view

### 2. Landmark Discovery System

- **6 Featured Landmarks** (expandable):
  - Eiffel Tower (France)
  - Colosseum (Italy)
  - Taj Mahal (India)
  - Machu Picchu (Peru)
  - Great Wall of China (China)
  - Statue of Liberty (USA)

- **Landmark Data Structure**:
  ```typescript
  interface Landmark {
    id: string;
    name: string;
    description: string;
    coordinates: { lat: number; lng: number };
    imageUrl: string;
    images: string[];      // Multiple images for gallery
    funFacts: string[];    // Educational content
    country: string;
    category: string;      // Monument, Historical Site, etc.
  }
  ```

### 3. NFT Claiming System

- **Wallet Connection**: RainbowKit modal with multiple wallet support
- **Claim Flow**:
  1. User connects Web3 wallet
  2. Navigates to landmark detail page
  3. Clicks "Claim NFT" button
  4. Simulated blockchain transaction (2s delay)
  5. NFT stored in user's collection

- **Token Generation**:
  ```typescript
  tokenId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  ```

### 4. Personal Collection Dashboard (`/collection`)

- **Stats Display**: Total collected, remaining, completion percentage
- **Progress Bar**: Visual completion indicator
- **NFT Cards**: Display claimed landmarks with token ID and claim date
- **Wallet-Specific**: Collections are tied to wallet addresses

### 5. Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Animated Navbar**: Shrinks on scroll with glass-morphism effect
- **Touch-Friendly**: Map interactions work on mobile devices

---

## 🔄 Data Flow

### NFT Claim Flow Sequence

```
┌──────────┐     ┌───────────┐     ┌─────────────┐     ┌──────────────┐
│   User   │     │  UI Layer │     │ NFT Context │     │ localStorage │
└────┬─────┘     └─────┬─────┘     └──────┬──────┘     └──────┬───────┘
     │                 │                  │                   │
     │ Click "Claim"   │                  │                   │
     │────────────────>│                  │                   │
     │                 │                  │                   │
     │                 │  claimNFT(id)    │                   │
     │                 │─────────────────>│                   │
     │                 │                  │                   │
     │                 │                  │ Generate tokenId  │
     │                 │                  │──────────┐        │
     │                 │                  │          │        │
     │                 │                  │<─────────┘        │
     │                 │                  │                   │
     │                 │                  │ Update state      │
     │                 │                  │──────────┐        │
     │                 │                  │          │        │
     │                 │                  │<─────────┘        │
     │                 │                  │                   │
     │                 │                  │ Persist data      │
     │                 │                  │──────────────────>│
     │                 │                  │                   │
     │                 │  State updated   │                   │
     │                 │<─────────────────│                   │
     │                 │                  │                   │
     │  UI re-renders  │                  │                   │
     │<────────────────│                  │                   │
     │                 │                  │                   │
```

### State Persistence Strategy

1. **On Mount**: Load claimed NFTs from localStorage (wallet-specific key)
2. **On Claim**: Update React state → Trigger useEffect → Save to localStorage
3. **On Wallet Change**: Clear state → Load new wallet's data from localStorage

---

## 🧩 Components Documentation

### `<Web3Provider>`
**File**: `src/providers/Web3Provider.tsx`

Wraps the application with Web3 capabilities.

**Configuration**:
- Chain: Polygon Amoy Testnet
- Theme: Dark theme with purple accent (#a855f7)
- SSR: Enabled for Next.js compatibility

### `<NFTProvider>`
**File**: `src/context/NFTContext.tsx`

Manages NFT claim state globally.

**Exposed Values**:
```typescript
{
  claimedNFTs: ClaimedNFT[];      // Array of claimed NFTs
  claimNFT: (id: string) => void; // Claim function
  isLandmarkClaimed: (id: string) => boolean;
  totalClaimed: number;           // Count of claimed NFTs
}
```

### `<Navbar>`
**File**: `src/components/Navbar.tsx`

Responsive navigation with:
- Logo and brand name
- Navigation links (Home, Explore, Collection)
- RainbowKit Connect Button
- Mobile hamburger menu
- Scroll-based shrink animation

### `<MapComponent>`
**File**: `src/components/MapComponent.tsx`

Interactive map component featuring:
- Custom SVG markers with claim status indication
- Fly-to animations via `MapController` sub-component
- Popup cards on marker click
- Dynamic imports for SSR compatibility

### `<LandmarkCard>`
**File**: `src/components/LandmarkCard.tsx`

Reusable card for displaying landmarks:
- Image with hover zoom effect
- Status badge (Claimed/Available)
- Category tag
- Claim button with loading state
- Link to detail page

---

## 🗃 State Management

### React Context (NFTContext)

**Purpose**: Manage user's claimed NFTs across the application

**State Shape**:
```typescript
interface ClaimedNFT {
  landmarkId: string;
  claimedAt: Date;
  tokenId: string;
}
```

**Storage Key Pattern**: `nft-tourism-claimed-{walletAddress}`

### Why Context Over Redux?

1. **Simplicity**: Single concern (NFT claims) doesn't require complex state
2. **Performance**: React 19's concurrent features optimize re-renders
3. **Bundle Size**: No additional dependencies
4. **Native Integration**: Works seamlessly with Next.js App Router

---

## ⛓ Web3 Integration

### Supported Wallets

Via RainbowKit + WalletConnect:
- MetaMask
- Coinbase Wallet
- WalletConnect (200+ wallets)
- Rainbow
- Trust Wallet
- And more...

### Network Configuration

```typescript
const config = getDefaultConfig({
  appName: 'Wandr',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [polygonAmoy],  // Polygon Amoy Testnet
  ssr: true,
});
```

### Wagmi Hooks Used

| Hook | Purpose |
|------|---------|
| `useAccount()` | Get connected wallet address and status |
| `useConnect()` | Handle wallet connections |
| `useDisconnect()` | Handle wallet disconnections |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm
- A Web3 wallet (MetaMask recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/yashasvi045/hackxios-25.git

# Navigate to project directory
cd hackxios-25

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Yes | WalletConnect Cloud Project ID |

---

## 🔐 Environment Variables

```env
# WalletConnect Configuration
# Get from: https://cloud.walletconnect.com/
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

---

## 🔮 Future Enhancements

### Phase 1: Smart Contract Integration
- [ ] Deploy NFT smart contract on Polygon
- [ ] Implement actual minting with on-chain storage
- [ ] Add IPFS metadata storage via Pinata

### Phase 2: Social Features
- [ ] User profiles and leaderboards
- [ ] Achievement badges for milestones
- [ ] Social sharing of collections

### Phase 3: Enhanced Gamification
- [ ] Geo-location verification for "real" visits
- [ ] Rare landmark drops and limited editions
- [ ] Trading marketplace for NFTs

### Phase 4: Monetization
- [ ] Premium landmark packs
- [ ] Partner with tourism boards
- [ ] NFT royalties on secondary sales

---

## 👥 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Landmark images from [Unsplash](https://unsplash.com)
- Map tiles from [CARTO](https://carto.com)
- Icons from [Heroicons](https://heroicons.com)

---

<div align="center">

**Built with ❤️ for HackXIOS '25**

</div>
