<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'
import { ref, computed } from 'vue'
import { getTaskList } from '@/api/task'
import type { ITask } from '@/api/types/task'
import { getUsers, type User } from '@/api/user'

const tasks = ref<ITask[]>([])
const users = ref<User[]>([])
const userStore = useUserStore()

// Mappings for UI
const taskTypeMap: Record<string, string> = {
  maintenance: '设备检修',
  cleaning: '清洁卫生',
  security: '安全巡检',
  inspection: '例行检查'
}

const taskStatusMap: Record<string, string> = {
  pending: '待指派',
  assigned: '待开始',
  in_progress: '进行中',
  completed: '已完成'
}

// 计算统计数据
const completionRate = computed(() => {
  if (tasks.value.length === 0) return 0
  const completed = tasks.value.filter(t => t.status === 'completed').length
  return Math.round((completed / tasks.value.length) * 100)
})

const attendanceRate = computed(() => {
  if (users.value.length === 0) return 0
  const active = users.value.filter(u => u.status).length
  return Math.round((active / users.value.length) * 100)
})

const activeUserCount = computed(() => users.value.filter(u => u.status).length)
const totalUserCount = computed(() => users.value.length)
const pendingTaskCount = computed(() => tasks.value.filter(t => t.status === 'pending' || t.status === 'assigned').length)

