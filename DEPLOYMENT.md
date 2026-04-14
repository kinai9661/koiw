# AI Image Generator - Cloudflare Pages 部署指南

## 重要提示

這個項目是 Next.js 應用，建議使用 **Cloudflare Pages 的 GitHub 整合**進行部署，而不是使用 Wrangler CLI。

## 推薦部署方式：通過 GitHub

### 步驟 1：連接 GitHub

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 進入 **Pages** > **Create a project**
3. 選擇 **Connect to Git**
4. 授權並選擇倉庫 `kinai9661/koiw`

### 步驟 2：配置構建設置

- **Framework preset**: Next.js
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `/` (保持默認)
- **Node version**: 18 或更高

### 步驟 3：添加環境變量

在 Cloudflare Pages 項目設置中添加以下環境變量：

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
S3_ENDPOINT=https://s3.hi168.com
S3_ACCESS_KEY_ID=V7NOP3CMKS7W1UNBN3B9
S3_SECRET_ACCESS_KEY=mTMvuw8C2cgp462odrwTBCyDtYTdh43KQ4oghSv2
S3_BUCKET_NAME=ai-images
S3_REGION=auto
NEXT_PUBLIC_S3_PUBLIC_URL=https://s3.hi168.com/ai-images
FRENIX_API_URL=https://api.frenix.sh/v1
```

### 步驟 4：部署

點擊 **Save and Deploy**，Cloudflare Pages 會自動構建和部署你的應用。

## 替代方案：Vercel 部署

如果 Cloudflare Pages 遇到問題，可以使用 Vercel：

1. 訪問 [Vercel](https://vercel.com)
2. 導入 GitHub 倉庫 `kinai9661/koiw`
3. Vercel 會自動檢測 Next.js 項目
4. 添加相同的環境變量
5. 部署

## 本地開發

```bash
# 安裝依賴
npm install

# 複製環境變量
cp .env.example .env

# 填入你的配置到 .env

# 運行開發服務器
npm run dev
```

訪問 http://localhost:3000

## 故障排除

### 構建失敗

1. 確保所有環境變量都已正確配置
2. 檢查 Supabase 項目是否已創建
3. 確認 S3 存儲憑證是否正確

### 運行時錯誤

1. 檢查瀏覽器控制台的錯誤信息
2. 確認 API Keys 已在管理後台添加
3. 驗證 Google OAuth 配置是否正確

## 支持

如有問題，請查看：
- [Next.js 文檔](https://nextjs.org/docs)
- [Cloudflare Pages 文檔](https://developers.cloudflare.com/pages/)
- [Supabase 文檔](https://supabase.com/docs)
