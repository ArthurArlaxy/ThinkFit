import { ExerciseSet } from "@prisma/client"

export interface FindParams {
    page?: number
    pageSize?: number
    workoutId?: number
    sortBy?: string
    order?: "asc" | "desc"
}

export interface CreateExerciseSetAttributes{
    minReps: number
    maxReps: number
    sets: number
    weight: number
    order: number
    workoutId: number
    exerciseId: number
}

export interface ExerciseSetRepository{
    getExerciseSets: (params: FindParams) => Promise<ExerciseSet[]>
    count: (params: Partial<FindParams>) => Promise<number>
    getExerciseSetById: (id: number) => Promise<ExerciseSet | null>
    createExerciseSet: (attributes: CreateExerciseSetAttributes) => Promise<ExerciseSet>
    updatedExerciseSet: (id: number, attributes: Partial<CreateExerciseSetAttributes>) => Promise<ExerciseSet>
    deleteExerciseSet: (id: number) => Promise<ExerciseSet>
}