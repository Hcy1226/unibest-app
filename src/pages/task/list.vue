<route lang="json5">
{
  style: {
    navigationBarTitleText: '任务列表',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] min-h-screen text-slate-900 font-display pb-28">
    <!-- Header -->
    <!-- Header -->
    <!-- Header -->
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between pt-[calc(env(safe-area-inset-top)+44px)]">
      <view class="flex items-center gap-3">
         <view class="relative group cursor-pointer" @click="handleBack">
           <view class="i-material-symbols-arrow-back text-2xl text-slate-600" />
         </view>
         <view>
           <text class="text-xs font-medium text-slate-500 block">工作台</text>
           <text class="text-base font-bold text-slate-900 block leading-tight">{{ pageTitle }}</text>
         </view>
      </view>
      <button v-if="isSupervisor" class="relative p-2 rounded-full hover:bg-slate-100 transition-colors bg-white border-none">
        <view class="i-material-symbols-filter-list text-slate-600 text-2xl" />
      </button>
    </view>
    <!-- Spacer -->
    <view class="w-full h-[220rpx] pt-safe"></view>

    <view class="flex flex-col gap-6 p-4">
      <!-- Stats -->
      <view v-if="isSupervisor">
         <view class="grid grid-cols-3 gap-3">
            <view class="p-3 rounded-xl bg-orange-50 border border-orange-100 flex flex-col items-center gap-1 shadow-sm">
               <text class="text-xs font-medium text-orange-600">待指派</text>
               <text class="text-2xl font-bold text-orange-700">3</text>
            </view>
            <view class="p-3 rounded-xl bg-blue-50 border border-blue-100 flex flex-col items-center gap-1 shadow-sm">
               <text class="text-xs font-medium text-blue-600">进行中</text>
               <text class="text-2xl font-bold text-blue-700">8</text>
            </view>
            <view class="p-3 rounded-xl bg-white border border-slate-100 flex flex-col items-center gap-1 shadow-sm">
               <text class="text-xs font-medium text-slate-500">已完成</text>
               <text class="text-2xl font-bold text-slate-700">12</text>
            </view>
         </view>
      </view>

      <!-- Exception Overview -->
      <view class="flex flex-col gap-3" v-if="isSupervisor">
         <view class="flex items-center justify-between">
            <view class="text-sm font-bold text-slate-900 flex items-center gap-1.5">
               <view class="i-material-symbols-error-outline text-red-500 text-[18px]" />
               <text>异常概览</text>
            </view>
            <view class="text-xs font-medium text-slate-400 flex items-center gap-0.5" @click="navigateTo('/pages/task/exception')">
               <text>异常统计</text>
               <view class="i-material-symbols-chevron-right text-[14px]" />
            </view>
         </view>
         
         <view class="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4">
            <!-- Card 1 -->
            <view class="min-w-[160px] flex-1 p-3 rounded-xl bg-red-50 border border-red-100 flex flex-col gap-1 relative overflow-hidden">
               <view class="flex items-center justify-between z-10">
                  <text class="text-xs font-medium text-red-600">超时任务</text>
                  <view class="i-material-symbols-schedule text-red-200 text-[20px]" />
               </view>
               <view class="flex items-end gap-1 z-10">
                  <text class="text-2xl font-bold text-red-700">2</text>
                  <text class="text-[10px] text-red-500/60 mb-1">项已逾期</text>
               </view>
               <view class="absolute -right-2 -bottom-2 opacity-5 text-red-900">
                  <view class="i-material-symbols-warning text-[64px]" />
               </view>
            </view>
            <!-- Card 2 -->
             <view class="min-w-[160px] flex-1 p-3 rounded-xl bg-rose-50 border border-rose-100 flex flex-col gap-1 relative overflow-hidden">
               <view class="flex items-center justify-between z-10">
                  <text class="text-xs font-medium text-rose-600">被驳回数</text>
                  <view class="i-material-symbols-assignment-return text-rose-200 text-[20px]" />
               </view>
               <view class="flex items-end gap-1 z-10">
                  <text class="text-2xl font-bold text-rose-700">5</text>
                  <text class="text-[10px] text-rose-500/60 mb-1">次待修正</text>
               </view>
               <view class="absolute -right-2 -bottom-2 opacity-5 text-rose-900">
                  <view class="i-material-symbols-cancel text-[64px]" />
               </view>
            </view>
         </view>
      </view>

      <!-- Search & Filters -->
      <view class="flex flex-col gap-4" v-if="isSupervisor">
         <view class="relative">
             <view class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                 <view class="i-material-symbols-search text-[20px]" />
             </view>
             <input class="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#00b2b2] placeholder-slate-400" placeholder="搜索任务名称、编号或负责人..." type="text" />
         </view>
         <view class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
             <button class="px-4 py-1.5 rounded-full bg-[#00b2b2] text-white text-sm font-medium whitespace-nowrap shadow-sm shadow-[#00b2b2]/20 border-none">全部任务</button>
             <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium whitespace-nowrap hover:bg-slate-50">高优先级 (2)</button>
             <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium whitespace-nowrap hover:bg-slate-50">待指派 (3)</button>
             <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium whitespace-nowrap hover:bg-slate-50">待验收 (1)</button>
         </view>
      </view>

      <!-- Task List -->
      <view class="flex flex-col gap-3">
         <view class="flex items-center justify-between mb-1">
             <text class="text-lg font-bold text-slate-900">{{ isSupervisor ? '任务列表' : '历史记录' }}</text>
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
                     <text class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">负责人</text>
                     <text class="text-xs font-medium text-slate-400 italic">待指派</text>
                 </view>
                 <view class="flex gap-2">
                     <button class="flex items-center justify-center px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold bg-white" @click.stop="navigateTo('/pages/task/split')">拆分任务</button>
                      <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00b2b2] text-white shadow-sm hover:bg-[#00b2b2]/90 text-xs font-semibold border-none">
                         <view class="i-material-symbols-person-add text-[16px]" />
                         <text>指派</text>
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
                     <button class="flex items-center justify-center px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold bg-white"  @click.stop="navigateTo('/pages/task/split')">拆分任务</button>
                     <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00b2b2] text-white shadow-sm hover:bg-[#00b2b2]/90 text-xs font-semibold border-none">
                         <view class="i-material-symbols-person-add text-[16px]" />
                         <text>指派</text>
                     </button>
                 </view>
             </view>
         </view>
      </view>
    </view>
    <CustomTabBar />
  </view>
</template>

<script lang="ts" setup>
import { handleBack } from '@/utils/navigation'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

const navigateTo = (url: string) => {
  uni.navigateTo({ url })
}

const isSupervisor = ref(true)
const pageTitle = ref('任务管理')

onShow(() => {
  const role = uni.getStorageSync('userRole')
  if (role === 'employee') {
    isSupervisor.value = false
    pageTitle.value = '我的任务历史'
  } else {
    isSupervisor.value = true
    pageTitle.value = '任务管理'
  }
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
