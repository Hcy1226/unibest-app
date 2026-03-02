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
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/80 backdrop-blur-xl border-b border-white/50 px-5 flex items-center justify-between box-border pt-[var(--status-bar-height)] h-[calc(var(--status-bar-height)+44px)] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
      <view class="flex items-center gap-3">
        <view class="size-8 rounded-full bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100/50 active:scale-90 transition-transform -ml-2 shrink-0" @click="handleBack">
          <view class="i-material-symbols-arrow-back-ios-new text-slate-600 text-[16px] ml-1" />
        </view>
        <text class="text-xl font-black text-slate-800 tracking-tight">任务详情</text>
      </view>
      <view class="size-8 rounded-full bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100/50 active:scale-90 transition-transform -mr-2 shrink-0">
        <view class="i-material-symbols-more-vert text-slate-600 text-[20px]" />
      </view>
    </view>
    
    <!-- Spacer -->
     <view class="w-full h-[calc(var(--status-bar-height)+44px)]"></view>

    <!-- Loading/Error -->
    <view v-if="loading" class="flex flex-col items-center justify-center py-20 gap-3">
      <view class="i-material-symbols-progress-activity animate-spin text-4xl text-[#00b2b2]" />
      <text class="text-xs font-bold text-slate-400 tracking-widest uppercase">正在加载数据...</text>
    </view>
    <view v-else-if="!taskInfo" class="flex flex-col justify-center items-center py-24 gap-4">
      <view class="i-material-symbols-error-circle-rounded text-slate-200 text-7xl"></view>
      <text class="text-sm font-bold text-slate-400 tracking-widest uppercase">任务不存在或已删除</text>
    </view>

    <view v-else class="flex flex-col gap-6 p-5">
      <!-- Section 1: Task Overview -->
      <view class="flex flex-col gap-4 animate-fade-in-up">
        <view class="bg-white p-6 rounded-[1.5rem] shadow-md shadow-slate-200/50 border border-slate-100/60 relative overflow-hidden">
          <view class="absolute -top-6 -right-6 p-3 opacity-[0.03] pointer-events-none">
             <view class="text-[160px]" :class="dictionaryStore.getValue('task_type', taskInfo.type)" />
          </view>
          
          <view class="relative z-10 flex flex-col h-full">
            <view class="flex items-start justify-between mb-5">
              <view class="flex flex-col items-start gap-2.5">
                <view class="flex gap-2 items-center">
                  <text class="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ring-1 ring-inset"
                        :class="{
                           'bg-orange-50 text-orange-600 ring-orange-500/20': taskInfo.status === 'pending',
                           'bg-blue-50 text-blue-600 ring-blue-500/20': taskInfo.status === 'assigned',
                           'bg-cyan-50 text-cyan-600 ring-cyan-500/20': taskInfo.status === 'in_progress',
                           'bg-green-50 text-green-600 ring-green-500/20': taskInfo.status === 'completed'
                         }">
                    {{ dictionaryStore.getLabel('task_status', taskInfo.status) }}
                  </text>
                  <text class="text-[11px] font-bold text-slate-400 tracking-wider font-mono bg-slate-50 px-2 py-1 rounded-md">T-{{ taskInfo.id.toString().padStart(6, '0') }}</text>
                </view>
                <text class="text-2xl font-black text-slate-800 leading-tight tracking-wide">{{ taskInfo.title }}</text>
              </view>
            </view>
            
            <!-- Progress Bar Section -->
            <view class="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 mt-2">
              <view class="mb-3 flex justify-between items-end">
                <view class="flex flex-col gap-0.5">
                  <text class="text-[10px] uppercase tracking-widest font-bold text-slate-400">总进度</text>
                  <view class="flex items-baseline gap-1">
                      <text class="text-4xl font-black tracking-tighter" :class="progressPercentage === 100 ? 'text-green-500' : 'text-[#00b2b2]'">{{ progressPercentage }}</text>
                      <text class="text-sm font-bold opacity-50" :class="progressPercentage === 100 ? 'text-green-500' : 'text-[#00b2b2]'">%</text>
                  </view>
                </view>
                <view class="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-1.5">
                   <view class="i-material-symbols-fact-check text-slate-400 text-[14px]" />
                   <text class="text-xs font-black text-slate-600">{{ completedSubtasks }}<text class="text-slate-400 font-medium mx-0.5">/</text>{{ totalSubtasks }} 项</text>
                </view>
              </view>
              <view class="w-full bg-slate-200/60 rounded-full h-2.5 overflow-hidden shadow-inner">
                <view class="h-2.5 rounded-full relative transition-all duration-[800ms] ease-out" 
                      :class="progressPercentage === 100 ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-[#00b2b2] to-[#008f8f]'"
                      :style="{ width: progressPercentage + '%' }">
                  <view class="absolute top-0 right-0 w-8 h-full bg-white/30 animate-pulse blur-[2px] rounded-full"></view>
                </view>
              </view>
            </view>

            <view class="flex flex-col gap-3 mt-5">
              <view class="flex items-center justify-between text-xs py-3 border-t border-slate-100/80">
                <view class="flex flex-col gap-1">
                  <text class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">截止时间</text>
                  <view class="flex items-center gap-1.5 text-slate-700 font-bold">
                    <view class="i-material-symbols-calendar-clock text-[14px] text-slate-400" />
                    <text>{{ formatDate(taskInfo.deadline) }}</text>
                  </view>
                </view>
                
                <view class="w-px h-8 bg-slate-200 absolute left-1/2"></view>
                
                <view class="flex flex-col gap-1 items-end">
                  <text class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">负责人</text>
                  <view class="flex items-center gap-1.5 text-slate-700 font-bold">
                    <text v-if="taskInfo.status === 'pending' && !taskInfo.assigneeId && !taskInfo.assignee" class="text-slate-400 italic">待指派</text>
                    <text v-else-if="taskInfo.assignee">{{ taskInfo.assignee?.name }}</text>
                    <text v-else-if="taskInfo.assigneeId">{{ getAssigneeName(taskInfo.assigneeId) }}</text>
                    <text v-else class="text-slate-400">未指派</text>
                    <view class="size-5 rounded-full bg-slate-100 flex items-center justify-center ml-0.5">
                       <view class="i-material-symbols-person text-[12px] text-slate-500" />
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- Section 2: Subtasks -->
      <view class="flex flex-col gap-4 animate-fade-in-up" style="animation-delay: 150ms">
        <view class="flex items-center justify-between pl-1">
          <text class="text-lg font-black text-slate-800 tracking-tight">子任务列表</text>
          <view class="text-xs font-bold text-[#00b2b2] flex items-center gap-0.5 bg-[#00b2b2]/5 px-2.5 py-1 rounded-full active:bg-[#00b2b2]/10 transition-colors">
            <text>查看全部</text>
            <view class="i-material-symbols-chevron-right text-[16px]" />
          </view>
        </view>
        
        <view class="flex flex-col gap-3">
            <view v-if="subtasks.length === 0" class="flex flex-col items-center justify-center py-10 gap-2 bg-white rounded-[1.2rem] border border-slate-100/60 shadow-sm">
                <view class="i-material-symbols-format-list-bulleted text-4xl text-slate-200" />
                <text class="text-xs font-bold text-slate-400 tracking-widest uppercase">无子任务</text>
            </view>
            
            <view v-for="sub in subtasks" :key="sub.id" 
                  class="bg-white p-4 rounded-[1.2rem] border border-slate-100/60 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all relative overflow-hidden">
                <!-- Status Left Border -->
                <view class="absolute left-0 top-0 bottom-0 w-1 opacity-80"
                      :class="{
                          'bg-green-500': sub.status === 'completed',
                          'bg-blue-500': sub.status === 'in_progress',
                          'bg-orange-400': sub.status === 'pending'
                      }"></view>

                <view class="flex items-start gap-4 pl-1">
                    <view class="relative shrink-0 mt-0.5">
                        <!-- Avatar / Icon -->
                        <view class="size-10 rounded-full flex items-center justify-center shadow-inner"
                              :class="{
                                  'bg-green-50 text-green-500 ring-1 ring-green-100': sub.status === 'completed',
                                  'bg-blue-50 text-blue-500 ring-1 ring-blue-100': sub.status === 'in_progress',
                                  'bg-slate-50 text-slate-400 ring-1 ring-slate-100': sub.status === 'pending'
                              }">
                            <view class="text-xl" 
                                  :class="{
                                      'i-material-symbols-check-circle': sub.status === 'completed',
                                      'i-material-symbols-schedule': sub.status === 'in_progress',
                                      'i-material-symbols-build': sub.status === 'pending'
                                  }" />
                        </view>
                    </view>
                    <view class="flex flex-col">
                        <text class="text-base font-bold text-slate-800 tracking-wide mb-1" :class="{ 'line-through text-slate-400': sub.status === 'completed' }">{{ sub.title }}</text>
                        <view class="flex items-center gap-2">
                            <view class="flex items-center gap-1 text-slate-500">
                                <view class="i-material-symbols-person text-[12px]" />
                                <text class="text-xs font-medium">{{ sub.assignee ? sub.assignee.name : getAssigneeName(sub.assigneeId) }}</text>
                            </view>
                            <view class="w-1 h-1 rounded-full bg-slate-200"></view>
                            <text class="text-[10px] font-black uppercase tracking-widest"
                                  :class="{
                                      'text-green-500': sub.status === 'completed',
                                      'text-blue-500': sub.status === 'in_progress',
                                      'text-orange-400': sub.status === 'pending'
                                  }">
                                {{ dictionaryStore.getLabel('task_status', sub.status) }}
                            </text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
      </view>

      <!-- Section: Reports -->
      <view class="flex flex-col gap-4 animate-fade-in-up" style="animation-delay: 250ms">
          <view class="flex items-center justify-between pl-1">
            <text class="text-lg font-black text-slate-800 tracking-tight">任务汇报 ({{ reports.length }})</text>
          </view>
          
          <view v-if="reports.length === 0" class="flex flex-col items-center justify-center py-10 gap-2 bg-white rounded-[1.2rem] border border-slate-100/60 shadow-sm">
              <view class="i-material-symbols-chat-bubble-outline text-4xl text-slate-200" />
              <text class="text-xs font-bold text-slate-400 tracking-widest uppercase">暂无汇报</text>
          </view>
          
          <view v-else class="flex flex-col gap-4">
              <view v-for="report in reports" :key="report.id" class="bg-white p-5 rounded-[1.2rem] border border-slate-100/60 shadow-sm flex flex-col gap-3 relative overflow-hidden group">
                  <view class="flex justify-between items-center bg-slate-50/50 -mx-5 -mt-5 px-5 py-3 border-b border-slate-100/80 mb-1">
                      <view class="flex items-center gap-3">
                           <view class="size-8 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 flex items-center justify-center text-sm font-black ring-1 ring-blue-500/20 shadow-inner shrink-0">
                              {{ report.reporter?.name?.[0] || 'U' }}
                          </view>
                          <text class="font-black text-sm text-slate-800 tracking-wide">{{ report.reporter?.name || '未知用户' }}</text>
                      </view>
                      <text class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{{ formatDate(report.createdAt) }}</text>
                  </view>
                  
                  <text class="text-sm text-slate-700 leading-relaxed font-medium block whitespace-pre-wrap">{{ report.content }}</text>
                  
                  <!-- Voice -->
                  <view v-if="report.voicePath" class="mt-2 bg-gradient-to-r from-blue-50 to-transparent p-3 rounded-xl border border-blue-100/50 flex items-center gap-3 active:scale-[0.98] transition-all" @click="playVoice(report.voicePath)">
                      <view class="size-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                          <view class="i-material-symbols-play-arrow-rounded text-2xl"></view>
                      </view>
                      <view class="flex flex-col">
                          <text class="text-xs font-black text-blue-800 tracking-wider">语音汇报</text>
                          <text class="text-[10px] font-bold text-blue-400">点击播放</text>
                      </view>
                      <view class="ml-auto i-material-symbols-graphic-eq text-blue-300 text-xl"></view>
                  </view>
                  
                  <!-- Images -->
                  <view v-if="report.imagePaths && report.imagePaths.length" class="grid grid-cols-3 gap-2 mt-2">
                      <view v-for="(img, idx) in report.imagePaths" :key="idx" class="relative aspect-square rounded-xl overflow-hidden bg-slate-100 ring-1 ring-slate-200/50 active:scale-95 transition-transform" @click="previewImage(report.imagePaths, Number(idx))">
                          <image :src="img.startsWith('data:') ? img : `http://47.84.125.77/api${img}`" class="size-full" mode="aspectFill" />
                      </view>
                  </view>
              </view>
          </view>
      </view>

      <!-- Section 3: Timeline -->
      <view class="flex flex-col gap-4 pb-6 animate-fade-in-up" style="animation-delay: 350ms">
         <view class="flex items-center justify-between pl-1">
            <text class="text-lg font-black text-slate-800 tracking-tight">任务动态</text>
         </view>
         <view class="bg-white p-6 rounded-[1.5rem] border border-slate-100/60 shadow-md shadow-slate-200/50">
             <view class="relative space-y-7">
                 <!-- Vertical Line -->
                 <view class="absolute top-2 bottom-2 left-[19px] w-[2px] bg-gradient-to-b from-slate-200 via-slate-100 to-transparent" style="content: ''; position: absolute; top: 8px; bottom: 8px; left: 19px; width: 2px;"></view>
                 
                 <view v-for="(event, index) in timelineEvents" :key="index" class="relative flex gap-5 group">
                     <!-- Timeline Node -->
                     <view class="z-10 size-10 rounded-full bg-white border-4 shadow-sm flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300"
                           :class="{ 
                               'border-blue-100 bg-blue-50': event.color === 'blue',
                               'border-green-100 bg-green-50': event.color === 'green',
                               'border-orange-100 bg-orange-50': event.color === 'orange',
                               'border-slate-100 bg-slate-50': !event.color
                           }">
                         <view v-if="event.icon === 'add_circle'" class="size-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></view>
                         <view v-else class="text-[18px]" 
                               :class="{
                                   'i-material-symbols-check text-green-500': event.icon.includes('check'),
                                   'i-material-symbols-person-add text-orange-500': event.icon.includes('person'),
                                   'i-material-symbols-play-arrow text-slate-400': event.icon.includes('play')
                               }" />
                     </view>
                     <!-- Content -->
                     <view class="flex flex-col pt-1">
                         <view class="flex items-center gap-2 mb-1">
                            <text class="text-[15px] text-slate-800 font-black tracking-wide">{{ event.title }}</text>
                            <text class="text-[10px] font-bold text-slate-400 font-mono tracking-widest bg-slate-50 px-2 py-0.5 rounded">{{ formatTimeOnly(event.time) }}</text>
                         </view>
                         <text class="text-xs font-medium text-slate-500 leading-relaxed">{{ event.desc }}</text>
                     </view>
                 </view>
             </view>
         </view>
      </view>
      
       <!-- Supervisor Actions (Assign to Employee) -->
        <view v-if="canAssignTask" class="bg-gradient-to-br from-blue-500 to-indigo-600 p-5 rounded-[1.5rem] shadow-xl shadow-blue-500/20 mt-4 relative overflow-hidden ring-1 ring-white/20">
          <view class="absolute -right-4 -bottom-4 opacity-10">
            <view class="i-material-symbols-admin-panel-settings text-[120px] text-white" />
          </view>
          <view class="relative z-10">
            <view class="flex items-center gap-2 mb-2">
              <view class="text-white bg-white/20 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">班组长操作</view>
            </view>
            <text class="text-xs text-blue-100 font-medium block mb-4">您可以将此任务指派给您的组员，或将其拆分为更小的任务。</text>
            <view class="flex gap-3">
              <button 
                  class="flex-1 bg-white text-blue-600 py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all border-none shadow-md"
                  @click="showEmployeeSelector"
              >
                  <view class="i-material-symbols-person-add text-xl"></view>
                  <text>指派给组员</text>
              </button>
              <button 
                  class="flex-1 bg-blue-400/20 text-white border border-white/30 py-3.5 rounded-xl font-black text-sm shadow-sm active:bg-blue-400/40 flex items-center justify-center gap-2 backdrop-blur-md transition-all"
                  @click="goToDispatch"
                  >
                  <view class="i-material-symbols-call-split text-xl" />
                  <text>拆分任务</text>
              </button>
            </view>
          </view>
        </view>

        <!-- Employee Action: Submit Completion -->
        <view v-if="canCompleteTask" class="bg-gradient-to-br from-[#00b2b2] to-[#007f7f] p-5 rounded-[1.5rem] shadow-xl shadow-[#00b2b2]/20 mt-4 relative overflow-hidden ring-1 ring-white/20">
          <view class="absolute -right-4 -bottom-4 opacity-10">
            <view class="i-material-symbols-task-alt text-[120px] text-white" />
          </view>
          <view class="relative z-10">
            <view class="flex items-center gap-2 mb-2">
              <view class="bg-white/20 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">员工操作</view>
            </view>
            <text class="text-xs text-[#a8f0f0] font-medium block mb-4">任务进行中，完成后请点击提交，班组长将对您的工作进行验收。</text>
            <view @click="goToReport" class="w-full bg-white text-[#007f7f] py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md">
              <view class="i-material-symbols-upload-file text-xl" />
              <text>提交完成报告</text>
            </view>
          </view>
        </view>

        <!-- Employee Action: Resubmit after rejection -->
        <view v-if="isRejected && isMyTask" class="bg-gradient-to-br from-red-500 to-orange-500 p-5 rounded-[1.5rem] shadow-xl shadow-red-500/20 mt-4 relative overflow-hidden ring-1 ring-white/20">
          <view class="absolute -right-4 -bottom-4 opacity-10">
            <view class="i-material-symbols-cancel text-[120px] text-white" />
          </view>
          <view class="relative z-10">
            <view class="flex items-center gap-2 mb-2">
              <view class="bg-white/20 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">任务驳回</view>
            </view>
            <text class="text-xs text-red-100 font-medium block mb-1">驳回原因：</text>
            <text class="text-sm text-white font-bold block mb-4">{{ rejectionReason }}</text>
            <view @click="goToReport" class="w-full bg-white text-red-600 py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md">
              <view class="i-material-symbols-refresh text-xl" />
              <text>重新提交</text>
            </view>
          </view>
        </view>

        <!-- Supervisor Actions (Verify Task) — shows when employee submitted -->
        <view v-if="canVerifyTask" class="bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-[1.5rem] shadow-xl shadow-emerald-500/20 mt-4 relative overflow-hidden ring-1 ring-white/20">
          <view class="absolute -right-4 -bottom-4 opacity-10">
            <view class="i-material-symbols-verified text-[120px] text-white" />
          </view>
          <view class="relative z-10">
            <view class="flex items-center gap-2 mb-2">
              <view class="text-white bg-white/20 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">班组长验收</view>
            </view>
            <text class="text-xs text-emerald-100 font-medium block mb-4">员工已提交完成报告，请确认工作质量后进行验收操作。</text>
            <view class="flex gap-3">
              <view @click="verifyTask" class="flex-1 bg-white text-emerald-600 py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md">
                <view class="i-material-symbols-check-circle text-xl" />
                <text>验收通过</text>
              </view>
              <view @click="showRejectModal = true" class="flex-1 bg-red-500/20 text-white border border-white/30 py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all">
                <view class="i-material-symbols-cancel text-xl" />
                <text>驳回</text>
              </view>
            </view>
          </view>
        </view>

        <!-- Reject Modal -->
        <view v-if="showRejectModal" class="fixed inset-0 z-[9999] flex items-center justify-center px-5">
          <view class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showRejectModal = false"></view>
          <view class="bg-white rounded-2xl p-6 w-full relative z-10 shadow-2xl">
            <text class="text-base font-black text-slate-800 block mb-1">驳回任务</text>
            <text class="text-xs text-slate-400 block mb-4">请填写驳回原因，将反馈给员工</text>
            <textarea
              v-model="rejectReason"
              class="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 resize-none h-24 bg-slate-50"
              placeholder="请描述问题或改进要求..."
            />
            <view class="flex gap-3 mt-4">
              <view @click="showRejectModal = false" class="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm flex items-center justify-center active:scale-95 transition-all">
                <text>取消</text>
              </view>
              <view @click="rejectTask" class="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold text-sm flex items-center justify-center active:scale-95 transition-all shadow-md">
                <text>确认驳回</text>
              </view>
            </view>
          </view>
        </view>

       <!-- Employee Selector Modal -->
       <view v-if="showSelector" class="fixed inset-0 z-[9999] flex items-end">
         <!-- Overlay -->
         <view class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 animate-fade-in" @click="showSelector = false"></view>
         
         <!-- Modal Content -->
         <view class="bg-[#fafafa] rounded-t-[2rem] w-full max-h-[75vh] flex flex-col relative z-10 animate-slide-up shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
           <!-- Handle -->
           <view class="w-full flex justify-center pt-3 pb-1">
             <view class="w-12 h-1.5 bg-slate-200 rounded-full"></view>
           </view>
           
           <view class="px-6 py-3 flex items-center justify-between">
             <view class="flex flex-col">
               <text class="text-xl font-black text-slate-800 tracking-tight">选择指派组员</text>
               <text class="text-xs font-bold text-slate-400 mt-0.5">请从下方列表中选择任务负责人</text>
             </view>
             <button class="size-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 border-none bg-transparent active:scale-90 transition-transform" @click="showSelector = false">
               <view class="i-material-symbols-close text-slate-600 text-lg"></view>
             </button>
           </view>
           
           <view class="flex-1 overflow-y-auto px-5 pb-8 pt-2">
             <view v-if="teamMembers.length === 0" class="flex flex-col items-center justify-center py-16 gap-3">
               <view class="i-material-symbols-group-off text-6xl text-slate-200"></view>
               <text class="text-sm font-bold text-slate-400 tracking-widest uppercase">暂无可指派的组员</text>
             </view>
             <view v-else class="flex flex-col gap-3">
               <button 
                 v-for="member in teamMembers" 
                 :key="member.id"
                 class="w-full bg-white border border-slate-100/80 p-4 rounded-[1.2rem] flex items-center gap-4 active:scale-[0.98] active:bg-slate-50 transition-all shadow-sm group"
                 @click="assignToEmployee(member.id)"
               >
                 <view class="size-12 rounded-full bg-gradient-to-br from-[#00b2b2]/10 to-[#00b2b2]/20 border border-[#00b2b2]/20 flex items-center justify-center text-[#008f8f] font-black text-lg shrink-0 group-active:scale-95 transition-transform">
                   {{ member.name[0] }}
                 </view>
                 <view class="flex-1 text-left flex flex-col gap-0.5">
                   <text class="text-base font-black text-slate-800 tracking-wide">{{ member.name }}</text>
                   <text class="text-[11px] font-bold text-slate-400 tracking-wider">
                     {{ member.departmentId ? `部门ID: ${member.departmentId}` : '未分配部门' }}
                   </text>
                 </view>
                 <view class="size-8 rounded-full bg-slate-50 flex items-center justify-center group-active:bg-[#00b2b2]/10 transition-colors">
                   <view class="i-material-symbols-chevron-right text-slate-400 text-xl group-active:text-[#00b2b2] transition-colors"></view>
                 </view>
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
import { http } from '@/http/http'
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
const showRejectModal = ref(false)
const rejectReason = ref('')
const currentUserId = ref<number | null>(null)
const currentUserRole = ref<string>('')
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


