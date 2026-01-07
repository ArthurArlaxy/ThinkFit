import { z } from "zod"

export const GetMessageRequestSchema = z.object({
    chatId: z.number().optional(),
    userId: z.number().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional()
})

export const CreateMessageRequestSchema = z.object({
    chatId: z.number(),
    content: z.string()
})

export const UpdateMessageRequestSchema = z.object({
    content: z.string().optional()
})