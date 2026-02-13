import { http } from '@/http/http'

export interface Dictionary {
    id: number
    category: string
    code: string
    label: string
    value: string
    sort: number
}

export const getDictionaries = (category?: string) => {
    return http.get<Dictionary[]>('/system/dictionaries', { category })
}
