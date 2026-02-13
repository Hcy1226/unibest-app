<route lang="json5">
{
  style: {
    navigationBarTitleText: '任务详情',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] min-h-screen text-slate-900 font-display pb-28">
    <!-- Header -->
    <view class="fixed top-0 left-0 w-full z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between pt-[calc(env(safe-area-inset-top)+10px)]">
      <button class="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors bg-transparent border-none" @click="handleBack">
        <view class="i-material-symbols-arrow-back-ios-new text-slate-600 text-xl" />
      </button>
      <text class="text-base font-bold text-slate-900 leading-tight">任务详情</text>
      <button class="p-2 -mr-2 rounded-full hover:bg-slate-100 transition-colors bg-transparent border-none">
        <view class="i-material-symbols-more-vert text-slate-600 text-xl" />
      </button>
    </view>
    
    <!-- Spacer -->
     <view class="w-full pt-[calc(env(safe-area-inset-top)+60px)]"></view>

    <!-- Loading/Error -->
    <view v-if="loading" class="flex justify-center items-center py-20">
      <text class="text-sm text-slate-400">加载中...</text>
    </view>
    <view v-else-if="!taskInfo" class="flex flex-col justify-center items-center py-20">
      <view class="i-material-symbols-error text-slate-300 text-6xl mb-3"></view>
      <text class="text-sm text-slate-400">任务不存在</text>
    </view>

    <view v-else class="flex flex-col gap-6 p-4">
      <!-- Section 1: Task Overview -->
      <view class="flex flex-col gap-4">
        <view class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <view class="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
             <view class="text-[100px]" :class="dictionaryStore.getValue('task_type', taskInfo.type)" />
          </view>
          <view class="relative z-10">
            <view class="flex items-start justify-between mb-4">
              <view>
                <text class="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-blue-100 text-blue-600 mb-2">
                  {{ dictionaryStore.getLabel('task_status', taskInfo.status) }}
                </text>
                <text class="text-xl font-bold text-slate-900 leading-tight mb-1 block">{{ taskInfo.title }}</text>
                <text class="text-xs text-slate-500 block">单号: T-{{ taskInfo.id.toString().padStart(6, '0') }}</text>
              </view>
            </view>
            
            <!-- Progress Bar -->
            <view class="mb-2 flex justify-between items-end">
              <view class="flex items-end">
                  <text class="text-3xl font-bold text-[#00b2b2]">{{ progressPercentage }}</text>
                  <text class="text-sm font-medium text-slate-400 ml-0.5 mb-1">%</text>
              </view>
              <text class="text-xs font-medium text-slate-500">{{ completedSubtasks }}/{{ totalSubtasks }} 项已完成</text>
            </view>
            <view class="w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden">
              <view class="bg-[#00b2b2] h-3 rounded-full relative transition-all duration-500" :style="{ width: progressPercentage + '%' }">
                <view class="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></view>
              </view>
            </view>

            <view class="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-50">
              <view class="flex items-center gap-1.5">
                <view class="i-material-symbols-calendar-clock text-[16px]" />
                <text>截止: {{ formatDate(taskInfo.deadline) }}</text>
              </view>
              <view class="flex items-center gap-1.5">
                <view class="i-material-symbols-group text-[16px]" />
                <text v-if="taskInfo.assignee">负责人: {{ taskInfo.assignee?.name }}</text>
                <text v-else-if="taskInfo.assigneeId">负责人: {{ getAssigneeName(taskInfo.assigneeId) }}</text>
                <text v-else>未指派</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- Section 2: Subtasks -->
      <view class="flex flex-col gap-3">
        <view class="flex items-center justify-between px-1">
          <text class="text-sm font-bold text-slate-900 uppercase tracking-wide">子任务列表</text>
          <view class="text-xs font-medium text-[#00b2b2] flex items-center gap-0.5">
            <text>查看全部</text>
            <view class="i-material-symbols-chevron-right text-[14px]" />
          </view>
        </view>
        
        <view class="flex flex-col gap-3">
            <view v-if="subtasks.length === 0" class="text-center py-6 bg-white rounded-xl border border-slate-100">
                <text class="text-xs text-slate-400">无子任务</text>
            </view>
            
            <view v-for="sub in subtasks" :key="sub.id" 
                  class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between"
                  :class="{ 'border-l-4 border-l-blue-500': sub.status === 'in_progress', 'border-l-4 border-l-orange-500': sub.status === 'pending' }">
                <view class="flex items-center gap-3">
                    <view class="relative">
                        <!-- Avatar / Icon -->
                        <view class="size-10 rounded-full flex items-center justify-center border border-slate-100 bg-slate-50 text-slate-400">
                            <view class="i-material-symbols-build text-xl" />
                        </view>
                        <!-- Status Badge Overlay -->
                        <view v-if="sub.status === 'completed'" class="absolute -bottom-0.5 -right-0.5 size-3.5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <view class="i-material-symbols-check text-[8px] text-white font-bold" />
                        </view>
                         <view v-else-if="sub.status === 'in_progress'" class="absolute -bottom-0.5 -right-0.5 size-3.5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <view class="i-material-symbols-schedule text-[8px] text-white font-bold" />
                        </view>
                    </view>
                    <view class="flex flex-col">
                        <text class="text-sm font-bold text-slate-900" :class="{ 'line-through text-slate-400': sub.status === 'completed' }">{{ sub.title }}</text>
                        <text class="text-[10px] text-slate-500">
                             {{ sub.assignee ? sub.assignee.name : getAssigneeName(sub.assigneeId) }} • {{ dictionaryStore.getLabel('task_status', sub.status) }}
                        </text>
                    </view>
                </view>
                <!-- Right Side Badge -->
                <text v-if="sub.status === 'completed'" class="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">已完成</text>
                <text v-else-if="sub.status === 'in_progress'" class="text-xs font-semibold text-blue-600">进行中</text>
                <text v-else-if="sub.status === 'pending'" class="text-xs font-semibold text-orange-600">待指派</text>
            </view>
        </view>
      </view>

      <!-- Section: Reports -->
      <view class="flex flex-col gap-3">
          <text class="text-sm font-bold text-slate-900 uppercase tracking-wide px-1">任务汇报 ({{ reports.length }})</text>
          
          <view v-if="reports.length === 0" class="text-center py-6 bg-white rounded-xl border border-slate-100">
              <text class="text-xs text-slate-400">暂无汇报</text>
          </view>
          
          <view v-else class="flex flex-col gap-3">
              <view v-for="report in reports" :key="report.id" class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <view class="flex justify-between items-center mb-2">
                      <view class="flex items-center gap-2">
                           <view class="size-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                              {{ report.reporter?.name?.[0] || 'U' }}
                          </view>
                          <text class="font-bold text-sm text-slate-900">{{ report.reporter?.name || '未知用户' }}</text>
                      </view>
                      <text class="text-xs text-slate-400">{{ formatDate(report.createdAt) }}</text>
                  </view>
                  
                  <text class="text-sm text-slate-700 mb-3 block whitespace-pre-wrap">{{ report.content }}</text>
                  
                  <!-- Voice -->
                  <view v-if="report.voicePath" class="mb-3 bg-slate-50 p-2 rounded-lg flex items-center gap-2 active:bg-slate-100 transition-colors" @click="playVoice(report.voicePath)">
                      <view class="i-material-symbols-play-circle text-blue-500 text-xl"></view>
                      <text class="text-xs text-slate-600">点击播放语音</text>
                  </view>
                  
                  <!-- Images -->
                  <view v-if="report.imagePaths && report.imagePaths.length" class="grid grid-cols-3 gap-2">
                      <view v-for="(img, idx) in report.imagePaths" :key="idx" class="relative aspect-square rounded-lg overflow-hidden bg-slate-100" @click="previewImage(report.imagePaths, idx)">
                          <image :src="`http://127.0.0.1:3000${img}`" class="w-full h-full" mode="aspectFill" />
                      </view>
                  </view>
              </view>
          </view>
      </view>

      <!-- Section 3: Timeline -->
      <view class="flex flex-col gap-3 pb-4">
         <text class="text-sm font-bold text-slate-900 uppercase tracking-wide px-1">任务动态 (Timeline)</text>
         <view class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
             <view class="relative space-y-6">
                 <!-- Vertical Line -->
                 <view class="absolute top-0 bottom-0 left-[15px] w-[2px] bg-slate-200" style="content: ''; position: absolute; top: 0; bottom: 0; left: 15px; width: 2px; background-color: #e2e8f0;"></view>
                 
                 <view v-for="(event, index) in timelineEvents" :key="index" class="relative flex gap-4">
                     <view class="z-10 mt-1 size-8 rounded-full bg-white border-2 flex items-center justify-center shrink-0"
                           :class="{ 
                               'border-blue-500': event.color === 'blue',
                               'border-green-500': event.color === 'green',
                               'border-orange-500': event.color === 'orange',
                               'border-slate-300': !event.color
                           }">
                         <view v-if="event.icon === 'add_circle'" class="size-2.5 rounded-full bg-blue-500"></view>
                         <view v-else class="text-[14px]" 
                               :class="{
                                   'i-material-symbols-check text-green-500': event.icon.includes('check'),
                                   'i-material-symbols-person-add text-orange-500': event.icon.includes('person'),
                                   'i-material-symbols-play-arrow text-slate-400': event.icon.includes('play')
                               }" />
                     </view>
                     <view class="flex flex-col">
                         <text class="text-xs font-bold text-slate-400">{{ formatTimeOnly(event.time) }}</text>
                         <text class="text-sm text-slate-800 mt-0.5 font-bold">{{ event.title }}</text>
                         <text class="text-xs text-slate-500">{{ event.desc }}</text>
                     </view>
                 </view>
             </view>
         </view>
      </view>
      
       <!-- Supervisor Actions (Assign to Employee) -->
        <view v-if="canAssignTask" class="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-xl shadow-lg mt-4">
          <text class="text-sm font-bold text-white block mb-2">🎯 班组长操作</text>
          <text class="text-xs text-blue-50 block mb-3">您可以将此任务指派给您的组员</text>
          <view class="flex gap-2">
            <button 
                class="flex-1 bg-white text-blue-600 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform border-none"
                @click="showEmployeeSelector"
            >
                <view class="i-material-symbols-person-add text-xl"></view>
                <text>指派给组员</text>
            </button>
            <button 
                class="flex-1 bg-white text-[#00b2b2] border border-[#00b2b2] py-3 rounded-lg font-bold text-sm shadow-sm active:opacity-90 flex items-center justify-center gap-2"
                @click="goToDispatch"
                >
                <view class="i-material-symbols-call-split text-xl" />
                <text>拆分任务</text>
            </button>
          </view>
        </view>

       <!-- Employee Selector Modal -->
       <view v-if="showSelector" class="fixed inset-0 bg-black/50 z-[9999] flex items-end" @click="showSelector = false">
         <view class="bg-white rounded-t-3xl w-full max-h-[70vh] flex flex-col" @click.stop>
           <view class="p-4 border-b border-slate-100 flex items-center justify-between">
             <text class="text-base font-bold text-slate-900">选择组员</text>
             <button class="size-8 flex items-center justify-center rounded-full hover:bg-slate-100 border-none bg-transparent" @click="showSelector = false">
               <view class="i-material-symbols-close text-slate-600 text-xl"></view>
             </button>
           </view>
           <view class="flex-1 overflow-y-auto p-4">
             <view v-if="teamMembers.length === 0" class="text-center py-10">
               <view class="i-material-symbols-group-off text-slate-300 text-5xl mb-2"></view>
               <text class="text-sm text-slate-400">暂无可指派的组员</text>
             </view>
             <view v-else class="flex flex-col gap-2">
               <button 
                 v-for="member in teamMembers" 
                 :key="member.id"
                 class="w-full bg-white border border-slate-200 p-3 rounded-lg flex items-center gap-3 hover:bg-slate-50 active:scale-98 transition-all"
                 @click="assignToEmployee(member.id)"
               >
                 <view class="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                   {{ member.name[0] }}
                 </view>
                 <view class="flex-1 text-left">
                   <text class="text-sm font-semibold text-slate-900 block">{{ member.name }}</text>
                   <text class="text-xs text-slate-500">{{ member.departmentId ? `部门ID: ${member.departmentId}` : '未分配部门' }}</text>
                 </view>
                 <view class="i-material-symbols-chevron-right text-slate-400 text-xl"></view>
               </button>
             </view>
           </view>
         </view>
       </view>

    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { handleBack } from '@/utils/navigation'
