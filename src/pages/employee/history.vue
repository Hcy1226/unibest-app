<route lang="json5">
{
  style: {
    navigationBarTitleText: '我的任务历史',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] min-h-screen text-slate-900 font-display pb-28">
    <!-- Header -->
    <!-- Header -->
    <!-- Header -->
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/95 backdrop-blur-md border-b border-slate-100 flex flex-col transition-all" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="h-[44px] px-4 flex items-center justify-between w-full">
         <view class="flex items-center gap-3">
             <view class="relative group cursor-pointer" @click="handleBack">
               <view class="i-material-symbols-arrow-back text-2xl text-slate-600" />
             </view>
             <view>
               <text class="text-xs font-medium text-slate-500 block">工作台</text>
               <text class="text-base font-bold text-slate-900 block leading-tight">我的任务历史</text>
             </view>
         </view>
      </view>
    </view>
    <!-- Spacer -->
    <view :style="{ height: (44 + statusBarHeight) + 'px', width: '100%' }"></view>

    <view class="flex flex-col gap-6 p-4">
      <!-- Task List -->
      <view class="flex flex-col gap-3">
         <view class="flex items-center justify-between mb-1">
             <text class="text-lg font-bold text-slate-900">历史记录</text>
             <view class="text-xs font-medium text-[#00b2b2] flex items-center gap-0.5">
                 <view class="i-material-symbols-filter-list text-[16px]" />
                 <text>筛选</text>
             </view>
         </view>

         <!-- Task 1: Urgent/Red -->
         <view class="flex flex-col p-4 rounded-2xl bg-white border border-slate-100 shadow-sm gap-4 relative overflow-hidden" @click="navigateTo('/pages/task/detail')">
             <view class="absolute top-0 left-0 w-1 h-full bg-red-500"></view>
             <view class="flex items-start justify-between">
                 <view class="flex items-start gap-3">
                     <view class="size-11 rounded-lg bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                         <view class="i-material-symbols-warning text-xl" />
                     </view>
                     <view>
                         <view class="flex items-center gap-2 flex-wrap">
                             <text class="font-bold text-slate-900">B区配电箱故障抢修</text>
                             <text class="px-1.5 py-0.5 rounded bg-red-100 text-red-600 text-[10px] font-bold">紧急</text>
                         </view>
                         <text class="text-xs text-slate-500 mt-1 line-clamp-1 block">接到中控室报警，B区3号配电箱电压异常，需立即排查。</text>
                     </view>
                 </view>
             </view>
             <view class="flex items-center justify-between pt-3 border-t border-slate-50">
                 <view class="flex flex-col">
                     <text class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">状态</text>
                     <text class="text-xs font-medium text-slate-400 italic">等待派单</text>
                 </view>
                 <view class="flex gap-2">
                      <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50 text-xs font-semibold bg-white">
                         <text>查看详情</text>
                     </button>
                 </view>
             </view>
         </view>

         <!-- Task 2: Progress/Blue -->
         <view class="flex flex-col p-4 rounded-2xl bg-white border border-slate-100 shadow-sm gap-4 relative overflow-hidden">
             <view class="absolute top-0 left-0 w-1 h-full bg-blue-500"></view>
             <view class="flex items-start justify-between">
                 <view class="flex items-start gap-3">
                     <view class="size-11 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                         <view class="i-material-symbols-engineering text-xl" />
                     </view>
                     <view>
                         <view class="flex items-center gap-2 flex-wrap">
                             <text class="font-bold text-slate-900">A区设备例行巡检</text>
                             <text class="px-1.5 py-0.5 rounded bg-blue-100 text-blue-600 text-[10px] font-bold">进行中</text>
                         </view>
                         <text class="text-xs text-slate-500 mt-1 block">完成进度: 3/12 个检查点</text>
                     </view>
                 </view>
                 <button class="text-slate-400 hover:text-[#00b2b2] bg-white border-none">
                     <view class="i-material-symbols-more-vert text-[20px]" />
                 </button>
             </view>
             <view class="flex items-center justify-between pt-3 border-t border-slate-50">
                 <view class="flex flex-col">
                     <text class="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1 block">执行小组</text>
                     <view class="flex -space-x-2">
                         <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_3akt4pBE2Mma8dD_tiEytpnCMDG-SheizPG9bWt6A8uGtVSXYkT1KXbMQALEegBP7ME1YZWDPtH7OAy9Uh_Kvu36b5RWqPmy5Pj0cSSwU3lSo3AiRXHq6EmGthG8AmH3z-NzeKeHuj007ncxIrh5ug3pxaxPoBWm62x82p5gElNcoPRi9rKYa21c9YY5U-u0PsQXS9Lz4YmtWfo-SB1iEz5iAZiaqum5wei7YVjtm7mRUhVMtSXDo2h41jC1fIcFQ_A9o7zXmWM" class="size-6 rounded-full border border-white" />
                         <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVxcv5rE7bPWvJHB-N0lSWNqr11mcLlNUTU2s76bSGxbwk2-1VVsqS5g1XfABHJBesDOZR_I8NN9f1pT-Z9K7Vm7zRaNlFXiCUAiLIjxKqroCRRQjOlXQ_foi56zhSjo8AZYf97FHmUUqLVNDW-aQX0LBPygwFXBrH2b3IvgIzg4lywnf-z_aOzjFFYE9qikC40J7mF6hWhXREDLL8rTAhJijuHmAmuLr4upczwhb_q8YsozGtvnwDquD2icbLuX66yDkTfXIlBHk" class="size-6 rounded-full border border-white" />
                     </view>
                 </view>
                 <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#00b2b2] text-[#00b2b2] hover:bg-[#00b2b2]/5 transition-colors text-xs font-semibold bg-white">
                     查看进度
                 </button>
             </view>
         </view>
         
         <!-- Task 3: Warehouse/Green -->
         <view class="flex flex-col p-4 rounded-2xl bg-white border border-slate-100 shadow-sm gap-4 relative overflow-hidden">
             <view class="absolute top-0 left-0 w-1 h-full bg-green-500"></view>
             <view class="flex items-start justify-between">
                 <view class="flex items-start gap-3">
                     <view class="size-11 rounded-lg bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                         <view class="i-material-symbols-assignment-turned-in text-xl" />
                     </view>
                     <view>
                         <view class="flex items-center gap-2 flex-wrap">
                             <text class="font-bold text-slate-900">仓库物料搬运</text>
                             <text class="px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-bold">待验收</text>
                         </view>
                         <text class="text-xs text-slate-500 mt-1 block">从主仓库搬运耗材至C区维修间。</text>
                     </view>
                 </view>
             </view>
             <view class="flex items-center justify-between pt-3 border-t border-slate-50">
                 <view class="flex flex-col">
                     <text class="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1 block">执行人</text>
                     <view class="flex items-center gap-1.5">
                         <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL537DzJFFDsubwAb7JAu4y5e7yKWbRNW8IKCTASUtgZefBQPiBW8Fta-FZX523GeJys-93vDNSDsw_70N8HXRRYmRjtUP7GT-fZ3TVX2btxnJmBbNXq2yjIsiQred8cXTHHqnoDnVvnAcKs3gtvJZk7xHPsgsj6aSKHotSe0iUinV0OPDbpgmt_ynK4iZJAQE_qCNsrQJuS722Ie-1ft4tdejNRZJ2J0fOitg6K2da1d2JERJymeVS3yEC-MqDru0S3VQjLCgNEE" class="size-5 rounded-full" />
                         <text class="text-xs text-slate-600">James Wu</text>
                     </view>
                 </view>
                 <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 text-white shadow-sm hover:bg-green-700 transition-colors text-xs font-semibold border-none">
                     <view class="i-material-symbols-check-circle text-[16px]" />
                     <text>验收通过</text>
                 </button>
             </view>
         </view>
         
         <!-- Task 4: Cleaning/Orange -->
         <view class="flex flex-col p-4 rounded-2xl bg-white border border-slate-100 shadow-sm gap-4 relative overflow-hidden">
             <view class="absolute top-0 left-0 w-1 h-full bg-orange-400"></view>
             <view class="flex items-start justify-between">
                 <view class="flex items-start gap-3">
                     <view class="size-11 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                         <view class="i-material-symbols-cleaning-services text-xl" />
                     </view>
                     <view>
                         <view class="flex items-center gap-2 flex-wrap">
                             <text class="font-bold text-slate-900">车间现场清理</text>
                             <text class="px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 text-[10px] font-bold">待指派</text>
                         </view>
                         <text class="text-xs text-slate-500 mt-1 block">二号车间地面油污清理及废料回收。</text>
                     </view>
                 </view>
             </view>
             <view class="flex items-center justify-between pt-3 border-t border-slate-50">
                 <view class="flex flex-col">
                     <text class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">截止时间</text>
                     <text class="text-xs font-medium text-slate-600">今日 18:00</text>
                 </view>
                 <view class="flex gap-2">
                     <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50 text-xs font-semibold bg-white">
                         <text>查看详情</text>
                     </button>
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

const navigateTo = (url: string) => {
  uni.navigateTo({ url })
}

const statusBarHeight = ref(0)
onLoad(() => {
    statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight || 20
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
