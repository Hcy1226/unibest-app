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
    <!-- Header -->
    <view class="fixed top-0 left-0 w-full z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 flex flex-col transition-all" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="h-[44px] px-4 flex items-center justify-between w-full">
          <view class="flex items-center gap-2">
             <button class="p-1 -ml-1 bg-white border-none" @click="handleBack">
                <view class="i-material-symbols-chevron-left text-slate-600 text-2xl" />
             </button>
             <text class="text-base font-bold text-slate-900 leading-tight">{{ pageTitle }}</text>
          </view>
          <view class="flex items-center gap-1" v-if="isSupervisor">
             <button class="p-2 rounded-full hover:bg-slate-100 bg-white border-none">
                <view class="i-material-symbols-calendar-month text-slate-600 text-xl" />
             </button>
             <button class="p-2 rounded-full hover:bg-slate-100 bg-white border-none">
                <view class="i-material-symbols-filter-list text-slate-600 text-xl" />
             </button>
          </view>
      </view>
    </view>
    <!-- Spacer -->
    <view :style="{ height: (44 + statusBarHeight) + 'px', width: '100%' }"></view>

    <view class="flex flex-col gap-4 p-4">
      <!-- Trends Chart -->
      <view class="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col gap-6" v-if="isSupervisor">
         <view>
            <view class="flex items-center justify-between mb-4">
                <view class="text-sm font-bold flex items-center gap-2">
                   <view class="size-2 rounded-full bg-red-500"></view>
                   <text>超时任务趋势</text>
                </view>
                <text class="text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded">最近7天</text>
            </view>
            <view class="relative h-24 w-full flex items-end justify-between gap-1">
               <!-- Bar 1 -->
               <view class="flex-1 flex flex-col items-center gap-1">
                   <view class="w-full bg-red-100 rounded-t-sm relative" style="height: 40%">
                      <view class="absolute -top-1 left-1/2 -translate-x-1/2 size-1.5 bg-red-500 rounded-full"></view>
                   </view>
                   <text class="text-[8px] text-slate-400">05/20</text>
               </view>
                <!-- Bar 2 -->
               <view class="flex-1 flex flex-col items-center gap-1">
                   <view class="w-full bg-red-100 rounded-t-sm relative" style="height: 65%">
                      <view class="absolute -top-1 left-1/2 -translate-x-1/2 size-1.5 bg-red-500 rounded-full"></view>
                   </view>
                   <text class="text-[8px] text-slate-400">05/21</text>
               </view>
               <!-- Bar 3 -->
               <view class="flex-1 flex flex-col items-center gap-1">
                   <view class="w-full bg-red-100 rounded-t-sm relative" style="height: 30%">
                      <view class="absolute -top-1 left-1/2 -translate-x-1/2 size-1.5 bg-red-500 rounded-full"></view>
                   </view>
                   <text class="text-[8px] text-slate-400">05/22</text>
               </view>
               <!-- Bar 4 -->
               <view class="flex-1 flex flex-col items-center gap-1">
                   <view class="w-full bg-red-100 rounded-t-sm relative" style="height: 85%">
                      <view class="absolute -top-1 left-1/2 -translate-x-1/2 size-1.5 bg-red-500 rounded-full"></view>
                   </view>
                   <text class="text-[8px] text-slate-400">05/23</text>
               </view>
               <!-- Bar 5 -->
               <view class="flex-1 flex flex-col items-center gap-1">
                   <view class="w-full bg-red-100 rounded-t-sm relative" style="height: 50%">
                      <view class="absolute -top-1 left-1/2 -translate-x-1/2 size-1.5 bg-red-500 rounded-full"></view>
                   </view>
                   <text class="text-[8px] text-slate-400">05/24</text>
               </view>
               <!-- Bar 6 (Today) -->
               <view class="flex-1 flex flex-col items-center gap-1">
                   <view class="w-full bg-red-500 rounded-t-sm relative" style="height: 95%">
                      <view class="absolute -top-1 left-1/2 -translate-x-1/2 size-1.5 bg-red-600 rounded-full"></view>
                   </view>
                   <text class="text-[8px] font-bold text-red-500">今日</text>
               </view>
            </view>
         </view>
         
         <view class="pt-4 border-t border-slate-50">
             <view class="flex items-center justify-between mb-4">
                 <view class="text-sm font-bold flex items-center gap-2">
                     <view class="size-2 rounded-full bg-orange-500"></view>
                     <text>驳回原因分布</text>
                 </view>
             </view>
             <view class="flex items-center gap-8">
                 <view class="relative size-20 flex-shrink-0">
                     <!-- SVG Donut Chart -->
                     <image src="data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='18' cy='18' r='16' fill='transparent' stroke='%23f1f5f9' stroke-width='4'/%3E%3Ccircle cx='18' cy='18' r='16' fill='transparent' stroke='%23f59e0b' stroke-width='4' stroke-dasharray='70 100'/%3E%3Ccircle cx='18' cy='18' r='16' fill='transparent' stroke='%23ef4444' stroke-width='4' stroke-dasharray='30 100' stroke-dashoffset='-70'/%3E%3C/svg%3E" class="size-full transform -rotate-90" />
                     <view class="absolute inset-0 flex flex-col items-center justify-center">
                         <text class="text-xs font-bold">14</text>
                         <text class="text-[8px] text-slate-400">总计</text>
                     </view>
                 </view>
                 <view class="flex flex-col gap-2">
                     <view class="flex items-center gap-2">
                         <view class="size-2 rounded-full bg-orange-500"></view>
                         <text class="text-xs text-slate-500">物料不全 (70%)</text>
                     </view>
                     <view class="flex items-center gap-2">
                         <view class="size-2 rounded-full bg-red-500"></view>
                         <text class="text-xs text-slate-500">质量不符 (30%)</text>
                     </view>
                 </view>
             </view>
         </view>
      </view>

      <!-- Filter Tabs -->
       <view class="flex items-center gap-2 overflow-x-auto no-scrollbar py-1" v-if="isSupervisor">
         <button class="px-3 py-1.5 rounded-full bg-[#00b2b2] text-white text-xs font-medium whitespace-nowrap border-none">全部异常</button>
         <button class="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-medium whitespace-nowrap">仅超时</button>
         <button class="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-medium whitespace-nowrap">仅驳回</button>
         <button class="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-medium whitespace-nowrap">按成员</button>
       </view>

       <!-- Exception List -->
       <view class="flex flex-col gap-3">
           <view class="flex items-center justify-between">
               <text class="text-sm font-bold text-slate-900">异常记录明细</text>
               <text class="text-[10px] text-slate-400">共 8 条异常</text>
           </view>
           
           <!-- Item 1: Overdue -->
           <view class="p-4 rounded-2xl bg-white border-l-4 border-l-red-500 border border-slate-100 shadow-sm flex flex-col gap-3">
               <view class="flex justify-between items-start">
                   <view>
                       <text class="text-sm font-bold text-slate-900 mb-0.5 block">A区高压配电柜巡检</text>
                       <view class="flex items-center gap-2">
                           <text class="text-[10px] px-1.5 py-0.5 bg-red-50 text-red-600 font-bold rounded">任务超时</text>
                           <text class="text-[10px] text-slate-400">10:45 AM</text>
                       </view>
                   </view>
                   <view class="flex items-center gap-2">
                       <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVxcv5rE7bPWvJHB-N0lSWNqr11mcLlNUTU2s76bSGxbwk2-1VVsqS5g1XfABHJBesDOZR_I8NN9f1pT-Z9K7Vm7zRaNlFXiCUAiLIjxKqroCRRQjOlXQ_foi56zhSjo8AZYf97FHmUUqLVNDW-aQX0LBPygwFXBrH2b3IvgIzg4lywnf-z_aOzjFFYE9qikC40J7mF6hWhXREDLL8rTAhJijuHmAmuLr4upczwhb_q8YsozGtvnwDquD2icbLuX66yDkTfXIlBHk" class="size-6 rounded-full" />
                       <text class="text-xs font-medium text-slate-700">Michael B.</text>
                   </view>
               </view>
               <view class="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                   <text class="text-xs text-slate-500 italic">持续时长</text>
                   <text class="text-xs font-bold text-red-600">32 分钟</text>
               </view>
           </view>

            <!-- Item 2: Rejected -->
            <view class="p-4 rounded-2xl bg-white border-l-4 border-l-orange-500 border border-slate-100 shadow-sm flex flex-col gap-3">
                <view class="flex justify-between items-start">
                    <view>
                        <text class="text-sm font-bold text-slate-900 mb-0.5 block">物料入库核验</text>
                        <view class="flex items-center gap-2">
                             <text class="text-[10px] px-1.5 py-0.5 bg-orange-50 text-orange-600 font-bold rounded">任务被驳回</text>
                             <text class="text-[10px] text-slate-400">09:15 AM</text>
                        </view>
                    </view>
                     <view class="flex items-center gap-2">
                       <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_3akt4pBE2Mma8dD_tiEytpnCMDG-SheizPG9bWt6A8uGtVSXYkT1KXbMQALEegBP7ME1YZWDPtH7OAy9Uh_Kvu36b5RWqPmy5Pj0cSSwU3lSo3AiRXHq6EmGthG8AmH3z-NzeKeHuj007ncxIrh5ug3pxaxPoBWm62x82p5gElNcoPRi9rKYa21c9YY5U-u0PsQXS9Lz4YmtWfo-SB1iEz5iAZiaqum5wei7YVjtm7mRUhVMtSXDo2h41jC1fIcFQ_A9o7zXmWM" class="size-6 rounded-full" />
                       <text class="text-xs font-medium text-slate-700">Alex Chen</text>
                   </view>
                </view>
                <view class="flex flex-col gap-1 bg-slate-50 p-2 rounded-lg">
                    <text class="text-[10px] text-slate-400 uppercase font-bold">驳回原因</text>
                    <text class="text-xs text-slate-700">上传的物料照片模糊，无法确认编码，请重新拍摄上传。</text>
                </view>
            </view>
       </view>

    </view>
  </view>
</template>

<script lang="ts" setup>
// uni is globally available in UniApp
import { handleBack } from '@/utils/navigation'
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

const isSupervisor = ref(true)
const pageTitle = ref('任务异常统计')
const statusBarHeight = ref(0)

onLoad(() => {
    statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight || 20
})

onShow(() => {
  const role = uni.getStorageSync('userRole')
  if (role === 'employee') {
    isSupervisor.value = false
    pageTitle.value = '我的异常记录'
  } else {
    isSupervisor.value = true
    pageTitle.value = '任务异常统计'
  }
})
</script>