import { getTaskDetail, updateTask, getTaskReports } from '@/api/task'
import type { ITask } from '@/api/types/task'
import { TaskStatus } from '@/api/types/task'
import { getUsers, type User } from '@/api/user'

import { useDictionaryStore } from '@/store/dictionary'

const statusBarHeight = ref(0)
const loading = ref(false)
const taskInfo = ref<ITask | null>(null)
const reports = ref<any[]>([])
const users = ref<User[]>([])
const showSelector = ref(false)
const currentUserId = ref<number | null>(null)
const dictionaryStore = useDictionaryStore()
const innerAudioContext = uni.createInnerAudioContext()

const getCreatorName = (creatorId?: number) => {
  if (!creatorId) return '未知'
  const user = users.value.find(u => u.id === creatorId)
  return user ? user.name : '未知'
}

const getAssigneeName = (assigneeId?: number) => {
  if (!assigneeId) return '未指派'
  const user = users.value.find(u => u.id === assigneeId)
  return user ? user.name : '未知'
}

// Progress Calculation
const subtasks = computed(() => taskInfo.value?.subtasks || [])
const totalSubtasks = computed(() => subtasks.value.length)
const completedSubtasks = computed(() => subtasks.value.filter(t => t.status === 'completed' || t.status === 'verified').length)
const progressPercentage = computed(() => {
  if (totalSubtasks.value === 0) {
     // No subtasks: Use main task status
     if (taskInfo.value?.status === 'completed' || taskInfo.value?.status === 'verified') return 100
     if (taskInfo.value?.status === 'in_progress') return 50
     return 0
  }
  return Math.round((completedSubtasks.value / totalSubtasks.value) * 100)
})

