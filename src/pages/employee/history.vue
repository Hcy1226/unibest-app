<route lang="json5">
{
  style: {
    navigationBarTitleText: '历史记录',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] dark:bg-[#17191c] min-h-[max(884px,100dvh)] font-display text-slate-900 dark:text-slate-100 overflow-x-hidden pb-24">
    <!-- Header -->
    <view class="sticky top-0 z-30 bg-white/90 dark:bg-[#23262a]/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 flex items-center justify-between" :style="{ paddingTop: statusBarHeight + 'px', height: (44 + statusBarHeight) + 'px' }">
      <view class="flex items-center gap-3">
        <view class="relative group cursor-pointer">
          <image :src="userStore.userInfo?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9ni5JPq3Fb1n-ptGOUQvLTCsMEpWa_6qmrKpKzp2xGH4UjwY-PdXXgVjVfnGpN9G-FcIvR1xa7r1u844NKBS7Xwm-El5weCJJ17pOvU3rY92H1PKfbr1T99Xs4GcVBfjXl-7cx-A3DcJtxCzfHCOmWh4zWOodeDH4Z3szYWSEJQZHLmPWyLJgNhwW9BxmSQzSPM0hYsCNln4N0afZjSIxgpT82HoSEdW0GjB0PgXs3MhAIIQhZEiuos2EirWctQp6aINfjh1tFbA'" class="size-10 rounded-full border-2 border-[#00b2b2]" />
          <view class="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white dark:border-[#23262a]"></view>
        </view>
        <view>
          <text class="text-xs font-medium text-slate-500 dark:text-slate-400 block">下午好,</text>
          <text class="text-base font-bold text-slate-900 dark:text-white leading-tight block">{{ userStore.userInfo?.name || '操作员' }}</text>
        </view>
      </view>
      <button class="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors bg-transparent border-none">
        <view class="i-material-symbols-filter-list text-slate-600 dark:text-slate-300 text-xl" />
      </button>
    </view>

    <view class="flex flex-col gap-6 p-4 mb-safe">
      <!-- Overview Section -->
      <view>
        <view class="flex items-center justify-between mb-3 px-1">
          <text class="text-lg font-bold text-slate-900 dark:text-white">本周概览</text>
          <button class="text-xs font-medium text-[#00b2b2] flex items-center gap-0.5 bg-transparent border-none p-0 m-0">
            <text>查看详情</text>
            <view class="i-material-symbols-chevron-right text-[14px]" />
          </button>
        </view>
        
        <view class="grid grid-cols-2 gap-3">
          <view class="p-4 rounded-2xl bg-gradient-to-br from-[#00b2b2] to-teal-600 text-white shadow-lg shadow-[#00b2b2]/20 relative overflow-hidden flex flex-col justify-between">
            <view class="i-material-symbols-check-circle absolute -bottom-2 -right-2 text-6xl text-white/10" />
            <view class="relative z-10 flex flex-col mb-1">
              <text class="text-xs font-medium text-white/80 block mb-1">已完成任务</text>
              <view class="flex items-baseline gap-2">
                <text class="text-3xl font-bold">{{ tasks.filter(t => t.status === 'completed' || t.status === 'verified').length }}</text>
                <text class="text-xs bg-white/20 px-1.5 py-0.5 rounded text-white">+2</text>
              </view>
            </view>
          </view>
          
          <view class="p-4 rounded-2xl bg-white dark:bg-[#23262a] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-center">
            <text class="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">平均耗时</text>
            <view class="flex items-baseline gap-1">
              <text class="text-2xl font-bold text-slate-900 dark:text-white">45</text>
              <text class="text-sm text-slate-500">分钟</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Timeline Section -->
      <view class="flex flex-col">
        <view class="mb-2">
          <!-- Loading State -->
          <view v-if="loading" class="text-center py-10">
            <text class="text-sm text-slate-400">加载中...</text>
          </view>
          
          <!-- Empty State -->
          <view v-else-if="tasks.length === 0" class="text-center py-10">
            <view class="i-material-symbols-history text-4xl text-slate-300 mb-2" />
            <text class="text-sm text-slate-400 block">暂无历史记录</text>
          </view>

          <!-- Timeline Logic -->
          <view v-else>
            <!-- Timeline Item (Looping through tasks directly for now) -->
            <view class="sticky top-[70px] z-20 bg-[#fafafa]/95 dark:bg-[#17191c]/95 backdrop-blur py-2 mb-2">
               <text class="text-sm font-bold text-slate-500 dark:text-slate-400 pl-2">所有记录</text>
            </view>
            <view class="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 space-y-8 pb-4">
              
              <view v-for="(task, index) in tasks" :key="task.id" class="relative pl-6">
                <!-- Dot marker -->
                <view class="absolute -left-[9px] top-6 size-4 rounded-full border-4 border-white dark:border-[#23262a] ring-1 ring-slate-100 dark:ring-slate-800"
                      :class="getTimelineDotColor(task.status)">
                </view>
                
                <view class="flex flex-col gap-1" @click="navigateTo('/pages/task/detail?taskId=' + task.id)">
                  <text class="text-xs font-mono text-slate-400 pl-1">{{ formatShortTime(task.updatedAt || task.createdAt) }}</text>
                  
                  <view class="bg-white dark:bg-[#23262a] p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-transform">
                    <view class="flex justify-between items-start mb-2">
                      <text class="font-bold text-slate-900 dark:text-white text-sm w-4/5 leading-tight">{{ task.title }}</text>
                      <text class="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0"
                            :class="getStatusBadgeClass(task.status)">
                        {{ getStatusText(task.status) }}
                      </text>
                    </view>
                    <text class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3 block" v-if="task.description">
                      {{ task.description }}
                    </text>
                    
                    <view v-if="task.priority === 'emergency'" class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-50 dark:border-slate-800/50">
                      <text class="text-[10px] font-bold text-slate-400 uppercase">备注</text>
                      <text class="text-xs text-orange-500 font-medium tracking-wide">紧急处理</text>
                    </view>
                  </view>
                </view>
              </view>
              
            </view>
            
          </view>
        </view>
      </view>
      
      <view class="flex justify-center py-4" v-if="tasks.length > 0">
        <text class="text-xs text-slate-400">没有更多记录了</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'
import { http } from '@/http/http'

const userStore = useUserStore()
const navigateTo = (url: string) => {
  uni.navigateTo({ url })
}

const statusBarHeight = ref(0)
onLoad(() => {
    statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight || 20
})

const tasks = ref<any[]>([])
const loading = ref(false)

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    pending: '待指派', assigned: '待处理', in_progress: '维修中',
    completed: '已完成', verified: '正常', rejected: '已驳回'
  }
  return map[status] || status
}

