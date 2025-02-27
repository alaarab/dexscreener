# DexLens

A unified interface for fetching and normalizing token data across multiple DEX data providers. Currently supports DexScreener with plans to add Defined.fi and other providers.

## Features

- 🔄 Unified data format across different providers
- 📊 Real-time token price, volume, and liquidity data
- 📈 Market metrics (market cap, FDV, price changes)
- ⛓️ Multi-chain support
- 🚀 TypeScript-ready
- ✨ Clean, normalized data structures

## Installation

```bash
npm install dex-lens
```

## Quick Start

```typescript
import { getTokenInfo } from 'dex-lens';

// Fetch Solana token info
const result = await getTokenInfo({
  address: '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump',  // FartCoin
  chainId: 'solana'
});

if (result.success) {
  const {
    name,
    symbol,
    price,
    marketCap,
    volume24h,
    liquidity
  } = result.data;
  
  console.log(`${symbol}: $${price.usd}`);
}
```

## Supported Data Providers

### DexScreener
- Real-time price data
- Volume and liquidity metrics
- Market cap and FDV
- Price change percentages
- Trading pairs information

### Coming Soon
- Defined.fi integration
- GeckoTerminal support
- Historical price data
- Trading chart data
- More metrics and analytics

## Data Structure

### Input Options
```typescript
interface TokenLookupOptions {
  address: string;
  chainId?: string | number;  // Optional, defaults based on provider
}
```

### Response Format
```typescript
interface TokenData {
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
  marketCap?: number;
  fdv?: number;
  lastUpdated: Date;
  source: 'dexscreener' | 'defined';
}

interface TokenLookupResponse {
  success: boolean;
  data?: TokenData;
  error?: string;
}
```

## Advanced Usage

### Provider-Specific Queries
```typescript
import { getDexScreenerTokenInfo } from 'dex-lens';

// Use DexScreener directly
const dexScreenerResult = await getDexScreenerTokenInfo({
  address: 'token_address',
  chainId: 'solana'
});
```

### Error Handling
```typescript
const result = await getTokenInfo(options);

if (!result.success) {
  console.error('Error fetching token data:', result.error);
  return;
}

// Safe to use result.data here
const { price, volume24h } = result.data;
```

## Rate Limits

- DexScreener: 300 requests per minute
- Defined.fi: Depends on your API plan (requires API key)

## Contributing

Contributions are welcome! Please check out our [Contributing Guide](CONTRIBUTING.md).

## License

ISC

## Roadmap

- [ ] Add Defined.fi integration
- [ ] Add historical price data
- [ ] Add trading chart data
- [ ] Support for more chains
- [ ] Batch token lookups
- [ ] Websocket price updates
- [ ] Cache layer for high-frequency queries 