// Timeline Events (Mocked from fields)
const timelineEvents = computed(() => {
  if (!taskInfo.value) return []
  const events = []
  
  if (taskInfo.value.createdAt) {
      events.push({ time: taskInfo.value.createdAt, title: '任务创建', desc: `由 ${getCreatorName(taskInfo.value.creatorId)} 创建`, icon: 'add_circle', color: 'blue' })
  }
  if (taskInfo.value.status !== 'pending') {
      // Approximate time
      events.push({ time: taskInfo.value.updatedAt, title: '任务指派', desc: `指派给 ${taskInfo.value.assignee?.name || getAssigneeName(taskInfo.value.assigneeId)}`, icon: 'person_add', color: 'orange' })
  }
   if (taskInfo.value.status === 'completed') {
      events.push({ time: taskInfo.value.completedAt || taskInfo.value.updatedAt, title: '任务完成', desc: '任务已标记完成', icon: 'check_circle', color: 'green' })
  }
  return events.reverse() 
})


// 计算当前用户是否可以指派任务（是班组长且任务是pending状态）
const canAssignTask = computed(() => {
  if (!taskInfo.value || !currentUserId.value) return false
  // 检查任务是否是pending状态且当前用户是该任务的supervisor
  return taskInfo.value.status === 'pending' && taskInfo.value.supervisorId === currentUserId.value
})

