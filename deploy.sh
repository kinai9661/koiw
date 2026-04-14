#!/bin/bash

echo "🚀 部署到 Cloudflare Pages"
echo ""

# 檢查是否安裝了 wrangler
if ! command -v wrangler &> /dev/null
then
    echo "❌ Wrangler 未安裝"
    echo "請運行: npm install -g wrangler"
    exit 1
fi

# 構建項目
echo "📦 構建項目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 構建失敗"
    exit 1
fi

# 部署
echo "🌐 部署到 Cloudflare Pages..."
wrangler pages deploy .next

echo ""
echo "✅ 部署完成！"
