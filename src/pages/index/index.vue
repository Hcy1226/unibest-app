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
  <view class="bg-slate-50 min-h-screen text-slate-900 font-display pb-28">
    <!-- Header (Fixed) with Glassmorphism -->
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/80 backdrop-blur-xl border-b border-white/50 px-5 flex items-center justify-between shadow-sm transition-all duration-300 box-border pt-[var(--status-bar-height)] h-[calc(var(--status-bar-height)+56px)]">
      <view class="flex items-center gap-3">
        <view class="relative group cursor-pointer active:scale-95 transition-transform">
          <view class="size-12 rounded-full bg-cover bg-center border-[3px] border-white shadow-md" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9ni5JPq3Fb1n-ptGOUQvLTCsMEpWa_6qmrKpKzp2xGH4UjwY-PdXXgVjVfnGpN9G-FcIvR1xa7r1u844NKBS7Xwm-El5weCJJ17pOvU3rY92H1PKfbr1T99Xs4GcVBfjXl-7cx-A3DcJtxCzfHCOmWh4zWOodeDH4Z3szYWSEJQZHLmPWyLJgNhwW9BxmSQzSPM0hYsCNln4N0afZjSIxgpT82HoSEdW0GjB0PgXs3MhAIIQhZEiuos2EirWctQp6aINfjh1tFbA');"></view>
          <view class="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm"></view>
        </view>
        <view class="flex flex-col">
          <text class="text-xs font-bold text-slate-400 tracking-wider uppercase mb-0.5">早上好</text>
          <text class="text-xl font-black text-slate-800 block leading-none tracking-tight">班组长 Alex</text>
        </view>
      </view>
      <view class="relative size-10 rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 cursor-pointer">
        <view class="i-material-symbols-notifications text-slate-700 text-2xl" />
        <view class="absolute top-[2px] right-[4px] size-2 bg-red-500 rounded-full border-2 border-white"></view>
      </view>
    </view>

    <!-- Spacer for Fixed Header -->
    <view class="w-full h-[calc(var(--status-bar-height)+70px)]"></view>

    <view class="flex flex-col gap-8 px-5 py-2">
      <!-- Stats Section -->
      <view class="animate-fade-in-up">
        <view class="text-lg font-black text-slate-800 mb-4 tracking-tight">今日概览</view>
        
        <view class="grid grid-cols-2 gap-4 mb-4">
          <!-- Completion Rate (Gradient Card) -->
          <view class="p-5 rounded-[1.5rem] bg-gradient-to-br from-[#00b2b2] to-[#008585] shadow-lg shadow-[#00b2b2]/30 flex flex-col justify-between h-32 relative overflow-hidden transform transition-transform hover:-translate-y-1 active:scale-95 duration-300">
            <view class="flex justify-between items-start relative z-10">
              <text class="text-xs font-bold text-white/90 uppercase tracking-widest">今日完成率</text>
              <view class="p-1 rounded-full bg-white/20 backdrop-blur-sm">
                <view class="i-material-symbols-check-circle text-white text-lg" />
              </view>
            </view>
            <view class="flex items-end gap-1.5 mt-2 relative z-10">
              <text class="text-4xl font-black text-white">{{ completionRate }}<text class="text-xl font-bold opacity-80">%</text></text>
              <view class="text-[10px] font-bold text-[#008585] bg-white px-2 py-0.5 rounded-full mb-1.5 flex items-center gap-0.5 shadow-sm">
                <view class="i-material-symbols-trending-up text-[10px]" />
                <text>+2%</text>
              </view>
            </view>
            <!-- Decorative circle -->
            <view class="absolute -bottom-6 -right-6 size-24 rounded-full bg-white/10 blur-xl"></view>
          </view>
          
          <!-- Attendance -->
          <view class="p-5 rounded-[1.5rem] bg-white border border-slate-100/60 shadow-md shadow-slate-200/50 flex flex-col justify-between h-32 transform transition-transform hover:-translate-y-1 active:scale-95 duration-300">
            <view class="flex justify-between items-start">
              <text class="text-xs font-bold text-slate-500 uppercase tracking-widest">今日出勤率</text>
              <view class="p-1 rounded-full bg-slate-50">
                <view class="i-material-symbols-groups text-slate-400 text-lg" />
              </view>
            </view>
            <view class="flex items-end gap-1.5 mt-2">
              <text class="text-4xl font-black text-slate-800">{{ attendanceRate }}<text class="text-xl font-bold text-slate-400">%</text></text>
              <text class="text-[10px] font-bold text-slate-400 mb-1.5 bg-slate-50 px-2 py-0.5 rounded-full">{{ activeUserCount }}/{{ totalUserCount }} 人</text>
            </view>
          </view>
        </view>

        <!-- Small Stats Grid -->
        <view class="grid grid-cols-3 gap-4 border-t border-slate-200/60 pt-6 mt-2">
          <view class="flex flex-col items-center justify-center gap-2">
            <view class="size-12 rounded-[1rem] bg-orange-50 text-orange-500 flex items-center justify-center shadow-inner">
              <view class="i-material-symbols-warning-outline text-2xl drop-shadow-sm" />
            </view>
            <text class="text-xl font-black text-slate-800 leading-none mt-1">0</text>
            <text class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">异常报警</text>
          </view>
          <view class="flex flex-col items-center justify-center gap-2 relative">
             <!-- Vertical Dividers -->
             <view class="absolute left-0 top-[10%] bottom-[10%] w-px bg-slate-200/60"></view>
             <view class="absolute right-0 top-[10%] bottom-[10%] w-px bg-slate-200/60"></view>
             <view class="size-12 rounded-[1rem] bg-blue-50 text-blue-500 flex items-center justify-center shadow-inner">
              <view class="i-material-symbols-assignment-outline text-2xl drop-shadow-sm" />
            </view>
            <text class="text-xl font-black text-slate-800 leading-none mt-1">{{ pendingTaskCount }}</text>
            <text class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">待办任务</text>
          </view>
          <view class="flex flex-col items-center justify-center gap-2">
            <view class="size-12 rounded-[1rem] bg-purple-50 text-purple-500 flex items-center justify-center shadow-inner">
              <view class="i-material-symbols-engineering-outline text-2xl drop-shadow-sm" />
            </view>
            <text class="text-xl font-black text-slate-800 leading-none mt-1">2</text>
            <text class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">工时审批</text>
          </view>
        </view>
      </view>

      <!-- Real-time Task Board -->
      <view class="flex flex-col gap-4 animate-fade-in-up" style="animation-delay: 100ms">
        <view class="flex items-center justify-between">
          <view class="text-lg font-black text-slate-800 tracking-tight">实时任务看板</view>
          <view class="text-xs font-bold text-[#00b2b2] flex items-center gap-0.5 bg-[#00b2b2]/10 px-3 py-1.5 rounded-full active:bg-[#00b2b2]/20 transition-colors" @click="navigateTo('/pages/task/list')">
            <text>查看全部</text>
            <view class="i-material-symbols-chevron-right text-sm" />
          </view>
        </view>

        <!-- Tabs -->
        <view class="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1">
          <button class="px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold whitespace-nowrap shadow-md shadow-slate-900/20 active:scale-95 transition-transform border-none flex items-center gap-2">
            进行中 <text class="bg-white/20 px-2 py-0.5 rounded-full text-xs font-black">{{ tasks.filter(t => t.status === 'in_progress').length }}</text>
          </button>
          <button class="px-5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-bold whitespace-nowrap shadow-sm active:scale-95 transition-transform flex items-center gap-2">
            待开始 <text class="bg-slate-100 px-2 py-0.5 rounded-full text-xs font-black text-slate-500">{{ tasks.filter(t => t.status === 'pending' || t.status === 'assigned').length }}</text>
          </button>
          <button class="px-5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-bold whitespace-nowrap shadow-sm active:scale-95 transition-transform flex items-center gap-2">
            已完成 <text class="bg-slate-100 px-2 py-0.5 rounded-full text-xs font-black text-slate-500">{{ tasks.filter(t => t.status === 'completed').length }}</text>
          </button>
        </view>

        <!-- Task List -->
        <view class="flex flex-col gap-4 mt-2">
          <view 
            v-for="task in tasks.slice(0, 3)" 
            :key="task.id"
            class="bg-white p-5 rounded-[1.5rem] border border-slate-100/60 shadow-md shadow-slate-200/50 relative overflow-hidden group active:scale-[0.98] transition-transform duration-300"
            :class="{'opacity-80': task.status === 'pending'}"
          >
            <!-- Premium Left Border Glow -->
            <view 
              class="absolute left-0 top-0 bottom-0 w-1.5 opacity-90"
              :class="{
                'bg-gradient-to-b from-blue-400 to-blue-600': task.type === 'maintenance',
                'bg-gradient-to-b from-orange-400 to-red-500': task.priority === 'emergency',
                'bg-gradient-to-b from-slate-300 to-slate-400': task.type === 'security'
              }"
            ></view>
            
            <view class="flex justify-between items-start mb-3 pl-1">
              <view class="flex items-center gap-2">
                <text 
                  class="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest"
                  :class="{
                    'bg-blue-50 text-blue-600 ring-1 ring-blue-500/20': task.type === 'maintenance',
                    'bg-orange-50 text-orange-600 ring-1 ring-orange-500/20': task.priority === 'emergency',
                    'bg-slate-100 text-slate-500 ring-1 ring-slate-500/20': task.type === 'security'
                  }"
                >
                  {{ taskTypeMap[task.type] || task.type }}
                </text>
              </view>
              <text class="text-[11px] text-slate-400 font-bold bg-slate-50 px-2 py-1 rounded-md">{{ formatDate(task.deadline) }} 截止</text>
            </view>
            
            <text class="text-base font-black text-slate-800 mb-1.5 block tracking-wide pl-1">{{ task.title }}</text>
            <text class="text-sm font-medium text-slate-500 mb-4 lines-2 block leading-relaxed pl-1">{{ task.description }}</text>
            
            <view class="flex items-center justify-between mt-4 pt-4 border-t border-slate-100/80 pl-1">
              <view class="flex -space-x-2 relative group-hover:transform group-hover:translate-x-1 transition-transform">
                 <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_3akt4pBE2Mma8dD_tiEytpnCMDG-SheizPG9bWt6A8uGtVSXYkT1KXbMQALEegBP7ME1YZWDPtH7OAy9Uh_Kvu36b5RWqPmy5Pj0cSSwU3lSo3AiRXHq6EmGthG8AmH3z-NzeKeHuj007ncxIrh5ug3pxaxPoBWm62x82p5gElNcoPRi9rKYa21c9YY5U-u0PsQXS9Lz4YmtWfo-SB1iEz5iAZiaqum5wei7YVjtm7mRUhVMtSXDo2h41jC1fIcFQ_A9o7zXmWM" class="size-7 rounded-full border-2 border-white shadow-sm" />
                 <view class="size-7 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-[10px] text-slate-500 font-black">+1</view>
              </view>
              
              <view class="flex items-center gap-1.5 font-bold text-xs"
                :class="{
                  'text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full': task.status === 'in_progress',
                  'text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full': task.status === 'assigned',
                  'text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full': task.status === 'pending'
                }"
              >
                <view 
                  class="i-material-symbols-timelapse text-base" 
                  :class="{'animate-spin': task.status === 'in_progress'}" 
                />
                <text>{{ taskStatusMap[task.status] || task.status }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- Quick Actions -->
      <view class="animate-fade-in-up" style="animation-delay: 200ms">
        <view class="text-lg font-black text-slate-800 tracking-tight mb-4">快捷操作</view>
        
        <view class="grid grid-cols-4 gap-3 bg-white p-4 rounded-[1.5rem] shadow-md shadow-slate-200/50 border border-slate-100/60">
           <!-- Action 1 -->
           <view class="flex flex-col items-center gap-2 cursor-pointer active:scale-90 transition-transform" @click="navigateTo('/pages/task/list')">
             <view class="size-14 rounded-[1.2rem] bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 flex items-center justify-center shadow-inner">
               <view class="i-material-symbols-qr-code-scanner text-3xl drop-shadow-sm" />
             </view>
             <text class="text-[11px] font-bold text-slate-600 tracking-wide mt-1">扫码巡检</text>
           </view>
           <!-- Action 2 -->
           <view class="flex flex-col items-center gap-2 cursor-pointer active:scale-90 transition-transform" @click="navigateTo('/pages/task/split')">
             <view class="size-14 rounded-[1.2rem] bg-gradient-to-br from-green-50 to-green-100 text-green-600 flex items-center justify-center shadow-inner">
               <view class="i-material-symbols-add-task text-3xl drop-shadow-sm" />
             </view>
             <text class="text-[11px] font-bold text-slate-600 tracking-wide mt-1">派发任务</text>
           </view>
           <!-- Action 3 -->
           <view class="flex flex-col items-center gap-2 cursor-pointer active:scale-90 transition-transform">
             <view class="size-14 rounded-[1.2rem] bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 flex items-center justify-center shadow-inner">
               <view class="i-material-symbols-diversity-3 text-3xl drop-shadow-sm" />
             </view>
             <text class="text-[11px] font-bold text-slate-600 tracking-wide mt-1">考勤排班</text>
           </view>
           <!-- Action 4 -->
           <view class="flex flex-col items-center gap-2 cursor-pointer active:scale-90 transition-transform">
             <view class="size-14 rounded-[1.2rem] bg-gradient-to-br from-orange-50 to-orange-100 text-orange-600 flex items-center justify-center shadow-inner">
               <view class="i-material-symbols-campaign text-3xl drop-shadow-sm" />
             </view>
             <text class="text-[11px] font-bold text-slate-600 tracking-wide mt-1">班组通知</text>
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
