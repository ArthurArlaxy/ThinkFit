import { z } from "zod"

export const GetExerciseSetRequestSchema = z.object({
    workoutId: z.number().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
    sortBy: z.enum(["order"]).optional(),
    order: z.enum(["asc", "desc"]).optional()
})

export const CreateExerciseSetRequestSchema = z.object({
    minReps: z.number(),
    maxReps: z.number(),
    sets: z.number(),
    weight: z.number(),
    order: z.number(),
    workoutId: z.number(),
    exerciseId: z.number()
})

export const UpdateExerciseSetRequestSchema = z.object({
    minReps: z.number().optional(),
    maxReps: z.number().optional(),
    sets: z.number().optional(),
    weight: z.number().optional(),
    order: z.number().optional(),
    workoutId: z.number().optional(),
    exerciseId: z.number().optional()
})