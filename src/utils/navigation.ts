export const handleBack = () => {
    const pages = getCurrentPages()
    if (pages.length > 1) {
        uni.navigateBack()
    } else {
        // Determine where to go based on role
        const role = uni.getStorageSync('userRole')
        if (role === 'employee') {
            uni.reLaunch({ url: '/pages/employee/index' })
        } else if (role === 'supervisor') {
            uni.switchTab({ url: '/pages/index/index' })
        } else {
            // Fallback
            uni.reLaunch({ url: '/pages/login/index' })
        }
    }
}
