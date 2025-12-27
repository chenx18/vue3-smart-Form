# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2025-12-27

### Added
- 🎉 首次发布 vue3-smart-form 组件
- ✨ 支持多种表单类型：Input、InputNumber、Select、Date、DateRange、DateTime、DateTimeRange、Slot
- ✨ 支持对象和数组两种配置格式
- ✨ 支持自定义按钮配置（配置形式 + 插槽形式）
- ✨ 支持响应式换行（根据屏幕宽度自动换行）
- ✨ 完全透明的原生事件传递机制
- ✨ 支持所有 Element Plus 原生属性和事件（三级支持：formProps、itemProps、props）
- ✨ 完整的 TypeScript 类型定义
- 📝 完善的文档和使用示例

### Design Philosophy
- 🎯 纯配置驱动，API 简洁统一
- 🎯 只保留元数据作为顶级属性，原生属性统一通过 props 配置
- 🎯 完全兼容 Element Plus，无学习成本

### Features
- 配置驱动式表单生成
- 双格式配置支持（对象/数组）
- 自定义插槽扩展
- 按钮灵活配置（配置/插槽/混合）
- 动态显示/隐藏表单项
- 表单联动支持
- 响应式布局
- 事件透明传递
