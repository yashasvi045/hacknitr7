import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/providers/Web3Provider";
import { NFTProvider } from "@/context/NFTContext";
import { Navbar } from "@/components/Navbar";
import { ChatBot } from "@/components/ChatBot";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wandr - Collect World Landmarks as NFTs on Shardeum",
  description: "Explore the world's most iconic landmarks and collect them as unique NFTs on Shardeum blockchain. Your digital passport to global adventures with fast, low-cost minting.",
  keywords: ["NFT", "Tourism", "Travel", "Blockchain", "Shardeum", "Polygon", "Landmarks", "Web3"],
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} ${dmSans.variable} font-sans antialiased bg-slate-900 text-white min-h-screen`}>
        <Web3Provider>
          <NFTProvider>
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
            <ChatBot />
          </NFTProvider>
        </Web3Provider>
      </body>
    </html>
  );
}