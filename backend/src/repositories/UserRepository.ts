import { User } from "@prisma/client"

export type UserRoles = "admin" | "personal" | "gymMember"

export interface CreateUserAttributes{
    name: string
    role: UserRoles
    email: string
    password: string
}

export interface UserWhereParams{
  name?:{
    like?: string
    equals?: string
    mode?: "default" | "insensitive"
  }
  role?: UserRoles
}

export interface FindUserParams{
  where?: UserWhereParams
  sortBy?: "name" | "role"
  order?: "asc" | "desc"
  limit?: number
  offset?: number
}

export interface UserRepository{
    getUsers: (params: FindUserParams) => Promise<User[]>
    count: (params: UserWhereParams ) => Promise<number>  
    // getUserById: (id: number) => Promise<User>
    // createUser: (Attributes: CreateUserAttributes) => Promise<User>
    // updatedUser: (id: number, Attributes: Partial<CreateUserAttributes>) => Promise<User>
    // deleteUser: (id: number) => Promise<User>
}   