<route lang="json5">
{
  style: {
    navigationBarTitleText: '任务列表',
    navigationStyle: 'custom',
  },
  // Bypass global auth check if it exists
  excludeLoginPath: true,
}
</route>

<template>
  <view class="bg-slate-50 min-h-screen text-slate-900 font-display pb-28">
    <!-- Header with Glassmorphism -->
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/80 backdrop-blur-xl border-b border-white/50 px-5 flex items-center justify-between box-border pt-[var(--status-bar-height)] h-[calc(var(--status-bar-height)+50px)] shadow-sm">
      <view class="flex items-center gap-3">
         <view class="flex flex-col justify-center">
           <text class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5 mt-0.5">工作台</text>
           <text class="text-xl font-black text-slate-800 block leading-tight tracking-tight">{{ pageTitle }}</text>
         </view>
      </view>
      <view v-if="isSupervisor" class="size-8 rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 cursor-pointer">
        <view class="i-material-symbols-filter-list text-slate-700 text-[20px]" />
      </view>
    </view>
    <!-- Spacer -->
    <view class="w-full h-[calc(var(--status-bar-height)+60px)]"></view>

    <view class="flex flex-col gap-8 px-5 py-2">
      <!-- Stats -->
      <view v-if="isSupervisor" class="animate-fade-in-up">
         <view class="grid grid-cols-3 gap-4">
            <view class="p-4 rounded-[1.2rem] bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-100/50 flex flex-col items-center gap-1.5 shadow-sm transform transition-transform hover:-translate-y-1 active:scale-95 duration-300">
               <text class="text-[11px] font-bold text-orange-600 uppercase tracking-widest">待指派</text>
               <text class="text-3xl font-black text-orange-600">{{ pendingCount }}</text>
            </view>
            <view class="p-4 rounded-[1.2rem] bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100/50 flex flex-col items-center gap-1.5 shadow-inner transform transition-transform hover:-translate-y-1 active:scale-95 duration-300">
               <text class="text-[11px] font-bold text-blue-600 uppercase tracking-widest">进行中</text>
               <text class="text-3xl font-black text-blue-600">{{ inProgressCount }}</text>
            </view>
            <view class="p-4 rounded-[1.2rem] bg-white border border-slate-100/60 flex flex-col items-center gap-1.5 shadow-md shadow-slate-200/50 transform transition-transform hover:-translate-y-1 active:scale-95 duration-300">
               <text class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">已完成</text>
               <text class="text-3xl font-black text-slate-800">{{ completedCount }}</text>
            </view>
         </view>
      </view>

      <!-- Exception Overview -->
      <view class="flex flex-col gap-4 animate-fade-in-up" style="animation-delay: 50ms" v-if="isSupervisor">
         <view class="flex items-center justify-between">
            <view class="text-base font-black text-slate-800 flex items-center gap-1.5 tracking-tight">
               <view class="i-material-symbols-error-outline text-red-500 text-xl drop-shadow-sm" />
               <text>异常概览</text>
            </view>
            <view class="text-xs font-bold text-slate-500 flex items-center gap-0.5 bg-slate-100/80 px-3 py-1.5 rounded-full active:bg-slate-200 transition-colors" @click="navigateTo('/pages/task/exception')">
               <text>异常统计</text>
               <view class="i-material-symbols-chevron-right text-sm" />
            </view>
         </view>
         
         <view class="flex gap-4 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2">
            <!-- Card 1 -->
            <view class="min-w-[170px] flex-1 p-4 rounded-[1.2rem] bg-gradient-to-br from-red-50 to-white border border-red-100/50 flex flex-col gap-1.5 relative overflow-hidden shadow-sm shadow-red-100/50">
               <view class="flex items-center justify-between z-10">
                  <text class="text-[11px] font-bold text-red-600 uppercase tracking-widest">超时任务</text>
                  <view class="p-1.5 rounded-full bg-red-100/50">
                    <view class="i-material-symbols-schedule text-red-500 text-lg" />
                  </view>
               </view>
               <view class="flex items-end gap-1.5 z-10 mt-1">
                  <text class="text-3xl font-black text-red-600 leading-none">{{ overdueCount }}</text>
                  <text class="text-[10px] font-bold text-red-400 mb-1 tracking-wider">项已逾期</text>
               </view>
               <view class="absolute -right-4 -bottom-4 opacity-[0.03] text-red-900 pointer-events-none">
                  <view class="i-material-symbols-warning text-[5rem]" />
               </view>
            </view>
            <!-- Card 2 -->
             <view class="min-w-[170px] flex-1 p-4 rounded-[1.2rem] bg-gradient-to-br from-rose-50 to-white border border-rose-100/50 flex flex-col gap-1.5 relative overflow-hidden shadow-sm shadow-rose-100/50">
               <view class="flex items-center justify-between z-10">
                  <text class="text-[11px] font-bold text-rose-600 uppercase tracking-widest">被驳回数</text>
                  <view class="p-1.5 rounded-full bg-rose-100/50">
                    <view class="i-material-symbols-assignment-return text-rose-500 text-lg" />
                  </view>
               </view>
               <view class="flex items-end gap-1.5 z-10 mt-1">
                  <text class="text-3xl font-black text-rose-600 leading-none">{{ rejectedCount }}</text>
                  <text class="text-[10px] font-bold text-rose-400 mb-1 tracking-wider">次待修正</text>
               </view>
               <view class="absolute -right-4 -bottom-4 opacity-[0.03] text-rose-900 pointer-events-none">
                  <view class="i-material-symbols-cancel text-[5rem]" />
               </view>
            </view>
         </view>
      </view>

      <!-- Search & Filters -->
      <view class="flex flex-col gap-5 animate-fade-in-up" style="animation-delay: 100ms" v-if="isSupervisor">
         <view class="relative group">
             <view class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00b2b2] transition-colors">
                 <view class="i-material-symbols-search text-xl" />
             </view>
             <input class="w-full pl-12 pr-5 py-3.5 rounded-[1rem] bg-white border border-slate-200/60 text-sm font-medium text-slate-800 focus:border-[#00b2b2] focus:ring-4 focus:ring-[#00b2b2]/10 outline-none transition-all placeholder-slate-400 shadow-sm" placeholder="搜索任务名称、编号或负责人..." type="text" />
         </view>
         <view class="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5">
             <button class="px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold whitespace-nowrap shadow-md shadow-slate-900/20 border-none active:scale-95 transition-transform">全部任务</button>
             <button class="px-5 py-2 rounded-xl bg-white border border-slate-200/80 text-slate-600 text-sm font-bold whitespace-nowrap shadow-sm hover:bg-slate-50 active:scale-95 transition-transform flex items-center gap-1.5">
               高优先级 <text class="bg-orange-50 text-orange-500 px-1.5 py-0.5 rounded-md text-[10px] font-black">2</text>
             </button>
             <button class="px-5 py-2 rounded-xl bg-white border border-slate-200/80 text-slate-600 text-sm font-bold whitespace-nowrap shadow-sm hover:bg-slate-50 active:scale-95 transition-transform flex items-center gap-1.5">
               待指派 <text class="bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded-md text-[10px] font-black">3</text>
             </button>
             <button class="px-5 py-2 rounded-xl bg-white border border-slate-200/80 text-slate-600 text-sm font-bold whitespace-nowrap shadow-sm hover:bg-slate-50 active:scale-95 transition-transform flex items-center gap-1.5">
               待验收 <text class="bg-green-50 text-green-600 px-1.5 py-0.5 rounded-md text-[10px] font-black">1</text>
             </button>
         </view>
      </view>

      <!-- Task List -->
      <view class="flex flex-col gap-4 animate-fade-in-up" style="animation-delay: 150ms">
         <view class="flex items-center justify-between mb-2">
             <text class="text-xl font-black text-slate-800 tracking-tight">{{ isSupervisor ? '任务列表' : '历史记录' }}</text>
             <view class="text-xs font-bold text-[#00b2b2] flex items-center gap-1 bg-[#00b2b2]/10 px-3 py-1.5 rounded-full active:bg-[#00b2b2]/20 transition-colors">
                 <view class="i-material-symbols-filter-list text-sm" />
                 <text>筛选</text>
             </view>
         </view>

         <!-- Dynamic Task List -->
         <view v-if="loading" class="flex flex-col items-center justify-center py-12 gap-3">
            <view class="i-material-symbols-progress-activity animate-spin text-3xl text-[#00b2b2]" />
            <text class="text-sm font-bold text-slate-400 tracking-widest uppercase">正在加载数据...</text>
         </view>
         
         <view v-else-if="tasks.length === 0" class="flex flex-col items-center justify-center py-16 gap-3">
            <view class="i-material-symbols-assignment-add text-5xl text-slate-200" />
            <text class="text-sm font-bold text-slate-400 tracking-widest uppercase">暂无任务</text>
         </view>
         
         <view v-else v-for="task in tasks" :key="task.id" 
               class="flex flex-col p-5 rounded-[1.5rem] bg-white border border-slate-100/60 shadow-md shadow-slate-200/50 gap-4 relative overflow-hidden group active:scale-[0.98] transition-transform duration-300" 
               @click="showTaskDetail(task)">
             <!-- Priority Color Bar -->
             <view class="absolute top-0 left-0 w-1.5 h-full opacity-90" 
                   :class="{
                     'bg-gradient-to-b from-red-400 to-red-600': task.priority === 'emergency',
                     'bg-gradient-to-b from-orange-400 to-orange-500': task.priority === 'high',
                     'bg-gradient-to-b from-blue-400 to-blue-600': task.priority === 'normal',
                     'bg-gradient-to-b from-slate-300 to-slate-400': task.priority === 'low'
                   }"></view>
             
             <view class="flex items-start justify-between pl-1">
                 <view class="flex items-start gap-4">
                     <!-- Task Icon -->
                     <view class="size-12 rounded-[1rem] flex items-center justify-center shrink-0 shadow-inner"
                           :class="{
                             'bg-red-50 text-red-500': task.priority === 'emergency',
                             'bg-orange-50 text-orange-500': task.priority === 'high',
                             'bg-blue-50 text-blue-500': task.priority === 'normal',
                             'bg-slate-50 text-slate-500': task.priority === 'low'
                           }">
                         <view class="text-2xl drop-shadow-sm" :class="{
                           'i-material-symbols-warning': task.priority === 'emergency',
                           'i-material-symbols-engineering': task.type === 'maintenance',
                           'i-material-symbols-cleaning-services': task.type === 'cleaning',
                           'i-material-symbols-security': task.type === 'security',
                           'i-material-symbols-assignment-turned-in': task.type === 'inspection'
                         }" />
                     </view>
                     
                     <view class="flex-1">
                         <view class="flex items-center gap-2 flex-wrap mb-1">
                             <text class="text-base font-black text-slate-800 tracking-wide">{{ task.title }}</text>
                             <!-- Priority Badge -->
                             <text class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ring-1 ring-inset"
                                   :class="{
                                     'bg-red-50 text-red-600 ring-red-500/20': task.priority === 'emergency',
                                     'bg-orange-50 text-orange-600 ring-orange-500/20': task.priority === 'high',
                                     'bg-blue-50 text-blue-600 ring-blue-500/20': task.priority === 'normal',
                                     'bg-slate-50 text-slate-500 ring-slate-500/20': task.priority === 'low'
                                   }">
                               {{ taskPriorityMap[task.priority]?.text || task.priority }}
                             </text>
                             <!-- Status Badge -->
                             <text class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ring-1 ring-inset"
                                   :class="{
                                     'bg-orange-50 text-orange-600 ring-orange-500/20': task.status === 'pending',
                                     'bg-blue-50 text-blue-600 ring-blue-500/20': task.status === 'assigned',
                                     'bg-cyan-50 text-cyan-600 ring-cyan-500/20': task.status === 'in_progress',
                                     'bg-green-50 text-green-600 ring-green-500/20': task.status === 'completed'
                                   }">
                               {{ taskStatusMap[task.status] || task.status }}
                             </text>
                         </view>
                         <text class="text-sm font-medium text-slate-500 mt-1.5 line-clamp-1 block leading-relaxed pr-2">{{ task.description || '无任务描述' }}</text>
                     </view>
                 </view>
             </view>
             
             <view class="flex flex-col gap-4 mt-2">
                 <!-- Assignee Info and Action Buttons Container -->
                 <view class="flex items-center justify-between pt-4 border-t border-slate-100/80 pl-1">
                     <view class="flex flex-col">
                         <text class="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">负责人</text>
                         <view class="flex items-center gap-2">
                            <view class="i-material-symbols-person text-slate-400 text-sm" />
                            <text v-if="task.status === 'pending' && !task.assigneeId && !task.assignee" class="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">待指派</text>
                            <text v-else-if="task.assignee" class="text-sm font-black text-slate-800">{{ task.assignee.name }}</text>
                            <text v-else-if="task.assigneeId" class="text-sm font-black text-slate-800">{{ getAssigneeName(task.assigneeId) }}</text>
                            <text v-else class="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">未指派</text>
                         </view>
                     </view>
                     
                     <view class="flex gap-2.5">
                         <!-- Pending tasks: show assign button -->
                         <template v-if="task.status === 'pending'">
                             <button class="flex items-center justify-center px-4 py-2.5 rounded-xl border-2 border-slate-100 text-slate-600 hover:bg-slate-50 active:bg-slate-100 text-[11px] font-black uppercase tracking-widest bg-white transition-colors" 
                                     @click.stop="goToSplit(task.id)">拆分解除</button>
                             <button class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00b2b2] to-[#008585] text-white shadow-lg shadow-[#00b2b2]/30 hover:shadow-[#00b2b2]/40 active:scale-95 text-[11px] font-black uppercase tracking-widest border-none transition-all"
                                     @click.stop="assignTask(task)">
                                 <view class="i-material-symbols-person-add text-base" />
                                 <text>立即指派</text>
                             </button>
                         </template>
                         
                         <!-- In Progress tasks: show progress button -->
                         <template v-else-if="task.status === 'in_progress'">
                             <button class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-[#00b2b2]/20 text-[#00b2b2] bg-[#00b2b2]/5 hover:bg-[#00b2b2]/10 active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest">
                                 查看进度追踪
                             </button>
                         </template>
                         
                         <!-- Completed tasks: show verify button -->
                         <template v-else-if="task.status === 'completed'">
                             <button class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/40 active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest border-none">
                                 <view class="i-material-symbols-check-circle text-base" />
                                 <text>进行验收</text>
                             </button>
                         </template>
                     </view>
                 </view>
             </view>
         </view>
      </view>
    </view>
    <CustomTabBar />
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getTaskList } from '@/api/task'
import type { ITask } from '@/api/types/task'
import { getUsers, type User } from '@/api/user'
import { useUserStore } from '@/store/user'

const tasks = ref<ITask[]>([])
const users = ref<User[]>([])
const loading = ref(false)
const isSupervisor = ref(true)
const pageTitle = ref('任务管理')

// Computed statistics
const pendingCount = computed(() => tasks.value.filter(t => t.status === 'pending').length)
const inProgressCount = computed(() => tasks.value.filter(t => t.status === 'in_progress').length)
const completedCount = computed(() => tasks.value.filter(t => t.status === 'completed').length)
const overdueCount = computed(() => {
  const now = new Date()
  return tasks.value.filter(t => {
    if (!t.deadline || t.status === 'completed') return false
    return new Date(t.deadline) < now
  }).length
})
const rejectedCount = computed(() => tasks.value.filter(t => t.status === 'rejected').length)

// Task type mapping
const taskTypeMap: Record<string, string> = {
  maintenance: '设备检修',
  cleaning: '清洁卫生',
  security: '安全巡检',
  inspection: '例行检查'
}

const taskPriorityMap: Record<string, { text: string, color: string }> = {
  low: { text: '低', color: 'slate' },
  normal: { text: '中', color: 'blue' },
  high: { text: '高', color: 'orange' },
  emergency: { text: '紧急', color: 'red' }
}

const taskStatusMap: Record<string, string> = {
  pending: '待指派',
  assigned: '待开始',
  in_progress: '进行中',
  completed: '已完成',
  verified: '已验收',
  rejected: '已驳回'
}

const fetchTasks = async () => {
  loading.value = true
  try {
    console.log('[Task List] Fetching tasks...')
    const data = await getTaskList()
    tasks.value = data
    console.log('[Task List] Tasks received:', data.length)
    console.log('[Task List] Stats:', {
      pending: pendingCount.value,
      in_progress: inProgressCount.value,
      completed: completedCount.value,
      overdue: overdueCount.value,
      rejected: rejectedCount.value
    })
  } catch (error) {
    console.error('[Task List] Failed to fetch tasks:', error)
    uni.showToast({ title: '加载任务失败', icon: 'error' })
  } finally {
    loading.value = false
  }
}

// Fetch users for assignee name lookup
const fetchUsers = async () => {
  try {
    const data = await getUsers()
    users.value = data
    console.log('[Task List] Users loaded:', data.length)
  } catch (error) {
    console.error('[Task List] Failed to fetch users:', error)
  }
}

// Get assignee name by ID
const getAssigneeName = (assigneeId: number) => {
  const user = users.value.find(u => u.id === assigneeId)
  return user ? user.name : '未知用户'
}

// Show task detail
const showTaskDetail = (task: ITask) => {
  console.log('[Task List] Show detail for task:', task.id)
  uni.navigateTo({ url: `/pages/task/detail?taskId=${task.id}` })
}

// Assign task
const assignTask = (task: ITask) => {
  console.log('[Task List] Assign task:', task.id)
  uni.navigateTo({ url: `/pages/task/assign?taskId=${task.id}` })
}

const navigateTo = (url: string) => {
  uni.navigateTo({ url })
}

onShow(async () => {
  console.log('Task List Page: onShow Triggered')
  
  try {
    const userStore = useUserStore()
    const role = userStore.userInfo?.role
    // Explicitly check for employee role
    if (role === 'employee') {
      isSupervisor.value = false
      pageTitle.value = '我的任务历史'
    } else {
      // Default to supervisor for admin/supervisor/undefined (dev safety)
      isSupervisor.value = true
      pageTitle.value = '任务管理'
    }
    
    // Fetch tasks and users from API
    await Promise.all([fetchTasks(), fetchUsers()])
  } catch (error) {
    console.error('Error in Task List onShow:', error)
  }
})

// Navigate to split page (separate function to avoid tabbar error)
const goToSplit = (taskId: number) => {
  console.log('[Task List] Navigate to split page for task:', taskId)
  uni.navigateTo({ url: `/pages/task/split?taskId=${taskId}` })
}
</script>

<style>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
}
</style>
