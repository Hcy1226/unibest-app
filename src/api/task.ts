import { http } from '@/http/http'
import type { ICreateTaskParams, ITask, IUpdateTaskParams } from './types/task'
import { TaskPriority, TaskStatus, TaskType } from './types/task'

/**
 * Get all tasks
 */
export function getTaskList() {
    return http.get<ITask[]>('/tasks')
}

/**
 * Get task detail by ID
 */
export function getTaskDetail(id: number) {
    return http.get<ITask>(`/tasks/${id}`)
}

/**
 * Create a new task
 */
export function createTask(data: ICreateTaskParams) {
    return http.post<ITask>('/tasks', data)
}

/**
 * Update a task
 */
export function updateTask(id: number, data: IUpdateTaskParams) {
    return http.patch<ITask>(`/tasks/${id}`, data)
}

/**
 * Delete a task
 */
export function deleteTask(id: number) {
    return http.delete(`/tasks/${id}`)
}

/**
 * Split a task into subtasks
 */
export function splitTask(id: number, data: { subtasks: any[] }) {
    return http.post<any>(`/tasks/${id}/split`, data)
}

/**
 * Get task reports by task ID
 */
export function getTaskReports(taskId: number) {
    return http.get<any[]>(`/task-reports/task/${taskId}`)
}

// --- Mock Data Helpers (for development) ---
export const mockTasks: ITask[] = [
    {
        id: 1,
        title: 'A区3号发电机组例行维护',
        description: '检查冷却系统压力，更换滤芯，记录运行参数。注意高温警示。',
        type: TaskType.MAINTENANCE,
        priority: TaskPriority.HIGH,
        status: TaskStatus.IN_PROGRESS,
        creatorId: 1,
        deadline: '2026-02-12T12:00:00.000Z',
        createdAt: '2026-02-11T09:00:00.000Z',
        updatedAt: '2026-02-11T10:00:00.000Z',
    },
    {
        id: 2,
        title: 'B区照明系统故障排查',
        description: 'B区走廊照明闪烁，需排查线路接触不良或镇流器问题。',
        type: TaskType.MAINTENANCE,
        priority: TaskPriority.EMERGENCY,
        status: TaskStatus.ASSIGNED,
        creatorId: 1,
        deadline: '2026-02-11T14:30:00.000Z',
        createdAt: '2026-02-11T08:00:00.000Z',
        updatedAt: '2026-02-11T08:30:00.000Z',
    },
    {
        id: 3,
        title: '全厂消防设施周检',
        description: '检查灭火器压力、消防栓是否完好，确保通道无阻碍。',
        type: TaskType.SECURITY,
        priority: TaskPriority.NORMAL,
        status: TaskStatus.PENDING,
        creatorId: 1,
        deadline: '2026-02-12T16:00:00.000Z',
        createdAt: '2026-02-11T09:30:00.000Z',
        updatedAt: '2026-02-11T09:30:00.000Z',
    },
]
