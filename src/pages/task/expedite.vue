<route lang="json5">
{
  style: {
    navigationBarTitleText: '任务催办',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] min-h-screen text-slate-900 font-display pb-36">
    <!-- Header -->
    <view class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center gap-3 pt-safe">
      <button class="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors bg-white border-none" @click="uni.navigateBack()">
        <view class="i-material-symbols-arrow-back text-slate-600 text-xl" />
      </button>
      <view class="flex-1">
        <text class="text-xs font-medium text-slate-500 block">任务管理</text>
        <view class="flex items-center gap-2">
           <text class="text-lg font-bold text-slate-900 leading-tight">任务催办反馈</text>
           <text class="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold">紧急</text>
        </view>
      </view>
       <button class="p-2 rounded-full hover:bg-slate-100 transition-colors bg-white border-none">
        <view class="i-material-symbols-help text-slate-400 text-xl" />
      </button>
    </view>

    <view class="flex flex-col gap-5 p-4">
      <!-- Task Summary -->
      <view class="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden">
        <view class="absolute top-0 left-0 w-1.5 h-full bg-red-500"></view>
        <view class="pl-2">
          <view class="flex justify-between items-start mb-2">
            <text class="text-base font-bold text-slate-900">B区配电箱故障抢修</text>
            <text class="text-xs font-mono text-red-500 bg-red-50 px-2 py-1 rounded">#TASK-2094</text>
          </view>
          <view class="flex items-center gap-4 text-xs text-slate-500">
             <view class="flex items-center gap-1">
                <view class="i-material-symbols-schedule text-[14px]" />
                <text>截止: 今日 14:00</text>
             </view>
             <view class="flex items-center gap-1 text-red-500 font-medium">
                <view class="i-material-symbols-warning text-[14px]" />
                <text>已超时 45分钟</text>
             </view>
          </view>
        </view>
      </view>

      <!-- Lagging Personnel -->
      <view class="flex flex-col gap-3">
        <view class="flex items-center justify-between px-1">
           <view class="text-sm font-bold text-slate-800 flex items-center gap-2">
             <text>滞后人员</text>
             <view class="size-5 rounded-full bg-slate-100 text-slate-600 text-[10px] flex items-center justify-center font-bold">3</view>
           </view>
           <view class="flex items-center gap-2 text-xs font-medium text-[#00b2b2] cursor-pointer">
              <checkbox checked color="#00b2b2" style="transform: scale(0.7)" />
              <text>全选人员</text>
           </view>
        </view>
        
        <view class="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
           <!-- Member 1 -->
           <view class="flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50 transition-colors">
              <checkbox checked color="#00b2b2" style="transform: scale(0.8)" />
              <view class="relative">
                 <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL537DzJFFDsubwAb7JAu4y5e7yKWbRNW8IKCTASUtgZefBQPiBW8Fta-FZX523GeJys-93vDNSDsw_70N8HXRRYmRjtUP7GT-fZ3TVX2btxnJmBbNXq2yjIsiQred8cXTHHqnoDnVvnAcKs3gtvJZk7xHPsgsj6aSKHotSe0iUinV0OPDbpgmt_ynK4iZJAQE_qCNsrQJuS722Ie-1ft4tdejNRZJ2J0fOitg6K2da1d2JERJymeVS3yEC-MqDru0S3VQjLCgNEE" class="size-10 rounded-full border border-slate-100" />
                 <view class="absolute -bottom-0.5 -right-0.5 size-2.5 bg-yellow-500 border-2 border-white rounded-full"></view>
              </view>
              <view class="flex-1">
                 <view class="flex justify-between items-center">
                    <text class="text-sm font-bold text-slate-900">James Wu</text>
                    <text class="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">滞后 45m</text>
                 </view>
                 <text class="text-xs text-slate-500 mt-0.5 block">当前位置: 主仓库领料区</text>
              </view>
           </view>

           <!-- Member 2 -->
           <view class="flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50 transition-colors">
              <checkbox checked color="#00b2b2" style="transform: scale(0.8)" />
               <view class="relative">
                 <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_3akt4pBE2Mma8dD_tiEytpnCMDG-SheizPG9bWt6A8uGtVSXYkT1KXbMQALEegBP7ME1YZWDPtH7OAy9Uh_Kvu36b5RWqPmy5Pj0cSSwU3lSo3AiRXHq6EmGthG8AmH3z-NzeKeHuj007ncxIrh5ug3pxaxPoBWm62x82p5gElNcoPRi9rKYa21c9YY5U-u0PsQXS9Lz4YmtWfo-SB1iEz5iAZiaqum5wei7YVjtm7mRUhVMtSXDo2h41jC1fIcFQ_A9o7zXmWM" class="size-10 rounded-full border border-slate-100" />
                 <view class="absolute -bottom-0.5 -right-0.5 size-2.5 bg-gray-400 border-2 border-white rounded-full"></view>
              </view>
              <view class="flex-1">
                 <view class="flex justify-between items-center">
                    <text class="text-sm font-bold text-slate-900">Sarah Chen</text>
                    <text class="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">无进展</text>
                 </view>
                 <text class="text-xs text-slate-500 mt-0.5 block">上次更新: 2小时前</text>
              </view>
           </view>
        </view>
      </view>

      <!-- Expedite Message -->
      <view class="flex flex-col gap-3">
         <text class="text-sm font-bold text-slate-800 px-1">催办留言</text>
         <view class="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col gap-3">
            <view class="flex flex-wrap gap-2">
               <text class="px-3 py-1.5 rounded-lg bg-[#00b2b2]/10 text-[#00b2b2] border border-[#00b2b2]/20 text-xs font-medium">请加快进度</text>
               <text class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">遇到什么问题了吗？</text>
               <text class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">收到请立即回复</text>
            </view>
            <view class="relative">
               <textarea class="w-full rounded-xl bg-slate-50 border border-slate-200 text-sm focus:border-[#00b2b2] p-3 min-h-[80px] placeholder-slate-400" placeholder="输入自定义催办信息..." />
               <text class="absolute bottom-2 right-2 text-[10px] text-slate-400">0/50</text>
            </view>
         </view>
      </view>

       <!-- History -->
       <view class="flex flex-col gap-3">
          <text class="text-sm font-bold text-slate-800 px-1">催办记录</text>
          <view class="pl-2 border-l-2 border-slate-100 space-y-4 ml-2">
             <view class="relative pl-6">
                <view class="absolute -left-[9px] top-1.5 size-4 rounded-full bg-slate-200 border-2 border-white"></view>
                <view class="flex flex-col">
                   <text class="text-xs text-slate-400 font-medium mb-0.5">今日 14:30</text>
                   <view class="text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-100 shadow-sm inline-block">
                      <text class="font-bold text-[#00b2b2]">系统提醒: </text>
                      <text>任务即将超时，请注意进度。</text>
                   </view>
                </view>
             </view>
             <!-- Item 2 -->
             <view class="relative pl-6 opacity-60">
                 <view class="absolute -left-[9px] top-1.5 size-4 rounded-full bg-slate-200 border-2 border-white"></view>
                 <view class="flex flex-col">
                     <text class="text-xs text-slate-400 font-medium mb-0.5">今日 13:00</text>
                     <text class="text-xs text-slate-500">任务已派发给 James Wu, Sarah Chen, Mike Ross</text>
                 </view>
             </view>
          </view>
       </view>

    </view> <!-- End Main -->

    <view class="fixed bottom-20 left-0 w-full px-4 py-2 z-30 pointer-events-none">
       <button class="pointer-events-auto w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2">
          <view class="i-material-symbols-notifications-active text-[20px]" />
          <text>一键催办 (2人)</text>
       </button>
    </view>

  </view>
</template>

<script lang="ts" setup>

</script>
