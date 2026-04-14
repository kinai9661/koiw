# AI Image Generator

專業的 AI 圖片生成站，支持多模型、多 API Key、中英文界面。

## 功能特色

- ✅ 10 個圖片生成模型支持
- ✅ 多 API Key 輪詢策略
- ✅ 中英文雙語界面
- ✅ Google OAuth 登入
- ✅ 管理後台系統
- ✅ 圖片歷史記錄
- ✅ S3 兼容存儲
- ✅ 完全免費部署

## 技術棧

- **前端**: Next.js 15 + React 19 + Tailwind CSS
- **後端**: Next.js API Routes
- **數據庫**: Supabase PostgreSQL
- **認證**: Supabase Auth (Google OAuth)
- **存儲**: hi168 S3 兼容存儲
- **部署**: Cloudflare Pages
- **國際化**: next-intl

## 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 配置環境變量

複製 `.env.example` 為 `.env` 並填入你的配置：

```bash
cp .env.example .env
```

需要配置的環境變量：
- Supabase URL 和 Keys
- hi168 S3 存儲憑證
- Frenix API URL

### 3. 設置 Supabase

1. 創建 Supabase 項目
2. 在 SQL Editor 中執行 `supabase/schema.sql`
3. 配置 Google OAuth（在 Authentication > Providers）
4. 複製 URL 和 Keys 到 `.env`

### 4. 添加 API Keys

在管理後台添加 Frenix API Keys：
- 登入後訪問 `/admin`
- 點擊「添加 API Key」
- 輸入名稱和密鑰

### 5. 運行開發服務器

```bash
npm run dev
```

訪問 http://localhost:3000

## 部署到 Cloudflare Pages

### 方法一：通過 GitHub

1. 推送代碼到 GitHub
2. 登入 Cloudflare Dashboard
3. 進入 Pages > Create a project
4. 連接 GitHub 倉庫
5. 配置構建設置：
   - 構建命令: `npm run build`
   - 輸出目錄: `.next`
   - Node 版本: 18 或更高
6. 添加環境變量（從 `.env` 複製）
7. 部署

### 方法二：使用 Wrangler CLI

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy .next
```

## 項目結構

```
ai-image-generator/
├── app/
│   ├── api/              # API 路由
│   ├── admin/            # 管理後台
│   ├── history/          # 歷史記錄
│   ├── layout.tsx        # 根布局
│   ├── page.tsx          # 首頁
│   └── globals.css       # 全局樣式
├── components/           # React 組件
├── lib/                  # 工具函數
├── messages/             # 國際化翻譯
├── supabase/             # 數據庫腳本
└── public/               # 靜態資源
```

## 支持的模型

1. ZImage Uncensored
2. Flux Uncensored
3. Qwen Uncensored
4. Imagen 4
5. Flux 2 Pro
6. Flux Klein 4B
7. Flux Klein 9B
8. Nanobanana Pro
9. Nanobanana 2
10. GPT Image 1.5

## API 端點

- `POST /api/generate` - 生成圖片
- `GET /api/models` - 獲取模型列表
- `GET /api/history` - 獲取生成歷史
- `GET /api/admin/stats` - 獲取統計數據（管理員）
- `GET /api/admin/api-keys` - 管理 API Keys（管理員）

## 數據庫表結構

- `user_profiles` - 用戶資料
- `api_keys` - API Keys 管理
- `generations` - 生成記錄
- `settings` - 系統設置

## 多 API Key 策略

系統支持兩種策略：

1. **輪詢策略**（默認）：選擇使用次數最少的 Key
2. **權重隨機**：根據權重隨機選擇

## 安全性

- Row Level Security (RLS) 保護數據
- Google OAuth 認證
- 管理員權限控制
- API Key 加密存儲

## 成本分析

完全免費運行：
- Cloudflare Pages: 免費
- Supabase: 免費（500MB）
- hi168 S3: 根據你的套餐
- 總成本: $0/月（不含 Frenix API 費用）

## 常見問題

### 如何成為管理員？

在 Supabase Dashboard 中手動更新 `user_profiles` 表：

```sql
UPDATE user_profiles 
SET role = 'admin' 
WHERE id = 'your-user-id';
```

### 如何更換存儲服務？

修改 `lib/s3.ts` 中的配置即可，支持任何 S3 兼容服務。

### 如何添加新模型？

在 `lib/models.ts` 中添加新模型配置。

## 授權

MIT License

## 支持

如有問題，請提交 Issue。
