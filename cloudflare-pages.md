# Cloudflare Pages 部署配置

## 重要說明

此項目已成功構建，但 Cloudflare Pages 對 Next.js 的支持有限。建議使用 Vercel 部署以獲得最佳體驗。

## Cloudflare Pages 部署步驟

### 1. 通過 Cloudflare Dashboard 部署

1. **登入 Cloudflare**
   - 訪問 https://dash.cloudflare.com
   - 進入 "Workers & Pages"

2. **創建 Pages 項目**
   - 點擊 "Create application"
   - 選擇 "Pages"
   - 點擊 "Connect to Git"

3. **連接 GitHub**
   - 授權 Cloudflare 訪問你的 GitHub
   - 選擇倉庫：`kinai9661/koiw`

4. **配置構建設置**
   ```
   Project name: ai-image-generator (或自定義名稱)
   Production branch: main
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: .next
   Root directory: /
   ```

5. **環境變量**
   
   在 "Environment variables" 部分添加：
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   S3_ENDPOINT=https://s3.hi168.com
   S3_ACCESS_KEY_ID=V7NOP3CMKS7W1UNBN3B9
   S3_SECRET_ACCESS_KEY=mTMvuw8C2cgp462odrwTBCyDtYTdh43KQ4oghSv2
   S3_BUCKET_NAME=ai-images
   S3_REGION=auto
   FRENIX_API_URL=https://api.frenix.sh/v1
   ```

6. **部署**
   - 點擊 "Save and Deploy"
   - 等待構建完成

## 已知限制

Cloudflare Pages 對 Next.js 的支持有以下限制：

1. **API 路由限制**
   - 某些 Next.js API 路由功能可能無法正常工作
   - 動態路由可能需要額外配置

2. **中間件限制**
   - Next.js 中間件可能無法完全支持
   - 認證流程可能需要調整

3. **圖片優化**
   - Next.js Image 組件的優化功能可能受限

## 推薦替代方案

如果遇到問題，強烈建議使用 **Vercel**：

1. 訪問 https://vercel.com
2. 導入 GitHub 倉庫 `kinai9661/koiw`
3. 添加相同的環境變量
4. 部署

Vercel 是 Next.js 的官方平台，提供完整功能支持。

## 故障排除

### 構建成功但運行時錯誤

如果構建成功但網站無法正常運行：

1. **檢查環境變量**
   - 確保所有環境變量都已添加
   - 檢查變量名稱是否正確

2. **查看函數日誌**
   - 在 Cloudflare Dashboard 中查看 Functions 日誌
   - 檢查 API 路由錯誤

3. **考慮使用 Vercel**
   - 如果問題持續，建議切換到 Vercel

### API 路由 404 錯誤

Cloudflare Pages 可能無法正確處理 Next.js API 路由：

1. 檢查 Functions 是否已啟用
2. 查看 `_worker.js` 是否正確生成
3. 考慮使用 Vercel 或將 API 部署為獨立的 Cloudflare Workers

## 部署後配置

無論使用哪個平台，部署後都需要：

1. **設置 Supabase**
   - 創建項目並執行 `supabase/schema.sql`
   - 配置 Google OAuth

2. **添加 API Keys**
   - 訪問 `/admin` 頁面
   - 添加 Frenix API Keys

3. **測試功能**
   - 測試圖片生成
   - 檢查歷史記錄
   - 驗證管理功能

詳細步驟請參考 `DEPLOYMENT.md`。
