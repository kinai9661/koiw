import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { uploadImageToS3 } from '@/lib/s3';
import { getAvailableApiKey, incrementApiKeyUsage } from '@/lib/api-keys';

export async function POST(req: NextRequest) {
  try {
    const { model, prompt, size = '1024x1024' } = await req.json();
    
    if (!model || !prompt) {
      return NextResponse.json(
        { error: 'Model and prompt are required' },
        { status: 400 }
      );
    }
    
    // 獲取當前用戶
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // 獲取可用的 API Key
    const apiKey = await getAvailableApiKey();
    
    // 調用 Frenix API 生成圖片
    const response = await fetch(`${process.env.FRENIX_API_URL}/images/generations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        n: 1,
        size,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || 'Image generation failed');
    }
    
    const result = await response.json();
    const imageUrl = result.data[0].url;
    
    // 下載圖片
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to download image');
    }
    
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    
    // 上傳到 S3
    const s3Url = await uploadImageToS3(
      imageBuffer,
      `${user.id}-${Date.now()}.png`,
      'image/png'
    );
    
    // 保存記錄到數據庫
    const { data: generation, error: dbError } = await supabase
      .from('generations')
      .insert({
        user_id: user.id,
        model,
        prompt,
        image_url: s3Url,
        api_key_id: apiKey.id,
      })
      .select()
      .single();
    
    if (dbError) {
      throw new Error('Failed to save generation record');
    }
    
    // 更新 API Key 使用次數
    await incrementApiKeyUsage(apiKey.id);
    
    return NextResponse.json({
      success: true,
      data: generation,
    });
    
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    );
  }
}
