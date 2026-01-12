import { z } from "zod"

export const GetTicketRequestSchema = z.object({
    title: z.string().optional(),
    type: z.enum(["payment","training","question"]).optional(),
    status: z.enum(["open","in_progress","solved"]).optional(),
    priority: z.enum(["low","medium","high"]).optional(),
    page: z.number().optional(),
    pageSize: z.number().optional()
})

export const CreateTicketRequestSchema = z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(["payment","training","question","bug"]).optional(),
    createdById: z.number(),
    assignedToId: z.number().optional(),
    priority: z.enum(["low","medium","high"]).optional()
})

export const UpdateTicketRequestSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(["payment","training","question"]).optional(),
    status: z.enum(["open","in_progress","solved"]).optional(),
    priority: z.enum(["low","medium","high"]).optional(),
    assignedToId: z.number().optional()
})