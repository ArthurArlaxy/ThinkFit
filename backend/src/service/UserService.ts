import { HttpError } from "../errors/HttpError";
import { CreateUserAttributes, getUserTraning, UserRepository, UserRoles, UserWhereParams } from "../repositories/UserRepository";
import bcrypt from "bcrypt"

interface GetUserWithPagination {
    name?: string
    page?: number
    pageSize?: number
    role?: UserRoles
    sortBy?: "name" | "role"
    order?: "asc" | "desc"
}

export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async getAllUserWithPagination(params: GetUserWithPagination) {
        const { name, role, page = 1, pageSize = 10, sortBy = "name", order = "asc" } = params
        const limit = Number(pageSize)
        const offset = (Number(page) - 1) * pageSize

        const where: UserWhereParams = {}

        if (name) where.name = { like: name, mode: "insensitive" }
        if (role) where.role = role

        const users = await this.userRepository.getUsers({ where, sortBy, order, limit, offset })

        const total = await this.userRepository.count(where)

        return {
            users,
            meta: {
                page: Number(page),
                pageSize: limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    }

    async getUser(id: number) {

        const userAndTraining = await this.userRepository.getUserById(id)

        if (!userAndTraining) throw new HttpError(404, "User not found")

        return userAndTraining
    }

    async createUser(attributes: CreateUserAttributes) {

        attributes.password = bcrypt.hashSync(attributes.password, 10)
        const newUser = await this.userRepository.createUser(attributes)

        return newUser
    }

    async updateUser(id: number, attributes: Partial<CreateUserAttributes>) {

        if (attributes.password) attributes.password = bcrypt.hashSync(attributes.password, 10)
        const updatedUser = await this.userRepository.updatedUser(id, attributes)

        return updatedUser
    }

    async deleteUser(id: number) {

        const deleteUser = await this.userRepository.deleteUser(id)

        return deleteUser
    }
}