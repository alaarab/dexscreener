export interface TokenData {
  symbol: string;
  name: string;
  address: string;
  chainId: string | number;
  decimals: number;
  price: {
    usd: number;
    change24h?: number;
  };
  volume24h?: number;
  liquidity?: {
    usd: number;
  };
  lastUpdated: Date;
  source: 'dexscreener' | 'defined';
  marketCap?: number;  // Market capitalization
  fdv?: number;        // Fully diluted valuation
}

export interface TokenLookupOptions {
  address: string;
  chainId?: string | number;
}

export interface TokenLookupResponse {
  success: boolean;
  data?: TokenData;
  error?: string;
} 