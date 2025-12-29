# vue3-search-form 快速发布指南

## 📋 发布前检查清单

- [ ] 已登录 NPM (`npm login`)
- [ ] 已运行检查脚本 (`npm run check`)
- [ ] 版本号已更新
- [ ] README.md 已完善
- [ ] CHANGELOG.md 已更新
- [ ] 所有更改已提交到 Git

## 🚀 快速发布

### 方法 1: 使用 npm scripts (推荐)

```bash
# 检查包完整性
npm run check

# 发布补丁版本 (1.0.0 -> 1.0.1)
npm run pub:patch

# 发布次版本 (1.0.0 -> 1.1.0)
npm run pub:minor

# 发布主版本 (1.0.0 -> 2.0.0)
npm run pub:major

# 普通发布（不自动升级版本）
npm run pub
```

### 方法 2: 使用发布脚本

**Windows:**
```bash
publish.bat
```

**Mac/Linux:**
```bash
chmod +x publish.sh
./publish.sh
```

### 方法 3: 手动发布

```bash
# 1. 更新版本号
npm version patch  # 或 minor/major

# 2. 发布
npm publish

# 3. 推送标签到 GitHub
git push --tags
```

## 📝 版本号规则

- **patch** (1.0.0 -> 1.0.1): 修复 bug
- **minor** (1.0.0 -> 1.1.0): 新增功能
- **major** (1.0.0 -> 2.0.0): 破坏性更新

## 🔍 验证发布

```bash
# 查看包信息
npm view vue3-search-form

# 访问 NPM 页面
# https://www.npmjs.com/package/vue3-search-form
```

## 🛠️ 常用命令

```bash
# 预览将要发布的文件
npm pack --dry-run

# 打包成 tarball (本地测试用)
npm pack

# 查看包的所有版本
npm view vue3-search-form versions

# 撤销版本 (24小时内)
npm unpublish vue3-search-form@1.0.0

# 废弃版本
npm deprecate vue3-search-form@1.0.0 "该版本存在bug"
```

## ⚠️ 注意事项

1. **首次发布**：确保 `package.json` 中有 `"publishConfig": { "access": "public" }`
2. **版本号**：遵循语义化版本规范 (Semantic Versioning)
3. **文件过滤**：检查 `.npmignore` 确保不会发布敏感文件
4. **依赖管理**：peerDependencies 不要放在 dependencies 中
5. **Git 标签**：发布后推送标签到 GitHub

## 📚 相关文档

- [完整发布指南](./PUBLISH_GUIDE.md)
- [NPM 官方文档](https://docs.npmjs.com/)
- [语义化版本](https://semver.org/lang/zh-CN/)
