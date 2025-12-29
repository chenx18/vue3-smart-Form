# vue3-search-form

<div align="center">

![npm](https://badge.fury.io/js/vue3-search-form.svg)
![license](https://img.shields.io/badge/license-MIT-blue)
![vue](https://img.shields.io/badge/vue-3.0+-brightgreen)
![downloads](https://img.shields.io/npm/dw/vue3-search-form)

# SearchForm 搜索表单组件

基于 Vue3 + Element Plus 的配置驱动式搜索表单组件，支持多种表单类型和自定义插槽。

[在线文档](#) · [更新日志](./CHANGELOG.md) · [报告问题](https://github.com/chenx18/vue3-smart-Form/issues)

</div>

---

## ✨ 特性

- 🚀 **配置驱动**：通过配置生成表单，无需手动编写模板
- 📝 **多种格式**：支持对象和数组两种配置格式
- 🎨 **多种类型**：Input、Input-Number、Select、Date、DateRange、DateTime、DateTimeRange、Slot
- 🔘 **自定义按钮**：支持配置自定义操作按钮
- 🔧 **灵活扩展**：支持自定义插槽组件
- 📊 **响应式数据**：自动管理表单数据状态
- 📱 **响应式换行**：支持根据屏幕宽度自动换行
- ⚡ **事件透明**：完全透明传递所有原生事件，无内部拦截
- ✅ **完全兼容**：支持所有 Element Plus 原生属性和事件
- 🎯 **TypeScript**：完整的类型定义，类型安全

## 📦 安装

### NPM 安装

```bash
# npm
npm install vue3-search-form

# yarn
yarn add vue3-search-form

# pnpm
pnpm add vue3-search-form
```

## 🚀 快速开始

```typescript
// main.ts
import { createApp } from 'vue'
import SearchForm from 'vue3-smart-form'
import 'vue3-smart-form/style.css'

const app = createApp(App)
app.use(SearchForm)
```

### 局部使用

```vue
<template>
  <SearchForm
    ref="searchFormRef"
    :form-items="formItems"
    :buttons="buttons"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchForm from '/vue3-smart-form'
import { FormItemType } from '/vue3-smart-form'

const searchFormRef = ref()

const formItems = {
  keyword: {
    type: FormItemType.INPUT,
    label: '关键字',
    props: {
      // 通过 props 配置原生事件
      onKeyup: (e) => {
        if (e.key === 'Enter') {
          handleSearch()
        }
      }
    }
  },
  status: {
    type: FormItemType.SELECT,
    label: '状态',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ],
    props: {
      // 通过 props 配置原生事件
      onChange: (val) => {
        console.log('状态变化：', val)
      }
    }
  }
}

const buttons = [
  {
    text: '搜索',
    type: 'primary',
    icon: 'Search',
    onClick: () => {
      const formData = searchFormRef.value?.getFormData()
      handleSearch(formData)
    }
  },
  {
    text: '重置',
    icon: 'Refresh',
    onClick: () => {
      searchFormRef.value?.reset()
    }
  }
]

const handleSearch = (data) => {
  console.log('搜索参数：', data)
}
</script>
```

## 基础用法

### 推荐用法：使用 buttons 配置

```vue
<template>
  <SearchForm
    ref="searchFormRef"
    :form-items="formItems"
    :buttons="buttons"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { FormItemType } from '@/components/SearchForm/types'

const searchFormRef = ref()

const formItems = {
  keyword: {
    type: FormItemType.INPUT,
    label: '关键字'
  },
  status: {
    type: FormItemType.SELECT,
    label: '状态',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  }
}

// 推荐：使用 buttons 配置
const buttons = [
  {
    text: '搜索',
    type: 'primary',
    icon: 'Search',
    onClick: () => {
      const formData = searchFormRef.value?.getFormData()
      console.log('搜索参数：', formData)
    }
  },
  {
    text: '重置',
    icon: 'Refresh',
    onClick: () => {
      searchFormRef.value?.reset()
    }
  },
  {
    text: '导出',
    type: 'success',
    icon: 'Download',
    onClick: () => {
      console.log('导出数据')
    }
  }
]
</script>
```

### 配置格式选择

#### 方式一：对象格式配置

```vue
<template>
  <SearchForm
    ref="searchFormRef"
    :form-items="formItems"
    :buttons="buttons"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { FormItemType } from '@/components/SearchForm/types'

const searchFormRef = ref()

// 对象格式配置
const formItems = {
  keyword: {
    type: FormItemType.INPUT,
    label: '关键字',
    props: {
      placeholder: '请输入关键字'
    }
  },
  status: {
    type: FormItemType.SELECT,
    label: '状态',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  },
  dateRange: {
    type: FormItemType.DATE_RANGE,
    label: '创建时间'
  }
}

const buttons = [
  {
    text: '查询',
    type: 'primary',
    onClick: () => {
      const data = searchFormRef.value?.getFormData()
      console.log('搜索参数：', data)
    }
  }
]
</script>
```

### 方式二：数组格式配置

```vue
<template>
  <SearchForm
    ref="searchFormRef"
    :form-items="formItems"
    :buttons="buttons"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { FormItemType } from '@/components/SearchForm/types'

const searchFormRef = ref()

// 数组格式配置（每个项必须包含 key 字段）
const formItems = [
  {
    key: 'keyword',
    type: FormItemType.INPUT,
    label: '关键字',
    props: {
      placeholder: '请输入关键字'
    }
  },
  {
    key: 'status',
    type: FormItemType.SELECT,
    label: '状态',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  },
  {
    key: 'dateRange',
    type: FormItemType.DATE_RANGE,
    label: '创建时间'
  }
]

const buttons = [
  {
    text: '查询',
    type: 'primary',
    onClick: () => {
      const data = searchFormRef.value?.getFormData()
      console.log('搜索参数：', data)
    }
  }
]
</script>
```

## API

### Props

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| formItems | `FormConfig` | - | 表单项配置（支持对象或数组格式，必填） |
| labelWidth | `string` | `'80px'` | 表单标签宽度 |
| inline | `boolean` | `true` | 是否行内表单 |
| formStyle | `object` | - | 表单样式 |
| formClass | `string` | - | 表单类名 |
| buttons | `ButtonConfig[]` | `[]` | 按钮配置（配置形式） |
| formProps | `object` | `{}` | el-form 原生属性 |
| responsive | `object` | - | 响应式配置 |

> 💡 **设计理念**：完全配置驱动，表单项和按钮均通过配置管理，保持 API 简洁统一。

#### 响应式配置 (responsive)

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| wrap | `boolean` | `false` | 是否启用响应式换行 |
| breakpoint | `number` | `1200` | 换行断点（屏幕宽度小于此值时换行），单位 px |
| maxItemsPerRow | `number` | `4` | 每行显示的最大表单项数量 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| reset | - | 点击重置按钮触发（内部调用）或手动调用 reset 方法时触发 |

### Expose

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| getFormData | - | `FormData` | 获取当前表单数据 |
| reset | - | - | 手动触发重置（并触发 reset 事件） |
| formRef | - | `FormInstance` | Element Plus 表单实例引用 |

## 表单项配置 (FormItemConfig)

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| key | `string` | - | 字段名（必填） |
| type | `FormItemType` | - | 表单项类型（必填） |
| label | `string` | - | 标签文本 |
| show | `boolean` | `true` | 是否显示 |
| value | `any` | - | 默认值 |
| options | `array \| function` | - | 下拉选项（仅 select） |
| optionsRef | `string` | - | 选项数组来源的响应式数据引用（仅 select） |
| component | `Component \| { render: () => VNode }` | - | 自定义渲染组件（仅 slot） |
| props | `object` | - | 表单组件原生属性和事件（placeholder, clearable, filterable, format, valueFormat, style, class, onKeyup, onChange 等） |
| itemProps | `object` | - | el-form-item 原生属性（包含 style, class, labelWidth 等） |

> 💡 **设计理念**：只保留真正的元数据作为顶级属性，所有原生组件属性（placeholder、clearable、filterable、format、valueFormat、style、class 等）都通过 `props` 配置，保持 API 简洁统一。

## 表单项类型 (FormItemType)

| 类型 | 值 | 说明 |
|------|------|------|
| INPUT | `'input'` | 输入框 |
| INPUT_NUMBER | `'inputNumber'` | 数字输入框 |
| SELECT | `'select'` | 选择器 |
| DATE | `'date'` | 日期选择器 |
| DATE_RANGE | `'dateRange'` | 日期范围选择器 |
| DATETIME | `'datetime'` | 日期时间选择器 |
| DATETIME_RANGE | `'datetimeRange'` | 日期时间范围选择器 |
| SLOT | `'slot'` | 自定义插槽 |

## 按钮配置说明 (ButtonConfig)

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| text | `string` | - | 按钮文本（必填） |
| type | `string` | `'default'` | 按钮类型：primary/success/warning/danger/info/text/default |
| icon | `string` | - | 按钮图标 |
| show | `boolean` | `true` | 是否显示 |
| props | `object` | - | Element Plus 按钮原生属性 |
| onClick | `function` | - | 点击事件处理函数 |

## 使用示例

### 1. 基础输入框

```typescript
{
  keyword: {
    type: FormItemType.INPUT,
    label: '关键字',
    props: {
      placeholder: '请输入关键字'
    }
  }
}
```

### 2. 数字输入框

```typescript
{
  age: {
    type: FormItemType.INPUT_NUMBER,
    label: '年龄',
    props: {
      min: 0,
      max: 120,
      step: 1,
      precision: 0
    }
  },
  price: {
    type: FormItemType.INPUT_NUMBER,
    label: '价格',
    props: {
      min: 0,
      precision: 2,
      step: 0.1,
      controlsPosition: 'right'
    }
  }
}
```

### 3. 下拉选择器（静态选项）

```typescript
{
  status: {
    type: FormItemType.SELECT,
    label: '状态',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ],
    props: {
      placeholder: '请选择状态',
      clearable: true,
      filterable: true
    }
  }
}
```

### 4. 下拉选择器（动态选项）

```typescript
const statusOptions = ref([
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
])

{
  status: {
    type: FormItemType.SELECT,
    label: '状态',
    options: () => statusOptions.value
  }
}
```

### 5. 日期选择器

```typescript
{
  createDate: {
    type: FormItemType.DATE,
    label: '创建日期',
    props: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD'
    }
  }
}
```

### 6. 日期范围选择器

```typescript
{
  dateRange: {
    type: FormItemType.DATE_RANGE,
    label: '创建时间',
    props: {
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期'
    }
  }
}
```

### 7. 日期时间选择器

```typescript
{
  createTime: {
    type: FormItemType.DATETIME,
    label: '创建时间',
    props: {
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  }
}
```

### 8. 日期时间范围选择器

```typescript
{
  datetimeRange: {
    type: FormItemType.DATETIME_RANGE,
    label: '时间范围',
    props: {
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  }
}
```

### 9. 自定义插槽

```vue
<template>
  <SearchForm :form-items="formItems">
    <template #customSlot="{ field, value, config }">
      <el-input v-model="formData[field]" placeholder="自定义内容" />
    </template>
  </SearchForm>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { FormItemType } from '@/components/SearchForm/types'

const formData = reactive({})

const formItems = {
  customSlot: {
    type: FormItemType.SLOT,
    label: '自定义字段'
  }
}
</script>
```

### 10. 事件透明传逩

组件完全透明传递所有原生事件，通过 `props` 配置即可监听任何原生事件。

```typescript
const formItems = {
  // Input 回车事件
  keyword: {
    type: FormItemType.INPUT,
    label: '关键字',
    props: {
      onKeyup: (e) => {
        if (e.key === 'Enter') {
          console.log('回车键按下')
          // 执行搜索逻辑
        }
      },
      onChange: (value) => {
        console.log('值变化：', value)
      },
      onFocus: () => {
        console.log('获得焦点')
      },
      onBlur: () => {
        console.log('失去焦点')
      }
    }
  },

  // InputNumber 变化事件
  price: {
    type: FormItemType.INPUT_NUMBER,
    label: '价格',
    props: {
      onChange: (value) => {
        console.log('价格变化：', value)
      }
    }
  },

  // Select 变化事件
  status: {
    type: FormItemType.SELECT,
    label: '状态',
    options: statusOptions,
    props: {
      onChange: (value) => {
        console.log('状态变化：', value)
        // 执行联动逻辑或搜索
      },
      onVisibleChange: (visible) => {
        console.log('下拉框显示状态：', visible)
      }
    }
  },

  // DatePicker 事件
  dateRange: {
    type: FormItemType.DATE_RANGE,
    label: '日期范围',
    props: {
      onCalendarChange: (dates) => {
        console.log('日历变化：', dates)
      },
      onVisibleChange: (visible) => {
        console.log('选择器显示状态：', visible)
      }
    }
  }
}
```

**重要说明：**
- 组件不会拦截或处理任何原生事件
- 所有事件通过 `props` 配置直接传递给原生组件
- 事件处理函数由用户完全控制
- 可以在事件处理函数中调用 `getFormData()` 获取表单数据

### 11. 完整示例

```vue
<template>
  <div class="page-container">
    <SearchForm
      ref="searchFormRef"
      :form-items="formItems"
      label-width="100px"
    >
      <!-- 自定义插槽 -->
      <template #customField="{ field, value }">
        <el-cascader
          v-model="formData[field]"
          :options="cascaderOptions"
          clearable
        />
      </template>
    </SearchForm>

    <!-- 表格区域 -->
    <el-table :data="tableData">
      <!-- 表格列 -->
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { FormItemType } from '@/components/SearchForm/types'

const searchFormRef = ref()
const formData = reactive({})
const tableData = ref([])

const formItems = {
  // 用户名输入框
  username: {
    type: FormItemType.INPUT,
    label: '用户名',
    props: {
      placeholder: '请输入用户名',
      maxlength: 20,
      onKeyup: (e) => {
        if (e.key === 'Enter') {
          handleSearch()
        }
      }
    }
  },

  // 状态下拉框
  status: {
    type: FormItemType.SELECT,
    label: '状态',
    options: [
      { label: '全部', value: '' },
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ],
    props: {
      placeholder: '请选择状态',
      clearable: true,
      filterable: true
    }
  },

  // 创建时间范围
  createTime: {
    type: FormItemType.DATE_RANGE,
    label: '创建时间',
    props: {
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      unlinkPanels: true
    }
  },

  // 自定义插槽字段
  customField: {
    type: FormItemType.SLOT,
    label: '级联选择'
  }
}

// 处理搜索
const handleSearch = () => {
  const data = searchFormRef.value?.getFormData()
  console.log('搜索参数：', data)
  // 调用 API 获取数据
  fetchData(data)
}

// 获取表单数据
const getFormData = () => {
  const data = searchFormRef.value?.getFormData()
  console.log('当前表单数据：', data)
  return data
}

// 获取表格数据
const fetchData = async (params) => {
  // API 调用
}
</script>
```

## 高级用法

### 响应式换行

当屏幕宽度小于指定断点时，表单项会自动换行显示，提升移动端或小屏幕的体验。

```vue
<template>
  <SearchForm
    ref="searchFormRef"
    :form-items="formItems"
    :buttons="buttons"
    :responsive="{
      wrap: true,          // 启用响应式换行
      breakpoint: 1200,    // 屏幕宽度小于 1200px 时换行
      maxItemsPerRow: 3    // 每行最多显示 3 个表单项
    }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchForm from '/vue3-smart-form'
import { FormItemType } from '/vue3-smart-form'

const searchFormRef = ref()

const formItems = {
  keyword: {
    type: FormItemType.INPUT,
    label: '关键字'
  },
  status: {
    type: FormItemType.SELECT,
    label: '状态',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  },
  createTime: {
    type: FormItemType.DATE_RANGE,
    label: '创建时间'
  }
  // ... 更多表单项
}

const buttons = [
  {
    text: '搜索',
    type: 'primary',
    icon: 'Search',
    onClick: () => {
      const data = searchFormRef.value?.getFormData()
      console.log('搜索参数：', data)
    }
  },
  {
    text: '重置',
    icon: 'Refresh',
    onClick: () => searchFormRef.value?.reset()
  }
]
</script>
```

**说明：**
- `wrap: true` 启用响应式换行功能
- `breakpoint: 1200` 表示当窗口宽度小于 1200px 时，表单项会自动换行
- `maxItemsPerRow: 3` 表示换行后每行最多显示 3 个表单项
- 换行时，`inline` 属性会自动设为 `false`，确保表单项垂直排列

### 动态控制表单项显示

```typescript
const formItems = computed(() => ({
  username: {
    type: FormItemType.INPUT,
    label: '用户名'
  },
  // 根据条件动态显示
  status: {
    type: FormItemType.SELECT,
    label: '状态',
    show: someCondition.value, // 动态控制显示
    options: statusOptions.value
  }
}))
```

### 联动效果

```vue
<script setup lang="ts">
const searchFormRef = ref()

const formItems = {
  appId: {
    type: FormItemType.SELECT,
    label: '应用',
    options: appOptions,
    props: {
      onChange: (value) => {
        handleAppChange(value)
      }
    }
  },
  topicId: {
    type: FormItemType.SELECT,
    label: '话题',
    options: [], // 初始为空
    show: false // 初始隐藏
  }
}

// 监听字段变化，实现联动
const handleAppChange = (value) => {
  // 根据 appId 加载对应的话题列表
  loadTopicsByApp(value)
  // 显示话题选择器
  formItems.topicId.show = !!value
}
</script>
```

### 自定义样式

```typescript
{
  keyword: {
    type: FormItemType.INPUT,
    label: '关键字',
    props: {
      style: {
        width: '300px'
      },
      class: 'custom-keyword'
    }
  }
}
```

### 原生属性和事件支持

组件完全支持 Element Plus 原生属性和事件：

#### 1. el-form 原生属性（通过 formProps 配置）

```vue
<SearchForm
  :form-items="formItems"
  :form-props="{
    labelPosition: 'right',
    size: 'large',
    disabled: false,
    validateOnRuleChange: true
  }"
> </SearchForm>
```

#### 2. el-form-item 原生属性（通过 itemProps 配置）

```typescript
const formItems = {
  username: {
    type: FormItemType.INPUT,
    label: '用户名',
    itemProps: {
      required: true,
      rules: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
      ],
      error: '错误信息',
      showMessage: true,
      inlineMessage: false
    }
  }
}
```

#### 3. 表单组件原生属性（通过 props 配置）

```typescript
{
  // Input 所有原生属性和事件
  keyword: {
    type: FormItemType.INPUT,
    label: '关键字',
    props: {
      maxlength: 20,
      showWordLimit: true,
      clearable: true,
      onKeyup: (e) => {
        if (e.key === 'Enter') handleSearch()
      }
    }
  },

  // Select 所有原生属性和事件
  status: {
    type: FormItemType.SELECT,
    label: '状态',
    options: [...],
    props: {
      multiple: true,
      filterable: true,
      onChange: (val) => console.log('变化', val)
    }
  },

  // DatePicker 所有原生属性和事件
  dateRange: {
    type: FormItemType.DATE_RANGE,
    label: '时间范围',
    props: {
      unlinkPanels: true,
      shortcuts: [
        {
          text: '最近一周',
          value: () => [new Date(Date.now() - 7 * 24 * 3600 * 1000), new Date()]
        }
      ]
    }
  }
}
```

### 自定义按钮

组件支持**两种方式**添加自定义按钮：配置形式和插槽形式。

#### 方式一：配置形式（推荐）

适合简单的按钮场景，配置集中，代码简洁：

```vue
<template>
  <SearchForm
    ref="searchFormRef"
    :form-items="formItems"
    :buttons="customButtons"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import SearchForm from '@/components/SearchForm/index.vue'
import { FormItemType } from '@/components/SearchForm/types'

const searchFormRef = ref()

const formItems = {
  keyword: {
    type: FormItemType.INPUT,
    label: '关键字'
  },
  status: {
    type: FormItemType.SELECT,
    label: '状态',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  }
}

// 自定义按钮配置
const customButtons = [
  {
    text: '导出',
    type: 'success',
    icon: 'Download',
    show: true,
    onClick: () => {
      ElMessage.success('导出数据')
      exportData()
    }
  },
  {
    text: '批量删除',
    type: 'danger',
    icon: 'Delete',
    show: true,
    props: {
      disabled: false
    },
    onClick: () => {
      ElMessage.warning('批量删除')
      batchDelete()
    }
  },
  {
    text: '刷新',
    type: 'info',
    icon: 'Refresh',
    onClick: () => {
      const data = searchFormRef.value?.getFormData()
      console.log('查询：', data)
    }
  }
]

const exportData = () => {
  // 导出逻辑
}

const batchDelete = () => {
  // 批量删除逻辑
}
</script>
```

#### 方式二：插槽形式

适合复杂的按钮场景，如按钮组、下拉菜单等：

```vue
<template>
  <SearchForm
    :form-items="formItems"
  >
    <!-- 按钮插槽 -->
    <template #buttons>
      <el-button type="success" :icon="Download" @click="exportData">
        导出
      </el-button>

      <el-dropdown @command="handleDropdownCommand">
        <el-button type="primary">
          更多操作 <el-icon><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="batchEdit">批量编辑</el-dropdown-item>
            <el-dropdown-item command="batchDelete">批量删除</el-dropdown-item>
            <el-dropdown-item command="refresh">刷新</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-button-group>
        <el-button :icon="Plus" @click="handleAdd">新增</el-button>
        <el-button :icon="Upload" @click="handleUpload">上传</el-button>
      </el-button-group>
    </template>
  </SearchForm>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { Download, Plus, Upload, ArrowDown } from '@element-plus/icons-vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { FormItemType } from '@/components/SearchForm/types'

const formItems = {
  keyword: {
    type: FormItemType.INPUT,
    label: '关键字'
  }
}

const exportData = () => {
  ElMessage.success('导出数据')
}

const handleDropdownCommand = (command) => {
  switch (command) {
    case 'batchEdit':
      ElMessage.info('批量编辑')
      break
    case 'batchDelete':
      ElMessage.warning('批量删除')
      break
    case 'refresh':
      ElMessage.success('刷新')
      break
  }
}

const handleAdd = () => {
  ElMessage.success('新增')
}

const handleUpload = () => {
  ElMessage.info('上传')
}
</script>
```

#### 方式三：混合使用

同时使用配置和插槽，配置按钮在前，插槽按钮在后：

```vue
<template>
  <SearchForm
    ref="searchFormRef"
    :form-items="formItems"
    :buttons="configButtons"
  >
    <!-- 插槽按钮会显示在配置按钮之后 -->
    <template #buttons>
      <el-button type="primary" :icon="Plus" @click="handleAdd">
        新增
      </el-button>
      <el-dropdown @command="handleMoreCommand">
        <el-button>
          更多 <el-icon><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="export">导出</el-dropdown-item>
            <el-dropdown-item command="import">导入</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </SearchForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowDown, Plus } from '@element-plus/icons-vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { FormItemType } from '@/components/SearchForm/types'

const searchFormRef = ref()

// 配置按钮（查询、重置等基础操作）
const configButtons = [
  {
    text: '查询',
    type: 'primary',
    icon: 'Search',
    onClick: () => {
      const data = searchFormRef.value?.getFormData()
      console.log('查询：', data)
    }
  },
  {
    text: '重置',
    icon: 'Refresh',
    onClick: () => {
      searchFormRef.value?.reset()
    }
  }
]

const formItems = {
  keyword: {
    type: FormItemType.INPUT,
    label: '关键字'
  }
}

const handleAdd = () => {
  console.log('新增')
}

const handleMoreCommand = (command) => {
  console.log('更多操作：', command)
}
</script>
```

### 数组格式配置 + 自定义按钮

```vue
<template>
  <SearchForm
    ref="searchFormRef"
    :form-items="formItems"
    :buttons="buttons"
  >
    <template #customSlot="{ field, value }">
      <el-input v-model="customValues[field]" placeholder="自定义内容" />
    </template>
  </SearchForm>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { FormItemType } from '@/components/SearchForm/types'

const searchFormRef = ref()
const customValues = reactive({})

// 数组格式配置
const formItems = [
  {
    key: 'username',
    type: FormItemType.INPUT,
    label: '用户名'
  },
  {
    key: 'status',
    type: FormItemType.SELECT,
    label: '状态',
    options: [
      { label: '全部', value: '' },
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  },
  {
    key: 'customSlot',
    type: FormItemType.SLOT,
    label: '自定义'
  }
]

// 自定义按钮（替代默认的搜索和重置按钮）
const buttons = [
  {
    text: '查询',
    type: 'primary',
    icon: 'Search',
    onClick: () => {
      const data = searchFormRef.value?.getFormData()
      console.log('查询数据：', data)
    }
  },
  {
    text: '重置',
    icon: 'Refresh',
    onClick: () => {
      searchFormRef.value?.reset()
    }
  },
  {
    text: '新增',
    type: 'success',
    icon: 'Plus',
    onClick: () => {
      // 新增逻辑
    }
  }
]
</script>
```

## 实战应用场景

### 场景一：用户管理页面的搜索表单

典型的后台管理系统用户列表搜索，包含用户名、状态、角色、注册时间等条件。

```vue
<template>
  <div class="user-management">
    <SearchForm
      ref="searchFormRef"
      :form-items="formItems"
      :buttons="buttons"
      label-width="90px"
    />

    <el-table :data="userList" v-loading="loading">
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="roleName" label="角色" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="注册时间" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import SearchForm from '@/components/SearchForm/index.vue'
import { FormItemType } from '@/components/SearchForm/types'

const searchFormRef = ref()
const loading = ref(false)
const userList = ref([])

// 角色选项
const roleOptions = ref([
  { label: '管理员', value: 'admin' },
  { label: '编辑', value: 'editor' },
  { label: '普通用户', value: 'user' }
])

// 表单配置
const formItems = {
  username: {
    type: FormItemType.INPUT,
    label: '用户名',
    props: {
      placeholder: '请输入用户名',
      maxlength: 20,
      clearable: true
    }
  },
  email: {
    type: FormItemType.INPUT,
    label: '邮箱',
    props: {
      placeholder: '请输入邮箱'
    }
  },
  role: {
    type: FormItemType.SELECT,
    label: '角色',
    options: () => roleOptions.value,
    props: {
      placeholder: '请选择角色',
      clearable: true,
      filterable: true
    }
  },
  status: {
    type: FormItemType.SELECT,
    label: '状态',
    options: [
      { label: '全部', value: '' },
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ],
    props: {
      placeholder: '请选择状态',
      clearable: true
    }
  },
  registerTime: {
    type: FormItemType.DATE_RANGE,
    label: '注册时间',
    props: {
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      unlinkPanels: true
    }
  }
}

// 按钮配置
const buttons = [
  {
    text: '查询',
    type: 'primary',
    icon: 'Search',
    onClick: () => {
      const formData = searchFormRef.value?.getFormData()
      fetchUserList(formData)
    }
  },
  {
    text: '重置',
    icon: 'Refresh',
    onClick: () => searchFormRef.value?.reset()
  },
  {
    text: '新增用户',
    type: 'success',
    icon: 'Plus',
    onClick: () => ElMessage.info('打开新增对话框')
  },
  {
    text: '导出',
    type: 'warning',
    icon: 'Download',
    onClick: () => ElMessage.success('导出用户列表')
  }
]

// 获取用户列表
const fetchUserList = async (params: any) => {
  loading.value = true
  try {
    const res = await getUserList(params)
    userList.value = res.data.list
  } catch (error) {
    ElMessage.error('获取用户列表失败')
  } finally {
    loading.value = false
  }
}
</script>
```

### 场景二：订单管理页面的复杂搜索

包含多个筛选条件、级联选择、自定义插槽等复杂场景。

```vue
<template>
  <div class="order-management">
    <SearchForm
      ref="searchFormRef"
      :form-items="formItems"
      :buttons="buttons"
      label-width="100px"
    >
      <!-- 自定义区域级联选择 -->
      <template #region="{ field }">
        <el-cascader
          v-model="customFormData[field]"
          :options="regionOptions"
          :props="{
            value: 'code',
            label: 'name',
            children: 'children'
          }"
          clearable
          placeholder="请选择地区"
          style="width: 200px"
        />
      </template>

      <!-- 自定义商品选择 -->
      <template #product="{ field }">
        <el-select
          v-model="customFormData[field]"
          filterable
          remote
          reserve-keyword
          placeholder="请输入商品名称"
          :remote-method="searchProducts"
          :loading="productLoading"
          clearable
        >
          <el-option
            v-for="item in productOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </template>
    </SearchForm>

    <el-table :data="orderList">
      <!-- 订单列表列 -->
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { FormItemType } from '@/components/SearchForm/types'
import { getRegionList, searchProducts } from '@/api/common'

const searchFormRef = ref()
const customFormData = reactive({})
const orderList = ref([])
const productLoading = ref(false)
const productOptions = ref([])

// 地区选项
const regionOptions = ref([])
loadRegionOptions()

async function loadRegionOptions() {
  const res = await getRegionList()
  regionOptions.value = res.data
}

// 表单配置（数组格式）
const formItems = [
  {
    key: 'orderNo',
    type: FormItemType.INPUT,
    label: '订单号',
    props: {
      placeholder: '请输入订单号'
    }
  },
  {
    key: 'region',
    type: FormItemType.SLOT,
    label: '配送地区'
  },
  {
    key: 'product',
    type: FormItemType.SLOT,
    label: '商品名称'
  },
  {
    key: 'orderStatus',
    type: FormItemType.SELECT,
    label: '订单状态',
    options: [
      { label: '全部', value: '' },
      { label: '待付款', value: 0 },
      { label: '待发货', value: 1 },
      { label: '已发货', value: 2 },
      { label: '已完成', value: 3 },
      { label: '已取消', value: 4 }
    ],
    props: {
      clearable: true
    }
  },
  {
    key: 'payType',
    type: FormItemType.SELECT,
    label: '支付方式',
    options: [
      { label: '全部', value: '' },
      { label: '微信支付', value: 'wechat' },
      { label: '支付宝', value: 'alipay' },
      { label: '银行卡', value: 'bank' }
    ],
    props: {
      clearable: true
    }
  },
  {
    key: 'orderTime',
    type: FormItemType.DATETIME_RANGE,
    label: '下单时间',
    props: {
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间'
    }
  }
]

// 按钮配置
const buttons = [
  {
    text: '查询',
    type: 'primary',
    icon: 'Search',
    onClick: () => {
      const formData = searchFormRef.value?.getFormData()
      fetchOrderList(formData)
    }
  },
  {
    text: '重置',
    icon: 'Refresh',
    onClick: () => searchFormRef.value?.reset()
  },
  {
    text: '批量导出',
    type: 'success',
    icon: 'Download',
    onClick: () => console.log('批量导出')
  },
  {
    text: '批量发货',
    type: 'warning',
    icon: 'Van',
    onClick: () => console.log('批量发货')
  }
]

// 搜索商品
async function searchProducts(query: string) {
  if (!query) return
  productLoading.value = true
  const res = await searchProducts({ keyword: query })
  productOptions.value = res.data
  productLoading.value = false
}

// 获取订单列表
async function fetchOrderList(params: any) {
  // 合并自定义表单数据
  const queryParams = { ...params, ...customFormData }
  console.log('查询参数：', queryParams)
  // 调用 API
}
</script>
```

## 注意事项

1. **配置格式选择**：
   - 对象格式：适合配置项较少且固定的场景，key 作为对象属性名
   - 数组格式：适合配置项较多或需要动态调整顺序的场景，每个项必须包含 `key` 字段

2. **表单项 key 唯一性**：确保每个表单项的 key 是唯一的

3. **插槽命名**：使用插槽时，插槽名称应与表单项 key 保持一致

4. **默认值类型**：日期范围类型的默认值为数组 `[]`，其他类型默认值为空字符串 `''`

5. **响应式数据**：表单数据是响应式的，可以直接通过 `ref` 获取和修改

6. **类型安全**：项目中已提供完整的 TypeScript 类型定义，建议开启类型检查

7. **按钮配置方式选择**：
   - **配置形式**（推荐）：适合简单按钮，配置集中，代码简洁
   - **插槽形式**：适合复杂按钮（如下拉菜单、按钮组），更灵活
   - **混合使用**：简单按钮用配置，复杂按钮用插槽，两者共存
   - 按钮显示顺序：配置按钮 → 插槽按钮

8. **配置驱动理念**：组件完全遵循配置驱动设计，表单项和按钮均通过配置/插槽管理，不提供额外的开关属性

## 完整类型定义

详细类型定义请查看 [types.ts](./types.ts) 文件。

---

## 📄 License

[MIT](LICENSE)

## 🤝 贡献

欢迎贡献代码、提出建议或报告问题！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 💖 支持

如果这个组件对你有帮助，请给它一个 ⭐️

## 📮 联系方式

- 作者：chenx18
- 仓库：[https://github.com/chenx18/vue3-smart-Form](https://github.com/chenx18/vue3-smart-Form)
- 问题反馈：[Issues](https://github.com/chenx18/vue3-smart-Form/issues)

---

<div align="center">

**Made with ❤️ by chenx18**

[⬆ 返回顶部](#vue3-search-form)

</div>
