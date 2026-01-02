import { z } from "zod"

const RoleEnumSchema = z.enum([ "admin", "personal", "gymMember"])

export const GetUserRequestSchema = z.object({
    name: z.string().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
    role: RoleEnumSchema.optional(),
    sortBy: z.enum(["name", "role"]).optional(),
    order: z.enum(["asc", "desc"]).optional()
})

export const CreateUserRequestSchema = z.object({
    name: z.string(),
    email: z.email(),
    role: RoleEnumSchema,
    password: z.string()
})

export const UpdateUserRequestSchema = z.object({
    name: z.string().optional(),
    email: z.email().optional(),
    role: RoleEnumSchema.optional(),
    password: z.string().optional()
})