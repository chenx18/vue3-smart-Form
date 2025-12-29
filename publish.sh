#!/bin/bash

# vue3-search-form 发布脚本

echo "🚀 开始发布 vue3-search-form 到 NPM..."
echo ""

# 检查是否已登录
echo "📝 检查 NPM 登录状态..."
npm whoami
if [ $? -ne 0 ]; then
    echo "❌ 未登录 NPM，请先执行 npm login"
    exit 1
fi

echo "✅ NPM 登录状态正常"
echo ""

# 清理缓存
echo "🧹 清理 NPM 缓存..."
npm cache clean --force
echo ""

# 安装依赖
echo "📦 安装依赖..."
npm install
echo ""

# 运行测试（如果有）
echo "🧪 运行测试..."
# npm test

# 构建项目（如果有构建脚本）
echo "🔨 构建项目..."
# npm run build

# 预览发布内容
echo "👀 预览将要发布的文件..."
npm pack --dry-run
echo ""

read -p "确认发布？(y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 取消发布"
    exit 1
fi

# 发布到 NPM
echo "📤 发布到 NPM..."
npm publish

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 发布成功！"
    echo ""
    echo "📦 包信息："
    npm view vue3-search-form
    echo ""
    echo "🔗 访问: https://www.npmjs.com/package/vue3-search-form"
else
    echo ""
    echo "❌ 发布失败，请检查错误信息"
    exit 1
fi
