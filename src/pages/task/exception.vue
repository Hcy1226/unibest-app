<route lang="json5">
{
  style: {
    navigationBarTitleText: '任务异常统计',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] min-h-screen text-slate-900 font-display pb-28">
    <!-- Header -->
    <view class="fixed top-0 left-0 w-full z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 flex flex-col transition-all" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="h-[44px] px-4 flex items-center justify-between w-full">
          <view class="flex items-center gap-2">
             <view class="size-8 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 transition-all bg-transparent shrink-0 -ml-2" @click="handleBack">
                <view class="i-material-symbols-chevron-left text-slate-600 text-2xl" />
             </view>
             <text class="text-base font-bold text-slate-900 leading-tight">{{ pageTitle }}</text>
          </view>
          <view class="flex items-center gap-1" v-if="isSupervisor">
             <view class="size-8 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 transition-all bg-transparent shrink-0">
                <view class="i-material-symbols-calendar-month text-slate-600 text-xl" />
             </view>
             <view @click="loadData" class="size-8 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 transition-all bg-transparent shrink-0">
                <view class="i-material-symbols-refresh text-slate-600 text-xl" />
             </view>
          </view>
      </view>
    </view>
    <!-- Spacer -->
    <view :style="{ height: (44 + statusBarHeight) + 'px', width: '100%' }"></view>

    <view class="flex flex-col gap-4 p-4">
      <!-- Trends Chart (supervisor only) -->
      <view class="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col gap-6" v-if="isSupervisor">
         <view>
            <view class="flex items-center justify-between mb-4">
                <view class="text-sm font-bold flex items-center gap-2">
                   <view class="size-2 rounded-full bg-red-500"></view>
                   <text>超时任务趋势</text>
                </view>
                <text class="text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded">最近7天</text>
            </view>
            <!-- Dynamic bar chart bound to real statsData -->
            <view class="relative h-24 w-full flex items-end justify-between gap-1">
              <view v-for="(stat, i) in statsData" :key="i" class="flex-1 flex flex-col items-center gap-1">
                <view
                  class="w-full rounded-t-sm relative transition-all"
                  :class="i === statsData.length - 1 ? 'bg-red-500' : 'bg-red-100'"
                  :style="{ height: stat.count > 0 ? Math.max(8, Math.min(90, stat.count * 16)) + 'px' : '4px' }"
                >
                  <view v-if="stat.count > 0"
                    class="absolute -top-1 left-1/2 -translate-x-1/2 size-1.5 rounded-full"
                    :class="i === statsData.length - 1 ? 'bg-red-600' : 'bg-red-500'"
                  />
                </view>
                <text class="text-[8px]" :class="i === statsData.length - 1 ? 'font-bold text-red-500' : 'text-slate-400'">
                  {{ i === statsData.length - 1 ? '今日' : (stat.date ? stat.date.slice(5).replace('-', '/') : '--') }}
                </text>
              </view>
            </view>
         </view>

         <view class="pt-4 border-t border-slate-50">
             <view class="flex items-center justify-between mb-4">
                 <view class="text-sm font-bold flex items-center gap-2">
                     <view class="size-2 rounded-full bg-orange-500"></view>
                     <text>异常类型分布</text>
                 </view>
             </view>
             <view class="flex items-center gap-8">
                 <view class="relative size-20 flex-shrink-0">
                     <view class="absolute inset-0 flex flex-col items-center justify-center">
                         <text class="text-xs font-bold">{{ statsResult.totalCount }}</text>
                         <text class="text-[8px] text-slate-400">总计</text>
                     </view>
                     <!-- Simple visual ring placeholder -->
                     <view class="size-full rounded-full border-4 border-slate-100"></view>
                 </view>
                 <view class="flex flex-col gap-2">
                     <view class="flex items-center gap-2">
                         <view class="size-2 rounded-full bg-red-500"></view>
                         <text class="text-xs text-slate-500">超时任务 ({{ statsResult.overdueCount }})</text>
                     </view>
                     <view class="flex items-center gap-2">
                         <view class="size-2 rounded-full bg-orange-500"></view>
                         <text class="text-xs text-slate-500">驳回任务 ({{ statsResult.rejectedCount }})</text>
                     </view>
                 </view>
             </view>
         </view>

         <!-- Stats -->
         <view class="grid grid-cols-3 gap-3">
            <view class="p-3 rounded-xl bg-red-50 text-center border border-red-100">
               <text class="text-xl font-black text-red-600 block">{{ statsResult.overdueCount }}</text>
               <text class="text-[9px] text-red-400 font-bold uppercase tracking-wide">超时</text>
            </view>
            <view class="p-3 rounded-xl bg-orange-50 text-center border border-orange-100">
               <text class="text-xl font-black text-orange-600 block">{{ statsResult.rejectedCount }}</text>
               <text class="text-[9px] text-orange-400 font-bold uppercase tracking-wide">驳回</text>
            </view>
            <view class="p-3 rounded-xl bg-slate-50 text-center border border-slate-100">
               <text class="text-xl font-black text-slate-700 block">{{ statsResult.totalCount }}</text>
               <text class="text-[9px] text-slate-400 font-bold uppercase tracking-wide">总计</text>
            </view>
         </view>
      </view>

      <!-- Stats row (employee only) -->
      <view v-if="!isSupervisor" class="grid grid-cols-3 gap-3">
         <view class="p-3 rounded-xl bg-red-50 text-center border border-red-100">
            <text class="text-xl font-black text-red-600 block">{{ statsResult.overdueCount }}</text>
            <text class="text-[9px] text-red-400 font-bold uppercase tracking-wide">超时</text>
         </view>
         <view class="p-3 rounded-xl bg-orange-50 text-center border border-orange-100">
            <text class="text-xl font-black text-orange-600 block">{{ statsResult.rejectedCount }}</text>
            <text class="text-[9px] text-orange-400 font-bold uppercase tracking-wide">驳回</text>
         </view>
         <view class="p-3 rounded-xl bg-slate-50 text-center border border-slate-100">
            <text class="text-xl font-black text-slate-700 block">{{ statsResult.totalCount }}</text>
            <text class="text-[9px] text-slate-400 font-bold uppercase tracking-wide">总计</text>
         </view>
      </view>

      <!-- Filter Tabs -->
       <view class="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
         <view @click="filterType = 'all'" class="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
           :class="filterType === 'all' ? 'bg-[#00b2b2] text-white' : 'bg-white border border-slate-200 text-slate-600'">全部异常</view>
         <view @click="filterType = 'overdue'" class="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
           :class="filterType === 'overdue' ? 'bg-red-500 text-white' : 'bg-white border border-slate-200 text-slate-600'">仅超时</view>
         <view @click="filterType = 'rejected'" class="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
           :class="filterType === 'rejected' ? 'bg-orange-500 text-white' : 'bg-white border border-slate-200 text-slate-600'">仅驳回</view>
       </view>

       <!-- Exception List -->
       <view class="flex flex-col gap-3">
           <view class="flex items-center justify-between">
               <text class="text-sm font-bold text-slate-900">异常记录明细</text>
               <text class="text-[10px] text-slate-400">共 {{ filteredExceptions.length }} 条异常</text>
           </view>

           <!-- Loading state -->
           <view v-if="loading" class="flex justify-center items-center py-12">
             <view class="size-6 border-2 border-[#00b2b2] border-t-transparent rounded-full animate-spin"></view>
           </view>

           <!-- Empty state -->
           <view v-else-if="filteredExceptions.length === 0" class="flex flex-col items-center justify-center py-12 gap-3">
             <view class="i-material-symbols-check-circle text-6xl text-green-300"></view>
             <text class="text-sm font-bold text-slate-400">暂无异常任务 🎉</text>
           </view>

           <!-- Dynamic exception items -->
           <view v-else v-for="item in filteredExceptions" :key="item.id"
             class="p-4 rounded-2xl bg-white border-l-4 border border-slate-100 shadow-sm flex flex-col gap-3 active:scale-[0.98] transition-transform"
             :class="item.exceptionType === 'overdue' ? 'border-l-red-500' : 'border-l-orange-500'"
             @click="goToDetail(item.id)"
           >
             <view class="flex justify-between items-start">
               <view class="flex-1 pr-3">
                 <text class="text-sm font-bold text-slate-900 mb-0.5 block">{{ item.title }}</text>
                 <view class="flex items-center gap-2">
                   <text v-if="item.exceptionType === 'overdue'" class="text-[10px] px-1.5 py-0.5 bg-red-50 text-red-600 font-bold rounded">任务超时</text>
                   <text v-else class="text-[10px] px-1.5 py-0.5 bg-orange-50 text-orange-600 font-bold rounded">任务被驳回</text>
                   <text class="text-[10px] text-slate-400">{{ item.assignee?.name || '未指派' }}</text>
                 </view>
               </view>
               <view class="flex flex-col items-end gap-1">
                 <text v-if="item.exceptionType === 'overdue'" class="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full whitespace-nowrap">超期 {{ item.overdueDays }} 天</text>
                 <text v-else class="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">已驳回</text>
               </view>
             </view>
             <view class="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
               <text class="text-xs text-slate-500 italic">截止日期</text>
               <text class="text-xs font-bold" :class="item.exceptionType === 'overdue' ? 'text-red-600' : 'text-orange-600'">{{ formatDate(item.deadline) }}</text>
             </view>
           </view>
       </view>

    </view>
  </view>
</template>

<script lang="ts" setup>
import { handleBack } from '@/utils/navigation'
import { ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { http } from '@/http/http'

const isSupervisor = ref(false)
const pageTitle = ref('任务异常统计')
const statusBarHeight = ref(0)
const loading = ref(false)
const filterType = ref('all') // 'all' | 'overdue' | 'rejected'

interface ExceptionTask {
  id: number
  title: string
  status: string
  deadline?: string
  assignee?: { name: string }
  exceptionType: 'overdue' | 'rejected'
  overdueDays: number
  description?: string
}

const exceptions = ref<ExceptionTask[]>([])
const statsResult = ref({ overdueCount: 0, rejectedCount: 0, totalCount: 0 })
const statsData = ref<Array<{ date: string; count: number }>>(
  Array.from({ length: 7 }, () => ({ date: '', count: 0 }))
)

const filteredExceptions = computed(() => {
  if (filterType.value === 'overdue') return exceptions.value.filter(e => e.exceptionType === 'overdue')
  if (filterType.value === 'rejected') return exceptions.value.filter(e => e.exceptionType === 'rejected')
  return exceptions.value
})

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '未设置'
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

const goToDetail = (taskId: number) => {
  uni.navigateTo({ url: `/pages/task/detail?taskId=${taskId}` })
}

const loadData = async () => {
  loading.value = true
  try {
    const endpoint = isSupervisor.value ? '/tasks/exceptions' : '/tasks/my-exceptions'
    const [exceptionsRes, statsRes] = await Promise.all([
      http.get<ExceptionTask[]>(endpoint),
      isSupervisor.value ? http.get<any>('/tasks/exceptions/stats') : Promise.resolve(null)
    ])
    exceptions.value = Array.isArray(exceptionsRes) ? exceptionsRes : (exceptionsRes as any)?.data || []
    if (statsRes) {
      statsResult.value = statsRes as any
      statsData.value = (statsRes as any).stats || statsData.value
    } else {
      // For employee, calculate stats from own exceptions
      statsResult.value = {
        overdueCount: exceptions.value.filter(e => e.exceptionType === 'overdue').length,
        rejectedCount: exceptions.value.filter(e => e.exceptionType === 'rejected').length,
        totalCount: exceptions.value.length,
      }
    }
  } catch (e) {
    console.error('[Exception] Failed to load:', e)
    uni.showToast({ title: '加载失败', icon: 'error' })
  } finally {
    loading.value = false
  }
}

onLoad(() => {
    statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight || 20
})

onShow(() => {
  const userInfo = uni.getStorageSync('userInfo')
  const role = userInfo?.role || uni.getStorageSync('userRole')
  isSupervisor.value = role !== 'employee'
  pageTitle.value = isSupervisor.value ? '任务异常统计' : '我的异常记录'
  loadData()
})
</script>
