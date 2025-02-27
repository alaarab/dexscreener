import axios from 'axios';
import { TokenData, TokenLookupOptions, TokenLookupResponse } from '../types';

const DEXSCREENER_BASE_URL = 'https://api.dexscreener.com';

interface DexScreenerPairResponse {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  priceNative: string;
  priceUsd: string;
  fdv: number;
  marketCap: number;
  volume: {
    [key: string]: number;
  };
  priceChange: {
    [key: string]: number;
  };
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
}

export async function getDexScreenerTokenInfo(options: TokenLookupOptions): Promise<TokenLookupResponse> {
  try {
    const chainId = options.chainId || 'solana'; // Default to solana if not specified
    const response = await axios.get(`${DEXSCREENER_BASE_URL}/tokens/v1/${chainId}/${options.address}`);
    
    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      return {
        success: false,
        error: 'Token not found on DexScreener'
      };
    }

    // Get the first pair with the highest liquidity
    const pair = response.data[0] as DexScreenerPairResponse;
    
    const tokenData: TokenData = {
      symbol: pair.baseToken.symbol,
      name: pair.baseToken.name,
      address: pair.baseToken.address,
      chainId: pair.chainId,
      decimals: 0, // DexScreener doesn't provide decimals in this endpoint
      price: {
        usd: parseFloat(pair.priceUsd || '0'),
        change24h: pair.priceChange?.h24
      },
      volume24h: pair.volume?.h24 || 0,
      liquidity: {
        usd: pair.liquidity?.usd || 0
      },
      lastUpdated: new Date(),
      source: 'dexscreener',
      marketCap: pair.marketCap,
      fdv: pair.fdv
    };

    return {
      success: true,
      data: tokenData
    };
  } catch (error) {
    console.error('DexScreener API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
} 