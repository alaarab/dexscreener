import { TokenLookupOptions, TokenLookupResponse } from './types';
import { getDexScreenerTokenInfo } from './providers/dexscreener';
import { getDefinedTokenInfo } from './providers/defined';

export * from './types';
export { getDexScreenerTokenInfo } from './providers/dexscreener';
export { getDefinedTokenInfo } from './providers/defined';

export async function getTokenInfo(options: TokenLookupOptions): Promise<TokenLookupResponse> {
  // Try DexScreener first
  const dexScreenerResult = await getDexScreenerTokenInfo(options);
  if (dexScreenerResult.success) {
    return dexScreenerResult;
  }

  // If DexScreener fails, try Defined
  const definedResult = await getDefinedTokenInfo(options);
  return definedResult;
} 