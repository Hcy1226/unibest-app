<route lang="json5">
{
  style: {
    navigationBarTitleText: '任务指派',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] min-h-screen text-slate-900 font-display pb-10">
    <!-- Header -->
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between pt-safe box-border pt-[calc(env(safe-area-inset-top)+56px)]" style="position: fixed; top: 0; left: 0; right: 0; z-index: 999; padding-top: calc(env(safe-area-inset-top) + 56px);">
      <view class="flex items-center gap-3">
        <button class="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors bg-transparent border-none" @click="goBack">
           <view class="i-material-symbols-arrow-back text-slate-600 text-xl" />
        </button>
        <text class="text-lg font-bold text-slate-900">任务拆分与指派</text>
      </view>
      <!-- Action Button in Header -->
      <button class="bg-[#00b2b2] text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 shadow-sm border-none hover:bg-[#009b9b] transition-colors">
        <view class="i-material-symbols-send text-base" />
        <text>下发</text>
      </button>
    </view>
    <!-- Spacer -->
    <view class="w-full h-[220rpx] pt-safe"></view>

    <view class="flex flex-col gap-6 p-5">
      <!-- Main Task Info -->
      <view class="flex flex-col gap-3">
        <text class="text-sm font-bold text-slate-500 uppercase tracking-wider px-1">总任务信息</text>
        <view class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
          <view class="absolute top-0 left-0 w-1.5 h-full bg-red-500"></view>
          <view class="flex justify-between items-start mb-3">
            <view class="flex flex-col w-full">
              <view class="flex items-center justify-between w-full mb-2">
                <text class="font-bold text-xl text-slate-900 line-clamp-1">B区配电箱故障抢修</text>
                <text class="px-2 py-1 rounded bg-red-100 text-red-600 text-xs font-bold shrink-0">紧急</text>
              </view>
              <text class="text-base text-slate-500 leading-relaxed">接到中控室报警，B区3号配电箱电压异常，需立即排查并更换损坏元件。</text>
            </view>
          </view>
          <view class="flex gap-6 mt-4 pt-4 border-t border-slate-50">
            <view class="flex items-center gap-2 text-sm text-slate-500">
               <view class="i-material-symbols-calendar-clock text-lg" />
               <text>截止: 今日 18:00</text>
            </view>
             <view class="flex items-center gap-2 text-sm text-slate-500">
               <view class="i-material-symbols-person text-lg" />
               <text>负责人: 待定</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Add Subtask Form -->
      <view class="flex flex-col gap-4">
         <view class="flex items-center justify-between px-1">
            <text class="text-sm font-bold text-slate-500 uppercase tracking-wider">添加子任务</text>
         </view>
         <view class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-6">
            <view class="flex flex-col gap-2">
               <text class="text-sm font-bold text-slate-700 ml-1">子任务名称</text>
               <input class="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 text-base focus:border-[#00b2b2] placeholder-slate-400" placeholder="例如：拆卸故障模块" type="text" />
            </view>
             <view class="flex flex-col gap-2">
               <text class="text-sm font-bold text-slate-700 ml-1">截止时间</text>
               <view class="relative">
                   <view class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                       <view class="i-material-symbols-schedule text-2xl" />
                   </view>
                   <input class="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 text-base focus:border-[#00b2b2] placeholder-slate-400" type="text" value="今日 16:30" />
               </view>
            </view>
            
            <view class="flex flex-col gap-3">
                 <text class="text-sm font-bold text-slate-700 ml-1">指派给</text>
                 <view class="flex gap-5 overflow-x-auto no-scrollbar pb-2">
                     <!-- Member 1: Selected -->
                     <view class="flex flex-col items-center gap-2 cursor-pointer shrink-0">
                         <view class="relative size-14 rounded-full border-2 border-[#00b2b2] p-0.5">
                             <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL537DzJFFDsubwAb7JAu4y5e7yKWbRNW8IKCTASUtgZefBQPiBW8Fta-FZX523GeJys-93vDNSDsw_70N8HXRRYmRjtUP7GT-fZ3TVX2btxnJmBbNXq2yjIsiQred8cXTHHqnoDnVvnAcKs3gtvJZk7xHPsgsj6aSKHotSe0iUinV0OPDbpgmt_ynK4iZJAQE_qCNsrQJuS722Ie-1ft4tdejNRZJ2J0fOitg6K2da1d2JERJymeVS3yEC-MqDru0S3VQjLCgNEE" class="w-full h-full rounded-full" />
                             <view class="absolute -top-1 -right-1 size-6 bg-[#00b2b2] text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                 <view class="i-material-symbols-check text-sm font-bold" />
                             </view>
                         </view>
                         <text class="text-xs font-bold text-[#00b2b2]">James Wu</text>
                     </view>
                     <!-- Member 2 -->
                     <view class="flex flex-col items-center gap-2 cursor-pointer shrink-0 opacity-60">
                         <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_3akt4pBE2Mma8dD_tiEytpnCMDG-SheizPG9bWt6A8uGtVSXYkT1KXbMQALEegBP7ME1YZWDPtH7OAy9Uh_Kvu36b5RWqPmy5Pj0cSSwU3lSo3AiRXHq6EmGthG8AmH3z-NzeKeHuj007ncxIrh5ug3pxaxPoBWm62x82p5gElNcoPRi9rKYa21c9YY5U-u0PsQXS9Lz4YmtWfo-SB1iEz5iAZiaqum5wei7YVjtm7mRUhVMtSXDo2h41jC1fIcFQ_A9o7zXmWM" class="size-14 rounded-full border border-slate-100" />
                         <text class="text-xs font-medium text-slate-600">陈师傅</text>
                     </view>
                     <!-- Member 3 -->
                      <view class="flex flex-col items-center gap-2 cursor-pointer shrink-0 opacity-60">
                         <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVxcv5rE7bPWvJHB-N0lSWNqr11mcLlNUTU2s76bSGxbwk2-1VVsqS5g1XfABHJBesDOZR_I8NN9f1pT-Z9K7Vm7zRaNlFXiCUAiLIjxKqroCRRQjOlXQ_foi56zhSjo8AZYf97FHmUUqLVNDW-aQX0LBPygwFXBrH2b3IvgIzg4lywnf-z_aOzjFFYE9qikC40J7mF6hWhXREDLL8rTAhJijuHmAmuLr4upczwhb_q8YsozGtvnwDquD2icbLuX66yDkTfXIlBHk" class="size-14 rounded-full border border-slate-100" />
                         <text class="text-xs font-medium text-slate-600">刘技术员</text>
                     </view>
                 </view>
            </view>
            
            <button class="w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-base shadow-md flex items-center justify-center gap-2 mt-2">
                <view class="i-material-symbols-add-circle text-xl" />
                <text>加入拆分清单</text>
            </button>
         </view>
      </view>

       <!-- Split List -->
      <view class="flex flex-col gap-4">
          <view class="flex items-center justify-between px-1">
             <text class="text-sm font-bold text-slate-500 uppercase tracking-wider">已拆分清单 (1)</text>
          </view>
          <view class="flex flex-col gap-3">
              <view class="bg-white p-4 pr-5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                  <view class="flex items-center gap-4">
                      <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL537DzJFFDsubwAb7JAu4y5e7yKWbRNW8IKCTASUtgZefBQPiBW8Fta-FZX523GeJys-93vDNSDsw_70N8HXRRYmRjtUP7GT-fZ3TVX2btxnJmBbNXq2yjIsiQred8cXTHHqnoDnVvnAcKs3gtvJZk7xHPsgsj6aSKHotSe0iUinV0OPDbpgmt_ynK4iZJAQE_qCNsrQJuS722Ie-1ft4tdejNRZJ2J0fOitg6K2da1d2JERJymeVS3yEC-MqDru0S3VQjLCgNEE" class="size-12 rounded-full shrink-0 border border-slate-100" />
                      <view class="flex flex-col gap-1">
                          <text class="text-base font-bold text-slate-900">现场断电操作</text>
                          <view class="flex items-center gap-2">
                              <text class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">James Wu</text>
                              <text class="text-xs text-slate-400">14:30 截止</text>
                          </view>
                      </view>
                  </view>
                  <button class="text-slate-400 hover:text-red-500 transition-colors p-2 bg-transparent border-none">
                      <view class="i-material-symbols-delete text-2xl" />
                  </button>
              </view>
          </view>
      </view>
    </view>

  </view>
</template>

<script lang="ts" setup>
import { handleBack } from '@/utils/navigation'

const goBack = () => {
  handleBack()
}
</script>
