<route lang="json5">
{
  style: {
    navigationBarTitleText: '班组人员',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] min-h-screen text-slate-900 font-display pb-28">
    <!-- Header -->
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between pt-safe box-border pt-[calc(env(safe-area-inset-top)+44px)]" style="position: fixed; top: 0; left: 0; right: 0; z-index: 999; padding-top: calc(env(safe-area-inset-top) + 44px);">
      <view class="flex items-center gap-3">
        <view class="relative group cursor-pointer">
          <view class="size-10 rounded-full bg-cover bg-center border-2 border-[#00b2b2]" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9ni5JPq3Fb1n-ptGOUQvLTCsMEpWa_6qmrKpKzp2xGH4UjwY-PdXXgVjVfnGpN9G-FcIvR1xa7r1u844NKBS7Xwm-El5weCJJ17pOvU3rY92H1PKfbr1T99Xs4GcVBfjXl-7cx-A3DcJtxCzfHCOmWh4zWOodeDH4Z3szYWSEJQZHLmPWyLJgNhwW9BxmSQzSPM0hYsCNln4N0afZjSIxgpT82HoSEdW0GjB0PgXs3MhAIIQhZEiuos2EirWctQp6aINfjh1tFbA');"></view>
          <view class="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white"></view>
        </view>
        <view>
          <text class="text-xs font-medium text-slate-500 block">综合管理工作台</text>
          <text class="text-base font-bold text-slate-900 block leading-tight">班组长 Alex</text>
        </view>
      </view>
      <view class="flex items-center gap-2">
        <button class="p-2 rounded-full hover:bg-slate-100 transition-colors bg-white border-none">
            <view class="i-material-symbols-search text-slate-600 text-xl" />
        </button>
        <button class="relative p-2 rounded-full hover:bg-slate-100 transition-colors bg-transparent border-none">
        <view class="i-material-symbols-person-add text-slate-600 text-2xl" />
      </button>
        <button class="relative p-2 rounded-full hover:bg-slate-100 transition-colors bg-white border-none">
            <view class="i-material-symbols-notifications text-slate-600 text-xl" />
            <view class="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white"></view>
        </button>
      </view>
    </view>
    <!-- Spacer -->
    <view class="w-full h-[220rpx] pt-safe"></view>

    <view class="flex flex-col gap-6 p-4">
      <!-- Stats Grid -->
      <view>
        <view class="grid grid-cols-3 gap-3">
          <view class="p-3 rounded-2xl bg-white border border-slate-100 flex flex-col items-center gap-1 shadow-sm">
            <text class="text-[10px] font-bold text-slate-400 uppercase tracking-tight">总人数</text>
            <text class="text-xl font-bold text-slate-900">12</text>
          </view>
          <view class="p-3 rounded-2xl bg-green-50 border border-green-100 flex flex-col items-center gap-1 shadow-sm">
            <text class="text-[10px] font-bold text-green-600 uppercase tracking-tight">在岗</text>
            <text class="text-xl font-bold text-green-700">8</text>
          </view>
          <view class="p-3 rounded-2xl bg-slate-100/50 border border-slate-200/50 flex flex-col items-center gap-1 shadow-sm">
            <text class="text-[10px] font-bold text-slate-500 uppercase tracking-tight">离岗</text>
            <text class="text-xl font-bold text-slate-600">4</text>
          </view>
        </view>
      </view>

      <!-- Member List -->
      <view class="flex flex-col gap-4">
        <view class="flex items-center justify-between">
          <text class="text-lg font-bold text-slate-900">成员实时动态</text>
          <view class="flex gap-2">
            <text class="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-slate-500">按进度排序</text>
          </view>
        </view>

        <!-- Member 1: Alex Chen -->
        <view class="flex flex-col p-4 rounded-2xl bg-white border border-slate-100 shadow-sm gap-3">
          <view class="flex items-start justify-between">
            <view class="flex items-center gap-3">
              <view class="relative">
                <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_3akt4pBE2Mma8dD_tiEytpnCMDG-SheizPG9bWt6A8uGtVSXYkT1KXbMQALEegBP7ME1YZWDPtH7OAy9Uh_Kvu36b5RWqPmy5Pj0cSSwU3lSo3AiRXHq6EmGthG8AmH3z-NzeKeHuj007ncxIrh5ug3pxaxPoBWm62x82p5gElNcoPRi9rKYa21c9YY5U-u0PsQXS9Lz4YmtWfo-SB1iEz5iAZiaqum5wei7YVjtm7mRUhVMtSXDo2h41jC1fIcFQ_A9o7zXmWM" class="size-12 rounded-full border-white border" />
                <view class="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 border-2 border-white"></view>
              </view>
              <view>
                <view class="flex items-center gap-2">
                  <text class="font-bold text-slate-900">Alex Chen</text>
                  <text class="px-1.5 py-0.5 rounded bg-green-50 text-green-600 text-[10px] font-bold">在岗</text>
                </view>
                <text class="text-xs text-slate-500 mt-0.5 block">工号: #8201 · A区电工组</text>
              </view>
            </view>
            <view class="size-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#00b2b2] transition-colors">
              <view class="i-material-symbols-call text-[20px]" />
            </view>
          </view>
          <view class="bg-slate-50 rounded-xl px-3 py-2.5">
            <view class="flex justify-between items-center mb-1.5">
              <view class="flex items-center gap-1.5">
                <view class="i-material-symbols-running-with-errors text-[16px] text-[#00b2b2]" />
                <text class="text-xs font-bold text-slate-700">A区设备巡检</text>
              </view>
              <text class="text-[10px] font-bold text-[#00b2b2]">65%</text>
            </view>
            <view class="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <view class="h-full bg-[#00b2b2] rounded-full" style="width: 65%"></view>
            </view>
          </view>
          <view class="flex items-center justify-between pt-2 border-t border-slate-50">
            <view class="flex flex-col">
              <text class="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">打卡状态</text>
              <text class="text-xs font-medium text-slate-600 block">08:24 (已打卡)</text>
            </view>
            <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold bg-white">
              <view class="i-material-symbols-edit-calendar text-[16px]" />
              <text>代打卡</text>
            </button>
          </view>
        </view>

        <!-- Member 2: Michael B. -->
        <view class="flex flex-col p-4 rounded-2xl bg-white border-2 border-red-100 shadow-sm gap-3">
          <view class="flex items-start justify-between">
            <view class="flex items-center gap-3">
              <view class="relative">
                <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVxcv5rE7bPWvJHB-N0lSWNqr11mcLlNUTU2s76bSGxbwk2-1VVsqS5g1XfABHJBesDOZR_I8NN9f1pT-Z9K7Vm7zRaNlFXiCUAiLIjxKqroCRRQjOlXQ_foi56zhSjo8AZYf97FHmUUqLVNDW-aQX0LBPygwFXBrH2b3IvgIzg4lywnf-z_aOzjFFYE9qikC40J7mF6hWhXREDLL8rTAhJijuHmAmuLr4upczwhb_q8YsozGtvnwDquD2icbLuX66yDkTfXIlBHk" class="size-12 rounded-full border-white border" />
                <view class="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 border-2 border-white"></view>
              </view>
              <view>
                <view class="flex items-center gap-2">
                  <text class="font-bold text-slate-900">Michael B.</text>
                  <text class="px-1.5 py-0.5 rounded bg-green-50 text-green-600 text-[10px] font-bold">在岗</text>
                   <view class="px-1.5 py-0.5 rounded bg-red-100 text-red-600 text-[10px] font-bold flex items-center gap-0.5">
                      <view class="i-material-symbols-error text-[10px]" />
                      <text>超时</text>
                   </view>
                </view>
                <text class="text-xs text-slate-500 mt-0.5 block">工号: #8211 · 机动组</text>
              </view>
            </view>
            <view class="size-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
              <view class="i-material-symbols-call text-[20px]" />
            </view>
          </view>
          <view class="bg-red-50/50 rounded-xl px-3 py-2.5">
            <view class="flex justify-between items-center mb-1.5">
              <view class="flex items-center gap-1.5 text-red-600">
                <view class="i-material-symbols-history text-[16px]" />
                <text class="text-xs font-bold">物料搬运(紧急)</text>
              </view>
              <text class="text-[10px] font-bold text-red-600">80%</text>
            </view>
            <view class="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <view class="h-full bg-red-500 rounded-full" style="width: 80%"></view>
            </view>
            <text class="text-[10px] text-red-500 mt-1.5 font-medium italic block">任务已超时 15 分钟</text>
          </view>
          <view class="flex items-center justify-between pt-2 border-t border-slate-50">
            <view class="flex flex-col">
              <text class="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">打卡状态</text>
              <text class="text-xs font-medium text-slate-600 block">08:15 (正常)</text>
            </view>
            <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#00b2b2] text-[#00b2b2] hover:bg-[#00b2b2]/5 text-xs font-semibold bg-white">
              <view class="i-material-symbols-edit-calendar text-[16px]" />
              <text>代打卡</text>
            </button>
          </view>
        </view>
        
        <!-- Member 3: Sarah Jones -->
        <view class="flex flex-col p-4 rounded-2xl bg-white border border-slate-100 shadow-sm gap-3 opacity-80">
            <!-- Similar structure for inactive member... -->
            <view class="flex items-start justify-between">
                <view class="flex items-center gap-3">
                     <view class="relative">
                        <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxEL98FwKlnSzqqsGoGpSBznLGkeU70HBtvTRXBo-cR-wSAbeR_swMJnnLhRz8_miKuMGpOrTnMhf3R4K0VHJ0ZH657hCjyxiOCCvcISVV9XbfdzUjrAVs9XxS7mhotemjbiCD40IoKrIuVUvM8pig5ueU8QaoX1yXECE6ARSO1CShLCB8-fgthfa-IwR6S3_w6haUPU4aSk84XN7nFCp57aDkycNzAuaPtfkot8tJ5aBzdoiuqpgkHlwg44TOsWNAjocNiiOqkOI" class="size-12 rounded-full border-white border grayscale" />
                        <view class="absolute bottom-0 right-0 size-3 rounded-full bg-slate-300 border-2 border-white"></view>
                    </view>
                    <view>
                        <view class="flex items-center gap-2">
                             <text class="font-bold text-slate-500">Sarah Jones</text>
                             <text class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold">离岗</text>
                        </view>
                        <text class="text-xs text-slate-400 mt-0.5 block">工号: #8205 · B区安全员</text>
                    </view>
                </view>
                 <view class="size-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                   <view class="i-material-symbols-call text-[20px]" />
                 </view>
            </view>
             <view class="bg-slate-100/50 rounded-xl px-3 py-2 flex items-center gap-2">
                 <view class="i-material-symbols-event-busy text-[16px] text-slate-400" />
                 <text class="text-xs text-slate-400 font-medium italic">暂无执行中任务</text>
             </view>
        </view>
      </view>
    </view>
    <CustomTabBar />
  </view>
</template>
