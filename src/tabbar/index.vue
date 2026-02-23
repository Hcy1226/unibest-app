<script setup lang="ts">
// i-carbon-code
import { customTabbarEnable, needHideNativeTabbar, tabbarCacheEnable } from './config'
import { tabbarList, tabbarStore } from './store'
import TabbarItem from './TabbarItem.vue'
import { computed } from 'vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const displayTabbarList = computed(() => {
  const role = userStore.userInfo?.role
  if (role === 'employee') {
    return tabbarList.filter(item => 
      ['/pages/employee/index', '/pages/employee/history', '/pages/employee/statistics', '/pages/user/index'].includes(item.pagePath)
    )
  }
  return tabbarList.filter(item => 
      ['/pages/index/index', '/pages/task/list', '/pages/task/split', '/pages/team/index', '/pages/user/index'].includes(item.pagePath)
  )
})

// #ifdef MP-WEIXIN
// 将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
defineOptions({
  virtualHost: true,
})
// #endif

/**
 * 中间的鼓包tabbarItem的点击事件
 */
function handleClickBulge() {
  uni.showToast({
    title: '点击了中间的鼓包tabbarItem',
    icon: 'none',
  })
}

function handleClick(displayIndex: number) {
  const item = displayTabbarList.value[displayIndex];
  const realIndex = tabbarList.findIndex(t => t.pagePath === item.pagePath);

  // 点击原来的不做操作
  if (realIndex === tabbarStore.curIdx && !item.isCenterButton && !item.isBulge) {
    return
  }
  if (item.isBulge) {
    handleClickBulge()
    return
  }
  if (item.isCenterButton) {
    uni.navigateTo({ url: item.pagePath })
    return
  }
  const url = item.pagePath
  tabbarStore.setCurIdx(realIndex)
  if (tabbarCacheEnable) {
    uni.switchTab({ url })
  }
  else {
    uni.navigateTo({ url })
  }
}
// #ifndef MP-WEIXIN || MP-ALIPAY
// 因为有了 custom:true， 微信里面不需要多余的hide操作
onLoad(() => {
  // 解决原生 tabBar 未隐藏导致有2个 tabBar 的问题
  needHideNativeTabbar
  && uni.hideTabBar({
    fail(err) {
      console.log('hideTabBar fail: ', err)
    },
    success(res) {
      // console.log('hideTabBar success: ', res)
    },
  })
})
// #endif

// #ifdef MP-ALIPAY
onMounted(() => {
  // 解决支付宝自定义tabbar 未隐藏导致有2个 tabBar 的问题; 注意支付宝很特别，需要在 onMounted 钩子调用
  customTabbarEnable // 另外，支付宝里面，只要是 customTabbar 都需要隐藏
  && uni.hideTabBar({
    fail(err) {
      console.log('hideTabBar fail: ', err)
    },
    success(res) {
      // console.log('hideTabBar success: ', res)
    },
  })
})
// #endif
const activeColor = 'var(--wot-color-theme, #1890ff)'
const inactiveColor = '#666'
function getColorByIndex(displayIndex: number) {
  const item = displayTabbarList.value[displayIndex];
  const realIndex = tabbarList.findIndex(t => t.pagePath === item.pagePath);
  return tabbarStore.curIdx === realIndex ? activeColor : inactiveColor
}
</script>

<template>
  <view v-if="customTabbarEnable" class="h-50px pb-safe">
    <view class="border-and-fixed bg-white" @touchmove.stop.prevent>
      <view class="h-50px flex items-center">
        <view
          v-for="(item, index) in displayTabbarList" :key="index"
          class="flex flex-1 flex-col items-center justify-center"
          :style="{ color: getColorByIndex(index) }"
          @click="handleClick(index)"
        >
          <view v-if="item.isBulge" class="relative">
            <!-- 中间一个鼓包tabbarItem的处理 -->
            <view class="bulge">
              <TabbarItem :item="item" :index="tabbarList.findIndex(t => t.pagePath === item.pagePath)" class="text-center" is-bulge />
            </view>
          </view>
          <!-- 中间平铺按钮的处理 -->
          <view 
            v-else-if="item.isCenterButton" 
            class="flex items-center justify-center size-10 rounded-full bg-[#00b2b2] active:scale-95 transition-transform"
            @click.stop="handleClick(index)"
          >
             <view :class="item.icon" class="text-white text-2xl" />
          </view>
          <TabbarItem v-else :item="item" :index="tabbarList.findIndex(t => t.pagePath === item.pagePath)" class="relative px-3 text-center" />
        </view>
      </view>

      <view class="pb-safe" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.border-and-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-top: 1px solid #eee;
  box-sizing: border-box;
}
// 中间鼓包的样式
.bulge {
  position: absolute;
  top: -20px;
  left: 50%;
  transform-origin: top center;
  transform: translateX(-50%) scale(0.5) translateY(-33%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250rpx;
  height: 250rpx;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: inset 0 0 0 1px #fefefe;

  &:active {
    // opacity: 0.8;
  }
}
</style>
