import { VNode, Component } from 'vue'

/**
 * 表单项类型枚举
 */
export enum FormItemType {
  INPUT = 'input',
  INPUT_NUMBER = 'inputNumber',
  SELECT = 'select',
  DATE = 'date',
  DATE_RANGE = 'dateRange',
  DATETIME = 'datetime',
  DATETIME_RANGE = 'datetimeRange',
  SLOT = 'slot'
}

/**
 * 下拉选项类型
 */
export interface SelectOption {
  label: string
  value: any
  disabled?: boolean
}

/**
 * 表单项配置
 */
export interface FormItemConfig {
  /** 字段名 */
  key: string
  /** 表单项类型 */
  type: FormItemType | string
  /** 标签文本 */
  label?: string
  /** 是否显示，默认true */
  show?: boolean
  /** 默认值 */
  value?: any
  /** 下拉选项（仅 type 为 select 时有效） */
  options?: SelectOption[] | (() => SelectOption[])
  /** 选项数组来源的响应式数据引用（仅 type 为 select 时有效） */
  optionsRef?: string
  /** 自定义渲染组件（仅 type 为 slot 时有效） */
  component?: Component | { render: () => VNode }
  /** 表单组件原生属性和事件（placeholder, clearable, filterable, format, valueFormat, style, class, onKeyup, onChange 等） */
  props?: Record<string, any>
  /** el-form-item 原生属性 */
  itemProps?: Record<string, any>
}

/**
 * 表单配置类型（对象格式）
 */
export type FormConfigObject = Record<string, FormItemConfig>

/**
 * 表单配置类型（数组格式）
 */
export type FormConfigArray = FormItemConfig[]

/**
 * 表单配置类型（支持对象和数组）
 */
export type FormConfig = FormConfigObject | FormConfigArray

/**
 * 按钮配置
 */
export interface ButtonConfig {
  /** 按钮文本 */
  text: string
  /** 按钮类型 */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'default'
  /** 按钮图标 */
  icon?: string
  /** 是否显示 */
  show?: boolean
  /** 按钮点击事件 */
  onClick?: () => void
  /** Element Plus 原生属性 */
  props?: Record<string, any>
}

/**
 * 搜索表单组件 Props
 */
export interface SearchFormProps {
  /** 表单项配置（支持对象和数组两种格式） */
  formItems: FormConfig
  /** 表单标签宽度，默认 80px */
  labelWidth?: string
  /** 是否行内表单，默认 true */
  inline?: boolean
  /** 表单样式 */
  formStyle?: Record<string, any>
  /** 表单类名 */
  formClass?: string
  /** 按钮配置 */
  buttons?: ButtonConfig[]
  /** el-form 原生属性 */
  formProps?: Record<string, any>
  /** 响应式配置 */
  responsive?: {
    /** 是否启用响应式换行，默认 false */
    wrap?: boolean
    /** 换行断点（屏幕宽度小于此值时换行），单位 px，默认 1200 */
    breakpoint?: number
    /** 每行显示的最大表单项数量，默认 4 */
    maxItemsPerRow?: number
  }
}

/**
 * 表单数据类型
 */
export type FormData = Record<string, any>

/**
 * 事件类型
 */
export interface SearchFormEmits {
  /** 重置事件 */
  (e: 'reset'): void
}
