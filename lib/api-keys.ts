import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase environment variables are not configured');
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export interface ApiKey {
  id: string;
  key: string;
  name: string;
  is_active: boolean;
  weight: number;
  usage_count: number;
  created_at: string;
}

// 輪詢策略：選擇使用次數最少的 API Key
export async function getAvailableApiKey(): Promise<ApiKey> {
  const supabase = getSupabaseClient();
  const { data: keys, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('is_active', true)
    .order('usage_count', { ascending: true })
    .limit(1);
  
  if (error || !keys || keys.length === 0) {
    throw new Error('沒有可用的 API Key');
  }
  
  return keys[0];
}

// 權重隨機策略
export async function getWeightedRandomApiKey(): Promise<ApiKey> {
  const supabase = getSupabaseClient();
  const { data: keys, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('is_active', true);
  
  if (error || !keys || keys.length === 0) {
    throw new Error('沒有可用的 API Key');
  }
  
  const totalWeight = keys.reduce((sum, key) => sum + key.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const key of keys) {
    random -= key.weight;
    if (random <= 0) {
      return key;
    }
  }
  
  return keys[0];
}

// 更新 API Key 使用次數
export async function incrementApiKeyUsage(keyId: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.rpc('increment_api_key_usage', {
    key_id: keyId,
  });
  
  if (error) {
    // 如果 RPC 不存在，使用普通更新
    const { data: key } = await supabase
      .from('api_keys')
      .select('usage_count')
      .eq('id', keyId)
      .single();
    
    if (key) {
      await supabase
        .from('api_keys')
        .update({ usage_count: key.usage_count + 1 })
        .eq('id', keyId);
    }
  }
}
