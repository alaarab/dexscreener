import { DexScreener } from './dexscreener';

describe('DexScreener', () => {
  const dexScreener = new DexScreener();
  // Example values from the documentation
  const testTokenAddress = 'So11111111111111111111111111111111111111112'; // SOL token
  const testPairAddress = 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN';
  const testChainId = 'solana';

  describe('getTokenProfiles', () => {
    it('should get latest token profiles', async () => {
      const profiles = await dexScreener.getTokenProfiles();
      expect(Array.isArray(profiles)).toBe(true);
      if (profiles.length > 0) {
        const profile = profiles[0];
        expect(profile).toHaveProperty('url');
        expect(profile).toHaveProperty('chainId');
        expect(profile).toHaveProperty('tokenAddress');
        expect(profile).toHaveProperty('icon');
        expect(profile).toHaveProperty('header');
        // links is optional
        if (profile.links) {
          expect(Array.isArray(profile.links)).toBe(true);
          if (profile.links.length > 0) {
            const link = profile.links[0];
            expect(link).toHaveProperty('url');
            // type and label are optional
          }
        }
      }
    });
  });

  describe('getLatestBoosts', () => {
    it('should get latest boosted tokens', async () => {
      const boosts = await dexScreener.getLatestBoosts();
      expect(Array.isArray(boosts)).toBe(true);
      if (boosts.length > 0) {
        const boost = boosts[0];
        expect(boost).toHaveProperty('url');
        expect(boost).toHaveProperty('chainId');
        expect(boost).toHaveProperty('tokenAddress');
        expect(boost).toHaveProperty('totalAmount');
        // These properties are optional
        if (boost.icon) expect(typeof boost.icon).toBe('string');
        if (boost.header) expect(typeof boost.header).toBe('string');
        if (boost.links) {
          expect(Array.isArray(boost.links)).toBe(true);
          if (boost.links.length > 0) {
            const link = boost.links[0];
            expect(link).toHaveProperty('url');
          }
        }
      }
    });
  });

  describe('getTopBoosts', () => {
    it('should get top boosted tokens', async () => {
      const boosts = await dexScreener.getTopBoosts();
      expect(Array.isArray(boosts)).toBe(true);
      if (boosts.length > 0) {
        const boost = boosts[0];
        expect(boost).toHaveProperty('url');
        expect(boost).toHaveProperty('chainId');
        expect(boost).toHaveProperty('tokenAddress');
        expect(boost).toHaveProperty('totalAmount');
        expect(boost).toHaveProperty('icon');
        expect(boost).toHaveProperty('header');
        expect(boost).toHaveProperty('links');
        expect(Array.isArray(boost.links)).toBe(true);
        if (boost.links.length > 0) {
          const link = boost.links[0];
          expect(link).toHaveProperty('url');
          // type and label are optional
        }
      }
    });
  });

  describe('getTokenOrders', () => {
    it('should get token orders', async () => {
      const orders = await dexScreener.getTokenOrders(testChainId, testTokenAddress);
      expect(Array.isArray(orders)).toBe(true);
      if (orders.length > 0) {
        const order = orders[0];
        expect(order).toHaveProperty('paymentTimestamp');
        expect(order).toHaveProperty('type');
        expect(order).toHaveProperty('status');
      }
    });
  });

  describe('searchPairs', () => {
    it('should search for pairs by token address', async () => {
      const pairs = await dexScreener.searchPairs(testTokenAddress, testChainId);
      expect(Array.isArray(pairs)).toBe(true);
      if (pairs.length > 0) {
        const pair = pairs[0];
        expect(pair).toHaveProperty('chainId');
        expect(pair).toHaveProperty('dexId');
        expect(pair).toHaveProperty('url');
        expect(pair).toHaveProperty('pairAddress');
        expect(pair).toHaveProperty('baseToken');
        expect(pair.baseToken).toHaveProperty('address');
        expect(pair.baseToken).toHaveProperty('name');
        expect(pair.baseToken).toHaveProperty('symbol');
        expect(pair).toHaveProperty('quoteToken');
        expect(pair.quoteToken).toHaveProperty('address');
        expect(pair.quoteToken).toHaveProperty('name');
        expect(pair.quoteToken).toHaveProperty('symbol');
        expect(pair).toHaveProperty('priceNative');
        expect(pair).toHaveProperty('priceUsd');
        expect(pair).toHaveProperty('txns');
        expect(pair).toHaveProperty('volume');
        expect(pair).toHaveProperty('priceChange');
        expect(pair).toHaveProperty('liquidity');
        expect(pair.liquidity).toHaveProperty('usd');
        expect(pair.liquidity).toHaveProperty('base');
        expect(pair.liquidity).toHaveProperty('quote');
      }
    });
  });

  describe('getPairs', () => {
    it('should get pairs by token address', async () => {
      const pairs = await dexScreener.getPairs(testTokenAddress, testChainId);
      expect(Array.isArray(pairs)).toBe(true);
      if (pairs.length > 0) {
        const pair = pairs[0];
        expect(pair).toHaveProperty('chainId');
        expect(pair).toHaveProperty('dexId');
        expect(pair).toHaveProperty('url');
        expect(pair).toHaveProperty('pairAddress');
        expect(pair).toHaveProperty('baseToken');
        expect(pair.baseToken).toHaveProperty('address');
        expect(pair.baseToken).toHaveProperty('name');
        expect(pair.baseToken).toHaveProperty('symbol');
        expect(pair).toHaveProperty('quoteToken');
        expect(pair.quoteToken).toHaveProperty('address');
        expect(pair.quoteToken).toHaveProperty('name');
        expect(pair.quoteToken).toHaveProperty('symbol');
        expect(pair).toHaveProperty('priceNative');
        expect(pair).toHaveProperty('priceUsd');
        expect(pair).toHaveProperty('txns');
        expect(pair).toHaveProperty('volume');
        expect(pair).toHaveProperty('priceChange');
        expect(pair).toHaveProperty('liquidity');
        expect(pair.liquidity).toHaveProperty('usd');
        expect(pair.liquidity).toHaveProperty('base');
        expect(pair.liquidity).toHaveProperty('quote');
      }
    });
  });

  describe('getPair', () => {
    it('should get a specific pair by address', async () => {
      const pair = await dexScreener.getPair(testPairAddress, testChainId);
      if (pair) {
        expect(pair).toHaveProperty('chainId');
        expect(pair).toHaveProperty('dexId');
        expect(pair).toHaveProperty('url');
        expect(pair).toHaveProperty('pairAddress');
        expect(pair).toHaveProperty('baseToken');
        expect(pair.baseToken).toHaveProperty('address');
        expect(pair.baseToken).toHaveProperty('name');
        expect(pair.baseToken).toHaveProperty('symbol');
        expect(pair).toHaveProperty('quoteToken');
        expect(pair.quoteToken).toHaveProperty('address');
        expect(pair.quoteToken).toHaveProperty('name');
        expect(pair.quoteToken).toHaveProperty('symbol');
        expect(pair).toHaveProperty('priceNative');
        expect(pair).toHaveProperty('priceUsd');
        expect(pair).toHaveProperty('txns');
        expect(pair).toHaveProperty('volume');
        expect(pair).toHaveProperty('priceChange');
        expect(pair).toHaveProperty('liquidity');
        expect(pair.liquidity).toHaveProperty('usd');
        expect(pair.liquidity).toHaveProperty('base');
        expect(pair.liquidity).toHaveProperty('quote');
      }
    });
  });
}); 