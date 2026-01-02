import { z } from "zod"

export const GetChatRequestSchema = z.object({
    name: z.string().optional(),
    type: z.enum(["group","private"]).optional(),
    page: z.number().optional(),
    pageSize: z.number().optional()
})

export const CreateChatRequestSchema = z.object({
    name: z.string(),
    type: z.enum(["group","private"])
})

export const UpdateChatRequestSchema = z.object({
    name: z.string().optional(),
    type: z.enum(["group","private"]).optional()
})