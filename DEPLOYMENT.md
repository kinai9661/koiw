# AI 圖片生成站部署指南

## 推薦部署方式：Vercel

Vercel 是 Next.js 的官方部署平台，提供最佳支持和性能。

### 部署步驟

1. **連接 GitHub**
   - 前往 [Vercel](https://vercel.com)
   - 使用 GitHub 登錄
   - 點擊 "Add New Project"

2. **導入倉庫**
   - 選擇你的 GitHub 倉庫：`kinai9661/koiw`
   - 點擊 "Import"

3. **配置項目**
   - Framework Preset: Next.js（自動檢測）
   - Root Directory: `./`
   - Build Command: `npm run build`（默認）
   - Output Directory: `.next`（默認）

4. **配置環境變量**
   
   在 "Environment Variables" 部分添加以下變量：

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # S3 存儲
   S3_ENDPOINT=https://s3.hi168.com
   S3_ACCESS_KEY_ID=V7NOP3CMKS7W1UNBN3B9
   S3_SECRET_ACCESS_KEY=mTMvuw8C2cgp462odrwTBCyDtYTdh43KQ4oghSv2
   S3_BUCKET_NAME=ai-images
   S3_REGION=auto

   # Frenix API
   FRENIX_API_URL=https://api.frenix.sh/v1
   ```

5. **部署**
   - 點擊 "Deploy"
   - 等待構建完成（約 2-3 分鐘）
   - 獲取部署 URL

## 替代方案：Cloudflare Pages

**重要提示**：Cloudflare Pages 對 Next.js 的支持有限，強烈推薦使用 Vercel。

如果仍要使用 Cloudflare Pages，請通過 GitHub 集成部署：

1. 前往 [Cloudflare Pages](https://pages.cloudflare.com)
2. 連接 GitHub 並選擇倉庫 `kinai9661/koiw`
3. 配置構建設置：
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Node.js 版本：18+
4. 添加環境變量（同上）
5. 點擊 "Save and Deploy"

**已知限制**：
- 某些 Next.js 功能可能無法正常工作
- API 路由可能需要額外配置
- 建議使用 Vercel 以獲得完整功能支持

## 部署後設置

### 1. 設置 Supabase

1. **創建 Supabase 項目**：
   - 前往 [Supabase](https://supabase.com)
   - 創建新項目
   - 記錄項目 URL 和 API Keys

2. **執行數據庫腳本**：
   - 打開 SQL 編輯器
   - 複製 `supabase/schema.sql` 內容
   - 執行腳本

3. **配置 Google OAuth**：
   - 前往 Authentication > Providers
   - 啟用 Google
   - 配置回調 URL：`https://your-domain.com/auth/callback`
   - 在 [Google Cloud Console](https://console.cloud.google.com) 創建 OAuth 憑證

### 2. 添加 API Keys

1. 訪問管理後台：`https://your-domain.com/admin`
2. 使用 Google 登錄
3. 添加 Frenix API Keys：
   - 點擊 "添加 API Key"
   - 輸入 Key 名稱和值
   - 設置權重（用於負載均衡）
   - 保存

### 3. 測試功能

1. 訪問首頁：`https://your-domain.com`
2. 選擇圖片模型
3. 輸入提示詞（中文或英文）
4. 點擊生成
5. 查看生成的圖片

## 故障排除

### 構建失敗

**問題**：`supabaseUrl is required`
- **原因**：環境變量未配置
- **解決**：在部署平台添加所有必需的環境變量

**問題**：TypeScript 類型錯誤
- **原因**：依賴版本不匹配
- **解決**：檢查 `package.json` 中的依賴版本

### 運行時錯誤

**問題**：無法連接 Supabase
- **檢查**：環境變量是否正確
- **檢查**：Supabase 項目是否已創建
- **檢查**：數據庫腳本是否已執行

**問題**：圖片上傳失敗
- **檢查**：S3 憑證是否正確
- **檢查**：存儲桶是否存在
- **檢查**：存儲桶權限設置

**問題**：API Key 錯誤
- **檢查**：是否已在管理後台添加 API Keys
- **檢查**：API Keys 是否處於啟用狀態
- **檢查**：Frenix API 是否可訪問

### 圖片無法顯示

**問題**：圖片 URL 404
- **檢查**：S3 存儲桶公開訪問設置
- **檢查**：圖片是否成功上傳
- **檢查**：URL 格式是否正確

**問題**：CORS 錯誤
- **檢查**：S3 存儲桶 CORS 配置
- **解決**：添加允許的來源域名

## 本地開發

```bash
# 安裝依賴
npm install

# 複製環境變量
cp .env.example .env

# 編輯 .env 文件，填入你的配置

# 運行開發服務器
npm run dev
```

訪問 http://localhost:3000

## 性能優化

1. **啟用 Vercel Analytics**
   - 在項目設置中啟用
   - 監控性能指標

2. **配置 CDN 緩存**
   - 圖片使用 S3 CDN
   - 靜態資源自動緩存

3. **數據庫優化**
   - 定期清理舊記錄
   - 添加適當的索引

## 監控和維護

1. **查看日誌**
   - Vercel：項目 > Deployments > 選擇部署 > Logs
   - Supabase：項目 > Logs

2. **監控使用量**
   - API Keys 使用統計
   - 圖片生成數量
   - 存儲空間使用

3. **定期更新**
   - 更新依賴包
   - 檢查安全漏洞
   - 備份數據庫

## 支持

如有問題，請查看：
- [Next.js 文檔](https://nextjs.org/docs)
- [Vercel 文檔](https://vercel.com/docs)
- [Supabase 文檔](https://supabase.com/docs)
- [Cloudflare Pages 文檔](https://developers.cloudflare.com/pages/)
