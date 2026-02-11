<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'

onShow(() => {
  // Simple Auth Check
  const role = uni.getStorageSync('userRole')
  if (!role) {
    // Not logged in, redirect to login
    uni.reLaunch({ url: '/pages/login/index' })
  }
})

const navigateTo = (url: string) => {
  uni.navigateTo({ url })
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
              <text class="text-3xl font-bold text-slate-900">85<text class="text-lg text-slate-500 font-medium">%</text></text>
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
              <text class="text-3xl font-bold text-slate-900">92<text class="text-lg text-slate-500 font-medium">%</text></text>
              <text class="text-[10px] font-medium text-slate-500 mb-1">11/12 人</text>
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
            <text class="text-lg font-bold text-slate-900">3</text>
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
          <view class="text-xs font-medium text-[#00b2b2] flex items-center gap-0.5">
            <text>查看全部</text>
            <view class="i-material-symbols-chevron-right text-[16px]" />
          </view>
        </view>

        <!-- Tabs -->
        <view class="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          <button class="px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-medium whitespace-nowrap shadow-sm border-none">进行中 (2)</button>
          <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium whitespace-nowrap hover:bg-slate-50">待开始 (1)</button>
          <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium whitespace-nowrap hover:bg-slate-50">已完成 (4)</button>
        </view>

        <!-- Task List -->
        <view class="flex flex-col gap-3">
          <!-- Task 1: Blue -->
          <view class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
            <view class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-2xl"></view>
            <view class="flex justify-between items-start mb-2">
              <text class="px-2 py-1 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wide">设备检修</text>
              <text class="text-xs text-slate-400 font-medium">10:00 - 12:00</text>
            </view>
            <text class="text-base font-bold text-slate-900 mb-1 block">A区3号发电机组例行维护</text>
            <text class="text-xs text-slate-500 mb-3 lines-2 block">检查冷却系统压力，更换滤芯，记录运行参数。注意高温警示。</text>
            <view class="flex items-center justify-between mt-2 pt-3 border-t border-slate-50">
              <view class="flex -space-x-2">
                 <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_3akt4pBE2Mma8dD_tiEytpnCMDG-SheizPG9bWt6A8uGtVSXYkT1KXbMQALEegBP7ME1YZWDPtH7OAy9Uh_Kvu36b5RWqPmy5Pj0cSSwU3lSo3AiRXHq6EmGthG8AmH3z-NzeKeHuj007ncxIrh5ug3pxaxPoBWm62x82p5gElNcoPRi9rKYa21c9YY5U-u0PsQXS9Lz4YmtWfo-SB1iEz5iAZiaqum5wei7YVjtm7mRUhVMtSXDo2h41jC1fIcFQ_A9o7zXmWM" class="size-6 rounded-full border-2 border-white" />
                 <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVxcv5rE7bPWvJHB-N0lSWNqr11mcLlNUTU2s76bSGxbwk2-1VVsqS5g1XfABHJBesDOZR_I8NN9f1pT-Z9K7Vm7zRaNlFXiCUAiLIjxKqroCRRQjOlXQ_foi56zhSjo8AZYf97FHmUUqLVNDW-aQX0LBPygwFXBrH2b3IvgIzg4lywnf-z_aOzjFFYE9qikC40J7mF6hWhXREDLL8rTAhJijuHmAmuLr4upczwhb_q8YsozGtvnwDquD2icbLuX66yDkTfXIlBHk" class="size-6 rounded-full border-2 border-white" />
                 <view class="size-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] text-slate-500 font-bold">+1</view>
              </view>
              <view class="flex items-center gap-1 text-blue-500 font-medium text-xs">
                <text>进行中</text>
                <view class="i-material-symbols-timelapse text-[16px] animate-pulse" />
              </view>
            </view>
          </view>

          <!-- Task 2: Orange -->
          <view class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
             <view class="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-l-2xl"></view>
             <view class="flex justify-between items-start mb-2">
               <text class="px-2 py-1 rounded bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wide">紧急报修</text>
               <text class="text-xs text-slate-400 font-medium">13:30 - 14:30</text>
             </view>
             <text class="text-base font-bold text-slate-900 mb-1 block">B区照明系统故障排查</text>
             <text class="text-xs text-slate-500 mb-3 lines-2 block">B区走廊照明闪烁，需排查线路接触不良或镇流器问题。</text>
             <view class="flex items-center justify-between mt-2 pt-3 border-t border-slate-50">
               <view class="flex -space-x-2">
                 <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxtbBR0irCpY1uUeC7VopwGWFnIESGXHm_q-N7s20rfh9yQqT85SoqOnQiV8oTSfc1Vls-npf9s3oGFGPsQd3plpgpBTwuPhLEUM7k7HQv10RLGdSs-4vLqOvrpDv0Icmlu2tifzfY7k0rUuNt_QB5s4Rv1R1eP4AiobyKOl861_kV9jspuSc3hggHjmImlsIwAgGqS7__XbqCr5uKfGjpX32iGSKR5NB31cneHtFTOLV5kRWGBeyhh1YUBVr8erHwHdWi1wmtG8U" class="size-6 rounded-full border-2 border-white" />
               </view>
               <view class="flex items-center gap-1 text-orange-500 font-medium text-xs">
                 <text>进行中</text>
                 <view class="i-material-symbols-timelapse text-[16px] animate-pulse" />
               </view>
             </view>
          </view>

          <!-- Task 3: Slate -->
          <view class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden opacity-70">
             <view class="absolute left-0 top-0 bottom-0 w-1 bg-slate-300 rounded-l-2xl"></view>
             <view class="flex justify-between items-start mb-2">
               <text class="px-2 py-1 rounded bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wide">安全巡检</text>
               <text class="text-xs text-slate-400 font-medium">15:00 - 16:00</text>
             </view>
             <text class="text-base font-bold text-slate-900 mb-1 block">全厂消防设施周检</text>
             <text class="text-xs text-slate-500 mb-3 lines-2 block">检查灭火器压力、消防栓是否完好，确保通道无阻碍。</text>
             <view class="flex items-center justify-between mt-2 pt-3 border-t border-slate-50">
               <view class="flex -space-x-2">
                 <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL537DzJFFDsubwAb7JAu4y5e7yKWbRNW8IKCTASUtgZefBQPiBW8Fta-FZX523GeJys-93vDNSDsw_70N8HXRRYmRjtUP7GT-fZ3TVX2btxnJmBbNXq2yjIsiQred8cXTHHqnoDnVvnAcKs3gtvJZk7xHPsgsj6aSKHotSe0iUinV0OPDbpgmt_ynK4iZJAQE_qCNsrQJuS722Ie-1ft4tdejNRZJ2J0fOitg6K2da1d2JERJymeVS3yEC-MqDru0S3VQjLCgNEE" class="size-6 rounded-full border-2 border-white" />
                 <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxEL98FwKlnSzqqsGoGpSBznLGkeU70HBtvTRXBo-cR-wSAbeR_swMJnnLhRz8_miKuMGpOrTnMhf3R4K0VHJ0ZH657hCjyxiOCCvcISVV9XbfdzUjrAVs9XxS7mhotemjbiCD40IoKrIuVUvM8pig5ueU8QaoX1yXECE6ARSO1CShLCB8-fgthfa-IwR6S3_w6haUPU4aSk84XN7nFCp57aDkycNzAuaPtfkot8tJ5aBzdoiuqpgkHlwg44TOsWNAjocNiiOqkOI" class="size-6 rounded-full border-2 border-white" />
               </view>
               <view class="flex items-center gap-1 text-slate-400 font-medium text-xs">
                 <text>待开始</text>
                 <view class="i-material-symbols-schedule text-[16px]" />
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
