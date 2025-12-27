<template>
  <div
    class="search-form"
    :class="[
      formClass,
      { 'search-form--responsive': isResponsiveWrap }
    ]"
    :style="responsiveStyle"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :inline="inline && !isResponsiveWrap"
      :label-width="labelWidth"
      :style="formStyle"
      v-bind="formProps"
    >
      <!-- 动态渲染表单项 -->
      <template v-for="item in formItemsArray" :key="item.key">
        <el-form-item
          v-if="item.show !== false"
          :label="item.label"
          :prop="item.key"
          v-bind="item.itemProps"
        >
          <!-- Input 输入框 -->
          <el-input
            v-if="item.type === FormItemType.INPUT"
            v-model="formData[item.key]"
            v-bind="item.props"
          />

          <!-- InputNumber 数字输入框 -->
          <el-input-number
            v-else-if="item.type === FormItemType.INPUT_NUMBER"
            v-model="formData[item.key]"
            v-bind="item.props"
          />

          <!-- Select 选择器 -->
          <el-select
            v-else-if="item.type === FormItemType.SELECT"
            v-model="formData[item.key]"
            v-bind="item.props"
          >
            <el-option
              v-for="opt in getItemOptions(item)"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
              :disabled="opt.disabled"
            />
          </el-select>

          <!-- Date 日期选择器 -->
          <el-date-picker
            v-else-if="item.type === FormItemType.DATE"
            v-model="formData[item.key]"
            type="date"
            v-bind="item.props"
          />

          <!-- DateRange 日期范围选择器 -->
          <el-date-picker
            v-else-if="item.type === FormItemType.DATE_RANGE"
            v-model="formData[item.key]"
            type="daterange"
            v-bind="item.props"
          />

          <!-- DateTime 日期时间选择器 -->
          <el-date-picker
            v-else-if="item.type === FormItemType.DATETIME"
            v-model="formData[item.key]"
            type="datetime"
            v-bind="item.props"
          />

          <!-- DateTimeRange 日期时间范围选择器 -->
          <el-date-picker
            v-else-if="item.type === FormItemType.DATETIME_RANGE"
            v-model="formData[item.key]"
            type="datetimerange"
            v-bind="item.props"
          />

          <!-- Slot 自定义插槽 -->
          <slot
            v-else-if="item.type === FormItemType.SLOT"
            :name="item.key"
            :field="item.key"
            :value="formData[item.key]"
            :config="item"
          />
        </el-form-item>
      </template>

      <!-- 操作按钮 -->
      <el-form-item v-if="(buttons && buttons.length > 0) || $slots.buttons">
        <!-- 自定义按钮（配置形式） -->
        <template v-for="(btn, index) in buttons" :key="index">
          <el-button
            v-if="btn.show !== false"
            :type="btn.type || 'default'"
            :icon="btn.icon"
            v-bind="btn.props"
            @click="btn.onClick"
          >
            {{ btn.text }}
          </el-button>
        </template>

        <!-- 自定义按钮插槽（插槽形式） -->
        <slot name="buttons" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import type { FormInstance } from 'element-plus'
import {
  FormItemType,
  type FormItemConfig,
  type FormData,
  type SearchFormProps,
  type SearchFormEmits,
  type SelectOption
} from './types'

// Props 定义
const props = withDefaults(defineProps<SearchFormProps>(), {
  labelWidth: '80px',
  inline: true,
  buttons: () => [],
  formProps: () => ({}),
  responsive: () => ({ wrap: false, breakpoint: 1200, maxItemsPerRow: 4 })
})

// Emits 定义
const emit = defineEmits<SearchFormEmits>()

// 表单引用
const formRef = ref<FormInstance>()

// 表单数据
const formData = reactive<FormData>({})

// 响应式窗口宽度（使用 VueUse）
const { width: windowWidth } = useWindowSize()

// 响应式配置
const responsiveConfig = computed(() => ({
  wrap: props.responsive?.wrap ?? false,
  breakpoint: props.responsive?.breakpoint ?? 1200,
  maxItemsPerRow: props.responsive?.maxItemsPerRow ?? 4
}))

