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
          <view class="size-10 rounded-full bg-gradient-to-br  from-[#00b2b2] to-[#008f8f] border-2 border-[#00b2b2] flex items-center justify-center text-white font-bold text-sm">
            {{ userStore.userInfo.name?.[0] || '?' }}
          </view>
          <view class="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white"></view>
        </view>
        <view>
          <text class="text-xs font-medium text-slate-500 block">综合管理工作台</text>
          <text class="text-base font-bold text-slate-900 block  leading-tight">{{ userStore.userInfo.name || '班组长' }}</text>
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
            <text class="text-xl font-bold text-slate-900">{{ users.length }}</text>
          </view>
          <view class="p-3 rounded-2xl bg-green-50 border border-green-100 flex flex-col items-center gap-1 shadow-sm">
            <text class="text-[10px] font-bold text-green-600 uppercase tracking-tight">在职</text>
            <text class="text-xl font-bold text-green-700">{{ activeUsersCount }}</text>
          </view>
          <view class="p-3 rounded-2xl bg-slate-100/50 border border-slate-200/50 flex flex-col items-center gap-1 shadow-sm">
            <text class="text-[10px] font-bold text-slate-500 uppercase tracking-tight">离职</text>
            <text class="text-xl font-bold text-slate-600">{{ inactiveUsersCount }}</text>
          </view>
        </view>
      </view>

      <!-- Member List -->
      <view class="flex flex-col gap-4">
        <view class="flex items-center justify-between">
          <text class="text-lg font-bold text-slate-900">成员列表</text>
          <view class="flex gap-2">
            <text class="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-slate-500">按状态排序</text>
          </view>
        </view>

        <!-- Loading State -->
        <view v-if="loading" class="flex justify-center items-center py-12">
          <text class="text-slate-400 text-sm">加载中...</text>
        </view>

        <!-- Empty State -->
        <view v-else-if="users.length === 0" class="flex flex-col items-center justify-center py-12 gap-2">
          <view class="i-material-symbols-group-off text-4xl text-slate-300" />
          <text class="text-slate-400 text-sm">暂无成员数据</text>
        </view>

        <!-- Member Cards -->
        <view 
          v-else
          v-for="(user, index) in users" 
          :key="user.id"
          class="flex flex-col p-4 rounded-2xl bg-white border border-slate-100 shadow-sm gap-3"
          :class="{ 'opacity-60': !user.status }"
        >
          <view class="flex items-start justify-between">
            <view class="flex items-center gap-3">
              <view class="relative">
                <view 
                  class="size-12 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-md"
                  :class="user.status ? 'bg-gradient-to-br from-[#00b2b2] to-[#008f8f]' : 'bg-gradient-to-br from-slate-300 to-slate-400'"
                >
                  {{ user.name.charAt(0) }}
                </view>
                <view 
                  class="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white"
                  :class="user.status ? 'bg-green-500' : 'bg-slate-300'"
                ></view>
              </view>
              <view>
                <view class="flex items-center gap-2">
                  <text class="font-bold" :class="user.status ? 'text-slate-900' : 'text-slate-500'">{{ user.name }}</text>
                  <text 
                    class="px-1.5 py-0.5 rounded text-[10px] font-bold"
                    :class="user.status ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'"
                  >
                    {{ user.status ? '在职' : '离职' }}
                  </text>
                </view>
                <text class="text-xs mt-0.5 block" :class="user.status ? 'text-slate-500' : 'text-slate-400'">
                  账号: {{ user.username }} · {{ getRoleLabel(user.role) }}
                </text>
              </view>
            </view>
            <view 
              v-if="user.phone"
              class="size-9 rounded-full flex items-center justify-center"
              :class="user.status ? 'bg-[#00b2b2]/10 text-[#00b2b2]' : 'bg-slate-50 text-slate-400'"
              @tap="callUser(user.phone)"
            >
              <view class="i-material-symbols-call text-[20px]" />
            </view>
          </view>

          <!-- User Info -->
          <view class="bg-slate-50/50 rounded-xl px-3 py-2 flex items-center justify-between">
            <view class="flex items-center gap-2">
              <view class="i-material-symbols-phone-iphone text-[16px] text-slate-400" />
              <text class="text-xs text-slate-600 font-medium">{{ user.phone || '未设置' }}</text>
            </view>
            <view class="flex items-center gap-2">
              <view class="i-material-symbols-business text-[16px] text-slate-400" />
              <text class="text-xs text-slate-600 font-medium">部门ID: {{ user.departmentId || '未分配' }}</text>
            </view>
          </view>

          <!-- Join Date -->
          <view class="flex items-center gap-2">
            <view class="i-material-symbols-event text-[14px] text-slate-400" />
            <text class="text-[10px] text-slate-400">入职时间: {{ formatDate(user.createdAt) }}</text>
          </view>
        </view>
      </view>
    </view>
    <CustomTabBar />
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { getUsers, type User } from '@/api/user'

const userStore = useUserStore()
const users = ref<User[]>([])
const loading = ref(false)

// 计算在职和离职人数
const activeUsersCount = computed(() => users.value.filter(u => u.status).length)
const inactiveUsersCount = computed(() => users.value.filter(u => !u.status).length)

// 获取角色标签
const getRoleLabel = (role: string) => {
  const roleMap: Record<string, string> = {
    'admin': '管理员',
    'supervisor': '主管',
    'employee': '员工'
  }
  return roleMap[role] || role
}

// 格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

// 拨打电话
const callUser = (phone: string) => {
  if (!phone) return
  uni.makePhoneCall({
    phoneNumber: phone
  })
}

// 获取用户列表
const fetchUsers = async () => {
  loading.value = true
  try {
    users.value = await getUsers()
  } catch (error) {
    console.error('获取用户列表失败:', error)
    uni.showToast({
      title: '加载失败',
      icon: 'none'
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>
