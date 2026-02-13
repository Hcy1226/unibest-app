<route lang="json5">
{
  style: {
    navigationBarTitleText: '任务拆分',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] min-h-screen text-slate-900 font-display pb-10">
    <!-- Header -->
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between pt-safe box-border pt-[calc(env(safe-area-inset-top)+56px)]" style="position: fixed; top: 0; left: 0; right: 0; z-index: 999; padding-top: calc(env(safe-area-inset-top)); height: 88px;">
      <view class="flex items-center gap-3 mt-8">
        <button class="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors bg-transparent border-none" @click="goBack">
           <view class="i-material-symbols-arrow-back text-slate-600 text-xl" />
        </button>
        <text class="text-lg font-bold text-slate-900">任务拆分</text>
      </view>
      <button class="mt-8 bg-[#00b2b2] text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 shadow-sm border-none hover:bg-[#009b9b] transition-colors" @click="submitSplit">
        <view class="i-material-symbols-send text-base" />
        <text>下发</text>
      </button>
    </view>
    <!-- Spacer -->
    <view class="w-full h-[88px]"></view>

    <view v-if="parentTask" class="flex flex-col gap-6 p-5">
      <!-- Main Task Info -->
      <view class="flex flex-col gap-3">
        <text class="text-sm font-bold text-slate-500 uppercase tracking-wider px-1">总任务信息</text>
        <view class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
          <view class="absolute top-0 left-0 w-1.5 h-full" :class="{
             'bg-red-500': parentTask.priority === 'emergency',
             'bg-orange-500': parentTask.priority === 'high',
             'bg-blue-500': parentTask.priority === 'normal',
             'bg-slate-500': parentTask.priority === 'low'
          }"></view>
          <view class="flex justify-between items-start mb-3">
            <view class="flex flex-col w-full">
              <view class="flex items-center justify-between w-full mb-2">
                <text class="font-bold text-xl text-slate-900 line-clamp-1">{{ parentTask.title }}</text>
                <text class="px-2 py-1 rounded text-xs font-bold shrink-0" :class="{
                   'bg-red-100 text-red-600': parentTask.priority === 'emergency',
                   'bg-orange-100 text-orange-600': parentTask.priority === 'high',
                   'bg-blue-100 text-blue-600': parentTask.priority === 'normal',
                   'bg-slate-100 text-slate-600': parentTask.priority === 'low'
                }">{{ parentTask.priority }}</text>
              </view>
              <text class="text-base text-slate-500 leading-relaxed">{{ parentTask.description }}</text>
            </view>
          </view>
          <view class="flex gap-6 mt-4 pt-4 border-t border-slate-50">
            <view class="flex items-center gap-2 text-sm text-slate-500">
               <view class="i-material-symbols-calendar-clock text-lg" />
               <text>截止: {{ formatDate(parentTask.deadline) }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Add Subtask Form -->
      <view class="flex flex-col gap-4">
         <view class="flex items-center justify-between px-1">
            <text class="text-sm font-bold text-slate-500 uppercase tracking-wider">添加子任务</text>
         </view>
         <view class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-6">
            <view class="flex flex-col gap-2">
               <text class="text-sm font-bold text-slate-700 ml-1">子任务名称</text>
               <input v-model="subtaskForm.title" class="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 text-base focus:border-[#00b2b2] placeholder-slate-400" placeholder="例如：拆卸故障模块" type="text" />
            </view>
             <view class="flex flex-col gap-2">
               <text class="text-sm font-bold text-slate-700 ml-1">截止时间 (可选)</text>
               <view class="relative">
                   <view class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                       <view class="i-material-symbols-schedule text-2xl" />
                   </view>
                   <input v-model="subtaskForm.deadline" class="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 text-base focus:border-[#00b2b2] placeholder-slate-400" type="text" placeholder="YYYY-MM-DD HH:mm" />
               </view>
            </view>
            
            <view class="flex flex-col gap-3">
                 <text class="text-sm font-bold text-slate-700 ml-1">指派给</text>
                 <view class="flex gap-5 overflow-x-auto no-scrollbar pb-2">
                     <view v-for="user in teamMembers" :key="user.id" 
                           class="flex flex-col items-center gap-2 cursor-pointer shrink-0"
                           :class="{ 'opacity-60': subtaskForm.assigneeId !== user.id }"
                           @click="selectAssignee(user.id)">
                         <view class="relative size-14 rounded-full border-2 p-0.5" 
                               :class="subtaskForm.assigneeId === user.id ? 'border-[#00b2b2]' : 'border-transparent'">
                             <view class="size-full rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xl">
                               {{ getMemberAvatarChar(user.id) }}
                             </view>
                             <view v-if="subtaskForm.assigneeId === user.id" class="absolute -top-1 -right-1 size-6 bg-[#00b2b2] text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                 <view class="i-material-symbols-check text-sm font-bold" />
                             </view>
                         </view>
                         <text class="text-xs font-bold" 
                               :class="subtaskForm.assigneeId === user.id ? 'text-[#00b2b2]' : 'text-slate-600'">
                           {{ user.name }}
                         </text>
                     </view>
                 </view>
            </view>
            
            <button class="w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-base shadow-md flex items-center justify-center gap-2 mt-2" @click="addSubtask">
                <view class="i-material-symbols-add-circle text-xl" />
                <text>加入拆分清单</text>
            </button>
         </view>
      </view>

       <!-- Split List -->
      <view class="flex flex-col gap-4" v-if="subtasks.length > 0">
          <view class="flex items-center justify-between px-1">
             <text class="text-sm font-bold text-slate-500 uppercase tracking-wider">已拆分清单 ({{ subtasks.length }})</text>
          </view>
          <view class="flex flex-col gap-3">
              <view v-for="(task, index) in subtasks" :key="task.tempId" class="bg-white p-4 pr-5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                  <view class="flex items-center gap-4">
                      <view class="size-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0 text-lg">
                        {{ getMemberAvatarChar(task.assigneeId) }}
                      </view>
                      <view class="flex flex-col gap-1">
                          <text class="text-base font-bold text-slate-900">{{ task.title }}</text>
                          <view class="flex items-center gap-2">
                              <text class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">{{ getMemberName(task.assigneeId) }}</text>
                              <text v-if="task.deadline" class="text-xs text-slate-400">{{ task.deadline }}</text>
                          </view>
                      </view>
                  </view>
                  <button class="text-slate-400 hover:text-red-500 transition-colors p-2 bg-transparent border-none" @click="removeSubtask(index)">
                      <view class="i-material-symbols-delete text-2xl" />
                  </button>
              </view>
          </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getTaskDetail, splitTask } from '@/api/task'
