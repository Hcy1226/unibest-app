<route lang="json5">
{
  style: {
    navigationBarTitleText: '指派任务',
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
        <text class="text-xs font-medium text-slate-500 block">任务指派</text>
        <text class="text-base font-bold text-slate-900 block leading-tight">选择负责人</text>
      </view>
    </view>

    <!-- Spacer -->
    <view class="w-full h-[200rpx] pt-safe"></view>

    <!-- Task Info Card -->
    <view v-if="taskInfo" class="mx-4 mb-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
      <text class="text-xs font-medium text-slate-400 uppercase">任务信息</text>
      <view class="mt-2">
        <text class="font-bold text-slate-900 block">{{ taskInfo.title }}</text>
        <text class="text-xs text-slate-500 mt-1 block">{{ taskInfo.description || '无描述' }}</text>
      </view>
    </view>

    <!-- Members List -->
    <view class="px-4">
      <view v-if="loading" class="flex justify-center py-10">
        <text class="text-sm text-slate-400">加载中...</text>
      </view>

      <view v-else-if="members.length === 0" class="flex justify-center py-10">
        <text class="text-sm text-slate-400">暂无可指派成员</text>
      </view>

      <view v-else class="flex flex-col gap-3">
        <view v-for="member in members" :key="member.id" 
              class="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
              @click="selectMember(member)">
          <view class="flex items-center gap-3">
            <!-- Avatar -->
            <view class="size-12 rounded-full bg-gradient-to-br from-[#00b2b2] to-[#008585] flex items-center justify-center text-white font-bold text-lg shadow-md">
              {{ member.name?.charAt(0) || 'U' }}
            </view>
            
            <!-- Info -->
            <view>
              <text class="font-semibold text-slate-900 block">{{ member.name }}</text>
              <text class="text-xs text-slate-500 block">{{ getRoleName(member.role) }} · 部门ID: {{ member.departmentId || '未分配' }}</text>
            </view>
          </view>

          <!-- Status Indicator -->
          <view class="flex items-center gap-2">
            <view v-if="member.status" class="size-2 rounded-full bg-green-500"></view>
            <view v-else class="size-2 rounded-full bg-slate-300"></view>
            <view class="i-material-symbols-chevron-right text-slate-400 text-xl"></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getUsers, type User } from '@/api/user'
import { getTaskList } from '@/api/task'
import type { ITask } from '@/api/types/task'

const taskId = ref<number | null>(null)
const taskInfo = ref<ITask | null>(null)
const members = ref<User[]>([])
const loading = ref(false)

const getRoleName = (role: string) => {
  const roleMap: Record<string, string> = {
    admin: '管理员',
    supervisor: '班组长',
    employee: '员工'
  }
  return roleMap[role] || role
}

const goBack = () => {
  uni.navigateBack()
}

const selectMember = async (member: User) => {
  if (!taskId.value) return

  uni.showLoading({ title: '指派中...', mask: true })
  
  try {
    // Call API to update task assignee
    const res = await uni.request({
      url: `http://127.0.0.1:3000/tasks/${taskId.value}`,
      method: 'PATCH',  // Use PATCH instead of PUT
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${uni.getStorageSync('token')}`
      },
      data: {
        assigneeId: member.id,
        status: 'in_progress' // Update status to in_progress (待进行)
      }
    })

    console.log('[Assign Page] Task updated:', res)
    
    uni.hideLoading()
    uni.showToast({
      title: `已指派给${member.name}`,
      icon: 'success'
    })

    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  } catch (error) {
    console.error('[Assign Page] Failed to assign task:', error)
    uni.hideLoading()
    uni.showToast({
      title: '指派失败',
      icon: 'error'
    })
  }
}

onLoad(async (options: any) => {
  console.log('[Assign Page] onLoad with options:', options)
  
  if (options.taskId) {
    taskId.value = parseInt(options.taskId)
    console.log('[Assign Page] Task ID:', taskId.value)
    
    loading.value = true
    
    try {
      // Fetch task info
      const tasks = await getTaskList()
      taskInfo.value = tasks.find(t => t.id === taskId.value) || null
      
      // Fetch all users (filter employees only)
      const allUsers = await getUsers()
      members.value = allUsers.filter(u => u.role === 'employee' && u.status)
      
      console.log('[Assign Page] Task:', taskInfo.value)
      console.log('[Assign Page] Available members:', members.value.length)
    } catch (error) {
      console.error('[Assign Page] Failed to load data:', error)
      uni.showToast({
        title: '加载失败',
        icon: 'error'
      })
    } finally {
      loading.value = false
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
.cursor-pointer {
  cursor: pointer;
}
</style>
