<route lang="json5">
{
  style: {
    navigationBarTitleText: '员工任务',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] dark:bg-[#17191c] min-h-screen text-slate-900 dark:text-slate-100 font-display pb-32">
    <!-- Header -->
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/95 dark:bg-[#23262a]/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 py-3 flex items-center justify-between pt-[calc(env(safe-area-inset-top)+44px)]">
      <view class="flex items-center gap-3">
        <view class="relative group cursor-pointer">
          <view class="size-10 rounded-full bg-cover bg-center border-2 border-[#00b2b2]" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9ni5JPq3Fb1n-ptGOUQvLTCsMEpWa_6qmrKpKzp2xGH4UjwY-PdXXgVjVfnGpN9G-FcIvR1xa7r1u844NKBS7Xwm-El5weCJJ17pOvU3rY92H1PKfbr1T99Xs4GcVBfjXl-7cx-A3DcJtxCzfHCOmWh4zWOodeDH4Z3szYWSEJQZHLmPWyLJgNhwW9BxmSQzSPM0hYsCNln4N0afZjSIxgpT82HoSEdW0GjB0PgXs3MhAIIQhZEiuos2EirWctQp6aINfjh1tFbA');"></view>
          <view class="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white dark:border-[#23262a]"></view>
        </view>
        <view>
          <text class="text-xs font-medium text-slate-500 dark:text-slate-400 block">下午好,</text>
          <text class="text-base font-bold text-slate-900 dark:text-white leading-tight">{{ userInfo.name || '操作员' }}</text>
        </view>
      </view>
      <button class="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors bg-transparent border-none">
        <view class="i-material-symbols-notifications text-slate-600 dark:text-slate-300 text-2xl" />
        <view class="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white dark:border-[#23262a]"></view>
      </button>
    </view>
    
    <!-- Spacer for Fixed Header -->
    <view class="w-full h-[200rpx]"></view>

    <!-- Main Content -->
    <view class="flex flex-col gap-6 p-4">
      
      <!-- Progress Card -->
      <view class="p-5 rounded-2xl bg-gradient-to-br from-[#00b2b2] to-[#008f8f] text-white shadow-lg shadow-[#00b2b2]/20 relative overflow-hidden">
        <view class="absolute top-0 right-0 p-4 opacity-10">
          <view class="i-material-symbols-task-alt text-9xl" />
        </view>
        <view class="relative z-10">
          <view class="flex justify-between items-start mb-4">
             <view>
               <text class="text-[#b3e8e8] text-xs font-medium mb-1 block">今日进度</text>
               <view class="text-3xl font-bold flex items-end gap-1">
                 {{ completedCount }} <text class="text-base font-normal text-[#b3e8e8] mb-1">/ {{ totalCount }} 任务</text>
               </view>
             </view>
             <view class="flex flex-col items-end">
               <text class="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold">进行中: {{ inProgressCount }}</text>
             </view>
          </view>
          <view class="w-full bg-black/20 rounded-full h-2 mb-2">
            <view class="bg-white h-2 rounded-full transition-all duration-500" :style="`width: ${progressPercent}%`"></view>
          </view>
          <text class="text-xs text-[#e0f7f7]">还剩 {{ pendingCount }} 个待办任务，加油！</text>
        </view>
      </view>

      <!-- Filter Section -->
      <view class="flex flex-col gap-4">
        <view class="flex items-center justify-between">
           <view class="flex items-center gap-2">
             <text class="text-lg font-bold text-slate-900 dark:text-white">待办清单</text>
             <text class="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs px-2 py-0.5 rounded-full font-bold">{{ pendingCount }}</text>
           </view>
        </view>
      </view>

      <!-- Task Lists -->
      <view v-if="loading" class="text-center py-10">
        <text class="text-slate-400">加载中...</text>
      </view>

      <view v-else-if="tasks.length === 0" class="text-center py-10">
        <view class="i-material-symbols-task-alt text-6xl text-slate-300 mb-3" />
        <text class="text-slate-400 block">暂无任务</text>
      </view>

      <view v-else class="flex flex-col gap-4">
         <!-- Task Card -->
         <view 
           v-for="task in tasks" 
           :key="task.id" 
           class="group relative flex flex-col p-5 rounded-2xl bg-white dark:bg-[#23262a] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
         >
            <view class="absolute top-5 right-5 flex flex-col items-end gap-2">
                <view 
                  class="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border"
                  :class="{
                    'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30': task.priority === 'emergency',
                    'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-900/30': task.priority === 'high',
                    'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700': task.priority === 'normal' || task.priority === 'low'
                  }"
                >
                    <view v-if="task.priority === 'emergency'" class="size-1.5 rounded-full bg-red-500 animate-pulse"></view>
                    <text>{{ getPriorityText(task.priority) }}</text>
                </view>
                <text 
                  class="text-[10px] font-bold px-1.5 py-0.5 rounded border"
                  :class="{
                    'text-[#00b2b2] bg-[#00b2b2]/10 border-[#00b2b2]/20': task.status === 'in_progress',
                    'text-orange-600 bg-orange-100 border-orange-200': task.status === 'assigned',
                    'text-green-600 bg-green-100 border-green-200': task.status === 'completed'
                  }"
                >
                  {{ getStatusText(task.status) }}
                </text>
            </view>
            <text class="text-lg font-bold text-slate-900 dark:text-white mb-1 pr-20 block">{{ task.title }}</text>
            <text class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 block">{{ task.description || '无描述' }}</text>
            
            <view class="flex flex-wrap items-center gap-3 mb-5">
                <view class="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-medium bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
                    <view class="i-material-symbols-engineering text-base" />
                    <text>{{ getTypeText(task.type) }}</text>
                </view>
                 <view class="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded"
                   :class="{
                     'text-red-500 dark:text-red-400 bg-red-50 dark:bg-slate-800': isOverdue(task.deadline),
                     'text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800': !isOverdue(task.deadline)
                   }"
                 >
                    <view class="i-material-symbols-schedule text-base" />
                    <text>{{ formatDeadline(task.deadline) }}</text>
                </view>
            </view>
            
            <!-- Action Button -->
            <button 
              v-if="task.status === 'assigned'" 
              @click="startTask(task)"
              class="w-full py-3 rounded-xl bg-white dark:bg-[#23262a] border-2 border-[#00b2b2] text-[#00b2b2] hover:bg-[#00b2b2]/5 font-semibold active:scale-[0.98] transition-all flex items-center justify-center gap-2 m-0"
            >
                <view class="i-material-symbols-play-arrow text-xl" />
                <text>开始任务</text>
            </button>
            
            <button 
              v-if="task.status === 'in_progress'" 
              @click="reportTask(task)"
              class="w-full py-3 rounded-xl bg-[#00b2b2] hover:bg-[#008f8f] text-white font-semibold shadow-lg shadow-[#00b2b2]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 m-0 border-none"
            >
                <view class="i-material-symbols-edit-document text-xl" />
                <text>继续/汇报</text>
            </button>
         </view>
      </view>
    </view>
    
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'
import { type ITask, TaskStatus } from '@/api/types/task'
import { http } from '@/http/http'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const tasks = ref<ITask[]>([])
const loading = ref(false)