const formatDate = (dateStr?: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

onShow(async () => {
  // Simple Auth Check
  const userStore = useUserStore()
  const role = userStore.userInfo.role
  console.log('[Index Page] onShow triggered, role:', role)
  
  if (!role) {
    // Not logged in, redirect to login
    console.log('[Index Page] Auth Failed - No role')
    uni.showToast({ title: 'DEBUG: Index Auth Failed (Redirect blocked)', icon: 'none', duration: 3000 })
    // uni.reLaunch({ url: '/pages/login/index' })
    return
  }

  // Fetch Tasks and Users from real API (team leader sees all tasks)
  try {
    console.log('[Index Page] Fetching tasks and users...')
    const [tasksData, usersData] = await Promise.all([
      getTaskList(),
      getUsers()
    ])
    
    console.log('[Index Page] Tasks received:', tasksData.length, tasksData)
    console.log('[Index Page] Users received:', usersData.length)
    
    tasks.value = tasksData
    users.value = usersData
    
    // Log statistics
    console.log('[Index Page] Task stats:', {
      total: tasks.value.length,
      pending: tasks.value.filter(t => t.status === 'pending').length,
      assigned: tasks.value.filter(t => t.status === 'assigned').length,
      in_progress: tasks.value.filter(t => t.status === 'in_progress').length,
      completed: tasks.value.filter(t => t.status === 'completed').length
    })
    
    uni.showToast({
      title: `加载成功: ${tasks.value.length}条任务`,
      icon: 'success'
    })
  } catch (error) {
    console.error('[Index Page] Failed to fetch data:', error)
    uni.showToast({
      title: '加载失败，请检查网络',
      icon: 'error'
    })
    tasks.value = []
    users.value = []
  }
})

const navigateTo = (url: string) => {
  if (url === '/pages/task/list' || url === '/pages/index/index' || url === '/pages/team/index' || url === '/pages/user/index') {
    uni.switchTab({ url })
  } else {
    uni.navigateTo({ url })
  }
}
</script>

<route lang="json5">
{
  style: {
    navigationBarTitleText: '班组长工作台',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] min-h-screen text-slate-900 font-display pb-28">
    <!-- Header (Fixed) -->
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 pb-3 flex items-center justify-between shadow-sm transition-all duration-300 box-border pt-[calc(env(safe-area-inset-top)+56px)]" style="position: fixed; top: 0; left: 0; right: 0; z-index: 999; padding-top: calc(env(safe-area-inset-top) + 56px);">
      <view class="flex items-center gap-3">
        <view class="relative group cursor-pointer active:scale-95 transition-transform">
          <view class="size-11 rounded-full bg-cover bg-center border-2 border-[#00b2b2] shadow-md shadow-[#00b2b2]/20" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9ni5JPq3Fb1n-ptGOUQvLTCsMEpWa_6qmrKpKzp2xGH4UjwY-PdXXgVjVfnGpN9G-FcIvR1xa7r1u844NKBS7Xwm-El5weCJJ17pOvU3rY92H1PKfbr1T99Xs4GcVBfjXl-7cx-A3DcJtxCzfHCOmWh4zWOodeDH4Z3szYWSEJQZHLmPWyLJgNhwW9BxmSQzSPM0hYsCNln4N0afZjSIxgpT82HoSEdW0GjB0PgXs3MhAIIQhZEiuos2EirWctQp6aINfjh1tFbA');"></view>
          <view class="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full border-2 border-white"></view>
        </view>
        <view class="flex flex-col">
          <text class="text-xs font-medium text-slate-500 block mb-0.5">早上好,</text>
          <text class="text-lg font-bold text-slate-900 block leading-none tracking-tight">班组长 Alex</text>
        </view>
      </view>
      <button class="relative p-2.5 rounded-full hover:bg-slate-50 active:bg-slate-100 transition-colors bg-white border border-slate-100 shadow-sm">
        <view class="i-material-symbols-notifications text-[#00b2b2] text-2xl" />
        <view class="absolute top-2 right-2.5 size-2 bg-red-500 rounded-full border border-white"></view>
      </button>
    </view>

    <!-- Spacer for Fixed Header -->
    <view class="w-full h-[260rpx] pt-safe"></view>

    <view class="flex flex-col gap-6 p-4">
      <!-- Stats Section -->
      <view>
        <view class="grid grid-cols-2 gap-3 mb-3">
          <!-- Completion Rate -->
          <view class="p-4 rounded-xl bg-gradient-to-br from-[#00b2b2]/10 to-transparent border border-[#00b2b2]/20 flex flex-col justify-between h-24 relative overflow-hidden">
            <view class="flex justify-between items-start">
              <text class="text-xs font-bold text-[#00b2b2] uppercase tracking-wider">今日完成率</text>
              <view class="i-material-symbols-check-circle text-[#00b2b2]/40 text-lg" />
            </view>
            <view class="flex items-end gap-1.5 mt-2">
              <text class="text-3xl font-bold text-slate-900">{{ completionRate }}<text class="text-lg text-slate-500 font-medium">%</text></text>
              <view class="text-[10px] font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded mb-1 flex items-center gap-0.5">
                <view class="i-material-symbols-trending-up text-[10px]" />
                <text>+2%</text>
              </view>
            </view>
            <view class="absolute -bottom-4 -right-4 size-20 rounded-full bg-[#00b2b2]/5"></view>
          </view>
          
          <!-- Attendance -->
          <view class="p-4 rounded-xl bg-white border border-slate-100 flex flex-col justify-between h-24 shadow-sm">
            <view class="flex justify-between items-start">
              <text class="text-xs font-bold text-slate-500 uppercase tracking-wider">今日出勤率</text>
              <view class="i-material-symbols-groups text-slate-300 text-lg" />
            </view>
            <view class="flex items-end gap-1.5 mt-2">
              <text class="text-3xl font-bold text-slate-900">{{ attendanceRate }}<text class="text-lg text-slate-500 font-medium">%</text></text>
              <text class="text-[10px] font-medium text-slate-500 mb-1">{{ activeUserCount }}/{{ totalUserCount }} 人</text>
            </view>
          </view>
        </view>

        <!-- Small Stats Grid -->
        <view class="grid grid-cols-3 gap-3">
          <view class="p-3 rounded-xl bg-white border border-slate-100 flex flex-col items-center justify-center gap-1 shadow-sm">
            <view class="i-material-symbols-warning text-orange-500 mb-1" />
            <text class="text-xs font-medium text-slate-500">异常报警</text>
            <text class="text-lg font-bold text-slate-900">0</text>
          </view>
          <view class="p-3 rounded-xl bg-white border border-slate-100 flex flex-col items-center justify-center gap-1 shadow-sm">
             <view class="i-material-symbols-assignment text-blue-500 mb-1" />
            <text class="text-xs font-medium text-slate-500">待办任务</text>
            <text class="text-lg font-bold text-slate-900">{{ pendingTaskCount }}</text>
          </view>
          <view class="p-3 rounded-xl bg-white border border-slate-100 flex flex-col items-center justify-center gap-1 shadow-sm">
            <view class="i-material-symbols-engineering text-purple-500 mb-1" />
            <text class="text-xs font-medium text-slate-500">工时审批</text>
            <text class="text-lg font-bold text-slate-900">2</text>
          </view>
        </view>
      </view>

      <!-- Real-time Task Board -->
      <view class="flex flex-col gap-4">
        <view class="flex items-center justify-between">
          <view class="text-lg font-bold text-slate-900 flex items-center gap-2">
            <view class="w-1 h-5 rounded-full bg-[#00b2b2]"></view>
            <text>实时任务看板</text>
          </view>
          <view class="text-xs font-medium text-[#00b2b2] flex items-center gap-0.5" @click="navigateTo('/pages/task/list')">
            <text>查看全部</text>
            <view class="i-material-symbols-chevron-right text-[16px]" />
          </view>
        </view>

        <!-- Tabs -->
        <view class="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          <button class="px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-medium whitespace-nowrap shadow-sm border-none">进行中 ({{ tasks.filter(t => t.status === 'in_progress').length }})</button>
          <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium whitespace-nowrap hover:bg-slate-50">待开始 ({{ tasks.filter(t => t.status === 'pending' || t.status === 'assigned').length }})</button>
          <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium whitespace-nowrap hover:bg-slate-50">已完成 ({{ tasks.filter(t => t.status === 'completed').length }})</button>
        </view>

        <!-- Task List -->
        <view class="flex flex-col gap-3">
          <view 
            v-for="task in tasks" 
            :key="task.id"
            class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group"
            :class="{'opacity-70': task.status === 'pending'}"
          >
            <!-- Priority Color Bar -->
            <view 
              class="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
              :class="{
                'bg-blue-500': task.type === 'maintenance',
                'bg-orange-500': task.priority === 'emergency',
                'bg-slate-300': task.type === 'security'
              }"
            ></view>
            
            <view class="flex justify-between items-start mb-2">
              <text 
                class="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide"
                :class="{
                  'bg-blue-50 text-blue-600': task.type === 'maintenance',
                  'bg-orange-50 text-orange-600': task.priority === 'emergency',
                  'bg-slate-100 text-slate-500': task.type === 'security'
                }"
              >
                {{ taskTypeMap[task.type] || task.type }}
              </text>
              <text class="text-xs text-slate-400 font-medium">{{ formatDate(task.deadline) }}</text>
            </view>
            
            <text class="text-base font-bold text-slate-900 mb-1 block">{{ task.title }}</text>
            <text class="text-xs text-slate-500 mb-3 lines-2 block">{{ task.description }}</text>
            
            <view class="flex items-center justify-between mt-2 pt-3 border-t border-slate-50">
              <view class="flex -space-x-2">
                 <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_3akt4pBE2Mma8dD_tiEytpnCMDG-SheizPG9bWt6A8uGtVSXYkT1KXbMQALEegBP7ME1YZWDPtH7OAy9Uh_Kvu36b5RWqPmy5Pj0cSSwU3lSo3AiRXHq6EmGthG8AmH3z-NzeKeHuj007ncxIrh5ug3pxaxPoBWm62x82p5gElNcoPRi9rKYa21c9YY5U-u0PsQXS9Lz4YmtWfo-SB1iEz5iAZiaqum5wei7YVjtm7mRUhVMtSXDo2h41jC1fIcFQ_A9o7zXmWM" class="size-6 rounded-full border-2 border-white" />
                 <view class="size-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] text-slate-500 font-bold">+1</view>
              </view>
              
              <view class="flex items-center gap-1 font-medium text-xs"
                :class="{
                  'text-blue-500': task.status === 'in_progress',
                  'text-orange-500': task.status === 'assigned',
                  'text-slate-400': task.status === 'pending'
                }"
              >
                <text>{{ taskStatusMap[task.status] || task.status }}</text>
                <view 
                  class="i-material-symbols-timelapse text-[16px]" 
                  :class="{'animate-pulse': task.status === 'in_progress'}" 
                />
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- Quick Actions -->
      <view>
        <view class="flex items-center justify-between mb-3">
           <view class="text-lg font-bold text-slate-900 flex items-center gap-2">
             <view class="w-1 h-5 rounded-full bg-[#00b2b2]"></view>
             <text>常用功能</text>
           </view>
        </view>
        <view class="grid grid-cols-4 gap-4">
           <!-- Action 1 -->
           <view class="flex flex-col items-center gap-2 group" @click="navigateTo('/pages/task/list')">
             <view class="size-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
               <view class="i-material-symbols-qr-code-scanner text-2xl" />
             </view>
             <text class="text-xs font-medium text-slate-600">扫码巡检</text>
           </view>
           <!-- Action 2 -->
           <view class="flex flex-col items-center gap-2 group" @click="navigateTo('/pages/task/split')">
             <view class="size-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors">
               <view class="i-material-symbols-add-task text-2xl" />
             </view>
             <text class="text-xs font-medium text-slate-600">派发任务</text>
           </view>
           <!-- Action 3 -->
           <view class="flex flex-col items-center gap-2 group">
             <view class="size-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center hover:bg-purple-100 transition-colors">
               <view class="i-material-symbols-diversity-3 text-2xl" />
             </view>
             <text class="text-xs font-medium text-slate-600">考勤排班</text>
           </view>
           <!-- Action 4 -->
           <view class="flex flex-col items-center gap-2 group">
             <view class="size-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center hover:bg-orange-100 transition-colors">
               <view class="i-material-symbols-campaign text-2xl" />
             </view>
             <text class="text-xs font-medium text-slate-600">班组通知</text>
           </view>
        </view>
      </view>
    </view>
    <CustomTabBar />
  </view>
</template>



<style>
.lines-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