import { getUsers, type User } from '@/api/user'
import type { ITask } from '@/api/types/task'
import { handleBack } from '@/utils/navigation'

const parentTaskId = ref<number | null>(null)
const parentTask = ref<ITask | null>(null)
const users = ref<User[]>([])
const currentUserId = ref<number | null>(null)

// 子任务表单
const subtaskForm = ref({
  title: '',
  description: '', // 如果UI没有输入框，可以设为空或默认
  assigneeId: null as number | null,
  deadline: '' // 简单字符串，或者后续改为 Date
})

// 已添加的子任务列表
const subtasks = ref<any[]>([])

const loading = ref(false)

const goBack = () => {
  handleBack()
}

// 获取组员列表（排除管理员和当前用户自己）
const teamMembers = computed(() => {
  return users.value.filter(u => 
    u.role !== 'admin' && 
    u.role !== 'supervisor' &&
    u.id !== currentUserId.value
  )
})

const selectAssignee = (id: number) => {
  subtaskForm.value.assigneeId = id
}

const getMemberName = (id: number) => {
  const u = users.value.find(user => user.id === id)
  return u ? u.name : '未知'
}

const getMemberAvatarChar = (id: number) => {
  const name = getMemberName(id)
  return name ? name[0] : '?'
}

const addSubtask = () => {
  if (!subtaskForm.value.title) {
    uni.showToast({ title: '请输入子任务名称', icon: 'none' })
    return
  }
  if (!subtaskForm.value.assigneeId) {
    uni.showToast({ title: '请选择负责人', icon: 'none' })
    return
  }

  subtasks.value.push({
    title: subtaskForm.value.title,
    description: subtaskForm.value.description,
    assigneeId: subtaskForm.value.assigneeId,
    deadline: subtaskForm.value.deadline || new Date().toISOString(), // 默认当前时间或用户输入
    tempId: Date.now() // 用于列表渲染key
  })

  // 重置表单
  subtaskForm.value.title = ''
  subtaskForm.value.assigneeId = null
  subtaskForm.value.deadline = ''
  
  uni.showToast({ title: '已添加到清单', icon: 'success' })
}

const removeSubtask = (index: number) => {
  subtasks.value.splice(index, 1)
}

const submitSplit = async () => {
  if (subtasks.value.length === 0) {
    uni.showToast({ title: '请至少添加一个子任务', icon: 'none' })
    return
  }
  if (!parentTaskId.value) return

  try {
    uni.showLoading({ title: '提交中...' })
    
    const payload = subtasks.value.map(t => ({
      title: t.title,
      description: t.description || `子任务: ${t.title}`,
      assigneeId: t.assigneeId,
      deadline: t.deadline
    }))
    
    // API Call
    await splitTask(parentTaskId.value, { subtasks: payload })
    
    uni.hideLoading()
    uni.showToast({ title: '拆分并下发成功', icon: 'success' })
    
    setTimeout(() => {
      // Return to previous page
      uni.navigateBack()
    }, 1500)

  } catch (error) {
    console.error('Split task failed:', error)
    uni.hideLoading()
    uni.showToast({ title: '下发失败', icon: 'error' })
  }
}

const formatDate = (dateStr?: string | Date) => {
  if (!dateStr) return '未设置'
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

onLoad(async (options: any) => {
  if (!options.parentId) {
    uni.showToast({ title: '缺少父任务ID', icon: 'none' })
    return
  }
  parentTaskId.value = parseInt(options.parentId)
  
  const userInfo = uni.getStorageSync('userInfo')
  if (userInfo) currentUserId.value = userInfo.id
  
  try {
    const [task, allUsers] = await Promise.all([
      getTaskDetail(parentTaskId.value),
      getUsers()
    ])
    parentTask.value = task
    users.value = allUsers
  } catch (e) {
    console.error(e)
    uni.showToast({ title: '数据加载失败', icon: 'none' })
  }
})
</script>
