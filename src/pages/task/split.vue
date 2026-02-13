<route lang="json5">
{
  style: {
    navigationBarTitleText: '拆分任务',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] min-h-screen text-slate-900 font-display pb-20">
    <!-- Header -->
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center gap-3 pt-[calc(env(safe-area-inset-top)+44px)]">
      <button class="p-2 rounded-full hover:bg-slate-100 transition-colors bg-white border-none" @click="goBack">
        <view class="i-material-symbols-arrow-back text-slate-700 text-xl" />
      </button>
      <view>
        <text class="text-xs font-medium text-slate-500 block">任务拆分</text>
        <text class="text-base font-bold text-slate-900 block leading-tight">创建子任务</text>
      </view>
    </view>

    <!-- Spacer -->
    <view class="w-full h-[200rpx] pt-safe"></view>

    <!-- Task Info Card -->
    <view v-if="taskInfo" class="mx-4 mb-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
      <text class="text-xs font-medium text-slate-400 uppercase">父任务</text>
      <view class="mt-2">
        <text class="font-bold text-slate-900 block">{{ taskInfo.title }}</text>
        <text class="text-xs text-slate-500 mt-1 block">{{ taskInfo.description || '无描述' }}</text>
      </view>
    </view>

    <!-- Subtasks Form -->
    <view class="px-4 flex flex-col gap-4">
      <view class="flex items-center justify-between">
        <text class="text-lg font-bold text-slate-900">子任务列表</text>
        <button class="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00b2b2] text-white text-xs font-semibold border-none" @click="addSubtask">
          <view class="i-material-symbols-add text-[16px]" />
          <text>添加子任务</text>
        </button>
      </view>

      <!-- Subtask List -->
      <view v-if="subtasks.length === 0" class="py-10 text-center">
        <text class="text-sm text-slate-400">暂无子任务，点击上方按钮添加</text>
      </view>

      <view v-else class="flex flex-col gap-3">
        <view v-for="(subtask, index) in subtasks" :key="index" class="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
          <view class="flex items-start justify-between mb-3">
            <text class="text-xs font-medium text-slate-400">子任务 {{ index + 1 }}</text>
            <button class="p-1 text-red-500 border-none bg-transparent" @click="removeSubtask(index)">
              <view class="i-material-symbols-delete text-[20px]" />
            </button>
          </view>

          <view class="flex flex-col gap-3">
            <!-- Title -->
            <view class="flex flex-col gap-1">
              <text class="text-xs font-medium text-slate-600">任务标题 *</text>
              <input v-model="subtask.title" class="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm" placeholder="输入子任务标题" type="text" />
            </view>

            <!-- Description -->
            <view class="flex flex-col gap-1">
              <text class="text-xs font-medium text-slate-600">任务描述</text>
              <textarea v-model="subtask.description" class="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm" placeholder="输入子任务描述（可选）" :auto-height="true" />
            </view>

           <!-- Type -->
            <view class="flex flex-col gap-1">
              <text class="text-xs font-medium text-slate-600">任务类型 *</text>
              <picker mode="selector" :range="taskTypes" range-key="label" @change="onTypeChange($event, index)">
                <view class="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm">
                  <text v-if="subtask.type">{{ getTypeLabel(subtask.type) }}</text>
                  <text v-else class="text-slate-400">选择任务类型</text>
                </view>
              </picker>
            </view>

            <!-- Priority -->
            <view class="flex flex-col gap-1">
              <text class="text-xs font-medium text-slate-600">优先级 *</text>
              <picker mode="selector" :range="priorities" range-key="label" @change="onPriorityChange($event, index)">
                <view class="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm">
                  <text v-if="subtask.priority">{{ getPriorityLabel(subtask.priority) }}</text>
                  <text v-else class="text-slate-400">选择优先级</text>
                </view>
              </picker>
            </view>
          </view>
        </view>
      </view>

      <!-- Submit Button -->
      <button v-if="subtasks.length > 0" class="w-full py-3 rounded-xl bg-[#00b2b2] text-white font-semibold shadow-md border-none" @click="submitSplit">
        提交拆分 ({{ subtasks.length }} 个子任务)
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getTaskList } from '@/api/task'
import type { ITask } from '@/api/types/task'

interface Subtask {
  title: string
  description: string
  type: string
  priority: string
}

const taskId = ref<number | null>(null)
const taskInfo = ref<ITask | null>(null)
const subtasks = ref<Subtask[]>([])

const taskTypes = [
  { label: '设备检修', value: 'maintenance' },
  { label: '清洁卫生', value: 'cleaning' },
  { label: '安全巡检', value: 'security' },
  { label: '例行检查', value: 'inspection' }
]

const priorities = [
  { label: '低', value: 'low' },
  { label: '中', value: 'normal' },
  { label: '高', value: 'high' },
  { label: '紧急', value: 'emergency' }
]

const getTypeLabel = (value: string) => {
  return taskTypes.find(t => t.value === value)?.label || value
}

const getPriorityLabel = (value: string) => {
  return priorities.find(p => p.value === value)?.label || value
}

const goBack = () => {
  uni.navigateBack()
}

const addSubtask = () => {
  subtasks.value.push({
    title: '',
    description: '',
    type: '',
    priority: 'normal'
  })
}

const removeSubtask = (index: number) => {
  subtasks.value.splice(index, 1)
}

const onTypeChange = (e: any, index: number) => {
  const selectedIndex = e.detail.value
  subtasks.value[index].type = taskTypes[selectedIndex].value
}

const onPriorityChange = (e: any, index: number) => {
  const selectedIndex = e.detail.value
  subtasks.value[index].priority = priorities[selectedIndex].value
}

const submitSplit = async () => {
  if (!taskId.value) return

  // Validation
  for (let i = 0; i < subtasks.value.length; i++) {
    const subtask = subtasks.value[i]
    if (!subtask.title || !subtask.type) {
      uni.showToast({
        title: `子任务${i + 1}信息不完整`,
        icon: 'error'
      })
      return
    }
  }

  uni.showLoading({ title: '拆分中...', mask: true })

  try {
    const res = await uni.request({
      url: `http://127.0.0.1:3000/tasks/${taskId.value}/split`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${uni.getStorageSync('token')}`
      },
      data: {
        subtasks: subtasks.value
      }
    })

    console.log('[Split Page] Split successful:', res)

    uni.hideLoading()
    uni.showToast({
      title: '拆分成功',
      icon: 'success'
    })

    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  } catch (error) {
    console.error('[Split Page] Split failed:', error)
    uni.hideLoading()
    uni.showToast({
      title: '拆分失败',
      icon: 'error'
    })
  }
}

onLoad(async (options: any) => {
  console.log('[Split Page] onLoad with options:', options)

  if (options.taskId) {
    taskId.value = parseInt(options.taskId)
    console.log('[Split Page] Task ID:', taskId.value)

    try {
      const tasks = await getTaskList()
      taskInfo.value = tasks.find(t => t.id === taskId.value) || null
      console.log('[Split Page] Task:', taskInfo.value)

      // Add first subtask by default
      addSubtask()
    } catch (error) {
      console.error('[Split Page] Failed to load task:', error)
      uni.showToast({
        title: '加载失败',
        icon: 'error'
      })
    }
  } else {
    uni.showToast({
      title: '缺少任务ID',
      icon: 'error'
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }
})
</script>

<style scoped>
input, textarea {
  font-size: 14px;
}
</style>
