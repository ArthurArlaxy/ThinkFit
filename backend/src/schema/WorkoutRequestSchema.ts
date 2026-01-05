import { z } from "zod"

export const GetWorkoutRequestSchema = z.object({
    name: z.string().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
    sortBy: z.enum(["name", "createdAt"]).optional(),
    order: z.enum(["asc", "desc"]).optional()
})

export const CreateWorkoutRequestSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    createdById: z.number(),
    createdForId: z.number()
})

export const UpdateWorkoutRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    createdById: z.number().optional(),
    createdForId: z.number().optional()
})