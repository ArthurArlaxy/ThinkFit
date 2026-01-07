import { z } from "zod"

export const GetChatRequestSchema = z.object({
    name: z.string().optional(),
    type: z.enum(["group","private"]).optional(),
    page: z.number().optional(),
    pageSize: z.number().optional()
})

export const CreateChatRequestSchema = z.discriminatedUnion("type", [
    z.object({
        type: z.literal("private"),
        name: z.string(),
        memberId: z.number()
    }),
    z.object({
        type: z.literal("group"),
        name: z.string(),
        membersId: z.array(z.number()).min(1)
    })
])

export const UpdateChatRequestSchema = z.object({
    name: z.string().optional(),
    type: z.literal("group").optional()
})