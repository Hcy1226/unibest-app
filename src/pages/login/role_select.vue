<route lang="json5">
{
  style: {
    navigationBarTitleText: '选择角色',
    navigationBarBackgroundColor: '#ffffff',
  },
}
</route>

<template>
  <view class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 gap-8 font-display relative overflow-hidden">
    <!-- Decorative Blobs -->
    <view class="absolute top-[5%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#00b2b2]/10 blur-3xl"></view>
    <view class="absolute bottom-[5%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-500/10 blur-3xl"></view>

    <!-- Header -->
    <view class="text-center mb-6 relative z-10">
      <view class="text-3xl font-black text-slate-800 mb-2 tracking-tight animate-fade-in-up">身份确认</view>
      <view class="text-base font-medium text-slate-500 animate-fade-in-up" style="animation-delay: 100ms">请选择工作台入口</view>
    </view>

    <view class="w-full max-w-sm space-y-6 relative z-10">
      <!-- Supervisor Role -->
      <view 
        class="w-full bg-white/90 backdrop-blur-md rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-white/80 hover:border-[#00b2b2]/50 active:scale-[0.98] transition-all duration-300 cursor-pointer flex flex-col items-center gap-5 relative overflow-hidden group animate-fade-in-up" style="animation-delay: 200ms"
        @click="selectRole('supervisor')"
      >
        <!-- Background Icon -->
        <view class="absolute -right-4 -bottom-4 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 rotate-12 group-hover:rotate-0">
          <view class="i-material-symbols-admin-panel-settings text-[10rem] text-[#00b2b2]" />
        </view>
        
        <!-- Main Icon -->
        <view class="size-24 rounded-full bg-gradient-to-br from-[#00b2b2]/10 to-[#008585]/10 flex items-center justify-center text-[#00b2b2] shadow-inner group-hover:scale-110 transition-transform duration-300">
          <view class="i-material-symbols-manage-accounts text-5xl drop-shadow-sm" />
        </view>
        
        <!-- Text -->
        <view class="text-center">
          <view class="text-2xl font-black text-slate-800 mb-1 tracking-wide">我是班组长</view>
          <view class="text-sm font-bold text-slate-400 uppercase tracking-widest">Supervisor</view>
        </view>
        
        <!-- Button Indicator -->
        <view class="w-full mt-2 py-3.5 rounded-2xl bg-[#00b2b2] hover:bg-[#009b9b] text-white font-bold text-base text-center shadow-lg shadow-[#00b2b2]/30 flex items-center justify-center gap-2 transition-colors">
          进入管理空间
          <view class="i-material-symbols-arrow-right-alt text-xl" />
        </view>
      </view>

      <!-- Employee Role -->
      <view 
        class="w-full bg-white/90 backdrop-blur-md rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-white/80 hover:border-orange-500/50 active:scale-[0.98] transition-all duration-300 cursor-pointer flex flex-col items-center gap-5 relative overflow-hidden group animate-fade-in-up" style="animation-delay: 300ms"
        @click="selectRole('employee')"
      >
        <!-- Background Icon -->
        <view class="absolute -right-4 -bottom-4 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 rotate-12 group-hover:rotate-0">
          <view class="i-material-symbols-engineering text-[10rem] text-orange-500" />
        </view>
        
        <!-- Main Icon -->
        <view class="size-24 rounded-full bg-gradient-to-br from-orange-500/10 to-red-500/10 flex items-center justify-center text-orange-500 shadow-inner group-hover:scale-110 transition-transform duration-300">
          <view class="i-material-symbols-person-apron text-5xl drop-shadow-sm" />
        </view>
        
        <!-- Text -->
        <view class="text-center">
          <view class="text-2xl font-black text-slate-800 mb-1 tracking-wide">我是员工</view>
          <view class="text-sm font-bold text-slate-400 uppercase tracking-widest">Employee</view>
        </view>
        
        <!-- Button Indicator -->
        <view class="w-full mt-2 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base text-center shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-colors">
          进入工作区
          <view class="i-material-symbols-arrow-right-alt text-xl" />
        </view>
      </view>
    </view>

    <view class="mt-auto pt-8 text-xs font-bold text-slate-400 tracking-wider">
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
