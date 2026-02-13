import { http } from '@/http/http'

export interface User {
    id: number
    username: string
    name: string
    role: string
    phone: string | null
    departmentId: number | null
    status: boolean
    createdAt: string
}

/**
 * 获取用户列表
 */
export function getUsers() {
    return http<User[]>({
        url: '/users',
        method: 'GET',
    })
}

/**
 * 获取当前用户信息
 */
export function getUserProfile() {
    return http<User>({
        url: '/users/profile',
        method: 'GET',
    })
}