const getTimelineDotColor = (status: string) => {
  if (status === 'completed' || status === 'verified') return 'bg-green-500'
  if (status === 'in_progress') return 'bg-amber-500'
  if (status === 'rejected') return 'bg-red-500'
  if (status === 'pending') return 'bg-slate-400'
  return 'bg-[#00b2b2]'
}

const getStatusBadgeClass = (status: string) => {
  if (status === 'verified' || status === 'completed') return 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
  if (status === 'in_progress') return 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
  if (status === 'rejected') return 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
  if (status === 'assigned') return 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
  return 'bg-slate-100 dark:bg-slate-800 text-slate-500'
}

const formatShortTime = (dateStr: string) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

const fetchMyTasks = async () => {
  loading.value = true
  try {
    const res = await http.get('/tasks/my-tasks')
    let dataList = []
    if (Array.isArray(res)) dataList = res
    else if (res && Array.isArray((res as any).data)) dataList = (res as any).data
    else if (res) dataList = res as any
    
    tasks.value = dataList as any[]
    
    // Sort tasks by logic if needed, maybe verified/completed at bottom
    tasks.value.sort((a,b) => {
        return new Date(b.createdAt || b.updatedAt).getTime() - new Date(a.createdAt || a.updatedAt).getTime()
    })
  } catch (err) {
    console.error('Fetch tasks failed:', err)
  } finally {
    loading.value = false
  }
}

onShow(async () => {
  await fetchMyTasks()
})
</script>
