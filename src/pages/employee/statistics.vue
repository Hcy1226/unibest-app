<route lang="json5">
{
  style: {
    navigationBarTitleText: '统计',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] dark:bg-[#17191c] min-h-screen font-display text-slate-900 dark:text-slate-100 overflow-x-hidden pb-24">
    <!-- Header -->
    <view class="sticky top-0 z-30 bg-white/95 dark:bg-[#23262a]/95 backdrop-blur-xl border-b border-white/50 dark:border-slate-800 px-5 flex items-center justify-between shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]" :style="{ paddingTop: statusBarHeight + 'px', height: (44 + statusBarHeight) + 'px' }">
      <view class="flex items-center gap-3">
        <view class="relative group cursor-pointer">
          <image :src="userStore.userInfo?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9ni5JPq3Fb1n-ptGOUQvLTCsMEpWa_6qmrKpKzp2xGH4UjwY-PdXXgVjVfnGpN9G-FcIvR1xa7r1u844NKBS7Xwm-El5weCJJ17pOvU3rY92H1PKfbr1T99Xs4GcVBfjXl-7cx-A3DcJtxCzfHCOmWh4zWOodeDH4Z3szYWSEJQZHLmPWyLJgNhwW9BxmSQzSPM0hYsCNln4N0afZjSIxgpT82HoSEdW0GjB0PgXs3MhAIIQhZEiuos2EirWctQp6aINfjh1tFbA'" class="size-10 rounded-full border-2 border-[#00b2b2] shadow-sm" />
          <view class="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white dark:border-[#23262a]"></view>
        </view>
        <view class="flex flex-col">
          <text class="text-[10px] font-black tracking-widest uppercase text-[#00b2b2] dark:text-[#00e5e5] block">综合统计与绩效中心</text>
          <text class="text-lg font-black text-slate-800 dark:text-white leading-tight tracking-tight block">{{ userStore.userInfo?.name || '操作员' }}</text>
        </view>
      </view>
      <view class="flex items-center gap-1 -mr-2">
        <view class="size-10 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors bg-transparent border-none active:scale-90 shrink-0 cursor-pointer">
          <view class="i-material-symbols-notifications text-slate-600 dark:text-slate-300 text-xl" />
        </view>
      </view>
    </view>

    <view class="flex flex-col gap-6 p-5 mb-safe">
      <!-- Month Overview -->
      <view class="flex items-center justify-between">
        <view>
          <text class="text-xl font-black text-slate-800 dark:text-white tracking-tight block">10月 绩效概览</text>
          <view class="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1 font-medium">
            <view class="i-material-symbols-info text-[14px]" />
            <text>考核周期：2023.10.01 - 10.31</text>
          </view>
        </view>
        <button class="flex items-center gap-1 px-4 py-2 rounded-xl bg-white dark:bg-[#23262a] border border-slate-100 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 shadow-sm active:bg-slate-50 transition-colors m-0 backdrop-blur-md">
          <text>10月</text>
          <view class="i-material-symbols-expand-more text-base" />
        </button>
      </view>

      <!-- Stats Grid -->
      <view class="grid grid-cols-6 gap-4">
        <!-- Main Highlight -->
        <view class="col-span-3 p-5 rounded-[1.5rem] bg-gradient-to-br from-[#00b2b2] to-[#008f8f] text-white shadow-xl shadow-[#00b2b2]/20 flex flex-col justify-between h-40 relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <view class="absolute -right-4 -top-4 opacity-10 transform rotate-12 group-hover:rotate-45 transition-transform duration-700">
            <view class="i-material-symbols-assignment-turned-in text-[100px]" />
          </view>
          <view class="flex items-start justify-between z-10 w-full line-height-1">
            <view class="p-2 rounded-xl bg-white/20 backdrop-blur-sm shadow-inner">
              <view class="i-material-symbols-task-alt text-xl" />
            </view>
            <text class="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded text-white/90">本月</text>
          </view>
          <view class="z-10 w-full mt-2">
            <text class="text-[11px] font-bold text-white/80 tracking-widest block">完成任务数</text>
            <view class="flex items-baseline gap-1 mt-0.5">
              <text class="text-4xl font-black">{{ stats.monthlyCompletedCount }}</text>
              <text class="text-xs font-bold text-white/70">单</text>
            </view>
          </view>
        </view>

        <!-- Right Side Small Metrics -->
        <view class="col-span-3 grid grid-cols-1 gap-4">
          <view class="p-4 rounded-[1.5rem] bg-white dark:bg-[#23262a] border border-slate-100/80 dark:border-slate-800 shadow-sm flex flex-col justify-center active:scale-95 transition-transform">
            <view class="flex items-center gap-2 mb-1">
              <view class="i-material-symbols-timer text-orange-500 text-lg" />
              <text class="text-[11px] font-bold tracking-widest text-slate-400">投入工时</text>
            </view>
            <view class="flex items-baseline gap-1">
              <text class="text-2xl font-black text-slate-800 dark:text-white">{{ stats.totalWorkHours }}</text>
              <text class="text-[10px] font-bold text-slate-400">h</text>
            </view>
          </view>
          <view class="p-4 rounded-[1.5rem] bg-white dark:bg-[#23262a] border border-slate-100/80 dark:border-slate-800 shadow-sm flex flex-col justify-center active:scale-95 transition-transform">
            <view class="flex items-center gap-2 mb-1">
              <view class="i-material-symbols-star text-purple-500 text-lg" />
              <text class="text-[11px] font-bold tracking-widest text-slate-400">综合评分</text>
            </view>
            <view class="flex items-baseline gap-1">
              <text class="text-2xl font-black text-slate-800 dark:text-white">{{ stats.averageRating }}</text>
              <text class="text-[10px] font-bold text-slate-400">/ 5.0</text>
            </view>
          </view>
        </view>

        <!-- Bottom Row Metrics -->
        <view class="col-span-3 p-4 rounded-[1.5rem] bg-white dark:bg-[#23262a] border border-slate-100/80 dark:border-slate-800 shadow-sm flex flex-col justify-center active:scale-95 transition-transform">
          <view class="flex items-center gap-2 mb-1">
            <view class="i-material-symbols-verified text-blue-500 text-lg" />
            <text class="text-[11px] font-bold tracking-widest text-slate-400">本周质量分</text>
          </view>
          <view class="flex items-baseline gap-1">
            <text class="text-2xl font-black text-slate-800 dark:text-white">{{ stats.qualityScore }}</text>
            <text class="text-[10px] font-bold text-slate-400">分</text>
          </view>
        </view>
        <view class="col-span-3 p-4 rounded-[1.5rem] bg-white dark:bg-[#23262a] border border-slate-100/80 dark:border-slate-800 shadow-sm flex flex-col justify-center active:scale-95 transition-transform">
          <view class="flex items-center gap-2 mb-1">
            <view class="i-material-symbols-bolt text-green-500 text-lg" />
            <text class="text-[11px] font-bold tracking-widest text-slate-400">准时率</text>
          </view>
          <view class="flex items-baseline gap-1">
            <text class="text-2xl font-black text-slate-800 dark:text-white">{{ stats.onTimeRate }}</text>
            <text class="text-[10px] font-bold text-slate-400">%</text>
          </view>
        </view>
      </view>

      <!-- Alert Section -->
      <view class="mt-2 p-5 rounded-[1.5rem] bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
        <view class="flex items-center justify-between mb-4">
          <view class="flex items-center gap-2">
            <view class="i-material-symbols-report text-red-500 text-lg" />
            <text class="font-black text-slate-800 dark:text-white text-base tracking-wide">待改进提醒</text>
            <text class="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-black">2</text>
          </view>
          <button class="text-red-500 text-[11px] font-black tracking-widest uppercase flex items-center hover:opacity-80 bg-transparent border-none">
            <text>查看历史</text>
            <view class="i-material-symbols-chevron-right text-sm" />
          </button>
        </view>
        
        <view class="flex flex-col gap-3">
          <view class="bg-white dark:bg-[#23262a] p-4 rounded-[1.2rem] border border-red-100 dark:border-red-800 flex items-center gap-3 shadow-sm group hover:border-red-200 transition-colors">
            <view class="size-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
              <view class="i-material-symbols-event-busy text-red-500" />
            </view>
            <view class="flex-1">
              <text class="text-sm font-black text-slate-800 dark:text-white block tracking-wide">任务超时：南区机房巡检</text>
              <text class="text-[11px] font-bold text-slate-400 mt-0.5 block">超时时长：24分钟</text>
            </view>
            <button class="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-[10px] font-black tracking-widest uppercase active:scale-95 border-none m-0 shrink-0">去整改</button>
          </view>
          
          <view class="bg-white dark:bg-[#23262a] p-4 rounded-[1.2rem] border border-orange-100 dark:border-red-800 flex items-center gap-3 shadow-sm group hover:border-orange-200 transition-colors">
            <view class="size-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
              <view class="i-material-symbols-assignment-return text-orange-500" />
            </view>
            <view class="flex-1">
              <text class="text-sm font-black text-slate-800 dark:text-white block tracking-wide">任务被驳回：B2设备维修</text>
              <text class="text-[11px] font-bold text-slate-400 mt-0.5 block">原因：现场照片不清晰</text>
            </view>
            <button class="px-3 py-2 rounded-lg bg-orange-50 text-orange-600 text-[10px] font-black tracking-widest uppercase active:scale-95 border-none m-0 shrink-0">去整改</button>
          </view>
        </view>
      </view>

      <view class="mt-2 p-5 rounded-[1.5rem] bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#23262a] dark:to-[#23262a] border border-blue-100/50 flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer shadow-sm">
        <view class="size-12 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
          <view class="i-material-symbols-school text-2xl" />
        </view>
        <view class="flex-1">
          <text class="text-base font-black text-slate-800 dark:text-white block tracking-tight">提升指南</text>
          <text class="text-xs font-bold text-blue-400 mt-0.5 block">了解如何优化准时率和质量评分</text>
        </view>
        <view class="i-material-symbols-arrow-forward text-blue-500 text-xl" />
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
