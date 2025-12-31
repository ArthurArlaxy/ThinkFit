import { UserRepository, UserRoles, UserWhereParams } from "../repositories/UserRepository";

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

    async getAllUserWithPagination(params: GetUserWithPagination){
        const { name, role, page = 1 , pageSize = 10, sortBy ="name", order="asc" } = params
        const limit = Number(pageSize)
        const offset = (Number(page) - 1) * pageSize

        const where: UserWhereParams = {}

        if(name) where.name = { like: name, mode: "insensitive"}
        if(role) where.role = role

        const users = await this.userRepository.getUsers({ where, sortBy, order, limit, offset })

        const total = await this.userRepository.count(where)

        return {
            users,
            meta:{
                page: Number(page),
                pageSize: limit,
                total,
                totalPages: Math.ceil(total/limit)
            }
        }
    }
}