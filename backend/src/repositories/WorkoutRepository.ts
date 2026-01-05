import { Workout } from "@prisma/client"

export interface FindParams {
    page?: number
    pageSize?: number
    name?: string
    sortBy?: string
    order?: "asc" | "desc"
}

export interface CreateWorkoutAttributes{
    name: string
    description?: string
    createdById: number
    createdForId: number
}

export interface WorkoutRepository{
    getWorkouts: (params: FindParams) => Promise<Workout[]>
    count: (params: Partial<FindParams>) => Promise<number>
    getWorkoutById: (id: number) => Promise<Workout | null>
    createWorkout: (attributes: CreateWorkoutAttributes) => Promise<Workout>
    updatedWorkout: (id: number, attributes: Partial<CreateWorkoutAttributes>) => Promise<Workout>
    deleteWorkout: (id: number) => Promise<Workout>
}