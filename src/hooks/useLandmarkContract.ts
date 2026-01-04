import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt, useChainId } from 'wagmi';
import { parseEther } from 'viem';

// Contract addresses per chain
const CONTRACT_ADDRESSES: Record<number, `0x${string}`> = {
  8119: '0xD04ed19aD1AC7e2fa5e8a95d074cdd0f416D143e' as `0x${string}`, // Shardeum EVM Testnet
  80002: '0xD04ed19aD1AC7e2fa5e8a95d074cdd0f416D143e' as `0x${string}`, // Polygon Amoy - REPLACE THIS WHEN DEPLOYED
};

const CONTRACT_ABI = [
  {
    inputs: [
      { name: 'landmarkId', type: 'string' },
      { name: 'tokenURI', type: 'string' }
    ],
    name: 'mintLandmark',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ name: 'landmarkId', type: 'string' }],
    name: 'isLandmarkMinted',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'landmarkId', type: 'string' }],
    name: 'getTokenByLandmark',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'visitLandmark',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalMinted',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mintPrice',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export function useLandmarkContract() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  // Get contract address for current chain
  const contractAddress = CONTRACT_ADDRESSES[chainId];
  const isSupported = !!contractAddress;

  // Determine current chain info
  const isShardeum = chainId === 8119;
  const isPolygon = chainId === 80002;
  
  const chainName = isShardeum ? 'Shardeum' : isPolygon ? 'Polygon' : 'Unknown';
  const currencySymbol = isShardeum ? 'SHM' : isPolygon ? 'POL' : 'ETH';

  // Read mint price (only if contract exists on this chain)
  const { data: mintPrice } = useReadContract({
    address: contractAddress,
    abi: CONTRACT_ABI,
    functionName: 'mintPrice',
    query: {
      enabled: isSupported,
    },
  });

  // Read total minted (only if contract exists on this chain)
  const { data: totalMinted } = useReadContract({
    address: contractAddress,
    abi: CONTRACT_ABI,
    functionName: 'totalMinted',
    query: {
      enabled: isSupported,
    },
  });

  // Mint landmark NFT
  const mintLandmark = async (landmarkId: string, tokenURI: string) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }
    
    if (!isSupported) {
      throw new Error(`Contract not deployed on this network. Please switch to Shardeum or Polygon.`);
    }
    
    const tx = await writeContractAsync({
      address: contractAddress,
      abi: CONTRACT_ABI,
      functionName: 'mintLandmark',
      args: [landmarkId, tokenURI],
      value: parseEther('0.01'), // 0.01 SHM or POL
    });

    return tx;
  };

  // Check if landmark is minted
  const checkLandmarkMinted = (landmarkId: string) => {
    return useReadContract({
      address: contractAddress,
      abi: CONTRACT_ABI,
      functionName: 'isLandmarkMinted',
      args: [landmarkId],
      query: {
        enabled: isSupported,
      },
    });
  };

  // Visit landmark (record on-chain)
  const visitLandmark = async (tokenId: bigint) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }
    
    if (!isSupported) {
      throw new Error('Contract not deployed on this network');
    }
    
    const tx = await writeContractAsync({
      address: contractAddress,
      abi: CONTRACT_ABI,
      functionName: 'visitLandmark',
      args: [tokenId],
    });

    return tx;
  };

  return {
    mintLandmark,
    checkLandmarkMinted,
    visitLandmark,
    mintPrice,
    totalMinted,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    contractAddress,
    isSupported, // Whether contract is deployed on current chain
    isShardeum,
    isPolygon,
    chainName,
    chainId,
    currencySymbol, // 'SHM' or 'POL'
  };
}