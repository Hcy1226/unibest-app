<template>
  <view class="w-full">
    <!-- Spacer to prevent content from being hidden behind tabbar -->
    <view class="h-24"></view>
    
    <nav class="fixed bottom-0 left-0 w-full bg-white dark:bg-[#23262a] border-t border-slate-200 dark:border-slate-800 px-2 py-2 pb-safe z-50">
      <ul class="grid grid-cols-5 items-center list-none p-0 m-0 w-full">
        <li v-for="(item, index) in tabList" :key="index" class="flex justify-center items-center">
          
          <!-- Standard Tab Item -->
          <view 
            v-if="!item.isFloating"
            class="flex flex-col items-center gap-1 cursor-pointer"
            :class="isActive(item) ? 'text-[#00b2b2]' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'"
            @click="switchTab(item)"
          >
            <view :class="[item.icon, isActive(item) ? 'text-[#00b2b2]' : 'text-slate-400 dark:text-slate-500']" class="text-[24px]"></view>
            <view class="text-[10px]" :class="isActive(item) ? 'font-bold' : 'font-medium'">{{ item.text }}</view>
          </view>
          
          <!-- Embedded Add Button -->
          <view 
            v-else
            class="flex items-center justify-center active:scale-95 transition-transform"
            style="width: 44px; height: 44px; border-radius: 50%; background-color: #00b2b2; box-shadow: 0 4px 6px -1px rgba(0, 178, 178, 0.3);"
            @click="handleFabClick"
          >
            <view class="i-material-symbols-add text-white text-3xl"></view>
          </view>
          
        </li>
      </ul>
    </nav>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const tabList = [
  { text: '首页', icon: 'i-material-symbols-dashboard', path: '/pages/index/index' },
  { text: '任务', icon: 'i-material-symbols-assignment', path: '/pages/task/list' },
  { isFloating: true },
  { text: '班组', icon: 'i-material-symbols-groups', path: '/pages/team/index' },
  { text: '个人', icon: 'i-material-symbols-person', path: '/pages/user/index' },
]

const currentPath = computed(() => {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  return page ? '/' + page.route : ''
})

const isActive = (item: any) => {
  return currentPath.value === item.path
}

const switchTab = (item: any) => {
  if (item.path && currentPath.value !== item.path) {
    const tabbarPages = [
      '/pages/index/index',
      '/pages/task/list',
      '/pages/team/index',
      '/pages/user/index'
    ]
    if (tabbarPages.includes(item.path)) {
      uni.switchTab({ url: item.path })
    } else {
      uni.redirectTo({ url: item.path })
    }
  }
}

const handleFabClick = () => {
    // Action for the FAB button, maybe open a modal or go to a create page
    // For now, let's navigate to task split as a placeholder or just log
    uni.navigateTo({ url: '/pages/task/split' })
}
</script>

<style scoped>
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}

.material-symbols-outlined.filled {
  font-variation-settings: 'FILL' 1;
}
</style>
