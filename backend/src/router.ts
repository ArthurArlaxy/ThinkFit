import express from "express"
import { ClientController } from "./controllers/ClientController.js"

const clientController = new ClientController()

export const router = express.Router()

router.get("/users/:id", clientController.getPerfil)
