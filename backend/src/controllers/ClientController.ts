import { Handler } from "express";
import { GetUserRequestSchema } from "../schema/UserRequestSchema";
import { UserService } from "../service/UserService";

export class UserController {
    constructor(private readonly userService: UserService){}

    getUsers: Handler = async (req, res, next) => {
        try {

            const { name, role, page = 1 , pageSize = 10, sortBy ="name", order="asc" } = GetUserRequestSchema.parse(req.query)

            const result = await this.userService.getAllUserWithPagination({ name, role, page, pageSize, sortBy, order})

            res.json(result)

        } catch (error) {
            next(error)
        }
    } 
}