// Computed stats
const totalCount = computed(() => tasks.value.length)
const completedCount = computed(() => tasks.value.filter(t => t.status === 'completed').length)
const inProgressCount = computed(() => tasks.value.filter(t => t.status === 'in_progress').length)
const pendingCount = computed(() => tasks.value.filter(t => t.status === 'assigned' || t.status === 'pending').length)
const progressPercent = computed(() => {
  if (totalCount.value === 0) return 0
  return Math.round((completedCount.value / totalCount.value) * 100)
})

// Helper functions
const getPriorityText = (priority: string) => {
  const map: Record<string, string> = {
    emergency: '紧急 P0',
    high: 'P1 重要',
    normal: 'P2 普通',
    low: 'P3 低'
  }
  return map[priority] || priority
}

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    pending: '待指派',
    assigned: '待开始',
    in_progress: '进行中',
    completed: '已完成',
    verified: '已验收',
    rejected: '已驳回'
  }
  return map[status] || status
}

const getTypeText = (type: string) => {
  const map: Record<string, string> = {
    maintenance: '设备检修',
    cleaning: '清洁卫生',
    security: '安全巡检',
    inspection: '例行检查'
  }
  return map[type] || type
}

const formatDeadline = (deadline: string) => {
  if (!deadline) return '无截止时间'
  const date = new Date(deadline)
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return '已逾期'
  if (diffDays === 0) return `今日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  if (diffDays === 1) return '明日'
  return `${diffDays}天后`
}

const isOverdue = (deadline: string) => {
  if (!deadline) return false
  return new Date(deadline) < new Date()
}

// Fetch my tasks
const fetchMyTasks = async () => {
  loading.value = true
  try {
    console.log('[Employee Index] Fetching my tasks...')
    const res = await http.get('/tasks/my-tasks')
    console.log('[Employee Index] My tasks response:', res)
    
    // In unibest http interceptor, successful res returns `.data` or the unboxed response directly
    let dataList = []
    if (Array.isArray(res)) {
       dataList = res
    } else if (res && Array.isArray((res as any).data)) {
       dataList = (res as any).data
    } else if (res) {
       dataList = res as any
    }
    
    tasks.value = dataList as ITask[]
    
    uni.showToast({
      title: `加载成功: ${tasks.value.length}个任务`,
      icon: 'success'
    })
  } catch (error) {
    console.error('[Employee Index] Failed to fetch tasks:', error)
    tasks.value = []
    uni.showToast({
      title: '网络错误',
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}

// Start task
const startTask = async (task: ITask) => {
  console.log('[Employee Index] Start task:', task.id)
  
  // Don't show global loading overlay which could be annoying, just handle state
  try {
    const res = await http.put(`/tasks/${task.id}`, { status: TaskStatus.IN_PROGRESS })
    
    console.log('[Employee Index] Task started:', res)
    
    // Optimistic UI update
    task.status = TaskStatus.IN_PROGRESS
    
    uni.showToast({
      title: '任务已开始',
      icon: 'success'
    })
    
    // Check if the backend response gave us anything fresh
    if (res && (res as any).status) {
       task.status = (res as any).status
    }
    
    // Refresh quietly in the background (no loading indicator)
    quietRefreshMyTasks()
  } catch (error) {
    console.error('[Employee Index] Start task failed:', error)
    uni.showToast({
      title: '启动失败: 网络或鉴权错误',
      icon: 'error'
    })
  }
}

// Quietly refresh to avoid blinking "加载中"
const quietRefreshMyTasks = async () => {
    try {
        const res = await http.get('/tasks/my-tasks')
        let dataList = []
        if (Array.isArray(res)) dataList = res
        else if (res && Array.isArray((res as any).data)) dataList = (res as any).data
        else if (res) dataList = res as any
        
        tasks.value = dataList as ITask[]
    } catch(err) {
        console.error('Quiet refresh failed', err)
    }
}

// Report task
const reportTask = (task: ITask) => {
  console.log('[Employee Index] Navigate to report for task:', task.id)
  uni.navigateTo({ url: `/pages/task/report?taskId=${task.id}` })
}

onShow(() => {
  console.log('[Employee Index] Page shown, fetching tasks...')
  fetchMyTasks()
})

onMounted(() => {
  console.log('[Employee Index] Page mounted')
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
