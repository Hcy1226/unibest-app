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
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 flex items-center justify-between box-border pt-[var(--status-bar-height)] h-[calc(var(--status-bar-height)+44px)]">
      <text class="text-lg font-bold text-slate-900 leading-tight">个人中心</text>
      <view class="size-8 relative flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors bg-white shrink-0 cursor-pointer border border-slate-100 shadow-sm">
        <view class="i-material-symbols-notifications text-slate-600 text-[20px]" />
        <view class="absolute top-[2px] right-[2px] size-2 bg-red-500 rounded-full border border-white"></view>
      </view>
    </view>
    <!-- Spacer -->
    <view class="w-full h-[calc(var(--status-bar-height)+60px)]"></view>

    <view class="flex flex-col gap-6 p-4">
      <!-- Profile Card -->
      <view class="flex flex-col items-center pt-2 pb-2">
        <view class="relative group cursor-pointer">
           <image :src="userInfo.avatar" class="size-24 rounded-full border-4 border-white shadow-lg" />
           <view class="absolute bottom-1 right-1 size-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
             <view class="i-material-symbols-verified text-[14px] text-white" />
           </view>
        </view>
        <text class="text-xl font-bold text-slate-900 mt-4">{{ userInfo.name }}</text>
        <view class="flex items-center gap-2 mt-1.5">
           <text class="text-sm text-slate-500">{{ userInfo.role }} · {{ userInfo.roleTag }}</text>
           <text class="px-2 py-0.5 rounded bg-[#00b2b2]/10 text-[#00b2b2] text-[10px] font-bold tracking-wide">{{ userInfo.id }}</text>
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

      <!-- Business Functions -->
      <view class="flex flex-col gap-3">
         <text class="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">业务功能</text>
         <view class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <!-- 考勤统计 → 班组考勤总览 -->
            <view @click="goToTeamAttendance" class="w-full flex items-center justify-between p-4 border-b border-slate-50 bg-white active:bg-slate-50 transition-colors">
               <view class="flex items-center gap-3">
                  <view class="i-material-symbols-calendar-month text-[#00b2b2] text-xl" />
                  <text class="text-sm font-medium text-slate-700">考勤统计</text>
               </view>
               <view class="i-material-symbols-chevron-right text-slate-400 text-lg" />
            </view>
            <!-- 打卡记录 → 个人打卡页 -->
            <view @click="goToAttendance" class="w-full flex items-center justify-between p-4 border-b border-slate-50 bg-white active:bg-slate-50 transition-colors">
               <view class="flex items-center gap-3">
                  <view class="i-material-symbols-fingerprint text-slate-400 text-xl" />
                  <text class="text-sm font-medium text-slate-700">打卡记录</text>
               </view>
               <view class="i-material-symbols-chevron-right text-slate-400 text-lg" />
            </view>
            <view class="w-full flex items-center justify-between p-4 border-b border-slate-50 bg-white active:bg-slate-50 group transition-colors">
               <view class="flex items-center gap-3">
                  <view class="i-material-symbols-fact-check text-slate-400 text-xl" />
                  <text class="text-sm font-medium text-slate-700">我的审批</text>
               </view>
               <view class="flex items-center gap-2">
                  <view class="size-2 rounded-full bg-red-500"></view>
                  <view class="i-material-symbols-chevron-right text-slate-400 text-lg" />
               </view>
            </view>
         </view>
      </view>

      <!-- Other -->
      <view class="flex flex-col gap-3">
         <text class="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">其他</text>
         <view class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <view class="w-full flex items-center justify-between p-4 border-b border-slate-50 bg-white active:bg-slate-50 transition-colors">
               <view class="flex items-center gap-3">
                  <view class="i-material-symbols-settings text-slate-400 text-xl" />
                  <text class="text-sm font-medium text-slate-700">系统设置</text>
               </view>
               <view class="i-material-symbols-chevron-right text-slate-400 text-lg" />
            </view>
             <view class="w-full flex items-center justify-between p-4 border-b border-slate-50 bg-white active:bg-slate-50 transition-colors">
               <view class="flex items-center gap-3">
                  <view class="i-material-symbols-help text-slate-400 text-xl" />
                  <text class="text-sm font-medium text-slate-700">帮助与反馈</text>
               </view>
               <view class="i-material-symbols-chevron-right text-slate-400 text-lg" />
            </view>
         </view>
      </view>

      <view @click="handleLogout" class="w-full py-3.5 rounded-xl border border-slate-200 text-center text-red-500 font-semibold transition-colors mb-4 text-sm bg-white active:bg-red-50">退出登录</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'
import { useTokenStore } from '@/store/token'

const userStore = useUserStore()
const tokenStore = useTokenStore()

const userInfo = ref({
  name: 'Alex Chen',
  role: '班组长',
  roleTag: 'A区电工组',
  id: '#8201',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9ni5JPq3Fb1n-ptGOUQvLTCsMEpWa_6qmrKpKzp2xGH4UjwY-PdXXgVjVfnGpN9G-FcIvR1xa7r1u844NKBS7Xwm-El5weCJJ17pOvU3rY92H1PKfbr1T99Xs4GcVBfjXl-7cx-A3DcJtxCzfHCOmWh4zWOodeDH4Z3szYWSEJQZHLmPWyLJgNhwW9BxmSQzSPM0hYsCNln4N0afZjSIxgpT82HoSEdW0GjB0PgXs3MhAIIQhZEiuos2EirWctQp6aINfjh1tFbA'
})

const isSupervisor = ref(true)

onShow(() => {
  const role = userStore.userInfo?.role
  if (role === 'employee') {
    isSupervisor.value = false
    userInfo.value = {
      name: userStore.userInfo?.name || '一线员工',
      role: '一线员工',
      roleTag: '执行人',
      id: `#${userStore.userInfo?.userId || '9527'}`,
       avatar: userStore.userInfo?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9ni5JPq3Fb1n-ptGOUQvLTCsMEpWa_6qmrKpKzp2xGH4UjwY-PdXXgVjVfnGpN9G-FcIvR1xa7r1u844NKBS7Xwm-El5weCJJ17pOvU3rY92H1PKfbr1T99Xs4GcVBfjXl-7cx-A3DcJtxCzfHCOmWh4zWOodeDH4Z3szYWSEJQZHLmPWyLJgNhwW9BxmSQzSPM0hYsCNln4N0afZjSIxgpT82HoSEdW0GjB0PgXs3MhAIIQhZEiuos2EirWctQp6aINfjh1tFbA'
    }
  } else {
    isSupervisor.value = true
  }
})

const goToTeamAttendance = () => uni.navigateTo({ url: '/pages/attendance/team' })
const goToAttendance = () => uni.switchTab({ url: '/pages/attendance/index' })

const handleLogout = () => {
    tokenStore.logout()
    uni.reLaunch({ url: '/pages/login/index' })
}
</script>
