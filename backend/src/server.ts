import express from "express"
import "dotenv/config";
import { router } from "./router.js";
import { ErrorHandler } from "./middlewares/ErrorMiddleware.js";

const app =  express()

app.use(express.json())
app.use("/api", router)
app.use(ErrorHandler)

const PORT = process.env.PORT

app.listen(PORT, () =>{
    console.log(`Servidor rodando http://localhost:${PORT}`)
})