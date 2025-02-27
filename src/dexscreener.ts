import axios from 'axios';
import { TokenProfile, TokenBoost, TokenOrder, DexScreenerPair, DexScreenerSearchResponse } from './types';

/** Base URL for the DexScreener API */
const DEXSCREENER_BASE_URL = 'https://api.dexscreener.com';

/**
 * DexScreener API wrapper
 * Provides methods to interact with the DexScreener API for retrieving token and pair information
 * 
 * @example
 * ```typescript
 * const dexscreener = new DexScreener();
 * 
 * // Search for pairs
 * const pairs = await dexscreener.searchPairs('SOL', 'solana');
 * 
 * // Get specific pair
 * const pair = await dexscreener.getPair('pairAddress', 'solana');
 * 
 * // Get token profiles
 * const profiles = await dexscreener.getTokenProfiles();
 * ```
 */
export class DexScreener {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = DEXSCREENER_BASE_URL;
  }

  /**
   * Get the latest token profiles
   * Rate limit: 60 requests per minute
   * 
   * @returns Promise<TokenProfile[]> Array of token profiles
   * @throws Error if the API request fails
   * 
   * @example
   * ```typescript
   * const profiles = await dexscreener.getTokenProfiles();
   * console.log(profiles[0].header); // "Solana (SOL)"
   * ```
   */
  async getTokenProfiles(): Promise<TokenProfile[]> {
    try {
      const response = await axios.get<TokenProfile[]>(`${this.baseUrl}/token-profiles/latest/v1`);
      return response.data;
    } catch (error) {
      console.error('DexScreener token profiles error:', error);
      throw error;
    }
  }

  /**
   * Get the latest boosted tokens
   * Rate limit: 60 requests per minute
   * 
   * @returns Promise<TokenBoost[]> Array of token boosts
   * @throws Error if the API request fails
   * 
   * @example
   * ```typescript
   * const boosts = await dexscreener.getLatestBoosts();
   * console.log(boosts[0].totalAmount); // 1000
   * ```
   */
  async getLatestBoosts(): Promise<TokenBoost[]> {
    try {
      const response = await axios.get<TokenBoost[]>(`${this.baseUrl}/token-boosts/latest/v1`);
      return response.data;
    } catch (error) {
      console.error('DexScreener token boosts error:', error);
      throw error;
    }
  }

  /**
   * Get the tokens with most active boosts
   * Rate limit: 60 requests per minute
   * 
   * @returns Promise<TokenBoost[]> Array of token boosts
   * @throws Error if the API request fails
   * 
   * @example
   * ```typescript
   * const topBoosts = await dexscreener.getTopBoosts();
   * console.log(topBoosts[0].totalAmount); // 5000
   * ```
   */
  async getTopBoosts(): Promise<TokenBoost[]> {
    try {
      const response = await axios.get<TokenBoost[]>(`${this.baseUrl}/token-boosts/top/v1`);
      return response.data;
    } catch (error) {
      console.error('DexScreener top boosts error:', error);
      throw error;
    }
  }

  /**
   * Check orders paid for of token
   * Rate limit: 60 requests per minute
   * 
   * @param chainId The chain ID (e.g., 'solana', 'ethereum')
   * @param tokenAddress The token address to get orders for
   * @returns Promise<TokenOrder[]> Array of token orders
   * @throws Error if the API request fails
   * 
   * @example
   * ```typescript
   * const orders = await dexscreener.getTokenOrders('solana', 'So11111111111111111111111111111111111111112');
   * console.log(orders[0].status); // "processing"
   * ```
   */
  async getTokenOrders(chainId: string, tokenAddress: string): Promise<TokenOrder[]> {
    try {
      const response = await axios.get<TokenOrder[]>(`${this.baseUrl}/orders/v1/${chainId}/${tokenAddress}`);
      return response.data;
    } catch (error) {
      console.error('DexScreener orders error:', error);
      throw error;
    }
  }

  /**
   * Search for pairs matching query
   * Rate limit: 300 requests per minute
   * 
   * @param query The search query (token address, symbol, or name)
   * @param chainId Optional chain ID to filter results
   * @returns Promise<DexScreenerPair[]> Array of matching pairs
   * @throws Error if the API request fails
   * 
   * @example
   * ```typescript
   * // Search by token symbol
   * const solPairs = await dexscreener.searchPairs('SOL', 'solana');
   * 
   * // Search by token address
   * const pairs = await dexscreener.searchPairs('So11111111111111111111111111111111111111112');
   * ```
   */
  async searchPairs(query: string, chainId?: string): Promise<DexScreenerPair[]> {
    try {
      const endpoint = chainId 
        ? `/latest/dex/search?q=${query}&chain=${chainId}`
        : `/latest/dex/search?q=${query}`;
      
      const response = await axios.get<DexScreenerSearchResponse>(`${this.baseUrl}${endpoint}`);
      return response.data.pairs;
    } catch (error) {
      console.error('DexScreener search error:', error);
      throw error;
    }
  }

  /**
   * Get pairs by token address
   * Rate limit: 300 requests per minute
   * 
   * @param tokenAddress The token address to get pairs for
   * @param chainId The chain ID (required)
   * @returns Promise<DexScreenerPair[]> Array of pairs
   * @throws Error if the API request fails or chainId is not provided
   * 
   * @example
   * ```typescript
   * const pairs = await dexscreener.getPairs('So11111111111111111111111111111111111111112', 'solana');
   * console.log(pairs[0].priceUsd); // "20.50"
   * ```
   */
  async getPairs(tokenAddress: string, chainId: string): Promise<DexScreenerPair[]> {
    try {
      if (!chainId) {
        throw new Error('chainId is required for getPairs');
      }
      
      const response = await axios.get<DexScreenerSearchResponse>(`${this.baseUrl}/latest/dex/search?q=${tokenAddress}&chain=${chainId}`);
      return response.data.pairs;
    } catch (error) {
      console.error('DexScreener getPairs error:', error);
      throw error;
    }
  }

  /**
   * Get a specific pair by its address
   * Rate limit: 300 requests per minute
   * 
   * @param pairAddress The pair address to get
   * @param chainId The chain ID (required)
   * @returns Promise<DexScreenerPair | null> The pair information or null if not found
   * 
   * @example
   * ```typescript
   * const pair = await dexscreener.getPair('JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', 'solana');
   * if (pair) {
   *   console.log(pair.baseToken.symbol); // "SOL"
   *   console.log(pair.quoteToken.symbol); // "USDC"
   * }
   * ```
   */
  async getPair(pairAddress: string, chainId: string): Promise<DexScreenerPair | null> {
    try {
      const response = await axios.get<DexScreenerSearchResponse>(`${this.baseUrl}/latest/dex/pairs/${chainId}/${pairAddress}`);
      return response.data.pairs[0] || null;
    } catch (error) {
      console.error('DexScreener getPair error:', error);
      return null;
    }
  }
} 