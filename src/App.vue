<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { navigateToInterceptor } from '@/router/interceptor'
import { useTokenStore } from '@/store/token'
import { useUserStore } from '@/store/user'

onLaunch((options) => {
  console.log('App.vue onLaunch', options)

  // 延迟执行，等待小程序初始化完成
  setTimeout(() => {
    const tokenStore = useTokenStore()
    tokenStore.updateNowTime()

    const isLoggedIn = tokenStore.hasLogin
    console.log('isLoggedIn:', isLoggedIn)

    // 未登录：不做任何操作，因为 pages/login/index 已经是 pages.json 中第一个页面，会自动显示
    if (!isLoggedIn) {
      console.log('未登录，停留在登录页（默认首页）')
      return
    }

    // 已登录，根据角色跳转到对应工作台
    const userStore = useUserStore()
    const role = userStore.userInfo?.role
    console.log('已登录，角色:', role)

    if (role === 'supervisor' || role === 'admin') {
      uni.switchTab({ url: '/pages/index/index' })
    } else {
      uni.reLaunch({ url: '/pages/employee/index' })
    }
  }, 300)
})
onShow((options) => {
  console.log('App.vue onShow', options)
  // 处理直接进入页面路由的情况：如h5直接输入路由、微信小程序分享后进入等
  if (options?.path) {
    navigateToInterceptor.invoke({ url: `/${options.path}`, query: options.query })
  }
  else {
    navigateToInterceptor.invoke({ url: '/' })
  }
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">

</style>
