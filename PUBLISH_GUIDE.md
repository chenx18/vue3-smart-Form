# NPM 发布指南

## 发布前检查清单

### 1. 更新版本号
```bash
# 使用 npm version 自动更新版本号和 git tag
npm version patch  # 1.0.0 -> 1.0.1 (修复 bug)
npm version minor  # 1.0.0 -> 1.1.0 (新增功能)
npm version major  # 1.0.0 -> 2.0.0 (破坏性更新)
```

### 2. 检查文件完整性
确保以下文件存在且正确：
- ✅ package.json (版本号、描述、关键词等)
- ✅ index.ts (组件入口)
- ✅ index.vue (主组件)
- ✅ types.ts (类型定义)
- ✅ README.md (使用文档)
- ✅ LICENSE (开源协议)
- ✅ .npmignore (排除不需要发布的文件)

### 3. 测试组件
```bash
# 本地测试组件是否正常工作
npm run example
```

## 发布步骤

### 1. 登录 NPM
```bash
# 如果还没登录，先登录
npm login

# 输入用户名、密码、邮箱
```

### 2. 检查当前登录用户
```bash
npm whoami
```

### 3. 预览将要发布的内容
```bash
# 查看将要发布的文件列表（不会实际发布）
npm pack --dry-run
```

### 4. 执行发布
```bash
# 正式发布到 NPM
npm publish

# 如果是首次发布 scoped 包（@username/package-name）
npm publish --access public
```

### 5. 验证发布
发布成功后，访问以下链接验证：
- NPM 包页面：https://www.npmjs.com/package/vue3-search-form
- 或运行命令：`npm view vue3-search-form`

## 常用 NPM 命令

```bash
# 查看包信息
npm view vue3-search-form

# 查看包的所有版本
npm view vue3-search-form versions

# 查看远程最新版本
npm view vue3-search-form version

# 撤销已发布的版本（慎用！24小时内可撤销）
npm unpublish vue3-search-form@1.0.0

# 废弃某个版本（推荐替代 unpublish）
npm deprecate vue3-search-form@1.0.0 "该版本存在 bug，请升级到 1.0.1"
```

## 发布后工作

### 1. 推送 Git 标签
```bash
git push --tags
```

### 2. 更新 CHANGELOG.md
在 CHANGELOG.md 中记录本次发布的内容：
```markdown
## [1.0.0] - 2025-12-29

### 新增
- 初始版本发布
- 支持多种表单类型（Input、Select、Date等）
- 支持配置驱动和响应式布局
```

### 3. 更新 GitHub README
在 GitHub 仓库的 README 中添加 NPM 徽章：
```markdown
npm: ![npm](https://badge.fury.io/js/vue3-search-form.svg)
```

## 注意事项

### 版本号规范 (Semantic Versioning)
- **主版本号 (Major)**: 不兼容的 API 修改
- **次版本号 (Minor)**: 向下兼容的功能性新增
- **修订号 (Patch)**: 向下兼容的问题修正

示例：`1.0.0` -> `1.0.1` -> `1.1.0` -> `2.0.0`

### 常见错误及解决

#### 错误 1: 包名已存在
```
npm ERR! 403 403 Forbidden - PUT https://registry.npmjs.org/vue3-search-form
```
**解决**：更换包名，例如 `@yourusername/vue3-search-form`

#### 错误 2: 邮箱未验证
```
npm ERR! 403 Your email hasn't been verified
```
**解决**：访问 NPM 官网验证邮箱

#### 错误 3: 需要使用 scope
```
npm ERR! 403 You must provide a scoped package name
```
**解决**：使用 scoped 包名或在 package.json 中添加 `"publishConfig": { "access": "public" }`

## 本地测试

在发布到 NPM 前，可以在本地测试：

```bash
# 1. 打包成 tarball
npm pack

# 2. 在测试项目中安装本地包
npm install ../vue3-search-form-1.0.0.tgz

# 3. 或者使用 npm link
cd /path/to/vue3-search-form
npm link

cd /path/to/test-project
npm link vue3-search-form
```

## 自动化发布（可选）

可以使用 GitHub Actions 或其他 CI/CD 工具自动化发布流程：

```yaml
# .github/workflows/publish.yml
name: Publish to NPM

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## 最佳实践

1. **使用语义化版本控制**
2. **为每个版本创建 Git 标签**
3. **及时更新 CHANGELOG**
4. **发布前充分测试**
5. **使用 `.npmignore` 排除不必要的文件**
6. **添加单元测试和覆盖率报告**
7. **提供清晰的文档和示例**
8. **及时响应 issue 和 PR**

## 参考资源

- [NPM 官方文档](https://docs.npmjs.com/)
- [语义化版本规范](https://semver.org/lang/zh-CN/)
- [package.json 配置说明](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
