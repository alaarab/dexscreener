/// <reference types="jest" />
import { getTokenInfo } from '../index';
import { TokenLookupOptions } from '../types';

describe('Solana Token Tests', () => {
  jest.setTimeout(30000); // Set timeout to 30 seconds for API calls

  it('should fetch FartCoin token information', async () => {
    const options: TokenLookupOptions = {
      address: '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump',
      chainId: 'solana'
    };

    const result = await getTokenInfo(options);
    
    expect(result.success).toBe(true);
    if (result.success && result.data) {
      // Basic token info
      expect(result.data.address).toBe(options.address);
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

      // Log token information for verification
      console.log('Token Information:', {
        name: result.data.name,
        symbol: result.data.symbol,
        price: result.data.price.usd,
        priceChange24h: result.data.price.change24h,
        marketCap: result.data.marketCap,
        fdv: result.data.fdv,
        volume24h: result.data.volume24h,
        liquidity: result.data.liquidity?.usd
      });
    } else {
      fail(`API call failed: ${result.error}`);
    }
  });
}); 