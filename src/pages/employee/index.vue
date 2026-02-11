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
    <!-- Header -->
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/95 dark:bg-[#23262a]/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 py-3 flex items-center justify-between pt-[calc(env(safe-area-inset-top)+44px)]">
      <view class="flex items-center gap-3">
        <view class="relative group cursor-pointer">
          <view class="size-10 rounded-full bg-cover bg-center border-2 border-[#00b2b2]" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9ni5JPq3Fb1n-ptGOUQvLTCsMEpWa_6qmrKpKzp2xGH4UjwY-PdXXgVjVfnGpN9G-FcIvR1xa7r1u844NKBS7Xwm-El5weCJJ17pOvU3rY92H1PKfbr1T99Xs4GcVBfjXl-7cx-A3DcJtxCzfHCOmWh4zWOodeDH4Z3szYWSEJQZHLmPWyLJgNhwW9BxmSQzSPM0hYsCNln4N0afZjSIxgpT82HoSEdW0GjB0PgXs3MhAIIQhZEiuos2EirWctQp6aINfjh1tFbA');"></view>
          <view class="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white dark:border-[#23262a]"></view>
        </view>
        <view>
          <text class="text-xs font-medium text-slate-500 dark:text-slate-400 block">下午好,</text>
          <text class="text-base font-bold text-slate-900 dark:text-white leading-tight">操作员 Alex</text>
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
                 5 <text class="text-base font-normal text-[#b3e8e8] mb-1">/ 8 任务</text>
               </view>
             </view>
             <view class="flex flex-col items-end">
               <text class="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold">进行中: 1</text>
             </view>
          </view>
          <view class="w-full bg-black/20 rounded-full h-2 mb-2">
            <view class="bg-white h-2 rounded-full transition-all duration-500" style="width: 62.5%"></view>
          </view>
          <text class="text-xs text-[#e0f7f7]">还剩 3 个待办任务，加油！</text>
        </view>
      </view>

      <!-- Filter Section -->
      <view class="flex flex-col gap-4">
        <view class="flex items-center justify-between">
           <view class="flex items-center gap-2">
             <text class="text-lg font-bold text-slate-900 dark:text-white">待办清单</text>
             <text class="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs px-2 py-0.5 rounded-full font-bold">3</text>
           </view>
           <button class="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 bg-white dark:bg-[#23262a] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm active:scale-95 transition-transform">
             <view class="i-material-symbols-sort text-base" />
             <text>按优先级</text>
           </button>
        </view>
        <scroll-view scroll-x class="w-full whitespace-nowrap" :show-scrollbar="false">
            <view class="flex items-center gap-2 pb-1">
                <button class="px-4 py-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium whitespace-nowrap shadow-sm border-none m-0">全部</button>
                <button class="px-4 py-1.5 rounded-full bg-white dark:bg-[#23262a] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium whitespace-nowrap m-0">高优先级 (1)</button>
                <button class="px-4 py-1.5 rounded-full bg-white dark:bg-[#23262a] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium whitespace-nowrap m-0">普通 (2)</button>
                <button class="px-4 py-1.5 rounded-full bg-white dark:bg-[#23262a] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium whitespace-nowrap m-0">已完成</button>
            </view>
        </scroll-view>
      </view>

      <!-- Task Lists -->
      <view class="flex flex-col gap-4">
         <!-- Emergency P0 -->
         <view class="group relative flex flex-col p-5 rounded-2xl bg-white dark:bg-[#23262a] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <view class="absolute top-5 right-5 flex flex-col items-end gap-2">
                <view class="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-wide border border-red-100 dark:border-red-900/30">
                    <view class="size-1.5 rounded-full bg-red-500 animate-pulse"></view>
                    <text>紧急 P0</text>
                </view>
                <text class="text-[10px] text-[#00b2b2] font-bold bg-[#00b2b2]/10 px-1.5 py-0.5 rounded border border-[#00b2b2]/20">进行中</text>
            </view>
            <text class="text-lg font-bold text-slate-900 dark:text-white mb-1 pr-20 block">A区-3号压缩机异常排查</text>
            <text class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 block">监测系统显示3号压缩机出口压力波动异常，需立即前往现场检查阀门及管路状况。</text>
            
            <view class="flex flex-wrap items-center gap-3 mb-5">
                <view class="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-medium bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
                    <view class="i-material-symbols-location-on text-base" />
                    <text>A区压缩机房</text>
                </view>
                 <view class="flex items-center gap-1 text-red-500 dark:text-red-400 text-xs font-medium bg-red-50 dark:bg-slate-800 px-2 py-1 rounded">
                    <view class="i-material-symbols-schedule text-base" />
                    <text>截止: 10:30</text>
                </view>
            </view>
            
            <button class="w-full py-3 rounded-xl bg-[#00b2b2] hover:bg-[#008f8f] text-white font-semibold shadow-lg shadow-[#00b2b2]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 m-0 border-none">
                <view class="i-material-symbols-edit-document text-xl" />
                <text>继续/汇报</text>
            </button>
         </view>

         <!-- P1 Important -->
         <view class="group flex flex-col p-5 rounded-2xl bg-white dark:bg-[#23262a] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
             <view class="flex justify-between items-start mb-1">
                 <text class="text-lg font-bold text-slate-900 dark:text-white block">B区-配电箱季度巡检</text>
                 <text class="px-2 py-1 rounded bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-wide border border-orange-100 dark:border-orange-900/30">P1 重要</text>
             </view>
             <text class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 block">按季度巡检计划对B区1-4号配电箱进行除尘及接线紧固检查。</text>
             
              <view class="flex flex-wrap items-center gap-3 mb-5">
                <view class="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-medium bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
                    <view class="i-material-symbols-location-on text-base" />
                    <text>B区配电室</text>
                </view>
                 <view class="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-medium bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
                    <view class="i-material-symbols-schedule text-base" />
                    <text>今日 14:00</text>
                </view>
            </view>

            <button class="w-full py-3 rounded-xl bg-white dark:bg-[#23262a] border-2 border-[#00b2b2] text-[#00b2b2] hover:bg-[#00b2b2]/5 font-semibold active:scale-[0.98] transition-all flex items-center justify-center gap-2 m-0">
                <view class="i-material-symbols-play-arrow text-xl" />
                <text>开始任务</text>
            </button>
         </view>
         
         <!-- P2 Normal -->
         <view class="group flex flex-col p-5 rounded-2xl bg-white dark:bg-[#23262a] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
             <view class="flex justify-between items-start mb-1">
                 <text class="text-lg font-bold text-slate-900 dark:text-white block">车间环境安全检查</text>
                 <text class="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wide border border-slate-200 dark:border-slate-700">P2 普通</text>
             </view>
             <text class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 block">例行检查车间通道堆放情况及消防设施完好性，填写安全日志。</text>
             
              <view class="flex flex-wrap items-center gap-3 mb-5">
                <view class="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-medium bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
                    <view class="i-material-symbols-location-on text-base" />
                    <text>全厂区</text>
                </view>
                 <view class="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-medium bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
                    <view class="i-material-symbols-schedule text-base" />
                    <text>下班前</text>
                </view>
            </view>

            <button class="w-full py-3 rounded-xl bg-white dark:bg-[#23262a] border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold active:scale-[0.98] transition-all flex items-center justify-center gap-2 m-0">
                <view class="i-material-symbols-play-arrow text-xl" />
                <text>开始任务</text>
            </button>
         </view>
         
         <!-- Completed -->
        <view class="group flex flex-col p-5 rounded-2xl bg-slate-50 dark:bg-[#23262a]/50 border border-slate-100 dark:border-slate-800 shadow-sm opacity-75">
            <view class="flex justify-between items-start mb-1">
                <text class="text-lg font-bold text-slate-500 dark:text-slate-400 line-through block">早班设备交接</text>
                <view class="px-2 py-1 rounded bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-wide border border-green-200 dark:border-green-900/30 flex items-center gap-1">
                    <view class="i-material-symbols-check text-xs" />
                    <text>已完成</text>
                </view>
            </view>
            <view class="flex items-center gap-1 text-slate-400 text-xs font-medium mt-2">
                <view class="i-material-symbols-schedule text-base" />
                <text>完成于 08:30</text>
            </view>
        </view>
      </view>
    </view>
    
    <!-- Floating Camera Button -->
    <view class="fixed bottom-24 right-6 z-50">
      <button class="flex items-center gap-2 bg-[#00b2b2] hover:bg-[#008f8f] text-white px-5 py-3.5 rounded-full border-none shadow-[0_4px_14px_0_rgba(0,178,178,0.39)] active:scale-95 transition-all">
         <view class="i-material-symbols-photo-camera text-2xl" />
         <text class="text-sm font-bold tracking-wide">随手拍/上报</text>
      </button>
    </view>

    <!-- Embedded TabBar (Since we can't easily dynamic switch the global CustomTabBar for this single page without complex state, we embed a mock one for now or we update the store to support roles. Let's do embedded for "Perfect Replication" first as it's safer for now, OR better: hide the custom tabbar on this page and show this one.
    Actually, if I navigate here using `redirectTo`, the global CustomTabBar might show if it's configured as a tab page. If it's NOT a tab page, it won't show.
    I will make this page NOT a tab page in `pages.json` for now, so it has no tabbar. Then I render this custom one.
    -->
    <view class="fixed bottom-0 left-0 w-full bg-white dark:bg-[#23262a] border-t border-slate-200 dark:border-slate-800 px-2 pb-6 pt-2 z-40">
        <view class="grid grid-cols-4 h-full">
            <view class="flex flex-col items-center justify-center gap-1 h-full text-[#00b2b2]">
                <view class="i-material-symbols-assignment-filled text-2xl" />
                <text class="text-[10px] font-bold">任务</text>
            </view>
             <view class="flex flex-col items-center justify-center gap-1 h-full text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300" @click="navigateTo('/pages/employee/history')">
                <view class="i-material-symbols-history text-2xl" />
                <text class="text-[10px] font-medium">历史</text>
            </view>
             <view class="flex flex-col items-center justify-center gap-1 h-full text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300" @click="navigateTo('/pages/task/exception')">
                <view class="i-material-symbols-bar-chart text-2xl" />
                <text class="text-[10px] font-medium">统计</text>
            </view>
             <view class="flex flex-col items-center justify-center gap-1 h-full text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300" @click="navigateTo('/pages/employee/profile')">
                <view class="i-material-symbols-person text-2xl" />
                <text class="text-[10px] font-medium">个人</text>
            </view>
        </view>
    </view>

  </view>
</template>

<script lang="ts" setup>
const navigateTo = (url: string) => {
  uni.navigateTo({ url })
}
</script>
