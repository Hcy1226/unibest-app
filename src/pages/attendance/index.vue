<route lang="json5">
{
  style: {
    navigationBarTitleText: '考勤打卡',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] min-h-screen font-display pb-28 relative overflow-hidden">
    <!-- Header -->
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 flex items-center justify-between box-border pt-[var(--status-bar-height)] h-[calc(var(--status-bar-height)+50px)]">
      <view class="flex items-center gap-3">
        <view class="flex flex-col justify-center">
          <text class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">出勤管理</text>
          <text class="text-base font-black text-slate-900 block leading-none tracking-tight">今日考勤打卡</text>
        </view>
      </view>
      <view @click="loadHistory" class="size-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors bg-white shrink-0 cursor-pointer border border-slate-100 shadow-sm">
        <view class="i-material-symbols-history text-slate-600 text-lg" />
      </view>
    </view>
    <!-- Spacer -->
    <view class="w-full h-[calc(var(--status-bar-height)+60px)]"></view>

    <!-- Date & Time Display -->
    <view class="flex flex-col items-center pt-8 pb-6 px-5">
      <text class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">{{ weekday }}</text>
      <text class="text-3xl font-black text-slate-800 tracking-tight block mb-1">{{ currentDate }}</text>
      <text class="text-5xl font-black text-[#00b2b2] tracking-tight block" style="font-variant-numeric: tabular-nums">{{ currentTime }}</text>
    </view>

    <!-- Location Info -->
    <view class="mx-5 mb-5 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-3">
      <view class="size-10 rounded-full bg-[#00b2b2]/10 flex items-center justify-center shrink-0">
        <view class="i-material-symbols-location-on text-[#00b2b2] text-xl" />
      </view>
      <view class="flex-1 flex flex-col gap-0.5">
        <text class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">当前位置</text>
        <text v-if="locationName" class="text-sm font-bold text-slate-800">{{ locationName }}</text>
        <text v-else-if="locating" class="text-sm text-slate-400">正在获取位置...</text>
        <text v-else class="text-sm text-red-400">无法获取位置</text>
      </view>
      <view @click="getLocation" class="size-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors bg-slate-50 shrink-0 cursor-pointer" :class="{ 'animate-spin': locating }">
        <view class="i-material-symbols-refresh text-slate-500 text-lg" />
      </view>
    </view>

    <!-- Clock-In Status Card -->
    <view class="mx-5 mb-6 p-5 rounded-[1.5rem] relative overflow-hidden"
      :class="todayStatus.hasCheckedOut
        ? 'bg-gradient-to-br from-slate-600 to-slate-800'
        : todayStatus.hasCheckedIn
          ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
          : 'bg-gradient-to-br from-[#00b2b2] to-[#007f7f]'"
    >
      <view class="absolute -right-5 -bottom-5 opacity-10">
        <view class="i-material-symbols-fingerprint text-[140px] text-white" />
      </view>
      <view class="relative z-10 flex flex-col gap-4">
        <view class="flex items-center justify-between">
          <view>
            <text class="text-white/70 text-[10px] font-bold uppercase tracking-widest block mb-1">今日状态</text>
            <text class="text-white text-lg font-black block">
              {{ todayStatus.hasCheckedOut ? '已完成签退' : todayStatus.hasCheckedIn ? '已签到，工作中' : '未签到' }}
            </text>
          </view>
          <view class="size-12 rounded-full flex items-center justify-center"
            :class="todayStatus.hasCheckedOut ? 'bg-white/10' : todayStatus.hasCheckedIn ? 'bg-white/20' : 'bg-white/20'">
            <view :class="todayStatus.hasCheckedOut ? 'i-material-symbols-done-all' : todayStatus.hasCheckedIn ? 'i-material-symbols-work' : 'i-material-symbols-fingerprint'" class="text-white text-2xl" />
          </view>
        </view>
        <!-- Time records -->
        <view class="flex gap-4">
          <view v-if="todayStatus.hasCheckedIn" class="flex-1 bg-white/10 rounded-xl p-3 flex flex-col gap-0.5">
            <text class="text-white/60 text-[9px] font-bold uppercase tracking-widest">签到时间</text>
            <text class="text-white font-black text-sm">{{ formatTime(todayStatus.checkInTime) }}</text>
          </view>
          <view v-if="todayStatus.hasCheckedOut" class="flex-1 bg-white/10 rounded-xl p-3 flex flex-col gap-0.5">
            <text class="text-white/60 text-[9px] font-bold uppercase tracking-widest">签退时间</text>
            <text class="text-white font-black text-sm">{{ formatTime(todayStatus.checkOutTime) }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Clock In / Out Big Button -->
    <view class="flex flex-col items-center gap-4 px-5">
      <view v-if="!todayStatus.hasCheckedOut"
        @click="handleClockAction"
        class="size-40 rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-all cursor-pointer relative"
        :class="todayStatus.hasCheckedIn
          ? 'bg-gradient-to-br from-slate-600 to-slate-800 shadow-slate-500/30'
          : 'bg-gradient-to-br from-[#00b2b2] to-[#007f7f] shadow-[#00b2b2]/30'"
      >
        <!-- Rings -->
        <view class="absolute inset-0 rounded-full border-4 opacity-20"
          :class="todayStatus.hasCheckedIn ? 'border-slate-400' : 'border-[#00e5e5]'"></view>
        <view class="absolute inset-2 rounded-full border-2 opacity-10"
          :class="todayStatus.hasCheckedIn ? 'border-white' : 'border-white'"></view>
        <view class="flex flex-col items-center gap-1">
          <view :class="todayStatus.hasCheckedIn ? 'i-material-symbols-logout' : 'i-material-symbols-login'" class="text-white text-4xl" />
          <text class="text-white font-black text-sm">{{ todayStatus.hasCheckedIn ? '签退下班' : '签到上班' }}</text>
        </view>
      </view>

      <!-- Already done for today -->
      <view v-else class="flex flex-col items-center py-6 gap-2">
        <view class="size-20 rounded-full bg-emerald-100 flex items-center justify-center">
          <view class="i-material-symbols-check-circle text-5xl text-emerald-500" />
        </view>
        <text class="text-sm font-bold text-slate-500">今日考勤已完成</text>
      </view>

      <!-- Loading Indicator -->
      <text v-if="loading" class="text-sm text-slate-400">处理中...</text>
    </view>

    <!-- History Section -->
    <view v-if="history.length > 0" class="mx-5 mt-8 flex flex-col gap-3">
      <text class="text-sm font-black text-slate-800">近期记录</text>
      <view v-for="record in history.slice(0, 5)" :key="record.id"
        class="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
        <view class="size-10 rounded-full flex items-center justify-center shrink-0"
          :class="record.status === 'normal' ? 'bg-emerald-50' : record.status === 'late' ? 'bg-orange-50' : 'bg-red-50'">
          <view class="text-xl"
            :class="record.status === 'normal' ? 'i-material-symbols-check-circle text-emerald-500'
              : record.status === 'late' ? 'i-material-symbols-schedule text-orange-500'
              : 'i-material-symbols-cancel text-red-500'" />
        </view>
        <view class="flex-1">
          <text class="text-sm font-bold text-slate-800 block">{{ formatDate(record.date) }}</text>
          <text class="text-xs text-slate-400">
            {{ record.checkInTime ? formatTime(record.checkInTime) : '--' }} - {{ record.checkOutTime ? formatTime(record.checkOutTime) : '--' }}
          </text>
        </view>
        <view class="text-[10px] font-black px-2 py-0.5 rounded-full"
          :class="record.status === 'normal' ? 'bg-emerald-50 text-emerald-600'
            : record.status === 'late' ? 'bg-orange-50 text-orange-600'
            : 'bg-red-50 text-red-600'">
          {{ record.status === 'normal' ? '正常' : record.status === 'late' ? '迟到' : '缺勤' }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/http/http'

const loading = ref(false)
const locating = ref(false)
const locationName = ref('')
const latitude = ref<number | null>(null)
const longitude = ref<number | null>(null)
const currentTime = ref('--:--:--')
const currentDate = ref('')
const history = ref<any[]>([])

const todayStatus = ref({
  hasCheckedIn: false,
  hasCheckedOut: false,
  checkInTime: null as any,
  checkOutTime: null as any,
  locationName: '',
  date: '',
})

let timer: any = null

const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
const weekday = computed(() => weekdays[new Date().getDay()])

const updateClock = () => {
  const now = new Date()
  currentTime.value = now.toTimeString().slice(0, 8)
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  currentDate.value = `${now.getFullYear()}年${month}月${day}日`
}

const formatTime = (dateStr: any) => {
  if (!dateStr) return '--:--'
  const d = new Date(dateStr)
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return `${m}月${d}日`
}

const getLocation = () => {
  locating.value = true
  uni.getLocation({
    type: 'gcj02',
    success: (res) => {
      latitude.value = res.latitude
      longitude.value = res.longitude
      // Reverse geocode using WeChat
      locationName.value = `${res.latitude.toFixed(4)}, ${res.longitude.toFixed(4)}`
      // Try to get a proper address
      uni.chooseLocation && null // placeholder
    },
    fail: () => {
      locationName.value = ''
    },
    complete: () => {
      locating.value = false
    }
  })
}

const loadTodayStatus = async () => {
  try {
    const res = await http.get<any>('/attendance/today')
    todayStatus.value = res as any
  } catch (e) {
    console.error('[Attendance] Failed to get today status:', e)
  }
}

const loadHistory = async () => {
  try {
    const res = await http.get<any[]>('/attendance/me')
    history.value = Array.isArray(res) ? res : (res as any)?.data || []
  } catch (e) {
    console.error('[Attendance] Failed to load history:', e)
  }
}

const handleClockAction = async () => {
  if (loading.value) return
  loading.value = true

  try {
    if (!todayStatus.value.hasCheckedIn) {
      // Check In
      await http.post('/attendance/check-in', {
        latitude: latitude.value,
        longitude: longitude.value,
        locationName: locationName.value || '未知位置',
      })
      uni.showToast({ title: '签到成功！', icon: 'success' })
    } else {
      // Check Out
      await http.post('/attendance/check-out', {})
      uni.showToast({ title: '签退成功！', icon: 'success' })
    }
    await loadTodayStatus()
  } catch (e) {
    console.error('[Attendance] Clock action failed:', e)
    uni.showToast({ title: '操作失败', icon: 'error' })
  } finally {
    loading.value = false
  }
}

const goBack = () => uni.navigateBack()

onLoad(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
  getLocation()
  loadTodayStatus()
  loadHistory()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
