<template>
  <div class="search-form-example">
    <h2>SearchForm 组件使用示例</h2>

    <!-- 示例1：对象格式配置 -->
    <h3>示例1：对象格式配置</h3>
    <SearchForm
      ref="example1Ref"
      :form-items="objectFormItems"
      :buttons="objectButtons"
    />

    <!-- 示例2：数组格式配置 -->
    <h3>示例2：数组格式配置</h3>
    <SearchForm
      ref="example2Ref"
      :form-items="arrayFormItems"
      :buttons="arrayButtons"
    />

    <!-- 示例3：带自定义按钮 -->
    <h3>示例3：带自定义按钮</h3>
    <SearchForm
      ref="example3Ref"
      :form-items="formItemsWithButtons"
      :buttons="customButtons"
    />

    <!-- 示例4：完整功能 -->
    <h3>示例4：完整功能（数组格式 + 自定义按钮 + 插槽）</h3>
    <SearchForm
      ref="example4Ref"
      :form-items="completeFormItems"
      :buttons="completeButtons"
      label-width="100px"
    >
      <template #customField="{ field, value }">
        <el-cascader
          v-model="customValues[field]"
          :options="cascaderOptions"
          clearable
          placeholder="请选择"
          style="width: 200px"
        />
      </template>
    </SearchForm>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import SearchForm from './index.vue'
import { FormItemType } from './types'

// ============ 示例1：对象格式配置 ============
const example1Ref = ref()

const objectFormItems = {
  keyword: {
    type: FormItemType.INPUT,
    label: '关键字',
    props: {
      placeholder: '请输入关键字',
      onKeyup: (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          handleExample1Search()
        }
      }
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
      clearable: true,
      onChange: (val: any) => {
        console.log('状态变化：', val)
      }
    }
  },
  dateRange: {
    type: FormItemType.DATE_RANGE,
    label: '创建时间',
    props: {
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期'
    }
  }
}

const objectButtons = [
  {
    text: '搜索',
    type: 'primary',
    icon: 'Search',
    onClick: () => handleExample1Search()
  },
  {
    text: '重置',
    icon: 'Refresh',
    onClick: () => example1Ref.value?.reset()
  }
]

const handleExample1Search = () => {
  const data = example1Ref.value?.getFormData()
  ElMessage.success('执行搜索')
  console.log('示例1搜索参数：', data)
}

// ============ 示例2：数组格式配置 ============
const example2Ref = ref()

const arrayFormItems = [
  {
    key: 'username',
    type: FormItemType.INPUT,
    label: '用户名',
    props: {
      placeholder: '请输入用户名'
    }
  },
  {
    key: 'email',
    type: FormItemType.INPUT,
    label: '邮箱',
    props: {
      placeholder: '请输入邮箱'
    }
  },
  {
    key: 'role',
    type: FormItemType.SELECT,
    label: '角色',
    options: [
      { label: '管理员', value: 'admin' },
      { label: '普通用户', value: 'user' }
    ],
    props: {
      clearable: true,
      filterable: true
    }
  }
]

const arrayButtons = [
  {
    text: '搜索',
    type: 'primary',
    icon: 'Search',
    onClick: () => {
      const data = example2Ref.value?.getFormData()
      ElMessage.success('执行搜索')
      console.log('示例2搜索参数：', data)
    }
  },
  {
    text: '重置',
    icon: 'Refresh',
    onClick: () => example2Ref.value?.reset()
  }
]

// ============ 示例3：带自定义按钮 ============
const example3Ref = ref()

const formItemsWithButtons = {
  appId: {
    type: FormItemType.SELECT,
    label: '应用',
    options: [
      { label: '应用1', value: 'app1' },
      { label: '应用2', value: 'app2' }
    ]
  },
  keyword: {
    type: FormItemType.INPUT,
    label: '关键字'
  }
}

const customButtons = [
  {
    text: '查询',
    type: 'primary',
    icon: 'Search',
    onClick: () => {
      const data = example3Ref.value?.getFormData()
      ElMessage.success('查询数据')
      console.log('示例3查询参数：', data)
    }
  },
  {
    text: '导出',
    type: 'success',
    icon: 'Download',
    onClick: () => {
      ElMessage.success('导出数据')
    }
  },
  {
    text: '刷新',
    type: 'info',
    icon: 'Refresh',
    onClick: () => {
      ElMessage.info('刷新列表')
    }
  }
]

// ============ 示例4：完整功能 ============
const example4Ref = ref()
const customValues = reactive({})

const cascaderOptions = [
  {
    value: 'zh',
    label: '中国',
    children: [
      { value: 'bj', label: '北京' },
      { value: 'sh', label: '上海' }
    ]
  },
  {
    value: 'us',
    label: '美国',
    children: [
      { value: 'ny', label: '纽约' },
      { value: 'la', label: '洛杉矶' }
    ]
  }
]

const completeFormItems = [
  {
    key: 'appId',
    type: FormItemType.SELECT,
    label: '应用',
    options: [
      { label: '社区A', value: 'app1' },
      { label: '社区B', value: 'app2' }
    ],
    props: {
      clearable: true
    }
  },
  {
    key: 'country',
    type: FormItemType.SELECT,
    label: '国家',
    options: [
      { label: '中国', value: 'CN' },
      { label: '美国', value: 'US' }
    ],
    props: {
      clearable: true
    }
  },
  {
    key: 'keyword',
    type: FormItemType.INPUT,
    label: '关键字',
    props: {
      placeholder: '请输入关键字'
    }
  },
  {
    key: 'createTime',
    type: FormItemType.DATE_RANGE,
    label: '创建时间'
  },
  {
    key: 'customField',
    type: FormItemType.SLOT,
    label: '级联选择'
  }
]

const completeButtons = [
  {
    text: '查询',
    type: 'primary',
    icon: 'Search',
    onClick: () => {
      const formData = example4Ref.value?.getFormData()
      const data = { ...formData, ...customValues }
      ElMessage.success('执行查询')
      console.log('示例4查询参数：', data)
    }
  },
  {
    text: '重置',
    icon: 'Refresh',
    onClick: () => {
      example4Ref.value?.reset()
      Object.keys(customValues).forEach(key => {
        customValues[key] = undefined
      })
      ElMessage.info('表单已重置')
    }
  },
  {
    text: '新增',
    type: 'success',
    icon: 'Plus',
    onClick: () => {
      ElMessage.success('打开新增对话框')
    }
  },
  {
    text: '导出',
    type: 'warning',
    icon: 'Download',
    onClick: () => {
      ElMessage.warning('导出数据')
    }
  }
]
</script>

<style scoped lang="scss">
.search-form-example {
  padding: 20px;

  h2 {
    margin-bottom: 20px;
    color: #333;
  }

  h3 {
    margin: 30px 0 15px;
    padding: 10px;
    background-color: #f5f7fa;
    border-left: 4px solid #409eff;
    color: #333;
  }
}
</style>
