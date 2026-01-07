import * as jwt from "jsonwebtoken"
import "dotenv/config"
import { HttpError } from "../errors/HttpError"

export class TokenService {
    private SECRET: jwt.Secret
    private EXPIRES_IN: jwt.SignOptions["expiresIn"]

    constructor() {
        const secret = process.env.JWT_SECRET
        const expiresIn = process.env.JWT_EXPIRES_IN || "7d"

        if (!secret) {
            throw new HttpError(500, "JWT secret not configured")
        }

        this.SECRET = secret as jwt.Secret
        this.EXPIRES_IN = expiresIn as jwt.SignOptions["expiresIn"]
    }

    sign(payload: object) {
        return jwt.sign(
            payload,
            this.SECRET,
            { expiresIn: this.EXPIRES_IN } as jwt.SignOptions
        )
    }

    verify(token: string) {
        const decoded = jwt.verify(
            token,
            this.SECRET
        ) as jwt.JwtPayload | string

        if (typeof decoded === "string") {
            throw new HttpError(401, "Invalid token")
        }

        return decoded
    }
}

export const tokenService = new TokenService()
