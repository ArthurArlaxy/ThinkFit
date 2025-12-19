import express from "express"
import "dotenv/config";
import { router } from "./router.js";

const app =  express()

app.use(express.json())
app.use(router)

const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`Servidor rodando http://localhost:${PORT}`)
})