// 获取可指派的团队成员（当前班组长的下属）
const teamMembers = computed(() => {
  // 简单实现：返回所有非supervisor/admin角色的用户
  // 实际应该根据班组关系筛选
  return users.value.filter(u => 
    u.role !== 'admin' && 
    u.role !== 'supervisor' &&
    u.id !== currentUserId.value
  )
})

const playVoice = (path: string) => {
    if (!path) return
    const url = `http://127.0.0.1:3000${path}`
    console.log('Playing voice:', url)
    innerAudioContext.src = url
    innerAudioContext.play()
}

const previewImage = (paths: string[], current: number) => {
    const urls = paths.map(p => `http://127.0.0.1:3000${p}`)
    uni.previewImage({
        urls,
        current
    })
}

const showEmployeeSelector = () => {
  showSelector.value = true
}

const assignToEmployee = async (employeeId: number) => {
  if (!taskInfo.value) return
  
  try {
    uni.showLoading({ title: '指派中...' })
    
    console.log('[Task Detail] Assigning task:', taskInfo.value.id, 'to employee:', employeeId)
    
    // 调用API更新任务
    const updatedTask = await updateTask(taskInfo.value.id, {
      assigneeId: employeeId,
      status: TaskStatus.ASSIGNED
    })
    console.log('[Task Detail] API Response updatedTask:', updatedTask)
    
    if (updatedTask && (updatedTask.id || updatedTask.assigneeId)) {
      // 强制更新本地数据
      taskInfo.value = { ...taskInfo.value, ...updatedTask }
      
      uni.showToast({ 
        title: '指派成功', 
        icon: 'success' 
      })
    } else {
      console.warn('[Task Detail] API returned invalid task data')
      uni.showToast({ title: '指派未生效', icon: 'none' })
    }
    
    showSelector.value = false
    
    uni.hideLoading()
  } catch (error) {
    console.error('[Task Detail] Failed to assign task:', error)
    uni.hideLoading()
    uni.showToast({ 
      title: '指派失败', 
      icon: 'error' 
    })
  }
}

