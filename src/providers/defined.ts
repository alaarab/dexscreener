import axios from 'axios';
import { TokenData, TokenLookupOptions, TokenLookupResponse } from '../types';

const DEFINED_API_URL = 'https://api.defined.fi/api/v0/tokens';

export async function getDefinedTokenInfo(options: TokenLookupOptions): Promise<TokenLookupResponse> {
  try {
    // Note: Defined.fi requires an API key
    if (!process.env.DEFINED_API_KEY) {
      return {
        success: false,
        error: 'Defined API key not found in environment variables'
      };
    }

    const response = await axios.get(`${DEFINED_API_URL}/${options.address}`, {
      headers: {
        'X-API-KEY': process.env.DEFINED_API_KEY
      }
    });

    if (!response.data || !response.data.data) {
      return {
        success: false,
        error: 'Token not found on Defined'
      };
    }

    const tokenInfo = response.data.data;
    
    const tokenData: TokenData = {
      symbol: tokenInfo.symbol,
      name: tokenInfo.name,
      address: options.address,
      chainId: tokenInfo.chain_id,
      decimals: tokenInfo.decimals,
      price: {
        usd: tokenInfo.price_usd,
        change24h: tokenInfo.price_change_24h
      },
      volume24h: tokenInfo.volume_24h,
      liquidity: {
        usd: tokenInfo.liquidity_usd
      },
      lastUpdated: new Date(),
      source: 'defined'
    };

    return {
      success: true,
      data: tokenData
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
} 