import { Handler } from "express"
import { UserService } from "../service/UserService"
import { tokenService } from "../service/TokenService"
import { z } from "zod"
import bcrypt from "bcrypt"
import { HttpError } from "../errors/HttpError"

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export class AuthController {
    constructor(private readonly userService: UserService) { }

    login: Handler = async (req, res, next) => {
        try {
            const { email, password } = LoginSchema.parse(req.body)
            const user = await this.userService.getUserByEmail(email)
            if (!user) throw new HttpError(401, "Invalid credentials")

            const valid = await bcrypt.compare(password, user.password)
            if (!valid) throw new HttpError(401, "Invalid credentials")

            const token = tokenService.sign({ id: user.id, role: user.role })
            res.json({ token })
        } catch (error) { next(error) }
    }
}

export default AuthController
