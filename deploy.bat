@echo off
echo 🚀 部署到 Cloudflare Pages
echo.

REM 檢查是否安裝了 wrangler
where wrangler >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Wrangler 未安裝
    echo 請運行: npm install -g wrangler
    exit /b 1
)

REM 構建項目
echo 📦 構建項目...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ 構建失敗
    exit /b 1
)

REM 部署
echo 🌐 部署到 Cloudflare Pages...
call wrangler pages deploy .next

echo.
echo ✅ 部署完成！
