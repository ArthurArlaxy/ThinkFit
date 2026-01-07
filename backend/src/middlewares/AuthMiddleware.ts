import { Handler } from "express"
import { tokenService } from "../service/TokenService"
import { HttpError } from "../errors/HttpError"

export const AuthMiddleware: Handler = (req: any, res, next) => {
    try {
        const auth = req.headers.authorization
        if (!auth || !auth.startsWith("Bearer ")) throw new HttpError(401, "Unauthorized")

        const token = auth.split(" ")[1]
        const payload = tokenService.verify(token)
        // payload should have at least id
        if (!payload || !payload.id) throw new HttpError(401, "Invalid token")

        req.user = payload
        next()
    } catch (error) {
        next(new HttpError(401, "Unauthorized"))
    }
}
