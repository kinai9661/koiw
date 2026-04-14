import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkAdmin(userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', userId)
    .single();
  
  return data?.role === 'admin';
}

export async function GET(req: NextRequest) {
  try {
    const supabaseClient = await (await import('@/lib/supabase/server')).createClient();
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user || !(await checkAdmin(user.id))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // 獲取統計數據
    const { count: totalGenerations } = await supabase
      .from('generations')
      .select('*', { count: 'exact', head: true });
    
    const { count: totalUsers } = await supabase
      .from('user_profiles')
      .select('*', { count: 'exact', head: true });
    
    const { data: apiKeys } = await supabase
      .from('api_keys')
      .select('usage_count');
    
    const totalApiCalls = apiKeys?.reduce((sum, key) => sum + key.usage_count, 0) || 0;
    
    // 獲取最近生成記錄
    const { data: recentGenerations } = await supabase
      .from('generations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    
    return NextResponse.json({
      success: true,
      data: {
        totalGenerations,
        totalUsers,
        totalApiCalls,
        recentGenerations,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
