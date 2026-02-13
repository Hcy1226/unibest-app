export const handleBack = () => {
    const pages = getCurrentPages()
    if (pages.length > 1) {
        uni.navigateBack()
    } else {
        // Determine where to go based on role
        try {
            const userStr = uni.getStorageSync('user') // Pinia persists to 'user' key usually
            const user = userStr ? JSON.parse(userStr) : null
            const role = user?.userInfo?.role

            if (role === 'employee') {
                uni.reLaunch({ url: '/pages/employee/index' })
            } else if (role === 'supervisor') {
                uni.switchTab({ url: '/pages/index/index' })
            } else {
                uni.reLaunch({ url: '/pages/login/index' })
            }
        } catch (e) {
            uni.reLaunch({ url: '/pages/login/index' })
        }
    }
}
