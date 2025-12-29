<template>
  <div class="search-form" :class="formClass">
    <el-form
      ref="formRef"
      :model="formData"
      :inline="inline"
      :label-width="labelWidth"
      :style="formStyle"
      v-bind="formProps"
    >
      <el-row v-if="!inline" :gutter="16">
        <!-- 动态渲染表单项 -->
        <template v-for="item in formItemsArray" :key="item.key">
          <el-col
            v-if="item.show !== false"
            v-bind="getColProps(item)"
          >
            <el-form-item
              :label="item.label"
              :prop="item.key"
              v-bind="item.itemProps"
            >
              <template v-if="item.type === FormItemType.INPUT">
                <el-input v-model="formData[item.key]" v-bind="item.props" />
              </template>
              <template v-else-if="item.type === FormItemType.INPUT_NUMBER">
                <el-input-number v-model="formData[item.key]" v-bind="item.props" />
              </template>
              <template v-else-if="item.type === FormItemType.SELECT">
                <el-select v-model="formData[item.key]" v-bind="item.props">
                  <el-option
                    v-for="opt in getItemOptions(item)"
                    :key="opt.value"
                    :label="opt.label"
                    :value="opt.value"
                    :disabled="opt.disabled"
                  />
                </el-select>
              </template>
              <template v-else-if="item.type === FormItemType.DATE">
                <el-date-picker v-model="formData[item.key]" type="date" v-bind="item.props" />
              </template>
              <template v-else-if="item.type === FormItemType.DATE_RANGE">
                <el-date-picker v-model="formData[item.key]" type="daterange" v-bind="item.props" />
              </template>
              <template v-else-if="item.type === FormItemType.DATETIME">
                <el-date-picker v-model="formData[item.key]" type="datetime" v-bind="item.props" />
              </template>
              <template v-else-if="item.type === FormItemType.DATETIME_RANGE">
                <el-date-picker v-model="formData[item.key]" type="datetimerange" v-bind="item.props" />
              </template>
              <template v-else-if="item.type === FormItemType.SLOT">
                <slot :name="item.key" :field="item.key" :value="formData[item.key]" :config="item" />
              </template>
            </el-form-item>
          </el-col>
        </template>

        <!-- 操作按钮 -->
        <el-col v-if="(buttons && buttons.length > 0) || $slots.buttons" v-bind="getColProps()">
          <el-form-item>
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
            <slot name="buttons" />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- inline 模式 -->
      <template v-else>
        <template v-for="item in formItemsArray" :key="item.key">
          <el-form-item
            v-if="item.show !== false"
            :label="item.label"
            :prop="item.key"
            v-bind="item.itemProps"
          >
            <el-input v-if="item.type === FormItemType.INPUT" v-model="formData[item.key]" v-bind="item.props" />
            <el-input-number v-else-if="item.type === FormItemType.INPUT_NUMBER" v-model="formData[item.key]" v-bind="item.props" />
            <el-select v-else-if="item.type === FormItemType.SELECT" v-model="formData[item.key]" v-bind="item.props">
              <el-option
                v-for="opt in getItemOptions(item)"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
                :disabled="opt.disabled"
              />
            </el-select>
            <el-date-picker v-else-if="item.type === FormItemType.DATE" v-model="formData[item.key]" type="date" v-bind="item.props" />
            <el-date-picker v-else-if="item.type === FormItemType.DATE_RANGE" v-model="formData[item.key]" type="daterange" v-bind="item.props" />
            <el-date-picker v-else-if="item.type === FormItemType.DATETIME" v-model="formData[item.key]" type="datetime" v-bind="item.props" />
            <el-date-picker v-else-if="item.type === FormItemType.DATETIME_RANGE" v-model="formData[item.key]" type="datetimerange" v-bind="item.props" />
            <slot v-else-if="item.type === FormItemType.SLOT" :name="item.key" :field="item.key" :value="formData[item.key]" :config="item" />
          </el-form-item>
        </template>
        <el-form-item v-if="(buttons && buttons.length > 0) || $slots.buttons">
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
          <slot name="buttons" />
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import {
  FormItemType,
  type FormItemConfig,
  type FormData,
  type SearchFormProps,
  type SearchFormEmits,
  type SelectOption,
  type ColConfig
} from './types'

// Props 定义
const props = withDefaults(defineProps<SearchFormProps>(), {
  labelWidth: '80px',
  inline: false,
  buttons: () => [],
  formProps: () => ({}),
  defaultCol: () => ({ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 })
})

// Emits 定义
const emit = defineEmits<SearchFormEmits>()

// 表单引用
const formRef = ref<FormInstance>()

// 表单数据
const formData = reactive<FormData>({})

// 自定义按钮配置
const buttons = computed(() => props.buttons || [])

// 获取栅格配置
const getColProps = (item?: FormItemConfig): ColConfig => {
  if (item?.col) {
    return item.col
  }
  return props.defaultCol || { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }
}

// 将配置转为数组用于渲染（支持对象和数组两种格式）
const formItemsArray = computed(() => {
  if (!props.formItems) return []
  if (Array.isArray(props.formItems)) {
    return props.formItems
  }
  return Object.keys(props.formItems).map(key => ({
    key,
    ...props.formItems[key]
  }))
})

// 获取配置对象（用于数据初始化）
const formItemsObject = computed(() => {
  if (!props.formItems) return {}
  if (Array.isArray(props.formItems)) {
    const obj: Record<string, FormItemConfig> = {}
    props.formItems.forEach((item: FormItemConfig) => {
      obj[item.key] = item
    })
    return obj
  }
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
      const type = config.type
      if (type === FormItemType.DATE_RANGE || type === FormItemType.DATETIME_RANGE) {
        formData[key] = []
      } else {
        formData[key] = ''
      }
    }
  })
}

watch(() => props.formItems, () => initFormData(), { immediate: true, deep: true })

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
      if (type === FormItemType.DATE_RANGE || type === FormItemType.DATETIME_RANGE) {
        formData[key] = []
      } else {
        formData[key] = ''
      }
    }
  })
  emit('reset')
}

const setFieldValue = (key: string, value: any) => {
  formData[key] = value
}

const setFieldsValue = (values: Record<string, any>) => {
  Object.keys(values).forEach(key => {
    formData[key] = values[key]
  })
}

defineExpose({
  getFormData: () => ({ ...formData }),
  formRef,
  reset: handleReset,
  setFieldValue,
  setFieldsValue
})
</script>

<style scoped lang="scss">
.search-form {
  :deep(.el-form-item) {
    margin-bottom: 18px;
    
    .el-input,
    .el-input-number,
    .el-select,
    .el-date-editor {
      width: 100%;
    }
  }
}
</style>
