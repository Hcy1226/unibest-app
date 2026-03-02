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
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/80 backdrop-blur-xl border-b border-white/50 px-5 pb-2 flex flex-col justify-end shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] box-border pt-[var(--status-bar-height)] h-[calc(var(--status-bar-height)+60px)]">
      <view class="flex items-center justify-between">
        <view class="flex flex-col gap-1">
          <text class="text-[10px] font-black text-[#00b2b2] tracking-widest uppercase">My Team</text>
          <text class="text-3xl font-black text-slate-800 tracking-tight leading-none">班组人员</text>
        </view>
        <view class="flex items-center gap-3">
          <!-- Refresh Button -->
          <view class="size-10 rounded-full bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100/50 active:scale-90 transition-transform" @click="fetchUsers">
            <view class="i-material-symbols-refresh text-[22px] text-slate-600" :class="{ 'animate-spin': loading }" />
          </view>
        </view>
      </view>
    </view>
    <!-- Spacer -->
    <view class="w-full h-[calc(var(--status-bar-height)+80px)]"></view>

    <view class="flex flex-col gap-6 p-5">
      <!-- Stats Grid -->
      <view class="grid grid-cols-2 gap-4 animate-fade-in-up" style="animation-duration: 800ms">
        <view class="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-[1.5rem] p-5 relative overflow-hidden ring-1 ring-white/60 shadow-sm">
           <view class="absolute -right-4 -bottom-4 opacity-5">
             <view class="i-material-symbols-groups text-8xl" />
           </view>
           <text class="text-[11px] font-black text-indigo-400 tracking-widest uppercase mb-1 block">Total Members</text>
           <view class="flex items-baseline gap-1.5 mt-2">
             <text class="text-4xl font-black text-indigo-900 tracking-tighter">{{ users.length }}</text>
             <text class="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">人</text>
           </view>
        </view>
        <view class="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-[1.5rem] p-5 relative overflow-hidden ring-1 ring-white/60 shadow-sm">
           <view class="absolute -right-4 -bottom-4 opacity-5">
             <view class="i-material-symbols-how-to-reg text-8xl" />
           </view>
           <text class="text-[11px] font-black text-emerald-400 tracking-widest uppercase mb-1 block">Active Employees</text>
           <view class="flex items-baseline gap-1.5 mt-2">
             <text class="text-4xl font-black text-emerald-900 tracking-tighter">{{ activeUsersCount }}</text>
             <text class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">人</text>
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
        <view v-if="loading" class="flex flex-col items-center justify-center py-12 gap-3">
          <view class="i-material-symbols-progress-activity animate-spin text-3xl text-[#00b2b2]" />
          <text class="text-sm font-bold text-slate-400 tracking-widest uppercase">正在加载数据...</text>
        </view>

        <!-- Empty State -->
        <view v-else-if="users.length === 0" class="flex flex-col items-center justify-center py-16 gap-3">
          <view class="i-material-symbols-group-off text-5xl text-slate-200" />
          <text class="text-sm font-bold text-slate-400 tracking-widest uppercase">暂无班组成员</text>
        </view>

        <!-- Member Cards -->
        <view 
          v-else
          v-for="(user, index) in users" 
          :key="user.id"
          class="flex flex-col p-5 rounded-[1.5rem] bg-white border border-slate-100/60 shadow-md shadow-slate-200/50 gap-4 relative overflow-hidden group active:scale-[0.98] transition-transform duration-300"
          :class="{ 'opacity-60': !user.status }"
        >
          <view class="flex items-start justify-between">
            <view class="flex items-center gap-4">
              <view class="relative">
                <view 
                  class="size-12 rounded-[1rem] flex items-center justify-center text-white font-black text-xl shadow-inner overflow-hidden shrink-0"
                  :class="user.status ? 'bg-gradient-to-br from-[#00b2b2] to-[#008f8f]' : 'bg-gradient-to-br from-slate-300 to-slate-400'"
                >
                  {{ user.name.charAt(0) }}
                </view>
                <view 
                  class="absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-white"
                  :class="user.status ? 'bg-green-500' : 'bg-slate-300'"
                ></view>
              </view>
              <view class="flex flex-col justify-center gap-0.5">
                <view class="flex items-center gap-2 mb-0.5">
                  <text class="text-base font-black tracking-wide" :class="user.status ? 'text-slate-800' : 'text-slate-500'">{{ user.name }}</text>
                  <text v-if="user.role === 'supervisor'" class="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-500/20">组长</text>
                  <text 
                    class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ring-1 ring-inset"
                    :class="user.status ? 'bg-green-50 text-green-600 ring-green-500/20' : 'bg-slate-50 text-slate-500 ring-slate-500/20'"
                  >
                    {{ user.status ? '在职' : '离职' }}
                  </text>
                </view>
                <text class="text-xs font-bold text-slate-400 tracking-wider">
                  工号: {{ user.username }} 
                </text>
              </view>
            </view>
            
          </view>

          <!-- Divider -->
          <view class="h-px w-full bg-slate-100/80 my-1"></view>

          <!-- Details Grid -->
          <view class="grid grid-cols-2 gap-y-3 gap-x-4">
            <view class="flex flex-col gap-1">
              <view class="flex items-center gap-1.5 text-slate-400">
                <view class="i-material-symbols-badge text-[14px]" />
                <text class="text-[10px] uppercase tracking-widest font-bold">角色权限</text>
              </view>
              <text class="text-sm font-black text-slate-700 ml-5">{{ getRoleLabel(user.role) }}</text>
            </view>
            
            <view class="flex flex-col gap-1">
              <view class="flex items-center gap-1.5 text-slate-400">
                <view class="i-material-symbols-call text-[14px]" />
                <text class="text-[10px] uppercase tracking-widest font-bold">联系电话</text>
              </view>
              <text class="text-sm font-black text-slate-700 ml-5">{{ user.phone || '未设置' }}</text>
            </view>
            
            <view class="flex flex-col gap-1">
              <view class="flex items-center gap-1.5 text-slate-400">
                <view class="i-material-symbols-business text-[14px]" />
                <text class="text-[10px] uppercase tracking-widest font-bold">所属部门</text>
              </view>
              <text class="text-sm font-black text-slate-700 ml-5 truncate">{{ user.departmentId || '未分配' }}</text>
            </view>
            
            <view class="flex flex-col gap-1">
               <view class="flex items-center gap-1.5 text-slate-400">
                 <view class="i-material-symbols-calendar-today text-[14px]" />
                 <text class="text-[10px] uppercase tracking-widest font-bold">加入时间</text>
               </view>
               <text class="text-sm font-black text-slate-700 ml-5">{{ formatDate(user.createdAt) }}</text>
            </view>
          </view>

          <!-- Actions Container -->
          <view class="flex items-center justify-end pt-2 border-t border-slate-100/80 mt-1">
            <button v-if="user.phone" 
                    class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00b2b2] to-[#008585] text-white shadow-lg shadow-[#00b2b2]/30 hover:shadow-[#00b2b2]/40 active:scale-95 text-[11px] font-black uppercase tracking-widest border-none transition-all mr-0"
                    :class="{'opacity-50 pointer-events-none grayscale': !user.status}"
                    @click.stop="callUser(user.phone)">
              <view class="i-material-symbols-call text-base" />
              <text>拨打电话</text>
            </button>
            <view v-else class="text-xs font-bold text-slate-400 px-2 py-1 bg-slate-50 rounded">暂无联系方式</view>
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
