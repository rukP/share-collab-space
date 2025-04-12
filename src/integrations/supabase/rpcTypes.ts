
// This file defines types for RPC (Remote Procedure Call) functions in Supabase

// Define the available RPC function names
export type RpcFunctionName = 'increment_likes' | 'decrement_likes' | 'get_user_team_ids';

// Define parameter types for each RPC function
export interface RpcParams {
  'increment_likes': { p_project_id: string };
  'decrement_likes': { p_project_id: string };
  'get_user_team_ids': { user_id: string };
}

/**
 * Type-safe RPC function caller
 */
export function typedRpc<T extends RpcFunctionName>(
  functionName: T,
  params: RpcParams[T]
) {
  return {
    functionName,
    params,
  };
}
