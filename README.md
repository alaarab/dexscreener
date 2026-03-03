# DexScreener API Wrapper

A lightweight TypeScript wrapper for the DexScreener API.

## Installation

```bash
npm install dexscreener-wrapper
```

## Usage

```typescript
import { DexScreener } from 'dexscreener-wrapper';

const dexscreener = new DexScreener();

// Search for pairs
const pairs = await dexscreener.searchPairs('SOL', 'solana');
console.log(`Found ${pairs.length} pairs`);
console.log(`SOL price: $${pairs[0].priceUsd}`);

// Get specific pair
const pair = await dexscreener.getPair('JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', 'solana');
if (pair) {
  console.log(`24h volume: $${pair.volume.h24}`);
  console.log(`Liquidity: $${pair.liquidity.usd}`);
}

// Get token profiles
const profiles = await dexscreener.getTokenProfiles();
console.log(`Latest token: ${profiles[0].header}`);
```

## API Methods

### Token Information

```typescript
// Get latest token profiles
const profiles = await dexscreener.getTokenProfiles();

// Get token orders
const orders = await dexscreener.getTokenOrders('solana', 'tokenAddress');
```

### Token Boosts

```typescript
// Get latest boosted tokens
const latestBoosts = await dexscreener.getLatestBoosts();

// Get top boosted tokens
const topBoosts = await dexscreener.getTopBoosts();
```

### Pairs and Trading

```typescript
// Search pairs (supports token address, symbol, or name)
const searchResults = await dexscreener.searchPairs('SOL', 'solana');

// Get specific pair
const pair = await dexscreener.getPair('pairAddress', 'solana');

// Get pairs by token
const pairs = await dexscreener.getPairs('tokenAddress', 'solana');
```

## Rate Limits

DexScreener API has the following rate limits:
- Token profiles, boosts, orders: 60 requests per minute
- Pairs and search endpoints: 300 requests per minute

## Error Handling

Most methods throw on failure. `getPair` returns `null` if the pair is not found.

```typescript
try {
  const pairs = await dexscreener.searchPairs('SOL', 'solana');
} catch (error) {
  console.error('Failed to search pairs:', error);
}

const pair = await dexscreener.getPair('invalidAddress', 'solana');
if (pair === null) {
  console.log('Pair not found or error occurred');
}
```

## License

ISC
