import { Exercise } from "@prisma/client"

export interface FindParams {
    page?: number
    pageSize?: number
    name?: string
    sortBy?: string
    order?: "asc" | "desc"
}

export interface CreateExerciseAttributes{
    name: string
    imageUrl?: string
    primaryMuscle: string
}

export interface ExerciseRepository{
    getExercises: (params: FindParams) => Promise<Exercise[]>
    count: (params: Partial<FindParams>) => Promise<number>
    getExerciseById: (id: number) => Promise<Exercise | null>
    createExercise: (attributes: CreateExerciseAttributes) => Promise<Exercise>
    updatedExercise: (id: number, attributes: Partial<CreateExerciseAttributes>) => Promise<Exercise>
    deleteExercise: (id: number) => Promise<Exercise>
}