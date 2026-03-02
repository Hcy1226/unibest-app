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
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/80 backdrop-blur-xl border-b border-white/50 px-5 flex items-center justify-between box-border pt-[var(--status-bar-height)] h-[calc(var(--status-bar-height)+50px)] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
      <view class="flex items-center gap-3">
        <view class="size-8 rounded-full bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100/50 active:scale-90 transition-transform -ml-2 shrink-0" @click="goBack">
          <view class="i-material-symbols-arrow-back-ios-new text-slate-600 text-[16px] ml-0.5" />
        </view>
        <view class="flex flex-col justify-center">
          <text class="text-[10px] font-black text-[#00b2b2] tracking-widest uppercase mb-0.5 mt-0.5">任务指派</text>
          <text class="text-lg font-black text-slate-800 tracking-tight leading-none">选择负责人</text>
        </view>
      </view>
    </view>

    <!-- Spacer -->
     <view class="w-full h-[calc(var(--status-bar-height)+60px)]"></view>

    <!-- Task Info Card -->
    <view v-if="taskInfo" class="mx-5 mb-6 p-5 rounded-[1.5rem] bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl shadow-slate-900/20 relative overflow-hidden group">
      <view class="absolute -right-4 -bottom-4 opacity-10">
        <view class="i-material-symbols-assignment text-[120px] text-white" />
      </view>
      <view class="relative z-10 flex flex-col gap-2">
        <text class="text-[10px] font-black text-slate-400 uppercase tracking-widest">任务信息</text>
        <text class="font-black text-white text-lg leading-snug">{{ taskInfo.title }}</text>
        <view class="flex items-center gap-2 mt-1">
          <text class="text-[11px] font-bold text-slate-300 font-mono tracking-wider bg-white/10 px-2 py-0.5 rounded">T-{{ taskInfo.id.toString().padStart(6, '0') }}</text>
        </view>
        <text class="text-xs font-medium text-slate-400 mt-2 leading-relaxed line-clamp-2">{{ taskInfo.description || '暂无描述' }}</text>
      </view>
    </view>

    <!-- Members List -->
    <view class="px-5">
      <view class="flex items-center justify-between mb-4 pl-1">
        <text class="text-lg font-black text-slate-800 tracking-tight">可指派成员</text>
        <text class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">共 {{ members.length }} 人</text>
      </view>

      <view v-if="loading" class="flex flex-col items-center justify-center py-12 gap-3">
        <view class="i-material-symbols-progress-activity animate-spin text-3xl text-[#00b2b2]" />
        <text class="text-sm font-bold text-slate-400 tracking-widest uppercase">正在加载数据...</text>
      </view>

      <view v-else-if="members.length === 0" class="flex flex-col items-center justify-center py-16 gap-3">
        <view class="i-material-symbols-group-off text-5xl text-slate-200" />
        <text class="text-sm font-bold text-slate-400 tracking-widest uppercase">暂无可指派成员</text>
      </view>

      <view v-else class="flex flex-col gap-3 pb-8">
        <button v-for="member in members" :key="member.id" 
              class="w-full text-left bg-white p-4 rounded-[1.2rem] border border-slate-100/80 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all bg-transparent m-0 overflow-hidden relative"
              @click="selectMember(member)">
          
          <view class="flex items-center gap-4 relative z-10">
            <!-- Avatar -->
            <view class="size-12 rounded-full flex items-center justify-center text-white font-black text-xl shadow-inner shrink-0"
                  :class="member.status ? 'bg-gradient-to-br from-[#00b2b2] to-[#008f8f]' : 'bg-gradient-to-br from-slate-300 to-slate-400'">
              {{ member.name?.charAt(0) || 'U' }}
            </view>
            
            <!-- Info -->
            <view class="flex flex-col justify-center gap-0.5">
              <view class="flex items-center gap-2 mb-0.5">
                <text class="text-base font-black tracking-wide" :class="member.status ? 'text-slate-800' : 'text-slate-500'">{{ member.name }}</text>
                <text class="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-500/10">{{ getRoleName(member.role) }}</text>
              </view>
              <text class="text-[11px] font-bold text-slate-400 tracking-wider">部门ID: {{ member.departmentId || '未分配' }}</text>
            </view>
          </view>

          <!-- Status Indicator & Action -->
          <view class="flex items-center gap-3 relative z-10">
            <view class="flex items-center gap-1.5">
              <view class="size-2 rounded-full" :class="member.status ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-300'"></view>
              <text class="text-[10px] font-bold" :class="member.status ? 'text-green-600' : 'text-slate-500'">{{ member.status ? '在线' : '离线' }}</text>
            </view>
            <view class="size-8 rounded-full bg-slate-50 flex items-center justify-center group-active:bg-[#00b2b2]/10 transition-colors">
              <view class="i-material-symbols-chevron-right text-slate-400 text-lg group-active:text-[#00b2b2] transition-colors"></view>
            </view>
          </view>
        </button>
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
import { http } from '@/http/http'

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
    const res = await http.put(`/tasks/${taskId.value}`, {
        assigneeId: member.id,
        status: 'assigned' // Update status to assigned (待开始) instead of in_progress
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
