<route lang="json5">
{
  style: {
    navigationBarTitleText: '任务汇报',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="bg-[#fafafa] min-h-screen text-slate-900 font-display pb-20">
    <!-- Header -->
    <view class="fixed top-0 left-0 w-full z-[999] bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center gap-3 pt-[calc(env(safe-area-inset-top)+44px)]">
      <button class="p-2 rounded-full hover:bg-slate-100 transition-colors bg-white border-none" @click="goBack">
        <view class="i-material-symbols-arrow-back text-slate-700 text-xl" />
      </button>
      <view>
        <text class="text-xs font-medium text-slate-500 block">工作汇报</text>
        <text class="text-base font-bold text-slate-900 block leading-tight">任务进度汇报</text>
      </view>
    </view>

    <!-- Spacer -->
    <view class="w-full h-[200rpx] pt-safe"></view>

    <!-- Task Info Card -->
    <view v-if="taskInfo" class="mx-4 mb-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
      <text class="text-xs font-medium text-slate-400 uppercase">当前任务</text>
      <view class="mt-2">
        <text class="font-bold text-slate-900 block">{{ taskInfo.title }}</text>
        <text class="text-xs text-slate-500 mt-1 block">{{ taskInfo.description || '无描述' }}</text>
      </view>
    </view>

    <!-- Report Form -->
    <view class="px-4 flex flex-col gap-4">
      <!-- Text Content -->
      <view class="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
        <text class="text-sm font-bold text-slate-900 mb-3 block">文字说明</text>
        <textarea 
          v-model="content" 
          class="w-full px-3 py-3 rounded-lg bg-slate-50 border border-slate-200 text-sm min-h-[120px]" 
          placeholder="请输入工作进展、遇到的问题等..."
          :auto-height="false"
        />
      </view>

      <!-- Voice Recording -->
      <view class="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
        <text class="text-sm font-bold text-slate-900 mb-3 block">语音说明</text>
        
        <view v-if="!voiceRecording && !voicePath" class="flex flex-col items-center justify-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <view class="i-material-symbols-mic text-[#00b2b2] text-5xl mb-3" />
          <button class="px-6 py-3 rounded-lg bg-[#00b2b2] text-white font-semibold border-none" @click="startVoiceRecording">
            开始录音
          </button>
        </view>

        <view v-if="voiceRecording" class="flex flex-col items-center justify-center py-8 border-2 border-[#00b2b2] rounded-xl bg-[#00b2b2]/5">
          <view class="i-material-symbols-mic text-red-500 text-5xl mb-3 animate-pulse" />
          <text class="text-sm text-slate-600 mb-3">录音中...</text>
          <button class="px-6 py-3 rounded-lg bg-red-500 text-white font-semibold border-none" @click="stopVoiceRecording">
            停止录音
          </button>
        </view>

        <view v-if="voicePath" class="flex items-center justify-between p-3 border border-green-200 rounded-lg bg-green-50">
          <view class="flex items-center gap-2">
            <view class="i-material-symbols-check-circle text-green-600 text-xl" />
            <text class="text-sm font-medium text-green-700">录音完成</text>
          </view>
          <button class="text-xs text-red-500 font-medium border-none bg-transparent" @click="deleteVoice">
            删除
          </button>
        </view>
      </view>

      <!-- Photo Upload -->
      <view class="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
        <text class="text-sm font-bold text-slate-900 mb-3 block">拍照记录</text>
        
        <view class="grid grid-cols-3 gap-3">
          <!-- Upload Button -->
          <button v-if="images.length < 6" class="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors" @click="chooseImage">
            <view class="i-material-symbols-add-photo-alternate text-[#00b2b2] text-3xl mb-1" />
            <text class="text-xs text-slate-500">添加照片</text>
          </button>

          <!-- Image Preview -->
          <view v-for="(img, index) in images" :key="index" class="aspect-square relative rounded-xl overflow-hidden border border-slate-200">
            <image :src="img" mode="aspectFill" class="w-full h-full" />
            <button class="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white border-none" @click="deleteImage(index)">
              <view class="i-material-symbols-close text-xs" />
            </button>
          </view>
        </view>
        
        <text v-if="images.length > 0" class="text-xs text-slate-400 mt-2 block">已添加 {{ images.length }}/6 张照片</text>
      </view>

      <!-- Submit Button -->
      <button class="w-full py-4 rounded-xl bg-[#00b2b2] text-white font-bold shadow-lg border-none" @click="submitReport">
        提交汇报
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getTaskList } from '@/api/task'
import type { ITask } from '@/api/types/task'

const taskId = ref<number | null>(null)
const taskInfo = ref<ITask | null>(null)
const content = ref('')
const voiceRecording = ref(false)
const voicePath = ref('')
const images = ref<string[]>([])

let recorderManager: any = null

const goBack = () => {
  uni.navigateBack()
}

// Voice Recording Functions
const startVoiceRecording = () => {
  try {
    recorderManager = uni.getRecorderManager()
    
    recorderManager.onStart(() => {
      console.log('[Report] Voice recording started')
      voiceRecording.value = true
    })

    recorderManager.onStop((res: any) => {
      console.log('[Report] Voice recording stopped', res)
      voiceRecording.value = false
      voicePath.value = res.tempFilePath
      
      uni.showToast({
        title: '录音完成',
        icon: 'success'
      })
    })

    recorderManager.onError((err: any) => {
      console.error('[Report] Recording error:', err)
      voiceRecording.value = false
      uni.showToast({
        title: '录音失败',
        icon: 'error'
      })
    })

    recorderManager.start({
      format: 'mp3'
    })
  } catch (error) {
    console.error('[Report] Failed to start recording:', error)
    uni.showToast({
      title: '无法启动录音',
      icon: 'error'
    })
  }
}

const stopVoiceRecording = () => {
  if (recorderManager) {
    recorderManager.stop()
  }
}

const deleteVoice = () => {
  voicePath.value = ''
  uni.showToast({
    title: '已删除',
    icon: 'success'
  })
}

// Photo Functions
const chooseImage = () => {
  uni.chooseImage({
    count: 6 - images.value.length,
    sizeType: ['compressed'],
    sourceType: ['camera', 'album'],
    success: (res) => {
      console.log('[Report] Images chosen:', res.tempFilePaths)
      images.value.push(...res.tempFilePaths)
    },
    fail: (err) => {
      console.error('[Report] Choose image failed:', err)
      uni.showToast({
        title: '选择照片失败',
        icon: 'error'
      })
    }
  })
}

const deleteImage = (index: number) => {
  images.value.splice(index, 1)
}

// Submit Report
const submitReport = async () => {
  if (!taskId.value) {
    uni.showToast({
      title: '任务ID缺失',
      icon: 'error'
    })
    return
  }

  if (!content.value && !voicePath.value && images.value.length === 0) {
    uni.showToast({
      title: '请至少填写一项内容',
      icon: 'error'
    })
    return
  }

  uni.showLoading({ title: '提交中...', mask: true })

  try {
    // Upload voice file if exists
    let uploadedVoicePath = ''
    if (voicePath.value) {
      const voiceUpload = await uni.uploadFile({
        url: 'http://127.0.0.1:3000/upload/voice',
        filePath: voicePath.value,
        name: 'file',
        header: {
          'Authorization': `Bearer ${uni.getStorageSync('token')}`
        }
      })
      
      const voiceData = JSON.parse(voiceUpload.data)
      uploadedVoicePath = voiceData.data.path
      console.log('[Report] Voice uploaded:', uploadedVoicePath)
    }

    // Upload images if exists
    const uploadedImagePaths: string[] = []
    for (const img of images.value) {
      const imgUpload = await uni.uploadFile({
        url: 'http://127.0.0.1:3000/upload/image',
        filePath: img,
        name: 'file',
        header: {
          'Authorization': `Bearer ${uni.getStorageSync('token')}`
        }
      })
      
      const imgData = JSON.parse(imgUpload.data)
      uploadedImagePaths.push(imgData.data.path)
      console.log('[Report] Image uploaded:', imgData.data.path)
    }

    // Submit report
    const res = await uni.request({
      url: 'http://127.0.0.1:3000/task-reports',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${uni.getStorageSync('token')}`
      },
      data: {
        taskId: taskId.value,
        content: content.value,
        voicePath: uploadedVoicePath,
        imagePaths: uploadedImagePaths
      }
    })

    console.log('[Report] Report submitted:', res)

    uni.hideLoading()
    uni.showToast({
      title: '汇报成功',
      icon: 'success'
    })

    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  } catch (error) {
    console.error('[Report] Submit failed:', error)
    uni.hideLoading()
    uni.showToast({
      title: '提交失败',
      icon: 'error'
    })
  }
}

onLoad(async (options: any) => {
  console.log('[Report] onLoad with options:', options)

  if (options.taskId) {
    taskId.value = parseInt(options.taskId)
    console.log('[Report] Task ID:', taskId.value)

    try {
      const tasks = await getTaskList()
      taskInfo.value = tasks.find(t => t.id === taskId.value) || null
      console.log('[Report] Task:', taskInfo.value)
    } catch (error) {
      console.error('[Report] Failed to load task:', error)
      uni.showToast({
        title: '加载失败',
        icon: 'error'
      })
    }
  } else {
    uni.showToast({
      title: '缺少任务ID',
      icon: 'error'
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }
})
</script>

<style scoped>
textarea {
  font-size: 14px;
  line-height: 1.6;
}
</style>
