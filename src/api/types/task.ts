export enum TaskType {
    MAINTENANCE = 'maintenance',
    CLEANING = 'cleaning',
    SECURITY = 'security',
    INSPECTION = 'inspection',
}

export enum TaskPriority {
    LOW = 'low',
    NORMAL = 'normal',
    HIGH = 'high',
    EMERGENCY = 'emergency',
}

export enum TaskStatus {
    PENDING = 'pending',
    ASSIGNED = 'assigned',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    VERIFIED = 'verified',
    REJECTED = 'rejected',
}

export interface ITask {
    id: number
    title: string
    description?: string
    type: TaskType
    priority: TaskPriority
    status: TaskStatus
    creatorId: number
    assigneeId?: number
    assignee?: {
        name: string
    }
    supervisorId?: number
    deadline?: string
    completedAt?: string
    createdAt: string
    updatedAt: string
    subtasks?: ITask[]
    parentId?: number
}

export interface ICreateTaskParams {
    title: string
    description?: string
    type: TaskType
    priority: TaskPriority
    assigneeId?: number
    deadline?: string
}

export interface IUpdateTaskParams extends Partial<ICreateTaskParams> {
    status?: TaskStatus
}
