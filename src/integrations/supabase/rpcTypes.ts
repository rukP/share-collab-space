
// This file defines types for RPC (Remote Procedure Call) functions in Supabase

export type RpcFunctionName = 'increment_likes' | 'decrement_likes' | 'get_user_team_ids';

export interface RpcParams {
  'increment_likes': { p_project_id: string };
  'decrement_likes': { p_project_id: string };
  'get_user_team_ids': { user_id: string };
}
