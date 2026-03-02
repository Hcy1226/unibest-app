<route lang="json5">
{
  style: {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] min-h-screen font-display pb-28 relative">
    <!-- Header Background (Gradient & Pattern) -->
    <view class="absolute top-0 left-0 w-full bg-gradient-to-br from-[#00b2b2] to-[#008585] overflow-hidden z-0" style="height: calc(var(--status-bar-height) + 200px)">
      <view class="absolute -right-20 -top-20 w-[400rpx] h-[400rpx] rounded-full bg-white/10 blur-3xl"></view>
      <view class="absolute -left-20 top-40 w-[300rpx] h-[300rpx] rounded-full bg-[#00e5e5]/20 blur-3xl"></view>
    </view>

    <!-- Top Spacer for iOS -->
    <view class="w-full relative z-10" style="padding-top: calc(var(--status-bar-height) + 20px)"></view>

    <!-- User Profile Card -->
    <view class="relative z-10 px-5 pt-4">
      <view class="bg-white/95 backdrop-blur-xl p-6 rounded-[1.5rem] shadow-xl shadow-[#008585]/10 flex items-center gap-5 border border-white/50 animate-fade-in-up">
        <!-- Avatar -->
        <view class="relative">
          <view class="size-20 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden shrink-0">
            <image v-if="userStore.userInfo.avatar && !userStore.userInfo.avatar.includes('default-avatar')" :src="userStore.userInfo.avatar" class="size-full" mode="aspectFill" />
            <view v-else class="text-3xl font-black text-[#00b2b2]">{{ userStore.userInfo.nickname?.[0] || userStore.userInfo.username?.[0] || 'U' }}</view>
          </view>
          <!-- Status Badge -->
          <view class="absolute bottom-1 right-1 size-5 bg-green-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
             <view class="size-2 rounded-full bg-white animate-pulse"></view>
          </view>
        </view>
        
        <!-- Info -->
        <view class="flex flex-col gap-1 flex-1">
          <text class="text-2xl font-black text-slate-800 tracking-tight">{{ userStore.userInfo.nickname || userStore.userInfo.username || '未登录' }}</text>
          <view class="flex items-center gap-2">
            <view class="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-black uppercase text-slate-500 tracking-widest">{{ getRoleName(userStore.userInfo.role) }}</view>
            <text class="text-xs font-bold text-slate-400">ID: {{ userStore.userInfo.userId }}</text>
          </view>
        </view>
        
        <!-- Setting Icon -->
        <view class="size-10 rounded-full bg-slate-50 flex items-center justify-center shadow-inner active:scale-95 transition-transform" @click="handleNotImplemented">
          <view class="i-material-symbols-settings-outline text-slate-500 text-xl"></view>
        </view>
      </view>
    </view>

    <!-- Main Content -->
    <view class="relative z-10 px-5 mt-6 flex flex-col gap-6">
      <!-- Quick Stats Card -->
      <view class="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100/60 flex items-center justify-between animate-fade-in-up" style="animation-delay: 100ms">
        <view class="flex flex-col items-center gap-1 flex-1 border-r border-slate-100" @click="handleNotImplemented">
          <text class="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">本月考勤</text>
          <view class="flex items-baseline gap-1">
            <text class="text-2xl font-black text-slate-800">22</text>
            <text class="text-xs text-slate-400 font-bold">天</text>
          </view>
        </view>
        <view class="flex flex-col items-center gap-1 flex-1" @click="handleNotImplemented">
          <text class="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">剩余年假</text>
          <view class="flex items-baseline gap-1">
            <text class="text-2xl font-black text-slate-800">5</text>
            <text class="text-xs text-slate-400 font-bold">天</text>
          </view>
        </view>
      </view>

      <!-- Menu List -->
      <view class="bg-white rounded-[1.5rem] shadow-sm border border-slate-100/60 overflow-hidden animate-fade-in-up" style="animation-delay: 200ms">
        <view class="flex flex-col">
          <button class="w-full flex items-center gap-4 p-5 bg-transparent border-none outline-none text-left active:bg-slate-50 transition-colors group relative overflow-hidden" @click="handleNotImplemented">
            <view class="size-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-active:scale-95 transition-transform">
              <view class="i-material-symbols-person-outline text-blue-500 text-xl"></view>
            </view>
            <view class="flex-1 border-b border-slate-100/80 pb-5 -mb-5">
              <view class="flex items-center justify-between">
                <text class="text-base font-bold text-slate-800">个人资料</text>
                <view class="i-material-symbols-chevron-right text-slate-300 text-xl group-active:-mr-1 transition-all"></view>
              </view>
            </view>
          </button>
          
          <button class="w-full flex items-center gap-4 p-5 bg-transparent border-none outline-none text-left active:bg-slate-50 transition-colors group relative overflow-hidden" @click="handleNotImplemented">
            <view class="size-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 group-active:scale-95 transition-transform">
              <view class="i-material-symbols-shield-lock-outline text-orange-500 text-xl"></view>
            </view>
            <view class="flex-1 border-b border-slate-100/80 pb-5 -mb-5">
              <view class="flex items-center justify-between">
                <text class="text-base font-bold text-slate-800">修改密码</text>
                <view class="i-material-symbols-chevron-right text-slate-300 text-xl group-active:-mr-1 transition-all"></view>
              </view>
            </view>
          </button>

          <button class="w-full flex items-center gap-4 p-5 bg-transparent border-none outline-none text-left active:bg-slate-50 transition-colors group relative overflow-hidden" @click="handleNotImplemented">
            <view class="size-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0 group-active:scale-95 transition-transform">
              <view class="i-material-symbols-help-outline text-purple-500 text-xl"></view>
            </view>
            <view class="flex-1">
              <view class="flex items-center justify-between">
                <text class="text-base font-bold text-slate-800">帮助与支持</text>
                <view class="i-material-symbols-chevron-right text-slate-300 text-xl group-active:-mr-1 transition-all"></view>
              </view>
            </view>
          </button>
        </view>
      </view>

      <!-- Logout Button -->
      <button class="mt-4 w-full bg-white border border-red-100 p-4 rounded-[1.2rem] flex items-center justify-center gap-2 active:bg-red-50 transition-colors shadow-sm animate-fade-in-up" style="animation-delay: 300ms" @click="handleLogout">
        <view class="i-material-symbols-logout text-red-500 text-lg"></view>
        <text class="text-sm font-black text-red-500 tracking-widest uppercase">退出登录</text>
      </button>
    </view>
    
    <CustomTabBar />
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { useTokenStore } from '@/store/token'

const userStore = useUserStore()
const tokenStore = useTokenStore()

const getRoleName = (role?: string) => {
  if (!role) return '未知'
  const roleMap: Record<string, string> = {
    admin: '管理',
    supervisor: '班长',
    employee: '员工'
  }
  return roleMap[role] || role
}

const handleNotImplemented = () => {
    uni.showToast({
        title: '功能开发中',
        icon: 'none'
    })
}

const handleLogout = () => {
  uni.showModal({
    title: '退出确认',
    content: '确定要退出当前账号吗？',
    confirmColor: '#ef4444',
    cancelColor: '#64748b',
    success: async (res) => {
      if (res.confirm) {
        uni.showLoading({ title: '退出中...' })
        await tokenStore.logout()
        uni.hideLoading()
        
        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        })
        
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/login/index'
          })
        }, 1000)
      }
    }
  })
}
</script>
