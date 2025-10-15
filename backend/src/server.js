import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import path from 'path' 

import userRoutes from './routes/usersRoutes.js' 
import todosRoutes from './routes/todosRoutes.js'  
import { connectDB } from "./config/db.js";
import "./jobs/dailyTasks.js"     

// load the environment variables


// initialise the express app
const app=express()
const PORT=process.env.PORT
const __dirname = path.resolve() 

// middleware setup
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin:"http://localhost:5173",
    }))
}

// routes
app.use('/api/users', userRoutes)
app.use('/api/todos', todosRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

connectDB().then(() => {
    app.listen(PORT, ()=> {
        console.log(`app is listening at ${PORT}`)
    })
})