import { Handler } from "express";

export class ClientController {
    getPerfil: Handler = async (req, res, next) => {
        try {
            res.json("Bem vindo")
        } catch (error) {
            next(error)
        }
    } 
}