const goToDispatch = () => {
  if (!taskInfo.value) return
  const url = `/pages/task/dispatch?parentId=${taskInfo.value.id}`
  console.log('准备跳转 (v4):', url)

  uni.navigateTo({
    url,
    fail: (err) => {
      console.error('跳转失败:', err)
      uni.showToast({ title: '跳转失败', icon: 'error' })
    }
  })
}

const formatDate = (dateStr?: string | Date) => {
  if (!dateStr) return '未设置'
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const formatDateTime = (dateStr?: string | Date) => {
  if (!dateStr) return '未知'
  const date = new Date(dateStr)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const formatTimeOnly = (dateStr?: string | Date) => {
   if (!dateStr) return ''
   const date = new Date(dateStr)
   return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

onLoad(async (options: any) => {
  const info = uni.getSystemInfoSync()
  statusBarHeight.value = info.statusBarHeight || 20
  
  // 获取当前登录用户ID（从本地存储）
  const userInfo = uni.getStorageSync('userInfo')
  if (userInfo && userInfo.id) {
    currentUserId.value = userInfo.id
  }
  
  console.log('[Task Detail] onLoad with options:', options)
  console.log('[Task Detail] Current user ID:', currentUserId.value)

  dictionaryStore.fetchDictionaries()

  
  if (!options.taskId) {
    uni.showToast({ title: '缺少任务ID', icon: 'error' })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
    return
  }
  
  const taskId = parseInt(options.taskId)
  loading.value = true
  
  try {
    // Fetch task detail, users, and reports
    const [taskDetail, usersData, reportsData] = await Promise.all([
      getTaskDetail(taskId),
      getUsers(),
      getTaskReports(taskId)
    ])
    
    taskInfo.value = taskDetail || null
    users.value = usersData
    if (reportsData) {
        reports.value = (reportsData as any).data || reportsData
    }
    
    console.log('[Task Detail] Task info:', taskInfo.value)
    console.log('[Task Detail] Reports:', reports.value)
    
    if (!taskInfo.value) {
      uni.showToast({ title: '任务不存在', icon: 'error' })
    }
  } catch (error) {
    console.error('[Task Detail] Failed to load data:', error)
    uni.showToast({ title: '加载失败', icon: 'error' })
  } finally {
    loading.value = false
  }
})
</script>
