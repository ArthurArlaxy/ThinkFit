import { User } from "../../generated/prisma"

enum UserRoles {
  "admin",
  "personal",
  "gymMember"
}


export interface CreateUserAttributes{
    name: string
    role: UserRoles
    email: string
    password: string
}


export interface UserRepository{
    getUsers: () => Promise<User[]>
    getUserById: (id: number) => Promise<User>
    createUser: (Attributes: CreateUserAttributes) => Promise<User>
    updatedUser: (id: number, Attributes: Partial<CreateUserAttributes>) => Promise<User>
    deleteUser: (id: number) => Promise<User>
}   