@echo off
REM vue3-search-form Windows 发布脚本

echo ========================================
echo vue3-search-form NPM 发布工具
echo ========================================
echo.

REM 检查是否已登录
echo [1/5] 检查 NPM 登录状态...
npm whoami
if %errorlevel% neq 0 (
    echo.
    echo ❌ 未登录 NPM，请先执行: npm login
    pause
    exit /b 1
)
echo ✅ 登录状态正常
echo.

REM 清理缓存
echo [2/5] 清理 NPM 缓存...
npm cache clean --force
echo ✅ 缓存已清理
echo.

REM 安装依赖
echo [3/5] 检查依赖...
npm install
if %errorlevel% neq 0 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)
echo ✅ 依赖正常
echo.

REM 预览发布内容
echo [4/5] 预览将要发布的文件...
npm pack --dry-run
echo.

REM 确认发布
set /p confirm="确认发布？ (y/n): "
if /i not "%confirm%"=="y" (
    echo ❌ 取消发布
    pause
    exit /b 1
)
echo.

REM 发布到 NPM
echo [5/5] 发布到 NPM...
npm publish
if %errorlevel% neq 0 (
    echo.
    echo ❌ 发布失败，请检查错误信息
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ 发布成功！
echo ========================================
echo.
echo 📦 包信息：
npm view vue3-search-form
echo.
echo 🔗 访问: https://www.npmjs.com/package/vue3-search-form
echo.
pause
