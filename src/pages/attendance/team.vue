<route lang="json5">
{
  style: {
    navigationBarTitleText: '班组考勤',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] min-h-screen font-display pb-16">
    <!-- Header -->
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 flex items-center justify-between box-border pt-[var(--status-bar-height)] h-[calc(var(--status-bar-height)+50px)]">
      <view class="flex items-center gap-3">
        <view class="size-8 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 transition-all bg-transparent shrink-0 -ml-2" @click="goBack">
          <view class="i-material-symbols-arrow-back text-slate-600 text-xl" />
        </view>
        <view class="flex flex-col justify-center">
          <text class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">班组管理</text>
          <text class="text-base font-black text-slate-900 block leading-none tracking-tight">今日出勤情况</text>
        </view>
      </view>
      <view @click="loadData" class="size-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors bg-white shrink-0 border border-slate-100 shadow-sm" :class="{ 'animate-spin': loading }">
        <view class="i-material-symbols-refresh text-slate-600 text-lg" />
      </view>
    </view>
    <view class="w-full h-[calc(var(--status-bar-height)+60px)]"></view>

    <!-- Summary Cards -->
    <view class="grid grid-cols-3 gap-3 px-5 mb-5">
      <view class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
        <text class="text-2xl font-black text-emerald-600 block">{{ presentCount }}</text>
        <text class="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">已到岗</text>
      </view>
      <view class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
        <text class="text-2xl font-black text-red-500 block">{{ absentCount }}</text>
        <text class="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">未签到</text>
      </view>
      <view class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
        <text class="text-2xl font-black text-orange-400 block">{{ lateCount }}</text>
        <text class="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">迟到</text>
      </view>
    </view>

    <!-- Date row -->
    <view class="px-5 mb-4 flex items-center gap-2">
      <view class="i-material-symbols-calendar-today text-[#00b2b2] text-base" />
      <text class="text-sm font-bold text-slate-600">{{ todayStr }} · 班组出勤明细</text>
    </view>

    <!-- Loading -->
    <view v-if="loading" class="flex justify-center items-center py-16">
      <view class="size-8 border-2 border-[#00b2b2] border-t-transparent rounded-full animate-spin"></view>
    </view>

    <!-- Empty state -->
    <view v-else-if="teamRecords.length === 0" class="flex flex-col items-center py-16 gap-3">
      <view class="i-material-symbols-group text-6xl text-slate-200"></view>
      <text class="text-sm font-bold text-slate-400">今日暂无打卡记录</text>
    </view>

    <!-- Team Records -->
    <view v-else class="flex flex-col gap-3 px-5">
      <view v-for="record in teamRecords" :key="record.userId"
        class="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4"
      >
        <!-- Avatar -->
        <view class="size-12 rounded-full flex items-center justify-center text-white font-black text-lg shrink-0"
          :class="record.checkInTime ? 'bg-[#00b2b2]' : 'bg-slate-300'">
          {{ (record.userName || '?')[0] }}
        </view>
        <!-- Info -->
        <view class="flex-1 flex flex-col gap-0.5">
          <text class="text-sm font-black text-slate-800">{{ record.userName }}</text>
          <view class="flex items-center gap-2">
            <text v-if="record.checkInTime" class="text-[10px] text-slate-500">
              签到 {{ formatTime(record.checkInTime) }}
              <text v-if="record.checkOutTime"> · 签退 {{ formatTime(record.checkOutTime) }}</text>
            </text>
            <text v-else class="text-[10px] text-red-400">未签到</text>
          </view>
          <text v-if="record.locationName" class="text-[9px] text-slate-300 truncate">{{ record.locationName }}</text>
        </view>
        <!-- Status badge -->
        <view class="px-2.5 py-1 rounded-full text-[10px] font-black shrink-0"
          :class="record.status === 'normal' ? 'bg-emerald-50 text-emerald-600'
            : record.status === 'late' ? 'bg-orange-50 text-orange-500'
            : record.status === 'leave' ? 'bg-blue-50 text-blue-500'
            : 'bg-red-50 text-red-500'">
          {{ record.status === 'normal' ? '正常' : record.status === 'late' ? '迟到' : record.status === 'leave' ? '请假' : '缺勤' }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { http } from '@/http/http'

const loading = ref(false)
const teamRecords = ref<any[]>([])

const now = new Date()
const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
const todayStr = `${now.getFullYear()}年${months[now.getMonth()]}${now.getDate()}日`

const presentCount = computed(() => teamRecords.value.filter(r => r.checkInTime).length)
const absentCount = computed(() => teamRecords.value.filter(r => !r.checkInTime).length)
const lateCount = computed(() => teamRecords.value.filter(r => r.status === 'late').length)

const formatTime = (dateStr: any) => {
  if (!dateStr) return '--:--'
  const d = new Date(dateStr)
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await http.get<any[]>('/attendance/team')
    teamRecords.value = Array.isArray(res) ? res : (res as any)?.data || []
  } catch (e) {
    console.error('[TeamAttendance] Failed to load:', e)
    uni.showToast({ title: '加载失败', icon: 'error' })
  } finally {
    loading.value = false
  }
}

const goBack = () => uni.navigateBack()

onLoad(() => loadData())
onShow(() => loadData())
</script>
