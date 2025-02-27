/// <reference types="jest" />
import { getTokenInfo } from '../index';
import { TokenLookupOptions } from '../types';

describe('Token Lookup Tests', () => {
  const FARTCOIN_ADDRESS = '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump';

  jest.setTimeout(30000); // Increase timeout for API calls

  describe('Fartcoin on Solana', () => {
    it('should fetch Fartcoin info using combined lookup', async () => {
      const result = await getTokenInfo({
        address: FARTCOIN_ADDRESS,
        chainId: 'solana'
      });

      expect(result.success).toBe(true);
      if (result.success && result.data) {
        // Basic token info
        expect(result.data.address).toBe(FARTCOIN_ADDRESS);
        expect(result.data.chainId).toBe('solana');
        expect(result.data.name).toBeDefined();
        expect(result.data.symbol).toBeDefined();
        
        // Price and market data
        expect(result.data.price.usd).toBeGreaterThan(0);
        expect(typeof result.data.price.change24h).toBe('number');
        expect(result.data.marketCap).toBeGreaterThan(0);
        expect(result.data.fdv).toBeGreaterThan(0);
        
        // Volume and liquidity
        expect(result.data.volume24h).toBeGreaterThan(0);
        expect(result.data.liquidity?.usd).toBeGreaterThan(0);

        console.log('Combined Lookup Data:', {
          name: result.data.name,
          symbol: result.data.symbol,
          price: result.data.price.usd,
          priceChange24h: result.data.price.change24h,
          marketCap: result.data.marketCap,
          fdv: result.data.fdv,
          volume24h: result.data.volume24h,
          liquidity: result.data.liquidity?.usd
        });
      }
    });
  });
}); 