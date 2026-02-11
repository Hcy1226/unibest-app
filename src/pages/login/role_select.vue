<route lang="json5">
{
  style: {
    navigationBarTitleText: '选择角色',
    navigationBarBackgroundColor: '#ffffff',
  },
}
</route>

<template>
  <view class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 gap-8">
    <view class="text-center mb-8">
      <view class="text-2xl font-bold text-slate-800 mb-2">欢迎使用</view>
      <view class="text-slate-500">请选择您的登录角色</view>
    </view>

    <!-- Supervisor Role -->
    <view 
      class="w-full bg-white rounded-2xl p-8 shadow-sm border-2 border-transparent hover:border-[#00b2b2] active:scale-95 transition-all cursor-pointer flex flex-col items-center gap-4 relative overflow-hidden group"
      @click="selectRole('supervisor')"
    >
      <view class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <view class="i-material-symbols-admin-panel-settings text-8xl text-[#00b2b2]" />
      </view>
      <view class="size-20 rounded-full bg-[#00b2b2]/10 flex items-center justify-center text-[#00b2b2]">
        <view class="i-material-symbols-manage-accounts text-5xl" />
      </view>
      <view class="text-center">
        <view class="text-xl font-bold text-slate-900 mb-1">我是班组长</view>
        <view class="text-sm text-slate-500">Supervisor</view>
      </view>
      <view class="w-full mt-4 py-3 rounded-xl bg-[#00b2b2] text-white font-bold text-center">
        进入工作台
      </view>
    </view>

    <!-- Employee Role -->
    <view 
      class="w-full bg-white rounded-2xl p-8 shadow-sm border-2 border-transparent hover:border-[#00b2b2] active:scale-95 transition-all cursor-pointer flex flex-col items-center gap-4 relative overflow-hidden group"
      @click="selectRole('employee')"
    >
       <view class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <view class="i-material-symbols-engineering text-8xl text-[#00b2b2]" />
      </view>
      <view class="size-20 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
        <view class="i-material-symbols-person-apron text-5xl" />
      </view>
      <view class="text-center">
        <view class="text-xl font-bold text-slate-900 mb-1">我是员工</view>
        <view class="text-sm text-slate-500">Employee</view>
      </view>
      <view class="w-full mt-4 py-3 rounded-xl bg-orange-500 text-white font-bold text-center">
        进入工作台
      </view>
    </view>

    <view class="mt-auto text-xs text-slate-400">
      v1.0.0 Enterprise Operation System
    </view>
  </view>
</template>

<script lang="ts" setup>
const selectRole = (role: 'supervisor' | 'employee') => {
  if (role === 'supervisor') {
    // Navigate to Supervisor Home
    uni.switchTab({ url: '/pages/index/index' })
  } else {
    // Navigate to Employee Home
    uni.redirectTo({ url: '/pages/employee/index' })
  }
}
</script>
