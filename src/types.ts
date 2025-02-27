/**
 * Token profile information from DexScreener
 * @example
 * {
 *   url: "https://dexscreener.com/solana/SOL",
 *   chainId: "solana",
 *   tokenAddress: "So11111111111111111111111111111111111111112",
 *   icon: "https://example.com/icon.png",
 *   header: "Solana (SOL)",
 *   description: "Solana native token",
 *   links: [
 *     { type: "website", label: "Website", url: "https://solana.com" }
 *   ]
 * }
 */
export interface TokenProfile {
  /** URL to the token's page on DexScreener */
  url: string;
  /** Chain identifier (e.g., 'solana', 'ethereum') */
  chainId: string;
  /** Token's contract address */
  tokenAddress: string;
  /** URL to token's icon */
  icon: string;
  /** Token name and symbol */
  header: string;
  /** Optional token description */
  description?: string;
  /** Optional OpenGraph image URL */
  openGraph?: string;
  /** Optional array of related links */
  links?: {
    /** Link type (e.g., 'website', 'twitter') */
    type?: string;
    /** Display label for the link */
    label?: string;
    /** The actual URL */
    url: string;
  }[];
}

/**
 * Information about token boosts on DexScreener
 * @example
 * {
 *   url: "https://dexscreener.com/solana/SOL",
 *   chainId: "solana",
 *   tokenAddress: "So11111111111111111111111111111111111111112",
 *   amount: 100,
 *   totalAmount: 1000,
 *   icon: "https://example.com/icon.png",
 *   header: "Solana (SOL)"
 * }
 */
export interface TokenBoost {
  /** URL to the token's page on DexScreener */
  url: string;
  /** Chain identifier */
  chainId: string;
  /** Token's contract address */
  tokenAddress: string;
  /** Current boost amount */
  amount?: number;
  /** Total boost amount */
  totalAmount: number;
  /** URL to token's icon */
  icon: string;
  /** Token name and symbol */
  header: string;
  /** Optional token description */
  description?: string;
  /** Optional OpenGraph image URL */
  openGraph?: string;
  /** Array of related links */
  links: {
    /** Link type (e.g., 'website', 'twitter') */
    type?: string;
    /** Display label for the link */
    label?: string;
    /** The actual URL */
    url: string;
  }[];
}

/**
 * Token order information from DexScreener
 * @example
 * {
 *   paymentTimestamp: 1678234567,
 *   type: "tokenProfile",
 *   status: "processing"
 * }
 */
export interface TokenOrder {
  /** Unix timestamp of the payment */
  paymentTimestamp: number;
  /** Order type */
  type: string;
  /** Current status of the order */
  status: string;
}

/**
 * Trading pair information from DexScreener
 * @example
 * {
 *   chainId: "solana",
 *   dexId: "raydium",
 *   url: "https://dexscreener.com/solana/pair",
 *   pairAddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
 *   baseToken: {
 *     address: "So11111111111111111111111111111111111111112",
 *     name: "Solana",
 *     symbol: "SOL"
 *   },
 *   quoteToken: {
 *     address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
 *     name: "USD Coin",
 *     symbol: "USDC"
 *   },
 *   priceUsd: "20.50",
 *   volume: { h24: 1000000 },
 *   liquidity: { usd: 5000000 }
 * }
 */
export interface DexScreenerPair {
  /** Chain identifier */
  chainId: string;
  /** DEX identifier (e.g., 'raydium', 'orca') */
  dexId: string;
  /** URL to pair's page on DexScreener */
  url: string;
  /** Pair's contract address */
  pairAddress: string;
  /** Information about the base token */
  baseToken: {
    /** Token's contract address */
    address: string;
    /** Token's full name */
    name: string;
    /** Token's symbol */
    symbol: string;
  };
  /** Information about the quote token */
  quoteToken: {
    /** Token's contract address */
    address: string;
    /** Token's full name */
    name: string;
    /** Token's symbol */
    symbol: string;
  };
  /** Price in native token */
  priceNative: string;
  /** Price in USD */
  priceUsd: string;
  /** Transaction counts */
  txns: {
    /** Key is timeframe (e.g., 'm5', 'h1', 'h24') */
    [key: string]: {
      /** Number of buy transactions */
      buys: number;
      /** Number of sell transactions */
      sells: number;
    };
  };
  /** Volume data */
  volume: {
    /** Key is timeframe (e.g., 'm5', 'h1', 'h24') */
    [key: string]: number;
  };
  /** Price change data */
  priceChange: {
    /** Key is timeframe (e.g., 'm5', 'h1', 'h24') */
    [key: string]: number;
  };
  /** Liquidity information */
  liquidity: {
    /** Total liquidity in USD */
    usd: number;
    /** Base token liquidity */
    base: number;
    /** Quote token liquidity */
    quote: number;
  };
  /** Fully diluted valuation */
  fdv: number;
  /** Market capitalization */
  marketCap: number;
  /** Unix timestamp of pair creation */
  pairCreatedAt: number;
  /** Optional array of pair labels */
  labels?: string[];
  /** Optional boost information */
  boosts?: {
    /** Number of active boosts */
    active: number;
  };
  /** Optional additional information */
  info?: {
    /** URL to token's image */
    imageUrl: string;
    /** Array of website URLs */
    websites: { url: string }[];
    /** Array of social media links */
    socials: { platform: string; handle: string }[];
  };
}

/**
 * Response format for pair search endpoints
 */
export interface DexScreenerSearchResponse {
  /** API schema version */
  schemaVersion: string;
  /** Array of matching pairs */
  pairs: DexScreenerPair[];
} 