/**
 * vue3-search-form 发布前检查脚本
 * 用法: node pre-publish-check.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 开始发布前检查...\n');

const errors = [];
const warnings = [];

// 检查必需文件
const requiredFiles = [
  'package.json',
  'index.ts',
  'index.vue',
  'types.ts',
  'README.md',
  'LICENSE',
  '.npmignore'
];

console.log('📁 检查必需文件...');
requiredFiles.forEach(file => {
  const filepath = path.join(__dirname, file);
  if (!fs.existsSync(filepath)) {
    errors.push(`缺少必需文件: ${file}`);
  } else {
    console.log(`  ✅ ${file}`);
  }
});

// 检查 package.json
console.log('\n📦 检查 package.json...');
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));

  // 检查必需字段
  const requiredFields = ['name', 'version', 'description', 'main', 'types', 'license'];
  requiredFields.forEach(field => {
    if (!pkg[field]) {
      errors.push(`package.json 缺少字段: ${field}`);
    } else {
      console.log(`  ✅ ${field}: ${pkg[field]}`);
    }
  });

  // 检查版本号格式
  const versionRegex = /^\d+\.\d+\.\d+$/;
  if (!versionRegex.test(pkg.version)) {
    errors.push(`版本号格式不正确: ${pkg.version} (应为 x.y.z 格式)`);
  }

  // 检查 peerDependencies
  if (!pkg.peerDependencies) {
    warnings.push('未定义 peerDependencies');
  } else {
    console.log('  ✅ peerDependencies 已定义');
  }

  // 检查 files 字段
  if (!pkg.files || pkg.files.length === 0) {
    warnings.push('package.json 未定义 files 字段，将发布所有文件');
  } else {
    console.log(`  ✅ files 字段包含 ${pkg.files.length} 个文件`);
  }

  // 检查包名是否已被占用
  try {
    const result = execSync(`npm view ${pkg.name} version`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    console.log(`  ⚠️  包名 ${pkg.name} 已存在，当前版本: ${result.trim()}`);
  } catch (e) {
    console.log(`  ✅ 包名 ${pkg.name} 可用`);
  }

} catch (e) {
  errors.push(`package.json 解析失败: ${e.message}`);
}

// 检查 README.md
console.log('\n📖 检查 README.md...');
try {
  const readme = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');
  if (readme.length < 500) {
    warnings.push('README.md 内容较少，建议补充更多文档');
  } else {
    console.log(`  ✅ README.md 长度: ${readme.length} 字符`);
  }
} catch (e) {
  errors.push('README.md 读取失败');
}

// 检查 .npmignore
console.log('\n🙈 检查 .npmignore...');
try {
  const npmignore = fs.readFileSync(path.join(__dirname, '.npmignore'), 'utf8');
  const ignoredItems = npmignore.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  console.log(`  ✅ .npmignore 忽略 ${ignoredItems.length} 项`);
} catch (e) {
  warnings.push('缺少 .npmignore 文件');
}

// 检查 Git 状态
console.log('\n🔧 检查 Git 状态...');
try {
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  if (status.trim()) {
    warnings.push('Git 工作区有未提交的更改:\n' + status);
  } else {
    console.log('  ✅ Git 工作区干净');
  }
} catch (e) {
  console.log('  ⚠️  不是 Git 仓库或 Git 未安装');
}

// 检查 NPM 登录状态
console.log('\n🔐 检查 NPM 登录状态...');
try {
  const username = execSync('npm whoami', { encoding: 'utf8' }).trim();
  console.log(`  ✅ 已登录为: ${username}`);
} catch (e) {
  errors.push('未登录 NPM，请先执行: npm login');
}

// 输出结果
console.log('\n' + '='.repeat(50));
console.log('📊 检查结果');
console.log('='.repeat(50) + '\n');

if (errors.length > 0) {
  console.log('❌ 发现错误 (必须修复):');
  errors.forEach(err => console.log(`   - ${err}`));
  console.log('');
}

if (warnings.length > 0) {
  console.log('⚠️  发现警告 (建议修复):');
  warnings.forEach(warn => console.log(`   - ${warn}`));
  console.log('');
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ 所有检查通过！可以安全发布。');
  console.log('\n📤 执行发布命令:');
  console.log('   npm publish');
  console.log('\n或使用发布脚本:');
  console.log('   ./publish.sh    (Mac/Linux)');
  console.log('   publish.bat     (Windows)');
} else if (errors.length === 0) {
  console.log('⚠️  存在警告，但可以发布。建议修复后再发布。');
  console.log('\n如需继续发布，请执行:');
  console.log('   npm publish');
} else {
  console.log('❌ 存在错误，请修复后再发布。');
  process.exit(1);
}
