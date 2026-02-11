<route lang="json5">
{
  style: {
    navigationBarTitleText: '个人中心',
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
          <view class="flex items-center gap-2">
              <view class="i-material-symbols-arrow-back text-2xl text-slate-900" @click="handleBack"/>
              <text class="text-lg font-bold text-slate-900 leading-tight">个人中心</text>
          </view>
          <button class="relative p-2 rounded-full hover:bg-slate-100 transition-colors bg-white border-none">
            <view class="i-material-symbols-notifications text-slate-600 text-xl" />
            <view class="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white"></view>
          </button>
      </view>
    </view>
    <!-- Spacer -->
    <view :style="{ height: (44 + statusBarHeight) + 'px', width: '100%' }"></view>

    <view class="flex flex-col gap-6 p-4">
      <!-- Profile Card -->
      <view class="flex flex-col items-center pt-2 pb-2">
        <view class="relative group cursor-pointer">
           <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9ni5JPq3Fb1n-ptGOUQvLTCsMEpWa_6qmrKpKzp2xGH4UjwY-PdXXgVjVfnGpN9G-FcIvR1xa7r1u844NKBS7Xwm-El5weCJJ17pOvU3rY92H1PKfbr1T99Xs4GcVBfjXl-7cx-A3DcJtxCzfHCOmWh4zWOodeDH4Z3szYWSEJQZHLmPWyLJgNhwW9BxmSQzSPM0hYsCNln4N0afZjSIxgpT82HoSEdW0GjB0PgXs3MhAIIQhZEiuos2EirWctQp6aINfjh1tFbA" class="size-24 rounded-full border-4 border-white shadow-lg" />
           <view class="absolute bottom-1 right-1 size-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
             <view class="i-material-symbols-verified text-[14px] text-white" />
           </view>
        </view>
        <text class="text-xl font-bold text-slate-900 mt-4">操作员 Alex</text>
        <view class="flex items-center gap-2 mt-1.5">
           <text class="text-sm text-slate-500">一线员工 · C组操作员</text>
           <text class="px-2 py-0.5 rounded bg-[#00b2b2]/10 text-[#00b2b2] text-[10px] font-bold tracking-wide">#9527</text>
        </view>
      </view>

      <!-- Stats Grid -->
      <view class="grid grid-cols-3 gap-3">
         <view class="p-4 rounded-2xl bg-white border border-slate-100 flex flex-col items-center gap-1 shadow-sm">
            <text class="text-2xl font-bold text-slate-900">26</text>
            <text class="text-xs font-medium text-slate-500">本月出勤</text>
         </view>
         <view class="p-4 rounded-2xl bg-white border border-slate-100 flex flex-col items-center gap-1 shadow-sm">
            <text class="text-2xl font-bold text-slate-900">142</text>
            <text class="text-xs font-medium text-slate-500">工时统计</text>
         </view>
         <view class="p-4 rounded-2xl bg-white border border-slate-100 flex flex-col items-center gap-1 shadow-sm">
            <text class="text-2xl font-bold text-slate-900">100%</text>
            <text class="text-xs font-medium text-slate-500">绩效评分</text>
         </view>
      </view>

      <!-- Other -->
      <view class="flex flex-col gap-3">
         <text class="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">其他</text>
         <view class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <button class="w-full flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors bg-white border-none group">
               <view class="flex items-center gap-3">
                  <view class="i-material-symbols-settings text-slate-400 group-hover:text-[#00b2b2] transition-colors text-xl" />
                  <text class="text-sm font-medium text-slate-700">系统设置</text>
               </view>
               <view class="i-material-symbols-chevron-right text-slate-400 text-lg" />
            </button>
             <button class="w-full flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors bg-white border-none group">
               <view class="flex items-center gap-3">
                  <view class="i-material-symbols-help text-slate-400 group-hover:text-[#00b2b2] transition-colors text-xl" />
                  <text class="text-sm font-medium text-slate-700">帮助与反馈</text>
               </view>
               <view class="i-material-symbols-chevron-right text-slate-400 text-lg" />
            </button>
         </view>
      </view>

      <button class="w-full py-3.5 rounded-xl border border-slate-200 text-red-500 font-semibold hover:bg-red-50 transition-colors mb-4 text-sm bg-white" @click="handleLogout">退出登录</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { handleBack } from '@/utils/navigation'

const handleLogout = () => {
    uni.removeStorageSync('userRole')
    uni.reLaunch({ url: '/pages/login/index' })
}

const statusBarHeight = ref(0)
onLoad(() => {
    statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight || 20
})
</script>
