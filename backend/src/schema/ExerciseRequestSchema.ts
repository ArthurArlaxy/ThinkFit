import { z } from "zod"

export const GetExerciseRequestSchema = z.object({
    name: z.string().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
    sortBy: z.enum(["name"]).optional(),
    order: z.enum(["asc", "desc"]).optional()
})

export const CreateExerciseRequestSchema = z.object({
    name: z.string(),
    imageUrl: z.string().url().optional(),
    primaryMuscle: z.string()
})

export const UpdateExerciseRequestSchema = z.object({
    name: z.string().optional(),
    imageUrl: z.string().url().optional(),
    primaryMuscle: z.string().optional()
})