// Role helpers
const isMyTask = computed(() => taskInfo.value?.assigneeId === currentUserId.value)
const isRejected = computed(() => taskInfo.value?.status === TaskStatus.REJECTED)

// Extract rejection reason from description
const rejectionReason = computed(() => {
  const desc = taskInfo.value?.description || ''
  const match = desc.match(/【驳回原因】([\s\S]*)$/)
  return match ? match[1].trim() : '未说明原因'
})

// 当前用户是否可以指派任务（是班组长且任务pending）
const canAssignTask = computed(() => {
  if (!taskInfo.value || !currentUserId.value) return false
  return taskInfo.value.status === 'pending' && taskInfo.value.supervisorId === currentUserId.value
})

// 当前用户（员工）可以提交完成
const canCompleteTask = computed(() => {
  if (!taskInfo.value || !currentUserId.value) return false
  return taskInfo.value.status === TaskStatus.IN_PROGRESS && taskInfo.value.assigneeId === currentUserId.value
})

// 班组长验收：任务必须是 completed（员工已提交）
const canVerifyTask = computed(() => {
  if (!taskInfo.value || !currentUserId.value) return false
  return taskInfo.value.status === TaskStatus.COMPLETED && taskInfo.value.supervisorId === currentUserId.value
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
    const url = path.startsWith('data:') ? path : `http://47.84.125.77/api${path}`
    console.log('Playing voice:', url)
    innerAudioContext.src = url
    innerAudioContext.play()
}

const previewImage = (paths: string[], current: number) => {
    const urls = paths.map(p => p.startsWith('data:') ? p : `http://47.84.125.77/api${p}`)
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

const goToReport = () => {
  if (!taskInfo.value) return
  uni.navigateTo({ url: `/pages/task/report?taskId=${taskInfo.value.id}&mode=complete` })
}

const verifyTask = async () => {
  if (!taskInfo.value) return
  try {
    uni.showLoading({ title: '验收中...' })
    const updatedTask = await http.post<ITask>(`/tasks/${taskInfo.value.id}/verify`, { rating: 5 })
    taskInfo.value = { ...taskInfo.value, ...updatedTask, status: TaskStatus.VERIFIED }
    uni.showToast({ title: '验收通过！', icon: 'success' })
    uni.hideLoading()
  } catch (error) {
    console.error('[Task Detail] Failed to verify task:', error)
    uni.hideLoading()
    uni.showToast({ title: '操作失败', icon: 'error' })
  }
}

const rejectTask = async () => {
  if (!taskInfo.value || !rejectReason.value.trim()) {
    uni.showToast({ title: '请填写驳回原因', icon: 'none' })
    return
  }
  try {
    uni.showLoading({ title: '处理中...' })
    await http.post<ITask>(`/tasks/${taskInfo.value.id}/reject`, { reason: rejectReason.value })
    taskInfo.value = { ...taskInfo.value, status: TaskStatus.REJECTED }
    showRejectModal.value = false
    rejectReason.value = ''
    uni.showToast({ title: '已驳回，已通知员工', icon: 'success' })
    uni.hideLoading()
  } catch (error) {
    console.error('[Task Detail] Failed to reject task:', error)
    uni.hideLoading()
    uni.showToast({ title: '操作失败', icon: 'error' })
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
  
  // 获取当前登录用户ID和角色（从本地存储）
  const userInfo = uni.getStorageSync('userInfo')
  if (userInfo && userInfo.id) {
    currentUserId.value = userInfo.id
    currentUserRole.value = userInfo.role || ''
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
