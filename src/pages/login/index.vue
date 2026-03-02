<route lang="json5">
{
  type: 'home',
  style: {
    navigationBarTitleText: '用户登录',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="h-screen w-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center font-display relative overflow-hidden">
    <!-- Decorative background elements -->
    <view class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/20 blur-3xl opacity-50"></view>
    <view class="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-400/20 blur-3xl opacity-50"></view>

    <view class="w-[85%] max-w-md bg-white rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden relative z-10">
      <view class="p-10">
        <!-- Logo Area -->
        <view class="text-center mb-10">
          <view class="mx-auto flex flex-col items-center justify-center w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 text-white mb-6 shadow-xl shadow-blue-500/30 transform transition-transform hover:scale-105 duration-300">
            <view class="i-material-symbols-domain text-4xl" />
          </view>
          <view class="text-3xl font-black text-slate-800 tracking-tight mb-2">欢迎登录</view>
          <text class="text-sm font-medium text-slate-400 block tracking-wide">Enterprise Operation Management</text>
        </view>

        <!-- Form Area -->
        <view class="space-y-6">
          <view class="space-y-2">
            <text class="block text-xs font-bold text-slate-600 uppercase tracking-widest ml-1">账号</text>
            <view class="relative group">
              <view class="i-material-symbols-person absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-blue-500 transition-colors" />
              <input v-model="username" type="text" class="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200/60 rounded-2xl text-base font-medium text-slate-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all" placeholder="请输入您的账号" />
            </view>
          </view>

          <view class="space-y-2">
            <text class="block text-xs font-bold text-slate-600 uppercase tracking-widest ml-1">密码</text>
            <view class="relative group">
              <view class="i-material-symbols-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-blue-500 transition-colors" />
              <input v-model="password" :password="true" type="text" class="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200/60 rounded-2xl text-base font-medium text-slate-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all" placeholder="请输入您的密码" />
            </view>
          </view>

          <view class="flex items-center justify-end">
            <text class="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">忘记密码?</text>
          </view>

          <button @click="handleLogin" :disabled="loading" class="w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-base shadow-xl shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
            <view v-if="loading" class="i-material-symbols-progress-activity animate-spin text-xl" />
            <text v-else class="tracking-widest">登录系统</text>
            <view v-if="!loading" class="i-material-symbols-arrow-right-alt text-xl" />
          </button>
        </view>
      </view>
      
      <!-- Footer -->
      <view class="bg-slate-50/50 px-8 py-5 border-t border-slate-100 flex justify-center">
        <text class="text-xs font-medium text-slate-400">
          v1.0.0 © Enterprise OS
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTokenStore } from '@/store/token'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { onLoad } from '@dcloudio/uni-app'

onLoad((options) => {
  console.log('Login Page Loaded. Options:', options)
})

const username = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  if (!username.value || !password.value) {
    uni.showToast({ title: '请输入账号和密码', icon: 'none' })
    return
  }

  loading.value = true
  try {
    const { login } = useTokenStore()
    const { userInfo } = storeToRefs(useUserStore()) // Need to import storeToRefs and useUserStore
    
    await login({ username: username.value, password: password.value })
    
    // Check role and redirect
    const role = userInfo.value.role
    const currentUsername = username.value // Using localized value just in case
    console.log('Login Success. UserInfo:', JSON.stringify(userInfo.value))
    console.log('Detected Role:', role)

    uni.showToast({ title: '登录成功', icon: 'success' })
    
    setTimeout(() => {
        // Fallback or explicit check for 'banzuzhang' as requested
        if (currentUsername === 'banzuzhang' || role === 'supervisor' || role === 'admin') {
             console.log('Redirecting to Supervisor Dashboard (SwitchTab) - Matched banzuzhang or supervisor')
             uni.switchTab({ url: '/pages/index/index' })
        } else {
             console.log('Redirecting to Employee Page (ReLaunch)')
             uni.reLaunch({ url: '/pages/employee/index' })
        }
    }, 500)

  } catch (error) {
    // Error handled in store/interceptor usually, but good to have fallback
  } finally {
    loading.value = false
  }
}
</script>
