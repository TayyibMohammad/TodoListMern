import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'

import userRoutes from './routes/usersRoutes.js' 
import todosRoutes from './routes/todosRoutes.js'  
import { connectDB } from "./config/db.js";
import "./jobs/dailyTasks.js"     

// load the environment variables


// initialise the express app
const app=express()
const PORT=process.env.PORT

// middleware setup
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cors())

// routes
app.use('/api/users', userRoutes)
app.use('/api/todos', todosRoutes)


connectDB().then(() => {
    app.listen(PORT, ()=> {
        console.log(`app is listening at ${PORT}`)
    })
})