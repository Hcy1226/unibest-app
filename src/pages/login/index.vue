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
  <view class="h-screen w-screen bg-[#f0f2f5] flex items-center justify-center font-display">
    <view class="w-[90%] max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
      <view class="p-8">
        <view class="text-center mb-8">
          <view class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#137fec] text-white mb-4 shadow-lg shadow-blue-500/30">
            <view class="i-material-symbols-domain text-2xl" />
          </view>
          <view class="text-2xl font-bold text-center mb-8">用户登录 (v3)</view>
          <text class="text-sm text-gray-500 mt-2 block">Enterprise Operation Management</text>
        </view>

        <view class="space-y-6">
          <view>
            <text class="block text-sm font-medium text-gray-700 mb-1">账号</text>
            <view class="relative">
              <view class="i-material-symbols-person absolute left-3 top-2.5 text-gray-400 text-lg" />
              <input v-model="username" type="text" class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] outline-none transition-all" placeholder="请输入用户名" />
            </view>
          </view>

          <view>
            <text class="block text-sm font-medium text-gray-700 mb-1">密码</text>
            <view class="relative">
              <view class="i-material-symbols-lock absolute left-3 top-2.5 text-gray-400 text-lg" />
              <input v-model="password" :password="true" type="text" class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] outline-none transition-all" placeholder="请输入密码" />
            </view>
          </view>

          <view class="flex items-center justify-end">
            <text class="text-xs text-[#137fec]">忘记密码?</text>
          </view>

          <button @click="handleLogin" :disabled="loading" class="w-full py-2.5 bg-[#137fec] hover:bg-blue-600 text-white rounded-lg font-bold text-sm shadow-lg shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center gap-2">
            <view v-if="loading" class="i-material-symbols-progress-activity animate-spin text-lg" />
            <text v-else>登录系统</text>
            <view v-if="!loading" class="i-material-symbols-arrow-forward" />
          </button>
        </view>
      </view>
      <view class="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
        <text class="text-xs text-gray-500">
          © 2024 Unibest Property Management
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
