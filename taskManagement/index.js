import express from "express";
import dotenv from 'dotenv'
import routerUser from './routes/user.js'
import routerTask from './routes/task.js'
import { allTables } from "./db/allTables.js";
import { globalError } from "./middlewares/globalError.js";
dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use('/', routerUser)
app.use('/', routerTask)

app.use(globalError)

app.listen(PORT, async () => {
    await allTables()
    console.log('Servidor rodando na porta', PORT)
})