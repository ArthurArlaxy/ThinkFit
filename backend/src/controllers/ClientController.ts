import { Handler } from "express";
import { CreateUserRequestSchema, GetUserRequestSchema, UpdateUserRequestSchema } from "../schema/UserRequestSchema";
import { UserService } from "../service/UserService";
import bcrypt from "bcrypt"

export class UserController {
    constructor(private readonly userService: UserService) { }

    getUsers: Handler = async (req, res, next) => {
        try {

            const { name, role, page = 1, pageSize = 10, sortBy = "name", order = "asc" } = GetUserRequestSchema.parse(req.query)

            const result = await this.userService.getAllUserWithPagination({ name, role, page, pageSize, sortBy, order })

            res.json(result)

        } catch (error) {
            next(error)
        }
    }

    getUser: Handler = async (req, res, next) => {
        try {

            const id = Number(req.params.id)
            const result = await this.userService.getUser(id)

            res.json(result)

        } catch (error) {
            next(error)
        }
    }

    createUser: Handler = async (req, res, next) => {
        try {

            const attributes = CreateUserRequestSchema.parse(req.body)
            const newUser = await this.userService.createUser(attributes)

            res.json(newUser)

        } catch (error) {
            next(error)
        }
    }

    updateUser: Handler = async (req, res, next) => {
        try {

            const id = Number(req.params.id)
            const attributes = UpdateUserRequestSchema.parse(req.body)
            const updateUser = await this.userService.updateUser(id, attributes)

            res.json(updateUser)

        } catch (error) {
            next(error)
        }
    }
    deleteUser: Handler = async (req, res, next) => {
        try {

            const id = Number(req.params.id)
            const deleteUser = await this.userService.deleteUser(id)

            res.json(deleteUser)

        } catch (error) {
            next(error)
        }
    }

}