<route lang="json5">
{
  style: {
    navigationBarTitleText: '统计',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#f6f8fa] dark:bg-[#17191c] min-h-screen font-display text-slate-900 dark:text-slate-100 overflow-x-hidden pb-24">
    <!-- Header -->
    <view class="sticky top-0 z-30 bg-white/90 dark:bg-[#23262a]/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 flex items-center justify-between" :style="{ paddingTop: statusBarHeight + 'px', height: (44 + statusBarHeight) + 'px' }">
      <view class="flex items-center gap-3">
        <view class="relative group cursor-pointer">
          <image :src="userStore.userInfo?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9ni5JPq3Fb1n-ptGOUQvLTCsMEpWa_6qmrKpKzp2xGH4UjwY-PdXXgVjVfnGpN9G-FcIvR1xa7r1u844NKBS7Xwm-El5weCJJ17pOvU3rY92H1PKfbr1T99Xs4GcVBfjXl-7cx-A3DcJtxCzfHCOmWh4zWOodeDH4Z3szYWSEJQZHLmPWyLJgNhwW9BxmSQzSPM0hYsCNln4N0afZjSIxgpT82HoSEdW0GjB0PgXs3MhAIIQhZEiuos2EirWctQp6aINfjh1tFbA'" class="size-10 rounded-full border-2 border-[#00b2b2]" />
          <view class="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white dark:border-[#23262a]"></view>
        </view>
        <view>
          <text class="text-[10px] font-medium text-slate-500 dark:text-slate-400 block">综合统计与绩效中心</text>
          <text class="text-base font-bold text-slate-900 dark:text-white leading-tight block">{{ userStore.userInfo?.name || '操作员' }}</text>
        </view>
      </view>
      <view class="flex items-center gap-1">
        <button class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors bg-transparent border-none">
          <view class="i-material-symbols-search text-slate-600 dark:text-slate-300 text-xl" />
        </button>
        <button class="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors bg-transparent border-none">
          <view class="i-material-symbols-notifications text-slate-600 dark:text-slate-300 text-xl" />
          <view class="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border border-white dark:border-[#23262a]"></view>
        </button>
      </view>
    </view>

    <view class="flex flex-col gap-4 p-4 mb-safe">
      <!-- Month Overview -->
      <view class="flex items-center justify-between">
        <view>
          <text class="text-xl font-bold text-slate-900 dark:text-white block">10月 绩效概览</text>
          <view class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
            <view class="i-material-symbols-info text-xs" />
            <text>考核周期：2023.10.01 - 10.31</text>
          </view>
        </view>
        <button class="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-[#23262a] border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-sm hover:bg-slate-50 transition-colors">
          <text>10月</text>
          <view class="i-material-symbols-expand-more text-base" />
        </button>
      </view>

      <!-- Stats Grid -->
      <view class="grid grid-cols-6 gap-3">
        <!-- Main Highlight -->
        <view class="col-span-3 p-4 rounded-2xl bg-gradient-to-br from-[#00b2b2] to-[#008f8f] text-white shadow-lg shadow-[#00b2b2]/20 flex flex-col justify-between h-36 relative overflow-hidden group">
          <view class="absolute right-[-10px] top-[-10px] opacity-10 transform rotate-12 transition-transform duration-500">
            <view class="i-material-symbols-assignment-turned-in text-[80px]" />
          </view>
          <view class="flex items-start justify-between z-10 w-full line-height-1">
            <view class="p-1.5 rounded-lg bg-white/20 backdrop-blur-sm">
              <view class="i-material-symbols-task-alt text-xl" />
            </view>
            <text class="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded text-white/90">本月</text>
          </view>
          <view class="z-10 w-full mt-2">
            <text class="text-xs font-medium text-white/80 block">完成任务数</text>
            <view class="flex items-baseline gap-1 mt-0.5">
              <text class="text-3xl font-bold">{{ stats.monthlyCompletedCount }}</text>
              <text class="text-xs font-normal text-white/70">单</text>
            </view>
          </view>
        </view>

        <!-- Right Side Small Metrics -->
        <view class="col-span-3 grid grid-cols-1 gap-3">
          <view class="p-3 rounded-2xl bg-white dark:bg-[#23262a] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-center">
            <view class="flex items-center gap-2 mb-1">
              <view class="i-material-symbols-timer text-orange-500 text-lg" />
              <text class="text-xs font-medium text-slate-500">投入工时</text>
            </view>
            <view class="flex items-baseline gap-1">
              <text class="text-xl font-bold text-slate-900 dark:text-white">{{ stats.totalWorkHours }}</text>
              <text class="text-[10px] text-slate-400">h</text>
            </view>
          </view>
          <view class="p-3 rounded-2xl bg-white dark:bg-[#23262a] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-center">
            <view class="flex items-center gap-2 mb-1">
              <view class="i-material-symbols-star text-purple-500 text-lg" />
              <text class="text-xs font-medium text-slate-500">综合评分</text>
            </view>
            <view class="flex items-baseline gap-1">
              <text class="text-xl font-bold text-slate-900 dark:text-white">{{ stats.averageRating }}</text>
              <text class="text-[10px] text-slate-400">/ 5.0</text>
            </view>
          </view>
        </view>

        <!-- Bottom Row Metrics -->
        <view class="col-span-3 p-3 rounded-2xl bg-white dark:bg-[#23262a] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-center">
          <view class="flex items-center gap-2 mb-1">
            <view class="i-material-symbols-verified text-blue-500 text-lg" />
            <text class="text-xs font-medium text-slate-500">本周质量分</text>
          </view>
          <view class="flex items-baseline gap-1">
            <text class="text-xl font-bold text-slate-900 dark:text-white">{{ stats.qualityScore }}</text>
            <text class="text-[10px] text-slate-400">分</text>
          </view>
        </view>
        <view class="col-span-3 p-3 rounded-2xl bg-white dark:bg-[#23262a] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-center">
          <view class="flex items-center gap-2 mb-1">
            <view class="i-material-symbols-bolt text-green-500 text-lg" />
            <text class="text-xs font-medium text-slate-500">准时率</text>
          </view>
          <view class="flex items-baseline gap-1">
            <text class="text-xl font-bold text-slate-900 dark:text-white">{{ stats.onTimeRate }}</text>
            <text class="text-[10px] text-slate-400">%</text>
          </view>
        </view>
      </view>

      <!-- Alert Section -->
      <view class="p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
        <view class="flex items-center justify-between mb-4">
          <view class="flex items-center gap-2">
            <view class="i-material-symbols-report text-red-500" />
            <text class="font-bold text-slate-900 dark:text-white text-sm">待改进提醒</text>
            <text class="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">2</text>
          </view>
          <button class="text-slate-500 text-xs font-medium flex items-center hover:opacity-80 bg-transparent border-none">
            <text>查看历史</text>
            <view class="i-material-symbols-chevron-right text-sm" />
          </button>
        </view>
        
        <view class="flex flex-col gap-3">
          <view class="bg-white dark:bg-[#23262a] p-3 rounded-xl border border-red-200 dark:border-red-800 flex items-center justify-between shadow-sm">
            <view class="flex items-center gap-3">
              <view class="size-10 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
                <view class="i-material-symbols-event-busy text-red-500" />
              </view>
              <view>
                <text class="text-xs font-bold text-slate-900 dark:text-white block">任务超时：南区机房巡检</text>
                <text class="text-[10px] text-slate-500 mt-0.5 block">超时时长：24分钟</text>
              </view>
            </view>
            <button class="px-3 py-1.5 rounded-lg bg-[#00b2b2] text-white text-[10px] font-bold hover:bg-[#00b2b2]/90 border-none m-0 shrink-0">去整改</button>
          </view>
          
          <view class="bg-white dark:bg-[#23262a] p-3 rounded-xl border border-red-200 dark:border-red-800 flex items-center justify-between shadow-sm">
            <view class="flex items-center gap-3">
              <view class="size-10 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
                <view class="i-material-symbols-assignment-return text-orange-500" />
              </view>
              <view>
                <text class="text-xs font-bold text-slate-900 dark:text-white block">任务被驳回：B2设备维修</text>
                <text class="text-[10px] text-slate-500 mt-0.5 block">原因：现场照片不清晰</text>
              </view>
            </view>
            <button class="px-3 py-1.5 rounded-lg bg-[#00b2b2] text-white text-[10px] font-bold hover:bg-[#00b2b2]/90 border-none m-0 shrink-0">去整改</button>
          </view>
        </view>
      </view>

      <view class="p-4 rounded-2xl bg-[#00b2b2]/5 dark:bg-[#00b2b2]/10 border border-[#00b2b2]/20 flex items-center gap-4">
        <view class="size-12 rounded-xl bg-[#00b2b2] text-white flex items-center justify-center shrink-0">
          <view class="i-material-symbols-school text-2xl" />
        </view>
        <view class="flex-1">
          <text class="text-sm font-bold text-slate-900 dark:text-white block">提升指南</text>
          <text class="text-xs text-slate-500 mt-0.5 block">了解如何优化准时率和质量评分</text>
        </view>
        <view class="i-material-symbols-arrow-forward-ios text-[#00b2b2] text-xl" />
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
const statusBarHeight = ref(0)

const stats = ref({
  monthlyCompletedCount: 0,
  totalWorkHours: '0.0',
  averageRating: '0.00',
  qualityScore: '0.0',
  onTimeRate: '100.0'
})

const fetchStatistics = async () => {
  try {
    const res = await http.get('/tasks/my-statistics')
    
    if (res) {
      stats.value = res as any
    }
  } catch (error) {
    console.error('Failed to fetch statistics:', error)
  }
}

onLoad(() => {
    statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight || 20
})

onShow(() => {
    fetchStatistics()
})
</script>

<style>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
