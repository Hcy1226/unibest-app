<route lang="json5">
{
  style: {
    navigationBarTitleText: '任务详情',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] min-h-screen text-slate-900 font-display pb-10">
    <!-- Header -->
    <!-- Header -->
    <!-- Header -->
    <!-- Header -->
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/95 backdrop-blur-md border-b border-slate-100 flex flex-col transition-all" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="h-[44px] px-4 flex items-center justify-between w-full">
         <button class="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors bg-white border-none -ml-2" @click="handleBack">
           <view class="i-material-symbols-arrow-back-ios-new text-slate-600 text-xl" />
         </button>
         <text class="text-base font-bold text-slate-900 leading-tight">任务详情</text>
         <button class="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors bg-white border-none -mr-2">
           <view class="i-material-symbols-more-vert text-slate-600 text-xl" />
         </button>
      </view>
    </view>
    <!-- Spacer -->
    <view :style="{ height: (44 + statusBarHeight) + 'px', width: '100%' }"></view>

    <view class="flex flex-col gap-6 p-4">
      <!-- Main Task Card -->
      <view class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
        <view class="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
          <view class="i-material-symbols-engineering text-[100px] text-[#00b2b2]" />
        </view>
        <view class="relative z-10">
           <view class="flex items-start justify-between mb-4">
             <view>
               <text class="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-blue-100 text-blue-600 mb-2">进行中</text>
               <text class="text-xl font-bold text-slate-900 leading-tight mb-1 block">A区设备例行巡检</text>
               <text class="text-xs text-slate-500 block">单号: T-20231024-001</text>
             </view>
           </view>
           <view class="mb-2 flex justify-between items-end">
             <text class="text-3xl font-bold text-[#00b2b2]">75<text class="text-sm font-medium text-slate-400 ml-0.5">%</text></text>
             <text class="text-xs font-medium text-slate-500">9/12 项已完成</text>
           </view>
           <view class="w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden">
             <view class="bg-[#00b2b2] h-3 rounded-full relative" style="width: 75%">
               <view class="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></view>
             </view>
           </view>
           <view class="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-50">
             <view class="flex items-center gap-1.5">
               <view class="i-material-symbols-calendar-clock text-[16px]" />
               <text>截止: 今天 18:00</text>
             </view>
             <view class="flex items-center gap-1.5">
                 <view class="i-material-symbols-group text-[16px]" />
                 <text>3人参与</text>
             </view>
           </view>
        </view>
      </view>

      <!-- Subtasks -->
      <view class="flex flex-col gap-3">
         <view class="flex items-center justify-between px-1">
           <text class="text-sm font-bold text-slate-900 uppercase tracking-wide">子任务列表</text>
           <view class="text-xs font-medium text-[#00b2b2] flex items-center gap-0.5">
             <text>查看全部</text>
             <view class="i-material-symbols-chevron-right text-[14px]" />
           </view>
         </view>
         
         <view class="flex flex-col gap-3">
            <!-- Subtask 1 (Done) -->
            <view class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
               <view class="flex items-center gap-3">
                 <view class="relative">
                   <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_3akt4pBE2Mma8dD_tiEytpnCMDG-SheizPG9bWt6A8uGtVSXYkT1KXbMQALEegBP7ME1YZWDPtH7OAy9Uh_Kvu36b5RWqPmy5Pj0cSSwU3lSo3AiRXHq6EmGthG8AmH3z-NzeKeHuj007ncxIrh5ug3pxaxPoBWm62x82p5gElNcoPRi9rKYa21c9YY5U-u0PsQXS9Lz4YmtWfo-SB1iEz5iAZiaqum5wei7YVjtm7mRUhVMtSXDo2h41jC1fIcFQ_A9o7zXmWM" class="size-10 rounded-full border border-slate-100" />
                   <view class="absolute -bottom-0.5 -right-0.5 size-3.5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                     <view class="i-material-symbols-check text-[8px] text-white font-bold" />
                   </view>
                 </view>
                 <view class="flex flex-col">
                   <text class="text-sm font-bold text-slate-400 line-through decoration-slate-400 decoration-2">压力泵读数检查</text>
                   <text class="text-[10px] text-slate-500">James Wu • 完成于 10:30</text>
                 </view>
               </view>
               <text class="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">已完成</text>
            </view>

             <!-- Subtask 2 (Progress) -->
            <view class="bg-white p-4 rounded-xl border-l-4 border-l-blue-500 border-y border-r border-slate-100 shadow-sm flex items-center justify-between">
                <view class="flex items-center gap-3">
                    <view class="relative">
                        <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL537DzJFFDsubwAb7JAu4y5e7yKWbRNW8IKCTASUtgZefBQPiBW8Fta-FZX523GeJys-93vDNSDsw_70N8HXRRYmRjtUP7GT-fZ3TVX2btxnJmBbNXq2yjIsiQred8cXTHHqnoDnVvnAcKs3gtvJZk7xHPsgsj6aSKHotSe0iUinV0OPDbpgmt_ynK4iZJAQE_qCNsrQJuS722Ie-1ft4tdejNRZJ2J0fOitg6K2da1d2JERJymeVS3yEC-MqDru0S3VQjLCgNEE" class="size-10 rounded-full border border-slate-100" />
                        <view class="absolute -bottom-0.5 -right-0.5 size-3.5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <view class="i-material-symbols-schedule text-[8px] text-white font-bold" />
                        </view>
                    </view>
                    <view class="flex flex-col">
                        <text class="text-sm font-bold text-slate-900">冷却塔风机巡视</text>
                        <text class="text-[10px] text-slate-500">Mike Chen • 进行中</text>
                    </view>
                </view>
                 <text class="text-xs font-semibold text-blue-600">进行中</text>
            </view>
            
            <!-- Subtask 3 (Alert) -->
             <view class="bg-white p-4 rounded-xl border-l-4 border-l-orange-500 border-y border-r border-slate-100 shadow-sm flex items-center justify-between">
                 <view class="flex items-center gap-3">
                     <view class="relative">
                         <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL537DzJFFDsubwAb7JAu4y5e7yKWbRNW8IKCTASUtgZefBQPiBW8Fta-FZX523GeJys-93vDNSDsw_70N8HXRRYmRjtUP7GT-fZ3TVX2btxnJmBbNXq2yjIsiQred8cXTHHqnoDnVvnAcKs3gtvJZk7xHPsgsj6aSKHotSe0iUinV0OPDbpgmt_ynK4iZJAQE_qCNsrQJuS722Ie-1ft4tdejNRZJ2J0fOitg6K2da1d2JERJymeVS3yEC-MqDru0S3VQjLCgNEE" class="size-10 rounded-full border border-slate-100 opacity-80" />
                          <view class="absolute -bottom-0.5 -right-0.5 size-3.5 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                             <view class="i-material-symbols-priority-high text-[8px] text-white font-bold" />
                         </view>
                     </view>
                     <view class="flex flex-col">
                         <text class="text-sm font-bold text-slate-900">管网泄露排查</text>
                         <text class="text-[10px] text-orange-600 font-medium">截止临近: 剩余 30分钟</text>
                     </view>
                 </view>
                 <button class="flex items-center gap-1 px-3 py-1.5 rounded-full border border-orange-500 text-orange-600 hover:bg-orange-50 transition-colors text-xs font-bold shadow-sm bg-white">
                     <view class="i-material-symbols-notifications-active text-[14px]" />
                     <text>催办</text>
                 </button>
             </view>
         </view>
      </view>

      <!-- Timeline -->
      <view class="flex flex-col gap-3 pb-4">
        <text class="text-sm font-bold text-slate-900 uppercase tracking-wide px-1">任务动态 (Timeline)</text>
        <view class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
           <view class="relative space-y-6">
              <!-- Line -->
              <view class="absolute top-0 bottom-0 left-[15px] w-[2px] bg-slate-200"></view>
              
              <!-- Event 1 -->
              <view class="relative flex gap-4 z-10">
                 <view class="mt-1 size-8 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center shrink-0">
                    <view class="size-2.5 rounded-full bg-blue-500"></view>
                 </view>
                 <view class="flex flex-col">
                    <text class="text-xs font-bold text-slate-400">14:20 • 刚刚</text>
                    <view class="text-sm text-slate-800 mt-0.5">
                        <text>Mike Chen 开始了 </text>
                        <text class="font-semibold text-[#00b2b2]">冷却塔风机巡视</text>
                        <text>。</text>
                    </view>
                 </view>
              </view>

              <!-- Event 2 -->
              <view class="relative flex gap-4 z-10">
                 <view class="mt-1 size-8 rounded-full bg-white border-2 border-green-500 flex items-center justify-center shrink-0">
                    <view class="i-material-symbols-check text-green-500 text-[14px] font-bold" />
                 </view>
                 <view class="flex flex-col">
                    <text class="text-xs font-bold text-slate-400">11:15</text>
                     <view class="text-sm text-slate-800 mt-0.5">
                        <text>Sarah Li 完成了 </text>
                        <text class="font-semibold text-slate-600">配电柜温升检测</text>
                        <text>，上传了 3 张照片。</text>
                    </view>
                    <view class="flex gap-2 mt-2">
                       <view class="size-10 rounded bg-slate-100"></view>
                       <view class="size-10 rounded bg-slate-100"></view>
                    </view>
                 </view>
              </view>
           </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { handleBack } from '@/utils/navigation'

const statusBarHeight = ref(0) // Default to 0, update in onLoad

onLoad(() => {
  const info = uni.getSystemInfoSync()
  statusBarHeight.value = info.statusBarHeight || 20 // Fallback to 20 if 0 (dev tool issue)
})
</script>
