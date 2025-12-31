import express from "express"
import { userController } from "./container"

export const router = express.Router()

router.get("/users", userController.getUsers )
