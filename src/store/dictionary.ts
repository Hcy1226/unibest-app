import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDictionaries, type Dictionary } from '@/api/system'

export const useDictionaryStore = defineStore('dictionary', () => {
    const dictionaries = ref<Dictionary[]>([])
    const loading = ref(false)
    const initialized = ref(false)

    const fetchDictionaries = async (force = false) => {
        if (initialized.value && !force && dictionaries.value.length > 0) return
        loading.value = true
        try {
            const res = await getDictionaries()
            // unibest http util might return data directly or wrapped
            // Assume it returns T or { data: T } based on interceptor
            // But typically unibest returns T directly if configured
            if (Array.isArray(res)) {
                dictionaries.value = res
            } else if ((res as any).data && Array.isArray((res as any).data)) {
                dictionaries.value = (res as any).data
            }
            initialized.value = true
        } catch (error) {
            console.error('Failed to fetch dictionaries:', error)
        } finally {
            loading.value = false
        }
    }

    const getOptions = (category: string) => {
        return dictionaries.value
            .filter(d => d.category === category)
            .sort((a, b) => a.sort - b.sort)
    }

    const getLabel = (category: string, code: string) => {
        const item = dictionaries.value.find(d => d.category === category && d.code === code)
        return item ? item.label : code
    }

    const getValue = (category: string, code: string) => {
        const item = dictionaries.value.find(d => d.category === category && d.code === code)
        return item ? item.value : ''
    }

    return {
        dictionaries,
        loading,
        fetchDictionaries,
        getOptions,
        getLabel,
        getValue
    }
})