// 是否启用响应式换行
const isResponsiveWrap = computed(() => {
  return responsiveConfig.value.wrap && windowWidth.value < responsiveConfig.value.breakpoint
})

// 响应式样式
const responsiveStyle = computed(() => {
  if (!isResponsiveWrap.value) return {}

  const maxItems = responsiveConfig.value.maxItemsPerRow
  const itemWidth = `calc(${100 / maxItems}% - 10px)`

  return {
    '--max-items-per-row': maxItems.toString(),
    '--item-width': itemWidth
  }
})

// 自定义按钮配置
const buttons = computed(() => props.buttons || [])

// 将配置转为数组用于渲染（支持对象和数组两种格式）
const formItemsArray = computed(() => {
  if (!props.formItems) return []

  // 如果是数组格式，直接返回
  if (Array.isArray(props.formItems)) {
    return props.formItems
  }

  // 如果是对象格式，转换为数组
  return Object.keys(props.formItems).map(key => ({
    key,
    ...props.formItems[key]
  }))
})

// 获取配置对象（用于数据初始化）
const formItemsObject = computed(() => {
  if (!props.formItems) return {}

  // 如果是数组格式，转换为对象
  if (Array.isArray(props.formItems)) {
    const obj: Record<string, FormItemConfig> = {}
    props.formItems.forEach((item: FormItemConfig) => {
      obj[item.key] = item
    })
    return obj
  }

  // 如果已经是对象格式，直接返回
  return props.formItems
})

/**
 * 获取下拉选项列表
 */
const getItemOptions = (item: FormItemConfig): SelectOption[] => {
  if (Array.isArray(item.options)) {
    return item.options
  }
  if (typeof item.options === 'function') {
    return item.options()
  }
  return []
}

/**
 * 初始化表单数据
 */
const initFormData = () => {
  Object.keys(formItemsObject.value).forEach(key => {
    const config = formItemsObject.value[key]
    const defaultValue = config.value

    if (defaultValue !== undefined && defaultValue !== null) {
      formData[key] = defaultValue
    } else {
      // 根据类型设置默认值
      const type = config.type
      if (
        type === FormItemType.DATE_RANGE ||
        type === FormItemType.DATETIME_RANGE
      ) {
        formData[key] = []
      } else {
        formData[key] = ''
      }
    }
  })
}

/**
 * 监听配置变化，重新初始化表单数据
 */
watch(
  () => props.formItems,
  () => {
    initFormData()
  },
  { immediate: true, deep: true }
)

/**
 * 处理重置
 */
const handleReset = () => {
  Object.keys(formData).forEach(key => {
    const config = formItemsObject.value[key]
    const defaultValue = config.value

    if (defaultValue !== undefined && defaultValue !== null) {
      formData[key] = defaultValue
    } else {
      const type = config.type
      if (
        type === FormItemType.DATE_RANGE ||
        type === FormItemType.DATETIME_RANGE
      ) {
        formData[key] = []
      } else {
        formData[key] = ''
      }
    }
  })
  emit('reset')
}

/**
 * 设置单个字段的值
 */
const setFieldValue = (key: string, value: any) => {
  formData[key] = value
}

/**
 * 批量设置字段的值
 */
const setFieldsValue = (values: Record<string, any>) => {
  Object.keys(values).forEach(key => {
    formData[key] = values[key]
  })
}

/**
 * 暴露方法供外部调用
 */
defineExpose({
  /** 获取表单数据 */
  getFormData: () => ({ ...formData }),
  /** 表单引用 */
  formRef,
  /** 手动触发重置 */
  reset: handleReset,
  /** 设置单个字段的值 */
  setFieldValue,
  /** 批量设置字段的值 */
  setFieldsValue
})
</script>

<style scoped lang="scss">
.search-form {
  :deep(.el-form-item) {
    margin-bottom: 18px;
  }

  // 响应式换行模式
  &.search-form--responsive {
    :deep(.el-form) {
      .el-form-item {
        width: var(--item-width);
        margin-right: 10px;
      }
    }
  }
}
</style>
